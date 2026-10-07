import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-xl bg-slate-100 p-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          Sacrament Meeting Planner
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Plan and review sacrament meeting agendas, announcements,
          hymns, prayers, speakers, and musical numbers.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/meetings"
            className="rounded-md bg-slate-800 px-6 py-3 font-medium text-white hover:bg-slate-700"
          >
            View All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-md border border-slate-800 px-6 py-3 font-medium text-slate-800 hover:bg-slate-200"
          >
            Current Meeting
          </Link>
        </div>
      </section>
    </main>
  );
}