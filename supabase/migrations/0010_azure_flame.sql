/*
  # Fix infinite recursion in policies

  1. Changes
    - Simplify document and stakeholder policies
    - Optimize queries to prevent recursion
    - Add materialized view for faster access

  2. Security
    - Maintain RLS security
    - Prevent policy recursion
    - Optimize query performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Document read access" ON documents;
DROP POLICY IF EXISTS "Document write access" ON documents;
DROP POLICY IF EXISTS "Document update access" ON documents;
DROP POLICY IF EXISTS "Stakeholder read access" ON stakeholders;
DROP POLICY IF EXISTS "Stakeholder write access" ON stakeholders;
DROP POLICY IF EXISTS "Stakeholder delete access" ON stakeholders;

-- Create materialized view for document access
CREATE MATERIALIZED VIEW document_access AS
SELECT DISTINCT
  d.id as document_id,
  d.user_id as owner_id,
  s.email as stakeholder_email
FROM documents d
LEFT JOIN stakeholders s ON d.id = s.document_id;

CREATE INDEX idx_document_access_owner ON document_access(owner_id);
CREATE INDEX idx_document_access_email ON document_access(stakeholder_email);

GRANT SELECT ON document_access TO authenticated;

-- Simplified document policies
CREATE POLICY "Documents base access"
  ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM document_access
      WHERE document_id = documents.id
      AND (owner_id = auth.uid() OR stakeholder_email = auth.jwt()->>'email')
    )
  );

CREATE POLICY "Documents owner write"
  ON documents
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Documents owner update"
  ON documents
  FOR UPDATE
  USING (user_id = auth.uid());

-- Simplified stakeholder policies
CREATE POLICY "Stakeholders base access"
  ON stakeholders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM document_access
      WHERE document_id = stakeholders.document_id
      AND (owner_id = auth.uid() OR stakeholder_email = auth.jwt()->>'email')
    )
  );

CREATE POLICY "Stakeholders owner write"
  ON stakeholders
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE id = document_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Stakeholders owner delete"
  ON stakeholders
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE id = document_id
      AND user_id = auth.uid()
    )
  );

-- Function to refresh document access
CREATE OR REPLACE FUNCTION refresh_document_access()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY document_access;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers to keep materialized view updated
CREATE TRIGGER refresh_document_access_documents
  AFTER INSERT OR UPDATE OR DELETE ON documents
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_document_access();

CREATE TRIGGER refresh_document_access_stakeholders
  AFTER INSERT OR UPDATE OR DELETE ON stakeholders
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_document_access();

-- Initial refresh
REFRESH MATERIALIZED VIEW document_access;

COMMENT ON MATERIALIZED VIEW document_access IS 'Provides optimized access control information for documents and stakeholders';