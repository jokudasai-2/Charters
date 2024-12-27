/*
  # Fix stakeholder policies to prevent recursion

  1. Changes
    - Drop existing problematic policies
    - Create new consolidated policy for stakeholders
    - Simplify access control logic

  2. Security
    - Maintain same security model but with more efficient implementation
    - Prevent infinite recursion in policy evaluation
*/

-- Drop existing policies to replace them
DROP POLICY IF EXISTS "Document owners can manage stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "Document owners can add stakeholders" ON stakeholders;
DROP POLICY IF EXISTS "Stakeholders can view other stakeholders" ON stakeholders;

-- Create new consolidated policy for all operations
CREATE POLICY "Stakeholder access control"
  ON stakeholders
  USING (
    -- Document owners have full access
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
    OR
    -- Users can see documents they are stakeholders of
    (auth.jwt()->>'email' = stakeholders.email)
  );

-- Specific insert policy
CREATE POLICY "Stakeholder insert control"
  ON stakeholders
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );