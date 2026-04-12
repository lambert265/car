-- Fix verification codes table - Add delete policy
-- Run this in Supabase SQL Editor

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow delete verification codes" ON verification_codes;

-- Add policy to allow deleting verification codes
CREATE POLICY "Allow delete verification codes" ON verification_codes
  FOR DELETE
  USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'verification_codes';
