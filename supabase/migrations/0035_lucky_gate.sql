/*
  # Add feedback-profile relationship

  1. Changes
    - Add foreign key constraint between feedback and profiles
    - Update existing feedback records
    - Add index for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add foreign key constraint
ALTER TABLE feedback
ADD CONSTRAINT fk_feedback_profile
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_feedback_user_id 
ON feedback(user_id);

-- Add helpful comment
COMMENT ON CONSTRAINT fk_feedback_profile ON feedback IS 
  'Links feedback to user profiles for author information';