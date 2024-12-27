-- Drop existing trigger
DROP TRIGGER IF EXISTS validate_document_status_update ON documents;
DROP FUNCTION IF EXISTS validate_document_status_update();

-- Create simplified status validation function
CREATE OR REPLACE FUNCTION validate_document_status_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Only validate status changes
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  -- Only allow transitions from pending_review to approved/rejected
  IF OLD.status = 'pending_review' AND NEW.status IN ('approved', 'rejected') THEN
    -- Verify user is a stakeholder
    IF EXISTS (
      SELECT 1 FROM stakeholders
      WHERE document_id = NEW.id
      AND email = auth.jwt()->>'email'
    ) THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'Only stakeholders can approve or reject documents';
    END IF;
  ELSE
    RAISE EXCEPTION 'Invalid status transition';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER validate_document_status_update
  BEFORE UPDATE OF status ON documents
  FOR EACH ROW
  EXECUTE FUNCTION validate_document_status_update();