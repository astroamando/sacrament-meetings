import { Client } from "pg";
import { getMeetings } from "./lib/meetings-db";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    for (const meeting of getMeetings()) {
      await client.query(
        `INSERT INTO meetings (id, date, data)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE
         SET date = EXCLUDED.date, data = EXCLUDED.data`,
        [meeting.id, meeting.date, JSON.stringify(meeting)]
      );
    }

    const result = await client.query(
      "SELECT COUNT(*) AS total FROM meetings"
    );

    console.log("MEETINGS IMPORTED:", result.rows[0].total);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("IMPORT FAILED:", error.message);
  process.exitCode = 1;
});
