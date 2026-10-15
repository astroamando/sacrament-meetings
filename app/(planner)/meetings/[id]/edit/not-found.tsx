import Link from "next/link";
export default function EditMeetingNotFound() {
  return <main><h1 className="text-2xl font-bold">Meeting not found</h1><Link href="/meetings">Back to meetings</Link></main>;
}
