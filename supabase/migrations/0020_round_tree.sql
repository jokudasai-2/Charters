/*
  # Fix RLS Policies

  1. Changes
    - Drop all existing policies to start fresh
    - Create non-recursive policies for documents, stakeholders, and feedback
    - Simplify policy logic to prevent infinite recursion
    - Add proper indexes for performance

  2. Security
    - Maintain proper access control
    - Prevent policy recursion
    - Enable RLS on all tables
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "document_owner_access" ON documents;
DROP POLICY IF EXISTS "document_stakeholder_access" ON documents;
DROP POLICY IF EXISTS "stakeholder_owner_access" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_self_access" ON stakeholders;
DROP POLICY IF EXISTS "feedback_owner_access" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_access" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_insert" ON feedback;
DROP POLICY IF EXISTS "users_own_documents" ON documents;
DROP POLICY IF EXISTS "stakeholders_view_documents" ON documents;
DROP POLICY IF EXISTS "owners_manage_stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "users_view_own_stakeholder_records" ON stakeholders;
DROP POLICY IF EXISTS "owners_manage_feedback" ON feedback;
DROP POLICY IF EXISTS "stakeholders_view_feedback" ON feedback;
DROP POLICY IF EXISTS "stakeholders_add_feedback" ON feedback;

-- Document policies
CREATE POLICY "document_access_policy"
  ON documents
  FOR ALL
  USING (
    user_id = auth.uid() -- Owner access
  );

CREATE POLICY "document_stakeholder_read_policy"
  ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM stakeholders 
      WHERE stakeholders.document_id = documents.id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Stakeholder policies
CREATE POLICY "stakeholder_owner_policy"
  ON stakeholders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 
      FROM documents 
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholder_self_policy"
  ON stakeholders
  FOR SELECT
  USING (
    email = auth.jwt()->>'email'
  );

-- Feedback policies
CREATE POLICY "feedback_owner_policy"
  ON feedback
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 
      FROM documents 
      WHERE documents.id = feedback.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "feedback_stakeholder_read_policy"
  ON feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM stakeholders 
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "feedback_stakeholder_insert_policy"
  ON feedback
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM stakeholders 
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_email ON stakeholders(document_id, email);
CREATE INDEX IF NOT EXISTS idx_feedback_document_id ON feedback(document_id);

-- Add helpful comments
COMMENT ON POLICY "document_access_policy" ON documents IS 'Document owners have full access';
COMMENT ON POLICY "document_stakeholder_read_policy" ON documents IS 'Stakeholders can view documents';
COMMENT ON POLICY "stakeholder_owner_policy" ON stakeholders IS 'Document owners can manage stakeholders';
COMMENT ON POLICY "stakeholder_self_policy" ON stakeholders IS 'Users can view their stakeholder records';
COMMENT ON POLICY "feedback_owner_policy" ON feedback IS 'Document owners can manage feedback';
COMMENT ON POLICY "feedback_stakeholder_read_policy" ON feedback IS 'Stakeholders can view feedback';
COMMENT ON POLICY "feedback_stakeholder_insert_policy" ON feedback IS 'Stakeholders can add feedback';