/*
  # Initial Schema Setup for Charters Application

  1. New Tables
    - `documents` - Stores charter documents
    - `stakeholders` - Manages stakeholder relationships
    - `feedback` - Stores feedback on charters
    - `email_templates` - Manages email notification templates
    - `email_queue` - Handles email delivery queue

  2. Security
    - Enable RLS on all tables
    - Add policies for document access
    - Add policies for feedback management
    - Add policies for stakeholder management

  3. Types
    - `document_status` - Status of charter documents
    - `stakeholder_role` - Role types for stakeholders
*/

-- Create custom types
CREATE TYPE document_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected');
CREATE TYPE stakeholder_role AS ENUM ('owner', 'contributor', 'leadership');

-- Create documents table
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

-- Create stakeholders table
CREATE TABLE IF NOT EXISTS stakeholders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents ON DELETE CASCADE,
  type text NOT NULL,
  email text NOT NULL,
  role stakeholder_role DEFAULT 'contributor',
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users,
  content text NOT NULL,
  type text CHECK (type IN ('general', 'technical', 'business', 'legal')),
  conviction text CHECK (conviction IN ('high', 'low')),
  status text CHECK (status IN ('pending', 'heard', 'actioned')),
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create email_queue table
CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_address text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  attempts int DEFAULT 0,
  status text DEFAULT 'pending',
  error text,
  created_at timestamptz DEFAULT now(),
  next_attempt_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view relevant feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = feedback.document_id
      AND (documents.user_id = auth.uid() OR feedback.user_id = auth.uid())
    )
  );

-- Create indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_feedback_document_id ON feedback(document_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_stakeholders_email ON stakeholders(email);
CREATE INDEX idx_stakeholders_document_id ON stakeholders(document_id);