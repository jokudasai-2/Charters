/*
  # Fix feedback RLS policies

  1. Changes
    - Add RLS policies for feedback table to allow:
      - Document owners to manage all feedback
      - Stakeholders to add and view feedback
      - Users to manage their own feedback

  2. Security
    - Enable RLS on feedback table
    - Add policies for insert, select, and update operations
*/

-- Policy for document owners to manage all feedback
CREATE POLICY "Document owners can manage all feedback"
  ON feedback
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = feedback.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Policy for stakeholders to add and view feedback
CREATE POLICY "Stakeholders can add and view feedback"
  ON feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Stakeholders can add feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Policy for users to manage their own feedback
CREATE POLICY "Users can manage their own feedback"
  ON feedback
  USING (
    auth.uid() = user_id
  );