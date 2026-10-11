import { NextRequest, NextResponse } from "next/server";
import { getMeetingsFromDb } from "@/lib/meetings-postgres";

export async function GET(request: NextRequest) {
  const meetings = await getMeetingsFromDb();
  const params = request.nextUrl.searchParams;
  const date = params.get("date");
  const search = params.get("search")?.toLowerCase().trim();
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 10);

  if (!Number.isInteger(page) || page < 1 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: "Invalid pagination" }, { status: 400 });
  }

  const filtered = meetings.filter((meeting) =>
    (!date || meeting.date === date) &&
    (!search || JSON.stringify(meeting).toLowerCase().includes(search))
  );

  return NextResponse.json(filtered.slice((page - 1) * limit, page * limit));
}
