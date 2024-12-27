-- Drop and recreate stakeholder approvals table with proper constraints
DROP TABLE IF EXISTS stakeholder_approvals CASCADE;

CREATE TABLE stakeholder_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents ON DELETE CASCADE,
  stakeholder_id uuid NOT NULL REFERENCES stakeholders ON DELETE CASCADE,
  has_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT stakeholder_approvals_unique UNIQUE(document_id, stakeholder_id)
);

-- Create trigger to enforce stakeholder belongs to document
CREATE OR REPLACE FUNCTION validate_stakeholder_document()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM stakeholders
    WHERE stakeholders.id = NEW.stakeholder_id
    AND stakeholders.document_id = NEW.document_id
  ) THEN
    RAISE EXCEPTION 'Stakeholder must belong to the document';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_stakeholder_document
  BEFORE INSERT OR UPDATE ON stakeholder_approvals
  FOR EACH ROW
  EXECUTE FUNCTION validate_stakeholder_document();

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
    OR
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholder_approvals.document_id
      AND documents.user_id = auth.uid()
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
CREATE INDEX idx_stakeholder_approvals_lookup 
  ON stakeholder_approvals(document_id, stakeholder_id);

-- Add trigger for updated_at
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