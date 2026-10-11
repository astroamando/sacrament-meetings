import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { getMeetingsFromDb } from "@/lib/meetings-postgres";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = (params.search || "").trim();
  const requestedPage = Number(params.page || "1");
  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage : 1;

  const meetings = await getMeetingsFromDb();
  const filtered = meetings.filter((meeting) =>
    JSON.stringify(meeting).toLowerCase().includes(search.toLowerCase())
  );

  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageUrl = (number: number) =>
    `/meetings?search=${encodeURIComponent(search)}&page=${number}`;

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold">Sacrament Meetings</h1>
      <form action="/meetings" className="mb-6 flex gap-2">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search meetings"
          aria-label="Search meetings"
          className="rounded border p-2"
        />
        <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
          Search
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {visible.length === 0 && <p>No meetings found.</p>}

      <nav className="mt-6 flex items-center gap-4" aria-label="Pagination">
        {currentPage > 1 && <Link href={pageUrl(currentPage - 1)}>Previous</Link>}
        <span>Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <Link href={pageUrl(currentPage + 1)}>Next</Link>}
      </nav>
    </main>
  );
}
