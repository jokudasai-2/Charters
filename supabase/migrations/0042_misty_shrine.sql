-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new view with proper document relationships
CREATE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.document_id,
  s.department,
  s.role,
  p.first_name,
  p.last_name,
  s.created_at as last_active,
  d.title as document_title,
  d.status as document_status
FROM stakeholders s
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN documents d ON s.document_id = d.id;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_lookup 
ON stakeholders(document_id);

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with document relationships';