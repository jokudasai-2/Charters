/*
  # Add section column to feedback table

  1. Changes
    - Add section column to feedback table
    - Add check constraint for valid sections
    - Add index for performance

  2. Security
    - No changes to RLS policies needed
*/

-- Add section column
ALTER TABLE feedback
ADD COLUMN section text;

-- Add check constraint for valid sections
ALTER TABLE feedback
ADD CONSTRAINT valid_feedback_section CHECK (
  section IN (
    'description',
    'problem statement',
    'target user',
    'business case',
    'risks',
    'use cases'
  )
);

-- Add index for performance
CREATE INDEX idx_feedback_document_section 
ON feedback(document_id, section);

-- Add helpful comment
COMMENT ON COLUMN feedback.section IS 'The charter section this feedback relates to';