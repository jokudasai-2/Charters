-- Create stakeholder approvals table
CREATE TABLE stakeholder_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents ON DELETE CASCADE,
  stakeholder_id uuid REFERENCES stakeholders ON DELETE CASCADE,
  has_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(document_id, stakeholder_id)
);

-- Enable RLS
ALTER TABLE stakeholder_approvals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "stakeholder_approvals_select"
  ON stakeholder_approvals
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = stakeholder_approvals.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "stakeholder_approvals_insert"
  ON stakeholder_approvals
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.id = stakeholder_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "stakeholder_approvals_update"
  ON stakeholder_approvals
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.id = stakeholder_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Create indexes
CREATE INDEX idx_stakeholder_approvals_document ON stakeholder_approvals(document_id);
CREATE INDEX idx_stakeholder_approvals_stakeholder ON stakeholder_approvals(stakeholder_id);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_stakeholder_approval_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stakeholder_approval_timestamp
  BEFORE UPDATE ON stakeholder_approvals
  FOR EACH ROW
  EXECUTE FUNCTION update_stakeholder_approval_timestamp();

-- Add helpful comments
COMMENT ON TABLE stakeholder_approvals IS 'Tracks individual stakeholder approvals for documents';
COMMENT ON COLUMN stakeholder_approvals.has_approved IS 'Whether the stakeholder has approved the document';