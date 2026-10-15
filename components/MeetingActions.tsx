import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
export default function MeetingActions({ id }: { id: number }) {
  return <div className="my-4 flex items-center gap-4">
    <Link href={`/meetings/${id}/edit`} className="rounded border px-4 py-2">Edit meeting</Link>
    <form action={deleteMeeting.bind(null, id)}><button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">Delete meeting</button></form>
  </div>;
}
