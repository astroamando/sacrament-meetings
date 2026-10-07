import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const meetings = getMeetings();
  const date = request.nextUrl.searchParams.get("date");

  if (date) {
    const filteredMeetings = meetings.filter(
      (meeting) => meeting.date === date
    );

    return NextResponse.json(filteredMeetings);
  }

  return NextResponse.json(meetings);
}