import MeetingForm from "@/components/MeetingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewMeetingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Create Meeting</h1>
      <MeetingForm />
    </main>
  );
}
