-- Drop existing function and trigger
DROP TRIGGER IF EXISTS auto_approve_document ON stakeholder_approvals;
DROP FUNCTION IF EXISTS check_all_stakeholders_approved(uuid);
DROP FUNCTION IF EXISTS update_document_status_on_approval();

-- Create improved function to check approvals (excluding owner)
CREATE OR REPLACE FUNCTION check_all_stakeholders_approved(doc_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_stakeholders integer;
  total_approvals integer;
  doc_owner_email text;
BEGIN
  -- Get document owner's email
  SELECT auth.email() INTO doc_owner_email
  FROM documents
  WHERE id = doc_id;

  -- Get total number of stakeholders (excluding owner)
  SELECT COUNT(*) INTO total_stakeholders
  FROM stakeholders
  WHERE document_id = doc_id
  AND email != doc_owner_email;

  -- Get total number of approvals (excluding owner)
  SELECT COUNT(*) INTO total_approvals
  FROM stakeholder_approvals sa
  JOIN stakeholders s ON s.id = sa.stakeholder_id
  WHERE sa.document_id = doc_id
  AND sa.has_approved = true
  AND s.email != doc_owner_email;

  -- Return true if all non-owner stakeholders have approved
  RETURN total_stakeholders > 0 AND total_stakeholders = total_approvals;
END;
$$;

-- Create improved status update function
CREATE OR REPLACE FUNCTION update_document_status_on_approval()
RETURNS TRIGGER AS $$
DECLARE
  doc_owner_email text;
BEGIN
  -- Get document owner's email
  SELECT auth.email() INTO doc_owner_email
  FROM documents
  WHERE id = NEW.document_id;

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

-- Recreate trigger for auto-approval
CREATE TRIGGER auto_approve_document
  AFTER INSERT OR UPDATE ON stakeholder_approvals
  FOR EACH ROW
  EXECUTE FUNCTION update_document_status_on_approval();

-- Add helpful comments
COMMENT ON FUNCTION check_all_stakeholders_approved(uuid) IS 'Checks if all non-owner stakeholders have approved a document';
COMMENT ON FUNCTION update_document_status_on_approval() IS 'Updates document status when all non-owner stakeholders approve';