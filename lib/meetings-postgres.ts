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
