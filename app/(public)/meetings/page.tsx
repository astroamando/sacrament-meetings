import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getPaginatedMeetings } from "@/lib/meetings-postgres";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query.trim() : "";
  const requested = Number(params.page || "1");
  const page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;

  const { meetings, currentPage, totalPages } =
    await getPaginatedMeetings(query, page);

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold">Sacrament Meetings</h1>
      <Suspense fallback={<p>Loading search...</p>}>
        <MeetingSearch />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {meetings.length === 0 && <p>No meetings found.</p>}

      <Suspense fallback={null}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
