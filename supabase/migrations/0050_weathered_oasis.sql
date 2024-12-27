/*
  # Fix stakeholder profiles permissions

  1. Changes
    - Drop materialized view and recreate as regular view
    - Add proper RLS policies
    - Fix permission issues
*/

-- Drop existing materialized view and related objects
DROP MATERIALIZED VIEW IF EXISTS stakeholder_profiles;
DROP TRIGGER IF EXISTS refresh_stakeholder_profiles_insert ON stakeholders;
DROP TRIGGER IF EXISTS refresh_stakeholder_profiles_update ON stakeholders;
DROP TRIGGER IF EXISTS refresh_stakeholder_profiles_delete ON stakeholders;
DROP FUNCTION IF EXISTS refresh_stakeholder_profiles();

-- Create as regular view instead
CREATE OR REPLACE VIEW stakeholder_profiles AS
SELECT DISTINCT ON (s.id)
  s.id as stakeholder_id,
  s.email,
  s.role,
  s.department,
  s.document_id,
  d.title as document_title,
  d.status as document_status,
  d.created_at as document_created_at,
  s.created_at as last_active,
  p.first_name,
  p.last_name,
  d.user_id as owner_id
FROM stakeholders s
LEFT JOIN documents d ON s.document_id = d.id
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id
WHERE EXISTS (
  SELECT 1 FROM documents doc
  WHERE doc.id = s.document_id
  AND (
    -- Document owner can see all stakeholders
    doc.user_id = auth.uid()
    OR
    -- Stakeholders can see other stakeholders in same document
    EXISTS (
      SELECT 1 FROM stakeholders s2
      WHERE s2.document_id = doc.id
      AND s2.email = auth.jwt()->>'email'
    )
  )
)
ORDER BY s.id, s.created_at DESC;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with proper access control';