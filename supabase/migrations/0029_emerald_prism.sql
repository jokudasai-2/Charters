-- Create function to handle approval atomically
CREATE OR REPLACE FUNCTION record_stakeholder_approval(
  p_document_id uuid,
  p_email text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_stakeholder_id uuid;
BEGIN
  -- Get stakeholder ID with lock
  SELECT id INTO v_stakeholder_id
  FROM stakeholders
  WHERE document_id = p_document_id
  AND email = p_email
  FOR UPDATE;

  IF v_stakeholder_id IS NULL THEN
    RAISE EXCEPTION 'Stakeholder not found';
  END IF;

  -- Insert or update approval atomically
  INSERT INTO stakeholder_approvals (
    document_id,
    stakeholder_id,
    has_approved
  ) VALUES (
    p_document_id,
    v_stakeholder_id,
    true
  )
  ON CONFLICT (document_id, stakeholder_id) 
  DO UPDATE SET
    has_approved = true,
    updated_at = now();
END;
$$;