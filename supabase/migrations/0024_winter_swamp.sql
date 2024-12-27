/*
  # Add stakeholder approval capabilities
  
  1. Changes
    - Add policy to allow stakeholders to update document status
    - Add trigger to enforce valid status transitions
*/

-- Create function to validate status updates
CREATE OR REPLACE FUNCTION validate_document_status_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow status changes
  IF OLD.* IS NOT DISTINCT FROM NEW.* THEN
    RETURN NEW;
  END IF;

  IF (TG_OP = 'UPDATE') THEN
    -- Ensure only status is being changed
    IF NEW.title != OLD.title OR 
       NEW.description != OLD.description OR
       NEW.problem_statement != OLD.problem_statement OR
       NEW.target_user != OLD.target_user OR
       NEW.business_case != OLD.business_case OR
       NEW.risks != OLD.risks OR
       NEW.use_cases != OLD.use_cases OR
       NEW.user_id != OLD.user_id THEN
      RAISE EXCEPTION 'Only status field can be updated by stakeholders';
    END IF;

    -- Validate status transition
    IF OLD.status = 'pending_review' AND NEW.status IN ('approved', 'rejected') THEN
      -- Check if user is a stakeholder
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
      RAISE EXCEPTION 'Invalid status transition. Documents can only be approved or rejected when in pending_review status';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for status validation
DROP TRIGGER IF EXISTS validate_document_status_update ON documents;
CREATE TRIGGER validate_document_status_update
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION validate_document_status_update();

-- Add policy for stakeholders to update document status
CREATE POLICY "stakeholder_status_update"
  ON documents
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Add helpful comment
COMMENT ON POLICY "stakeholder_status_update" ON documents IS 
  'Allows stakeholders to update document status. Status transitions are enforced by trigger.';