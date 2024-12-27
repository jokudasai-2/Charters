-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create new view with proper document relationships
CREATE VIEW stakeholder_profiles AS
WITH stakeholder_docs AS (
  SELECT 
    s.id as stakeholder_id,
    s.email,
    s.role,
    s.department,
    s.created_at as last_active,
    d.id as document_id,
    d.title as document_title,
    d.status as document_status,
    d.created_at as document_created_at,
    d.user_id as document_owner_id,
    p.first_name,
    p.last_name,
    ROW_NUMBER() OVER (PARTITION BY s.email ORDER BY s.created_at DESC) as rn
  FROM stakeholders s
  LEFT JOIN auth.users u ON s.email = u.email
  LEFT JOIN profiles p ON u.id = p.id
  LEFT JOIN documents d ON s.document_id = d.id
)
SELECT 
  stakeholder_id,
  email,
  role,
  department,
  first_name,
  last_name,
  document_id,
  document_title,
  document_status,
  document_owner_id,
  document_created_at,
  last_active
FROM stakeholder_docs;

-- Grant access to the view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stakeholders_email_document 
ON stakeholders(email, document_id);

CREATE INDEX IF NOT EXISTS idx_stakeholders_document_owner 
ON stakeholders(document_id);

-- Add helpful comment
COMMENT ON VIEW stakeholder_profiles IS 'Provides stakeholder information with document relationships';