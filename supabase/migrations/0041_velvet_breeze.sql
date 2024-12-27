/*
  # Update Stakeholder Profiles View

  1. Changes
    - Drop existing view
    - Create new view that groups by email and department
    - Add proper document count aggregation
    - Use window function correctly with grouping
*/

-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new view that groups by email
CREATE VIEW stakeholder_profiles AS
WITH stakeholder_data AS (
  SELECT 
    s.email,
    s.department,
    p.first_name,
    p.last_name,
    COUNT(DISTINCT s.document_id) as document_count,
    MAX(s.created_at) as last_active,
    FIRST_VALUE(s.id) OVER (
      PARTITION BY s.email 
      ORDER BY s.created_at DESC
    ) as stakeholder_id
  FROM stakeholders s
  LEFT JOIN auth.users u ON s.email = u.email
  LEFT JOIN profiles p ON u.id = p.id
  GROUP BY 
    s.email,
    s.department,
    p.first_name,
    p.last_name,
    s.id,
    s.created_at
)
SELECT DISTINCT
  stakeholder_id,
  email,
  department,
  first_name,
  last_name,
  document_count,
  last_active
FROM stakeholder_data;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides aggregated stakeholder information grouped by email';