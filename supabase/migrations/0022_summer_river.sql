/*
  # Simplified RLS Implementation
  
  1. Changes
    - Drop existing policies
    - Implement simplified RLS without cross-table references
    - Use auth.uid() and auth.jwt()->>'email' directly
    
  2. Security
    - Maintain proper access control
    - Avoid policy recursion
    - Optimize query performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "documents_owner_all" ON documents;
DROP POLICY IF EXISTS "documents_stakeholder_select" ON documents;
DROP POLICY IF EXISTS "stakeholders_owner_all" ON stakeholders;
DROP POLICY IF EXISTS "stakeholders_self_select" ON stakeholders;
DROP POLICY IF EXISTS "feedback_owner_all" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_select" ON feedback;
DROP POLICY IF EXISTS "feedback_stakeholder_insert" ON feedback;

-- Document policies
CREATE POLICY "allow_owner_all_documents"
  ON documents
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Stakeholder policies
CREATE POLICY "allow_owner_all_stakeholders"
  ON stakeholders
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM documents d
      WHERE d.id = document_id
      AND d.user_id = auth.uid()
    )
  );

CREATE POLICY "allow_view_own_stakeholder_records"
  ON stakeholders
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

-- Feedback policies
CREATE POLICY "allow_owner_all_feedback"
  ON feedback
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "allow_stakeholder_add_feedback"
  ON feedback
  AS PERMISSIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM stakeholders s
      WHERE s.document_id = document_id
      AND s.email = auth.jwt()->>'email'
    )
  );

-- Create function to check document access
CREATE OR REPLACE FUNCTION check_document_access(doc_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM documents d
    WHERE d.id = doc_id
    AND (
      d.user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM stakeholders s
        WHERE s.document_id = doc_id
        AND s.email = auth.jwt()->>'email'
      )
    )
  );
END;
$$;

-- Add document access policy using the function
CREATE POLICY "allow_view_accessible_documents"
  ON documents
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (check_document_access(id));

-- Add feedback view policy using the function
CREATE POLICY "allow_view_document_feedback"
  ON feedback
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (check_document_access(document_id));

-- Ensure proper indexes
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_email_doc ON stakeholders(email, document_id);
CREATE INDEX IF NOT EXISTS idx_feedback_doc_user ON feedback(document_id, user_id);