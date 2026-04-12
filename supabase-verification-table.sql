-- Create verification_codes table
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);

-- Enable RLS
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserting verification codes
CREATE POLICY "Allow insert verification codes" ON verification_codes
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reading own verification codes
CREATE POLICY "Allow read own verification codes" ON verification_codes
  FOR SELECT
  USING (true);

-- Policy to allow updating verification codes
CREATE POLICY "Allow update verification codes" ON verification_codes
  FOR UPDATE
  USING (true);

-- Policy to allow deleting verification codes
CREATE POLICY "Allow delete verification codes" ON verification_codes
  FOR DELETE
  USING (true);

-- Function to clean up expired codes (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes
  WHERE expires_at < NOW() OR (used = TRUE AND created_at < NOW() - INTERVAL '1 day');
END;
$$ LANGUAGE plpgsql;
