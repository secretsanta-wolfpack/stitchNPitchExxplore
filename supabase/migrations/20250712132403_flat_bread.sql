/*
  # Create elite_winners table

  1. New Tables
    - `elite_winners`
      - `id` (uuid, primary key)
      - `guide_id` (integer, references guide data)
      - `name` (text, guide name)
      - `department` (text, guide department)
      - `supervisor` (text, guide supervisor)
      - `timestamp` (timestamptz, original win timestamp)
      - `elite_timestamp` (timestamptz, elite win timestamp)
      - `chat_ids` (text[], original chat IDs)
      - `elite_chat_ids` (text[], elite chat IDs)
      - `created_at` (timestamptz, record creation time)

  2. Security
    - Enable RLS on `elite_winners` table
    - Add policies for public access (customize for production)

  3. Performance
    - Add indexes for common queries
*/

CREATE TABLE IF NOT EXISTS elite_winners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id integer NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  supervisor text NOT NULL,
  timestamp timestamptz NOT NULL,
  elite_timestamp timestamptz NOT NULL,
  chat_ids text[] DEFAULT '{}',
  elite_chat_ids text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE elite_winners ENABLE ROW LEVEL SECURITY;

-- Policies for public access (adjust based on your security needs)
CREATE POLICY "Anyone can view elite winners"
  ON elite_winners
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can add elite winners"
  ON elite_winners
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete elite winners"
  ON elite_winners
  FOR DELETE
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX elite_winners_created_at_idx ON elite_winners (created_at DESC);
CREATE INDEX elite_winners_department_idx ON elite_winners (department);
CREATE INDEX elite_winners_elite_timestamp_idx ON elite_winners (elite_timestamp DESC);