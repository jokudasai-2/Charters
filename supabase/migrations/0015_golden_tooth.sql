/*
  # Fix Stakeholder Access Control

  1. Changes
    - Restore proper RLS policies for stakeholders and feedback
    - Add proper access control for document owners and stakeholders
    - Safely handle existing indexes
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    - Ensure data isolation between users
*/

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "stakeholder_select" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_insert" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_update" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_delete" ON stakeholders;
DROP POLICY IF EXISTS "feedback_select" ON feedback;
DROP POLICY IF EXISTS "feedback_insert" ON feedback;
DROP POLICY IF EXISTS "feedback_update" ON feedback;
DROP POLICY IF EXISTS "feedback_delete" ON feedback;

-- Document owners can manage stakeholders
CREATE POLICY "document_owners_manage_stakeholders"
  ON stakeholders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Stakeholders can view other stakeholders in the same document
CREATE POLICY "stakeholders_view_stakeholders"
  ON stakeholders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders s
      WHERE s.document_id = stakeholders.document_id
      AND s.email = auth.jwt()->>'email'
    )
  );

-- Document owners can manage feedback
CREATE POLICY "document_owners_manage_feedback"
  ON feedback
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = feedback.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Stakeholders can add and view feedback
CREATE POLICY "stakeholders_manage_feedback"
  ON feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "stakeholders_add_feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Safely handle indexes
DO $$
BEGIN
    -- Drop old indexes if they exist
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_docs_user') THEN
        DROP INDEX idx_docs_user;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_stakeholders_doc') THEN
        DROP INDEX idx_stakeholders_doc;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_feedback_doc') THEN
        DROP INDEX idx_feedback_doc;
    END IF;

    -- Create new indexes only if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_stakeholders_document_email_new') THEN
        CREATE INDEX idx_stakeholders_document_email_new ON stakeholders(document_id, email);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_feedback_document_status_new') THEN
        CREATE INDEX idx_feedback_document_status_new ON feedback(document_id, status);
    END IF;
END $$;

-- Add helpful comments
COMMENT ON POLICY "document_owners_manage_stakeholders" ON stakeholders 
  IS 'Document owners have full control over stakeholders';

COMMENT ON POLICY "stakeholders_view_stakeholders" ON stakeholders 
  IS 'Stakeholders can view other stakeholders in the same document';

COMMENT ON POLICY "document_owners_manage_feedback" ON feedback 
  IS 'Document owners have full control over feedback';

COMMENT ON POLICY "stakeholders_manage_feedback" ON feedback 
  IS 'Stakeholders can view feedback for their documents';

COMMENT ON POLICY "stakeholders_add_feedback" ON feedback 
  IS 'Stakeholders can add feedback to their documents';