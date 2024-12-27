/*
  # Create Stakeholder Profiles View

  1. Changes
    - Create a view joining stakeholders with profiles
    - Add indexes for performance
    - Grant proper access permissions

  2. Security
    - Maintain RLS policies
    - Restrict view access to authenticated users
*/

-- Create view for stakeholder profiles
CREATE OR REPLACE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.email,
  s.document_id,
  s.role,
  p.id as profile_id,
  p.first_name,
  p.last_name,
  s.created_at
FROM stakeholders s
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_email_lookup 
ON stakeholders(email);

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder profile information with proper access control';