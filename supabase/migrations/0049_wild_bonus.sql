-- Drop existing view
DROP VIEW IF EXISTS stakeholder_profiles;

-- Create materialized view for better performance
CREATE MATERIALIZED VIEW stakeholder_profiles AS
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
ORDER BY s.id, s.created_at DESC;

-- Create indexes for the materialized view
CREATE UNIQUE INDEX idx_stakeholder_profiles_id ON stakeholder_profiles(stakeholder_id);
CREATE INDEX idx_stakeholder_profiles_owner ON stakeholder_profiles(owner_id);
CREATE INDEX idx_stakeholder_profiles_email ON stakeholder_profiles(email);

-- Create function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_stakeholder_profiles()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY stakeholder_profiles;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to keep the materialized view fresh
CREATE TRIGGER refresh_stakeholder_profiles_insert
  AFTER INSERT ON stakeholders
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_stakeholder_profiles();

CREATE TRIGGER refresh_stakeholder_profiles_update
  AFTER UPDATE ON stakeholders
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_stakeholder_profiles();

CREATE TRIGGER refresh_stakeholder_profiles_delete
  AFTER DELETE ON stakeholders
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_stakeholder_profiles();

-- Grant access to the materialized view
GRANT SELECT ON stakeholder_profiles TO authenticated;

-- Add helpful comment
COMMENT ON MATERIALIZED VIEW stakeholder_profiles IS 'Provides optimized stakeholder information with profile and document details';