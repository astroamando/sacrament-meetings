"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingFormState } from "@/lib/actions";
import { createMeeting, updateMeeting } from "@/lib/actions";

const initialState: MeetingFormState = { message: "" };

export default function MeetingForm({ meeting }: { meeting?: SacramentMeeting }) {
  const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;
  const [state, formAction, pending] = useActionState(action, initialState);
  const fields = [
    { name: "date", label: "Meeting date", type: "date", value: meeting?.date ?? "" },
    { name: "presiding", label: "Presiding", value: meeting?.presiding ?? "" },
    { name: "conducting", label: "Conducting", value: meeting?.conducting ?? "" },
    { name: "openingPrayer", label: "Opening prayer", value: meeting?.openingPrayer ?? "" },
    { name: "openingHymnNumber", label: "Opening hymn number", type: "number", value: meeting?.openingHymn.number ?? "" },
    { name: "openingHymnTitle", label: "Opening hymn title", value: meeting?.openingHymn.title ?? "" },
    { name: "sacramentHymnNumber", label: "Sacrament hymn number", type: "number", value: meeting?.sacramentHymn.number ?? "" },
    { name: "sacramentHymnTitle", label: "Sacrament hymn title", value: meeting?.sacramentHymn.title ?? "" },
    { name: "closingHymnNumber", label: "Closing hymn number", type: "number", value: meeting?.closingHymn.number ?? "" },
    { name: "closingHymnTitle", label: "Closing hymn title", value: meeting?.closingHymn.title ?? "" },
    { name: "closingPrayer", label: "Closing prayer", value: meeting?.closingPrayer ?? "" },
  ];
  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-4">
      <div aria-live="polite" role="status" className="text-red-700">{state.message}</div>
      <div>
        <label htmlFor="meetingType" className="block font-semibold">Meeting type</label>
        <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? "regular"} className="w-full rounded border p-2">
          <option value="regular">Regular</option><option value="testimony">Testimony</option><option value="stake">Stake</option><option value="general">General conference</option>
        </select>
      </div>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block font-semibold">{field.label}</label>
          <input id={field.name} name={field.name} type={field.type ?? "text"} defaultValue={field.value} required
            min={field.type === "number" ? 1 : undefined}
            aria-invalid={Boolean(state.errors?.[field.name])}
            aria-describedby={state.errors?.[field.name] ? `${field.name}-error` : undefined}
            className="w-full rounded border p-2" />
          {state.errors?.[field.name] && <p id={`${field.name}-error`} className="text-red-700">{state.errors[field.name].join(", ")}</p>}
        </div>
      ))}
      <div><label htmlFor="announcements" className="block font-semibold">Announcements (one per line)</label>
        <textarea id="announcements" name="announcements" defaultValue={meeting?.announcements?.join("\n") ?? ""} className="w-full rounded border p-2" /></div>
      <div><label htmlFor="wardBusiness" className="block font-semibold">Ward business (one per line)</label>
        <textarea id="wardBusiness" name="wardBusiness" defaultValue={meeting?.wardBusiness.map(item => item.description).join("\n") ?? ""} className="w-full rounded border p-2" /></div>
      <div><label htmlFor="speakers" className="block font-semibold">Speaker names (one per line)</label>
        <textarea id="speakers" name="speakers" defaultValue={meeting?.speakers.map(item => item.name).join("\n") ?? ""} className="w-full rounded border p-2" /></div>
      <label className="flex gap-2"><input type="checkbox" name="stakeBusiness" defaultChecked={meeting?.stakeBusiness ?? false} />Stake business</label>
      <button disabled={pending} type="submit" className="rounded bg-blue-700 px-5 py-3 text-white disabled:opacity-50">{pending ? "Saving..." : meeting ? "Save changes" : "Create meeting"}</button>
    </form>
  );
}
