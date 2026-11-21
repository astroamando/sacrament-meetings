import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

function db() {
  return neon(process.env.DATABASE_URL!);
}

export async function getMeetingsFromDb(): Promise<SacramentMeeting[]> {
  const sql = db();
  const rows = await sql`SELECT data FROM meetings ORDER BY date DESC`;
  return rows.map(row => row.data as SacramentMeeting);
}

export async function getMeetingByIdFromDb(id: number): Promise<SacramentMeeting | undefined> {
  const sql = db();
  const rows = await sql`SELECT data FROM meetings WHERE id = ${id}`;
  return rows[0]?.data as SacramentMeeting | undefined;
}

export async function getPaginatedMeetings(query: string, page: number) {
  const sql = db();
  const term = `%${query}%`;

  const counts = await sql`
    SELECT COUNT(*)::int AS total FROM meetings
    WHERE data->>'presiding' ILIKE ${term}
       OR data->>'conducting' ILIKE ${term}
       OR data->>'meetingType' ILIKE ${term}
       OR (data->'speakers')::text ILIKE ${term}
  `;

  const totalPages = Math.max(1, Math.ceil(Number(counts[0].total) / 5));
  const currentPage = Math.min(page, totalPages);

  const rows = await sql`
    SELECT data FROM meetings
    WHERE data->>'presiding' ILIKE ${term}
       OR data->>'conducting' ILIKE ${term}
       OR data->>'meetingType' ILIKE ${term}
       OR (data->'speakers')::text ILIKE ${term}
    ORDER BY date DESC, id DESC
    LIMIT 5 OFFSET ${(currentPage - 1) * 5}
  `;

  return {
    meetings: rows.map(row => row.data as SacramentMeeting),
    totalPages,
    currentPage,
  };
}
