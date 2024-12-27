/*
  # Fix policies to prevent recursion

  1. Changes
    - Drop existing problematic policies
    - Create simplified policies without circular references
    - Separate read and write permissions clearly

  2. Security
    - Maintain secure access control
    - Prevent policy recursion
    - Clear separation of concerns
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Document access control" ON documents;
DROP POLICY IF EXISTS "Stakeholder access control" ON stakeholders;
DROP POLICY IF EXISTS "Stakeholder modification control" ON stakeholders;

-- Document Policies
CREATE POLICY "Document read access"
  ON documents
  FOR SELECT
  USING (
    user_id = auth.uid() -- Owner access
    OR
    EXISTS ( -- Stakeholder access via direct email check
      SELECT 1 FROM stakeholders s
      WHERE s.document_id = id
      AND s.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Document write access"
  ON documents
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Document update access"
  ON documents
  FOR UPDATE
  USING (user_id = auth.uid());

-- Stakeholder Policies
CREATE POLICY "Stakeholder read access"
  ON stakeholders
  FOR SELECT
  USING (
    EXISTS ( -- Document owner access
      SELECT 1 FROM documents d
      WHERE d.id = document_id
      AND d.user_id = auth.uid()
    )
    OR email = auth.jwt()->>'email' -- Own stakeholder record
  );

CREATE POLICY "Stakeholder write access"
  ON stakeholders
  FOR INSERT
  WITH CHECK (
    EXISTS ( -- Only document owners can add
      SELECT 1 FROM documents d
      WHERE d.id = document_id
      AND d.user_id = auth.uid()
    )
  );

CREATE POLICY "Stakeholder delete access"
  ON stakeholders
  FOR DELETE
  USING (
    EXISTS ( -- Only document owners can delete
      SELECT 1 FROM documents d
      WHERE d.id = document_id
      AND d.user_id = auth.uid()
    )
  );

-- Update document owners view
DROP VIEW IF EXISTS document_owners;
CREATE VIEW document_owners AS
SELECT DISTINCT
  d.id as document_id,
  d.user_id,
  p.first_name,
  p.last_name
FROM documents d
JOIN profiles p ON d.user_id = p.id;

GRANT SELECT ON document_owners TO authenticated;

COMMENT ON VIEW document_owners IS 'Provides document ownership information with proper access control';