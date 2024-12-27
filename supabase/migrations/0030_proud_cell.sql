-- Create function to check if all stakeholders have approved
CREATE OR REPLACE FUNCTION check_all_stakeholders_approved(doc_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_stakeholders integer;
  total_approvals integer;
BEGIN
  -- Get total number of stakeholders (excluding owner)
  SELECT COUNT(*) INTO total_stakeholders
  FROM stakeholders
  WHERE document_id = doc_id;

  -- Get total number of approvals
  SELECT COUNT(*) INTO total_approvals
  FROM stakeholder_approvals
  WHERE document_id = doc_id
  AND has_approved = true;

  -- Return true if all stakeholders have approved
  RETURN total_stakeholders > 0 AND total_stakeholders = total_approvals;
END;
$$;

-- Create function to update document status on approval
CREATE OR REPLACE FUNCTION update_document_status_on_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is a new approval or update to true
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.has_approved = true))
  AND check_all_stakeholders_approved(NEW.document_id) THEN
    -- Update document status to approved
    UPDATE documents
    SET status = 'approved'
    WHERE id = NEW.document_id
    AND status = 'pending_review';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-approval
DROP TRIGGER IF EXISTS auto_approve_document ON stakeholder_approvals;
CREATE TRIGGER auto_approve_document
  AFTER INSERT OR UPDATE ON stakeholder_approvals
  FOR EACH ROW
  EXECUTE FUNCTION update_document_status_on_approval();

-- Add helpful comments
COMMENT ON FUNCTION check_all_stakeholders_approved(uuid) IS 'Checks if all stakeholders have approved a document';
COMMENT ON FUNCTION update_document_status_on_approval() IS 'Updates document status when all stakeholders approve';