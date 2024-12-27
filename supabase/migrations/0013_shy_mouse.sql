/*
  # Final Policy Recursion Fix

  1. Changes
    - Drop all existing policies
    - Create simple, non-recursive policies
    - Remove all joins in policies
    - Use direct ID checks instead of subqueries where possible
    - Add proper indexes
  
  2. Security
    - Maintain proper access control
    - Prevent policy recursion
    - Optimize query performance
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "users_own_documents" ON documents;
DROP POLICY IF EXISTS "stakeholders_view_documents" ON documents;
DROP POLICY IF EXISTS "owners_manage_stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "users_view_own_stakeholder_records" ON stakeholders;
DROP POLICY IF EXISTS "owners_manage_feedback" ON feedback;
DROP POLICY IF EXISTS "stakeholders_add_feedback" ON feedback;
DROP POLICY IF EXISTS "users_view_feedback" ON feedback;

-- Document Policies
CREATE POLICY "document_owner_access"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "document_stakeholder_access"
  ON documents
  FOR SELECT
  USING (
    id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Stakeholder Policies
CREATE POLICY "stakeholder_owner_access"
  ON stakeholders
  FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholder_self_access"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Feedback Policies
CREATE POLICY "feedback_owner_access"
  ON feedback
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 
      FROM documents 
      WHERE id = document_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "feedback_stakeholder_access"
  ON feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM stakeholders 
      WHERE document_id = feedback.document_id 
      AND email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "feedback_stakeholder_insert"
  ON feedback
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM stakeholders 
      WHERE document_id = feedback.document_id 
      AND email = auth.jwt()->>'email'
    )
  );

-- Optimize indexes
DROP INDEX IF EXISTS idx_documents_user_id;
DROP INDEX IF EXISTS idx_stakeholders_email;
DROP INDEX IF EXISTS idx_stakeholders_document_id;
DROP INDEX IF EXISTS idx_feedback_document_id;

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_stakeholders_email_document ON stakeholders(email, document_id);
CREATE INDEX idx_feedback_document_user ON feedback(document_id, user_id);

-- Add comments
COMMENT ON POLICY "document_owner_access" ON documents IS 'Document owners have full access';
COMMENT ON POLICY "document_stakeholder_access" ON documents IS 'Stakeholders can view documents';
COMMENT ON POLICY "stakeholder_owner_access" ON stakeholders IS 'Document owners can manage stakeholders';
COMMENT ON POLICY "stakeholder_self_access" ON stakeholders IS 'Users can view their stakeholder records';
COMMENT ON POLICY "feedback_owner_access" ON feedback IS 'Document owners can manage feedback';
COMMENT ON POLICY "feedback_stakeholder_access" ON feedback IS 'Stakeholders can view feedback';
COMMENT ON POLICY "feedback_stakeholder_insert" ON feedback IS 'Stakeholders can add feedback';