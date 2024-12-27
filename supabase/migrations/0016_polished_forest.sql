/*
  # Fix Stakeholder Policies

  1. Changes
    - Remove circular dependencies in stakeholder policies
    - Simplify access control logic
    - Optimize performance with proper indexes
  
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep data isolation
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "document_owners_manage_stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "stakeholders_view_stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "document_owners_manage_feedback" ON feedback;
DROP POLICY IF EXISTS "stakeholders_manage_feedback" ON feedback;
DROP POLICY IF EXISTS "stakeholders_add_feedback" ON feedback;

-- Document owners can manage stakeholders (simplified)
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

-- Stakeholders can view documents they're part of (no recursion)
CREATE POLICY "stakeholders_view_own_records"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

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

-- Stakeholders can view and add feedback
CREATE POLICY "stakeholders_view_feedback"
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

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_stakeholders_email ON stakeholders(email);
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_id ON stakeholders(document_id);
CREATE INDEX IF NOT EXISTS idx_feedback_document_id ON feedback(document_id);

-- Add helpful comments
COMMENT ON POLICY "document_owners_manage_stakeholders" ON stakeholders 
  IS 'Document owners have full control over stakeholders';

COMMENT ON POLICY "stakeholders_view_own_records" ON stakeholders 
  IS 'Stakeholders can view their own records';

COMMENT ON POLICY "document_owners_manage_feedback" ON feedback 
  IS 'Document owners have full control over feedback';

COMMENT ON POLICY "stakeholders_view_feedback" ON feedback 
  IS 'Stakeholders can view feedback for their documents';

COMMENT ON POLICY "stakeholders_add_feedback" ON feedback 
  IS 'Stakeholders can add feedback to their documents';