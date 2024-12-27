/*
  # Simplified Access Control Policies

  1. Changes
    - Drop all existing policies
    - Create new simplified policies for documents, stakeholders, and feedback
    - Add proper indexes and comments

  2. Security
    - Document owners have full access to their documents
    - Stakeholders can view documents they're part of
    - Document owners can manage stakeholders
    - Users can view their own stakeholder records
    - Document owners can manage feedback
    - Stakeholders can view and add feedback
*/

-- First, drop ALL existing policies to ensure clean slate
DO $$ 
BEGIN
  -- Drop document policies
  DROP POLICY IF EXISTS "document_owner_access" ON documents;
  DROP POLICY IF EXISTS "document_stakeholder_access" ON documents;
  DROP POLICY IF EXISTS "users_own_documents" ON documents;
  DROP POLICY IF EXISTS "stakeholders_view_documents" ON documents;
  
  -- Drop stakeholder policies
  DROP POLICY IF EXISTS "stakeholder_owner_access" ON stakeholders;
  DROP POLICY IF EXISTS "stakeholder_self_access" ON stakeholders;
  DROP POLICY IF EXISTS "owners_manage_stakeholders" ON stakeholders;
  DROP POLICY IF EXISTS "users_view_own_stakeholder_records" ON stakeholders;
  
  -- Drop feedback policies
  DROP POLICY IF EXISTS "feedback_owner_access" ON feedback;
  DROP POLICY IF EXISTS "feedback_stakeholder_access" ON feedback;
  DROP POLICY IF EXISTS "feedback_stakeholder_insert" ON feedback;
  DROP POLICY IF EXISTS "owners_manage_feedback" ON feedback;
  DROP POLICY IF EXISTS "stakeholders_view_feedback" ON feedback;
  DROP POLICY IF EXISTS "stakeholders_add_feedback" ON feedback;
END $$;

-- Document policies (simplified)
CREATE POLICY "doc_owner_access"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "doc_stakeholder_view"
  ON documents
  FOR SELECT
  USING (
    id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Stakeholder policies (simplified)
CREATE POLICY "stakeholder_owner_manage"
  ON stakeholders
  FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholder_self_view"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Feedback policies (simplified)
CREATE POLICY "feedback_owner_manage"
  ON feedback
  FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "feedback_stakeholder_view"
  ON feedback
  FOR SELECT
  USING (
    document_id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "feedback_stakeholder_create"
  ON feedback
  FOR INSERT
  WITH CHECK (
    document_id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Add helpful comments
COMMENT ON POLICY "doc_owner_access" ON documents IS 'Users have full access to their own documents';
COMMENT ON POLICY "doc_stakeholder_view" ON documents IS 'Stakeholders can view documents they are part of';
COMMENT ON POLICY "stakeholder_owner_manage" ON stakeholders IS 'Document owners can manage stakeholders';
COMMENT ON POLICY "stakeholder_self_view" ON stakeholders IS 'Users can view their own stakeholder records';
COMMENT ON POLICY "feedback_owner_manage" ON feedback IS 'Document owners can manage feedback';
COMMENT ON POLICY "feedback_stakeholder_view" ON feedback IS 'Stakeholders can view feedback';
COMMENT ON POLICY "feedback_stakeholder_create" ON feedback IS 'Stakeholders can add feedback';