-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new view with document owner information
CREATE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.email,
  s.role,
  s.department,
  s.document_id,
  d.title as document_title,
  d.status as document_status,
  d.user_id as owner_id,
  d.created_at as document_created_at,
  s.created_at as last_active,
  p.first_name,
  p.last_name
FROM stakeholders s
LEFT JOIN documents d ON s.document_id = d.id
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_lookup 
ON stakeholders(document_id, email);

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with document and profile details';