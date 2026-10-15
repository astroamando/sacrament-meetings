import { pool } from "./postgres";
import type { SacramentMeeting } from "./types";

export async function getMeetingsFromDb(): Promise<SacramentMeeting[]> {
  const result = await pool.query(
    "SELECT data FROM meetings ORDER BY date DESC"
  );
  return result.rows.map((row) => row.data as SacramentMeeting);
}

export async function getMeetingByIdFromDb(
  id: number
): Promise<SacramentMeeting | undefined> {
  const result = await pool.query(
    "SELECT data FROM meetings WHERE id = $1",
    [id]
  );
  return result.rows[0]?.data as SacramentMeeting | undefined;
}

export async function createMeetingInDb(
  meeting: Omit<SacramentMeeting, "id">
): Promise<number> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO meetings (date, data)
       VALUES ($1, $2::jsonb)
       RETURNING id`,
      [meeting.date, JSON.stringify(meeting)]
    );
    const id = Number(result.rows[0].id);
    await client.query(
      `UPDATE meetings
       SET data = jsonb_set(data, '{id}', to_jsonb($1::integer))
       WHERE id = $1`,
      [id]
    );
    await client.query("COMMIT");
    return id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateMeetingInDb(
  id: number,
  meeting: Omit<SacramentMeeting, "id">
): Promise<boolean> {
  const result = await pool.query(
    `UPDATE meetings
     SET date = $2, data = $3::jsonb
     WHERE id = $1`,
    [id, meeting.date, JSON.stringify({ ...meeting, id })]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function deleteMeetingFromDb(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM meetings WHERE id = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
