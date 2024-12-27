-- Add policy for users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Add policy for users to read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Add policy for users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Add helpful comments
COMMENT ON POLICY "Users can insert their own profile" ON profiles IS 'Allow users to create their own profile';
COMMENT ON POLICY "Users can read their own profile" ON profiles IS 'Allow users to read their own profile';
COMMENT ON POLICY "Users can update their own profile" ON profiles IS 'Allow users to update their own profile';