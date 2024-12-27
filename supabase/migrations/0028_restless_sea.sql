/*
  # Fix stakeholder approvals

  1. Changes
    - Add proper handling for stakeholder approvals
    - Ensure no duplicate approvals
    - Add validation functions
    
  2. Security
    - Maintain RLS policies
    - Add validation triggers
*/

-- First clean up any duplicate approvals keeping only the latest
WITH latest_approvals AS (
  SELECT DISTINCT ON (document_id, stakeholder_id) 
    id,
    document_id,
    stakeholder_id,
    has_approved,
    updated_at
  FROM stakeholder_approvals
  ORDER BY document_id, stakeholder_id, updated_at DESC
)
DELETE FROM stakeholder_approvals
WHERE id NOT IN (SELECT id FROM latest_approvals);

-- Create function to validate stakeholder belongs to document
CREATE OR REPLACE FUNCTION validate_stakeholder_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Verify stakeholder exists and belongs to document
  IF NOT EXISTS (
    SELECT 1 FROM stakeholders
    WHERE id = NEW.stakeholder_id
    AND document_id = NEW.document_id
    AND email = auth.jwt()->>'email'
  ) THEN
    RAISE EXCEPTION 'Invalid stakeholder or document';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_stakeholder_approval ON stakeholder_approvals;
CREATE TRIGGER validate_stakeholder_approval
  BEFORE INSERT OR UPDATE ON stakeholder_approvals
  FOR EACH ROW
  EXECUTE FUNCTION validate_stakeholder_approval();

-- Add ON CONFLICT handling to stakeholder_approvals
ALTER TABLE stakeholder_approvals 
DROP CONSTRAINT IF EXISTS stakeholder_approvals_unique,
ADD CONSTRAINT stakeholder_approvals_unique 
  UNIQUE (document_id, stakeholder_id);

-- Add helpful comments
COMMENT ON FUNCTION validate_stakeholder_approval() IS 'Validates stakeholder approval records';
COMMENT ON TRIGGER validate_stakeholder_approval ON stakeholder_approvals IS 'Ensures stakeholder belongs to document';