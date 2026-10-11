import { NextResponse } from "next/server";
import { getMeetingByIdFromDb } from "@/lib/meetings-postgres";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return NextResponse.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

  const meeting = await getMeetingByIdFromDb(meetingId);
  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
