import { redirect } from "next/navigation";
import { getMeetingsFromDb } from "@/lib/meetings-postgres";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const meetings = await getMeetingsFromDb();
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const currentMeeting = meetings
    .filter((meeting) => new Date(`${meeting.date}T12:00:00`) <= today)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  redirect(currentMeeting ? `/meetings/${currentMeeting.id}` : "/meetings");
}
