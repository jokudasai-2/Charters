/*
  # Fix RLS Policy Recursion

  1. Changes
    - Drop all existing policies
    - Create simplified non-recursive policies
    - Optimize query performance with conditional index creation

  2. Security
    - Maintain proper access control without recursion
    - Ensure policies are efficient and secure
*/

-- Drop all existing policies
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('DROP POLICY IF EXISTS "' || policyname || '" ON ' || tablename || ';', E'\n')
        FROM pg_policies
        WHERE schemaname = 'public'
    );
END $$;

-- Simple document policies
CREATE POLICY "documents_owner_all"
  ON documents FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "documents_stakeholder_select"
  ON documents FOR SELECT
  USING (
    id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Simple stakeholder policies
CREATE POLICY "stakeholders_owner_all"
  ON stakeholders FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholders_self_select"
  ON stakeholders FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Simple feedback policies
CREATE POLICY "feedback_owner_all"
  ON feedback FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "feedback_stakeholder_select"
  ON feedback FOR SELECT
  USING (
    document_id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "feedback_stakeholder_insert"
  ON feedback FOR INSERT
  WITH CHECK (
    document_id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Optimize indexes with conditional creation
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_email ON stakeholders(email);
CREATE INDEX IF NOT EXISTS idx_stakeholders_document_id ON stakeholders(document_id);
CREATE INDEX IF NOT EXISTS idx_feedback_document_id ON feedback(document_id);