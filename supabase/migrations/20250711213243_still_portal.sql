/*
  # Create losers table

  1. New Tables
    - `losers`
      - `id` (uuid, primary key)
      - `guide_id` (integer, references guide data)
      - `name` (text, guide name)
      - `department` (text, guide department)
      - `supervisor` (text, guide supervisor)
      - `timestamp` (timestamptz, when selected)
      - `chat_ids` (text[], chat IDs associated with selection)
      - `created_at` (timestamptz, record creation time)

  2. Security
    - Enable RLS on `losers` table
    - Add policies for public access (SELECT, INSERT, DELETE)

  3. Performance
    - Add indexes for common queries (created_at, department, guide_id, timestamp)
*/

CREATE TABLE IF NOT EXISTS losers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id integer NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  supervisor text NOT NULL,
  timestamp timestamptz NOT NULL,
  chat_ids text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE losers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view losers"
  ON losers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can add losers"
  ON losers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete losers"
  ON losers
  FOR DELETE
  TO public
  USING (true);

-- Performance indexes
CREATE INDEX losers_created_at_idx ON losers (created_at DESC);
CREATE INDEX losers_department_idx ON losers (department);
CREATE INDEX losers_guide_id_idx ON losers (guide_id);
CREATE INDEX losers_timestamp_idx ON losers (timestamp DESC);