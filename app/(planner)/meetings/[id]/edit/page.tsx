import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingByIdFromDb } from "@/lib/meetings-postgres";
export const dynamic = "force-dynamic";
export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meetingId = Number(id);
  if (!Number.isInteger(meetingId) || meetingId < 1) notFound();
  const meeting = await getMeetingByIdFromDb(meetingId);
  if (!meeting) notFound();
  return <main><h1 className="mb-6 text-3xl font-bold">Edit Meeting</h1><MeetingForm meeting={meeting} /></main>;
}
