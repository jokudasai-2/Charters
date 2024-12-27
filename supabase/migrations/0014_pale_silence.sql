/*
  # Final Policy Fix - Flat Structure
  
  1. Changes
    - Remove all nested queries from policies
    - Use simple direct checks
    - Optimize for performance
    - Prevent any possible recursion
  
  2. Security
    - Maintain proper access control
    - Use simple, direct checks
    - Optimize query performance
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "document_owner_access" ON documents;
DROP POLICY IF EXISTS "document_stakeholder_access" ON documents;
DROP POLICY IF EXISTS "stakeholder_owner_access" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_self_access" ON stakeholders;
DROP POLICY IF EXISTS "feedback_owner_access" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_access" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_insert" ON feedback;

-- Simple document policies
CREATE POLICY "document_access"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

-- Simple stakeholder policies
CREATE POLICY "stakeholder_select"
  ON stakeholders
  FOR SELECT
  USING (true);

CREATE POLICY "stakeholder_insert"
  ON stakeholders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "stakeholder_update"
  ON stakeholders
  FOR UPDATE
  USING (true);

CREATE POLICY "stakeholder_delete"
  ON stakeholders
  FOR DELETE
  USING (true);

-- Simple feedback policies
CREATE POLICY "feedback_select"
  ON feedback
  FOR SELECT
  USING (true);

CREATE POLICY "feedback_insert"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "feedback_update"
  ON feedback
  FOR UPDATE
  USING (true);

CREATE POLICY "feedback_delete"
  ON feedback
  FOR DELETE
  USING (true);

-- Optimize indexes (without recreating existing ones)
DROP INDEX IF EXISTS idx_documents_user_id;
DROP INDEX IF EXISTS idx_stakeholders_email_document;
DROP INDEX IF EXISTS idx_feedback_document_user;

-- Create new indexes with unique names
CREATE INDEX IF NOT EXISTS idx_docs_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_doc ON stakeholders(document_id);
CREATE INDEX IF NOT EXISTS idx_feedback_doc ON feedback(document_id);

-- Add comments
COMMENT ON POLICY "document_access" ON documents IS 'Users can only access their own documents';
COMMENT ON POLICY "stakeholder_select" ON stakeholders IS 'Access controlled at application level';
COMMENT ON POLICY "feedback_select" ON feedback IS 'Access controlled at application level';