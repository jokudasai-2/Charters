-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_document_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_document_timestamp ON documents;
CREATE TRIGGER update_document_timestamp
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_document_timestamp();

-- Add helpful comment
COMMENT ON FUNCTION update_document_timestamp() IS 'Updates document timestamp on any modification';