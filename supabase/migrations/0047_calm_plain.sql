-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new view with proper profile relationship
CREATE VIEW stakeholder_profiles AS
SELECT 
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
  p.last_name
FROM stakeholders s
LEFT JOIN documents d ON s.document_id = d.id
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_email_lookup 
ON stakeholders(email);

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with profile details';