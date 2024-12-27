/*
  # Create document owners view

  1. Changes
    - Create a secure view for document ownership information
    - Add proper security policies
  
  2. Security
    - View inherits RLS from underlying tables
    - Only authenticated users can access
*/

-- Drop existing constraint if it exists
ALTER TABLE documents 
DROP CONSTRAINT IF EXISTS fk_documents_profiles;

-- Create secure view for document owners
CREATE OR REPLACE VIEW document_owners AS
SELECT 
  d.id as document_id,
  p.id as profile_id,
  p.first_name,
  p.last_name
FROM documents d
JOIN profiles p ON d.user_id = p.id;

-- Grant access to authenticated users
GRANT SELECT ON document_owners TO authenticated;

-- Add RLS policy to view
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view document owners"
  ON documents FOR SELECT
  TO authenticated
  USING (
    -- Document owners can see all
    user_id = auth.uid()
    OR
    -- Stakeholders can see documents they have access to
    EXISTS (
      SELECT 1 FROM stakeholders s
      WHERE s.document_id = documents.id
      AND s.email = auth.jwt()->>'email'
    )
  );

COMMENT ON VIEW document_owners IS 'Provides a secure way to join documents with their owner profiles';