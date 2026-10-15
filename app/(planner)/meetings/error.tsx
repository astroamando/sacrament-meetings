"use client";
export default function MeetingsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main role="alert"><h1 className="text-2xl font-bold">Unable to load meetings</h1><p>Something went wrong. Please try again.</p><button className="rounded border p-2" onClick={() => reset()}>Try again</button></main>;
}
