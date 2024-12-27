-- Drop existing policies
DROP POLICY IF EXISTS "document_access" ON documents;
DROP POLICY IF EXISTS "stakeholder_select" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_insert" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_update" ON stakeholders;
DROP POLICY IF EXISTS "stakeholder_delete" ON stakeholders;
DROP POLICY IF EXISTS "feedback_select" ON feedback;
DROP POLICY IF EXISTS "feedback_insert" ON feedback;
DROP POLICY IF EXISTS "feedback_update" ON feedback;
DROP POLICY IF EXISTS "feedback_delete" ON feedback;

-- Ensure tables exist with proper structure
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  problem_statement text,
  target_user text,
  business_case text,
  risks text,
  use_cases text,
  status document_status DEFAULT 'draft',
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stakeholders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents ON DELETE CASCADE,
  email text NOT NULL,
  role stakeholder_role DEFAULT 'contributor',
  department text NOT NULL,
  type text DEFAULT 'email',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users,
  content text NOT NULL,
  type text CHECK (type IN ('general', 'technical', 'business', 'legal')),
  conviction text CHECK (conviction IN ('high', 'low')),
  status text CHECK (status IN ('pending', 'heard', 'actioned')),
  resolution_notes text,
  created_at timestamptz DEFAULT now()
);

-- Create new policies
CREATE POLICY "document_owner_access"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "document_stakeholder_access"
  ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "stakeholder_owner_access"
  ON stakeholders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = stakeholders.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholder_self_access"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

CREATE POLICY "feedback_owner_access"
  ON feedback
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = feedback.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "feedback_stakeholder_access"
  ON feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "feedback_stakeholder_insert"
  ON feedback
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stakeholders
      WHERE stakeholders.document_id = feedback.document_id
      AND stakeholders.email = auth.jwt()->>'email'
    )
  );

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_id ON stakeholders(document_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_email ON stakeholders(email);
CREATE INDEX IF NOT EXISTS idx_feedback_document_id ON feedback(document_id);

-- Add helpful comments
COMMENT ON POLICY "document_owner_access" ON documents IS 'Document owners have full access';
COMMENT ON POLICY "document_stakeholder_access" ON documents IS 'Stakeholders can view documents';
COMMENT ON POLICY "stakeholder_owner_access" ON stakeholders IS 'Document owners can manage stakeholders';
COMMENT ON POLICY "stakeholder_self_access" ON stakeholders IS 'Users can view their stakeholder records';
COMMENT ON POLICY "feedback_owner_access" ON feedback IS 'Document owners can manage feedback';
COMMENT ON POLICY "feedback_stakeholder_access" ON feedback IS 'Stakeholders can view feedback';
COMMENT ON POLICY "feedback_stakeholder_insert" ON feedback IS 'Stakeholders can add feedback';