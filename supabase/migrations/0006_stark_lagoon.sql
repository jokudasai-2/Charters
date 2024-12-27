/*
  # Fix document and profile relationship

  1. Changes
    - Add foreign key relationship between documents.user_id and profiles.id
    - Update query structure for profile joins
  
  2. Security
    - Maintains existing RLS policies
*/

-- Add foreign key relationship
ALTER TABLE documents
ADD CONSTRAINT fk_documents_profiles
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE CASCADE;

-- Update the documents table to use profiles relationship
COMMENT ON COLUMN documents.user_id IS 'References the profile ID of the document owner';