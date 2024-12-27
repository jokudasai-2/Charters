/*
  # Update Stakeholder Profiles View

  1. Changes
    - Drop existing view
    - Create new view with simplified columns
    - Add document count aggregation
*/

-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new simplified view
CREATE VIEW stakeholder_profiles AS
SELECT 
  s.id as stakeholder_id,
  s.department,
  p.first_name,
  p.last_name,
  s.created_at,
  COUNT(DISTINCT s.document_id) as document_count
FROM stakeholders s
LEFT JOIN auth.users u ON s.email = u.email
LEFT JOIN profiles p ON u.id = p.id
GROUP BY s.id, s.department, p.first_name, p.last_name, s.created_at;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides aggregated stakeholder information with document count';