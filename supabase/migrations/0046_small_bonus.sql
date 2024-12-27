-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create foreign key relationship between stakeholders and profiles
ALTER TABLE stakeholders
ADD COLUMN profile_id uuid REFERENCES profiles(id);

-- Update profile_id based on email matches
UPDATE stakeholders s
SET profile_id = p.id
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE s.email = u.email;

-- Create new view with direct profile relationship
CREATE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.email,
  s.role,
  s.department,
  s.profile_id,
  p.first_name,
  p.last_name,
  d.id as document_id,
  d.title as document_title,
  d.status as document_status,
  d.created_at as document_created_at,
  s.created_at as last_active
FROM stakeholders s
LEFT JOIN profiles p ON s.profile_id = p.id
LEFT JOIN documents d ON s.document_id = d.id;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_profile_id 
ON stakeholders(profile_id);

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with direct profile relationship';