import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingByIdFromDb } from "@/lib/meetings-postgres";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Meeting | Sacrament Meeting Planner",
  description: "Edit a sacrament meeting agenda.",
};

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    notFound();
  }

  const meeting = await getMeetingByIdFromDb(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Edit Meeting</h1>
      <MeetingForm meeting={meeting} />
    </main>
  );
}
