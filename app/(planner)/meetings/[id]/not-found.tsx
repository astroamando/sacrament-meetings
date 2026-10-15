import Link from "next/link";
export default function MeetingNotFound() {
  return <main><h1 className="text-2xl font-bold">Meeting not found</h1><p>This meeting does not exist.</p><Link href="/meetings">Back to meetings</Link></main>;
}
