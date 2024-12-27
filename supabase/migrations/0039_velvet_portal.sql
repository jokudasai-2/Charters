/*
  # Update Stakeholder Profiles View

  1. Changes
    - Drop existing view to avoid column rename issues
    - Recreate view with correct columns
    - Add proper indexes and grants
*/

-- First drop the existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create view with correct columns
CREATE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.email,
  s.document_id,
  s.role,
  s.department,
  p.id as profile_id,
  p.first_name,
  p.last_name,
  s.created_at
FROM stakeholders s
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder profile information with department';