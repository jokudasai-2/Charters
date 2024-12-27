/*
  # Update feedback-profile relationship

  1. Changes
    - Drop and recreate constraint safely
    - Add index for performance
*/

DO $$ 
BEGIN
  -- Drop existing constraint if it exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'feedback_user_id_fkey'
    AND table_name = 'feedback'
  ) THEN
    ALTER TABLE feedback DROP CONSTRAINT feedback_user_id_fkey;
  END IF;

  -- Drop fk_feedback_profile if it exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_feedback_profile'
    AND table_name = 'feedback'
  ) THEN
    ALTER TABLE feedback DROP CONSTRAINT fk_feedback_profile;
  END IF;

  -- Add new constraint
  ALTER TABLE feedback
  ADD CONSTRAINT fk_feedback_profile
  FOREIGN KEY (user_id) REFERENCES profiles(id)
  ON DELETE SET NULL;
END $$;

-- Create index if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_feedback_user_id 
ON feedback(user_id);

-- Add helpful comment
COMMENT ON CONSTRAINT fk_feedback_profile ON feedback IS 
  'Links feedback to user profiles for author information';