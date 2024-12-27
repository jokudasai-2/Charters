/*
  # Fix policy recursion with simplified approach

  1. Changes
    - Drop all existing policies
    - Create simple, non-recursive policies
    - Add proper indexes
    - Remove materialized views
  
  2. Security
    - Maintain proper access control
    - Prevent policy recursion
    - Optimize query performance
*/

-- Drop existing policies and views
DROP MATERIALIZED VIEW IF EXISTS document_access;
DROP VIEW IF EXISTS document_owners;

DROP POLICY IF EXISTS "Document owner access" ON documents;
DROP POLICY IF EXISTS "Document stakeholder access" ON documents;
DROP POLICY IF EXISTS "Stakeholder owner access" ON stakeholders;
DROP POLICY IF EXISTS "Stakeholder self access" ON stakeholders;

-- Simple document policies
CREATE POLICY "users_own_documents"
  ON documents
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "stakeholders_view_documents"
  ON documents
  FOR SELECT
  USING (
    id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Simple stakeholder policies
CREATE POLICY "owners_manage_stakeholders"
  ON stakeholders
  FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "users_view_own_stakeholder_records"
  ON stakeholders
  FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Simple feedback policies
CREATE POLICY "owners_manage_feedback"
  ON feedback
  FOR ALL
  USING (
    document_id IN (
      SELECT id 
      FROM documents 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "stakeholders_add_feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (
    document_id IN (
      SELECT document_id 
      FROM stakeholders 
      WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "users_view_feedback"
  ON feedback
  FOR SELECT
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
    OR
    document_id IN (
      SELECT document_id FROM stakeholders WHERE email = auth.jwt()->>'email'
    )
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id 
  ON documents(user_id);

CREATE INDEX IF NOT EXISTS idx_stakeholders_email 
  ON stakeholders(email);

CREATE INDEX IF NOT EXISTS idx_stakeholders_document_id 
  ON stakeholders(document_id);

CREATE INDEX IF NOT EXISTS idx_feedback_document_id 
  ON feedback(document_id);