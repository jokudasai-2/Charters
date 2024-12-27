/*
  # Fix stakeholders RLS policies

  1. Changes
    - Add RLS policies for stakeholders table to allow:
      - Document owners to manage stakeholders
      - Stakeholders to view other stakeholders
      - Users to view documents they are stakeholders of

  2. Security
    - Add policies for insert, select, and delete operations
    - Ensure document owners have full control
    - Allow stakeholders to view other stakeholders
*/

-- Policy for document owners to manage stakeholders
CREATE POLICY "Document owners can manage stakeholders"
  ON stakeholders
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Policy for document owners to add stakeholders
CREATE POLICY "Document owners can add stakeholders"
  ON stakeholders
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Policy for stakeholders to view other stakeholders
CREATE POLICY "Stakeholders can view other stakeholders"
  ON stakeholders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders s
      WHERE s.document_id = stakeholders.document_id
      AND s.email = auth.jwt()->>'email'
    )
  );