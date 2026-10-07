"use client";

import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-lg bg-white p-6 shadow-md print:shadow-none">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-lg text-slate-600">{formattedDate}</p>

        <p className="mt-1 capitalize text-slate-500">
          Meeting Type: {meeting.meetingType}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Leadership
          </h2>
          <p className="mt-2">Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </section>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              Announcements
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Opening
          </h2>
          <p className="mt-2">
            Opening Hymn #{meeting.openingHymn.number}:{" "}
            {meeting.openingHymn.title}
          </p>
          <p>Opening Prayer: {meeting.openingPrayer}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-slate-500">No ward business.</p>
          )}

          <p className="mt-2">
            Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Sacrament
          </h2>
          <p className="mt-2">
            Sacrament Hymn #{meeting.sacramentHymn.number}:{" "}
            {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Program
          </h2>

          <ul className="mt-2 space-y-3">
            {meeting.speakers.map((item, index) => (
              <li key={index} className="border-l-4 border-slate-300 pl-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-slate-600">{item.topic}</p>
                <p className="text-sm capitalize text-slate-500">
                  {item.type.replace("-", " ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800">
            Closing
          </h2>
          <p className="mt-2">
            Closing Hymn #{meeting.closingHymn.number}:{" "}
            {meeting.closingHymn.title}
          </p>
          <p>Closing Prayer: {meeting.closingPrayer}</p>
        </section>
      </div>

      <div className="mt-8 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-slate-800 px-5 py-2 font-medium text-white hover:bg-slate-700"
        >
          Print Program
        </button>
      </div>
    </article>
  );
}