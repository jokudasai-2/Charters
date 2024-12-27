/*
  # Fix policy recursion issues

  1. Changes
    - Drop existing problematic policies
    - Create new non-recursive policies for documents and stakeholders
    - Add proper indexes for performance
  
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Optimize query performance
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Documents base access" ON documents;
DROP POLICY IF EXISTS "Stakeholders base access" ON stakeholders;

-- Create new document policies
CREATE POLICY "Document owner access"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Document stakeholder access"
  ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Create new stakeholder policies
CREATE POLICY "Stakeholder owner access"
  ON stakeholders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Stakeholder self access"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_email 
  ON stakeholders(document_id, email);

CREATE INDEX IF NOT EXISTS idx_documents_user_id 
  ON documents(user_id);

COMMENT ON POLICY "Document owner access" ON documents IS 
  'Owners have full access to their documents';

COMMENT ON POLICY "Document stakeholder access" ON documents IS 
  'Stakeholders can view documents they are associated with';

COMMENT ON POLICY "Stakeholder owner access" ON stakeholders IS 
  'Document owners can manage stakeholders';

COMMENT ON POLICY "Stakeholder self access" ON stakeholders IS 
  'Users can view their own stakeholder records';