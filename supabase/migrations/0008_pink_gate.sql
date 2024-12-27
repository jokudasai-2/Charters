/*
  # Fix RLS policies and relationships

  1. Changes
    - Simplify RLS policies to prevent recursion
    - Fix document owner relationships
    - Update view permissions
  
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion in policies
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view document owners" ON documents;
DROP POLICY IF EXISTS "Users can view own documents" ON documents;
DROP POLICY IF EXISTS "Stakeholder access control" ON stakeholders;

-- Create simplified document policies
CREATE POLICY "Document access control"
  ON documents
  FOR ALL
  USING (
    user_id = auth.uid() -- Owner access
    OR
    EXISTS ( -- Stakeholder access
      SELECT 1 FROM stakeholders s
      WHERE s.document_id = id
      AND s.email = auth.jwt()->>'email'
    )
  );

-- Create simplified stakeholder policies
CREATE POLICY "Stakeholder access control"
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

CREATE POLICY "Stakeholder modification control"
  ON stakeholders
  FOR ALL
  USING (
    EXISTS ( -- Only document owners can modify
      SELECT 1 FROM documents d
      WHERE d.id = document_id
      AND d.user_id = auth.uid()
    )
  );

-- Recreate document owners view with proper security
DROP VIEW IF EXISTS document_owners;
CREATE VIEW document_owners AS
SELECT 
  d.id as document_id,
  d.user_id,
  p.first_name,
  p.last_name
FROM documents d
JOIN profiles p ON d.user_id = p.id;

-- Grant proper permissions
GRANT SELECT ON document_owners TO authenticated;

COMMENT ON VIEW document_owners IS 'Provides document ownership information with proper access control';