import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const meetings = getMeetings();

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const currentMeeting = [...meetings]
    .filter((meeting) => {
      const meetingDate = new Date(`${meeting.date}T12:00:00`);
      return meetingDate <= today;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}