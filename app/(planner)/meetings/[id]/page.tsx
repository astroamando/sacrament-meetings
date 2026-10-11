import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingByIdFromDb } from "@/lib/meetings-postgres";

export const dynamic = "force-dynamic";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) notFound();

  const meeting = await getMeetingByIdFromDb(meetingId);
  if (!meeting) notFound();

  return <MeetingDetail meeting={meeting} />;
}
