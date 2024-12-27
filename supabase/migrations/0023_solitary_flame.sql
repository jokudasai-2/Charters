/*
  # Email Queue Security Update
  
  1. Changes
    - Add RLS policies for email_queue table
    - Enable authenticated users to insert into email queue
    - Restrict access to email queue records
    
  2. Security
    - Only authenticated users can add to queue
    - Users can only view their own email records
*/

-- Enable RLS on email_queue if not already enabled
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert into email queue
CREATE POLICY "allow_authenticated_insert_email_queue"
  ON email_queue
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to view their own email records
CREATE POLICY "allow_view_own_email_queue"
  ON email_queue
  FOR SELECT
  TO authenticated
  USING (to_address = auth.jwt()->>'email');

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_email_queue_to_address 
  ON email_queue(to_address);

COMMENT ON POLICY "allow_authenticated_insert_email_queue" ON email_queue IS 
  'Allows authenticated users to add emails to the queue';
COMMENT ON POLICY "allow_view_own_email_queue" ON email_queue IS 
  'Users can only view their own email records';