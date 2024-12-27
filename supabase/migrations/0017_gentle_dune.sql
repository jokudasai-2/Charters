/*
  # Add department field to stakeholders

  1. Changes
    - Drop existing triggers that cause conflicts
    - Add department field to stakeholders table
    - Add check constraint for valid departments
    - Backfill existing records with default department
    - Make department field required

  2. Security
    - No changes to existing policies
*/

-- First, drop the problematic triggers if they exist
DROP TRIGGER IF EXISTS refresh_document_access_documents ON documents;
DROP TRIGGER IF EXISTS refresh_document_access_stakeholders ON stakeholders;
DROP FUNCTION IF EXISTS refresh_document_access();

-- Add department field
ALTER TABLE stakeholders
ADD COLUMN IF NOT EXISTS department text;

-- Add check constraint for valid departments
DO $$ BEGIN
  ALTER TABLE stakeholders
  ADD CONSTRAINT valid_department CHECK (
    department IN (
      'Sales',
      'Customer Success',
      'Onboarding',
      'HR Consulting',
      'Legal',
      'Marketing',
      'Design',
      'Engineering',
      'Product'
    )
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Backfill existing records with 'Engineering' as default
UPDATE stakeholders
SET department = 'Engineering'
WHERE department IS NULL;

-- Make department required
ALTER TABLE stakeholders
ALTER COLUMN department SET NOT NULL;