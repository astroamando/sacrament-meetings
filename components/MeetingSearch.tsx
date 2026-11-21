"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const next = new URLSearchParams(params.toString());
    next.set("page", "1");

    if (term.trim()) next.set("query", term.trim());
    else next.delete("query");

    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }, 300);

  return (
    <input
      key={params.get("query") || ""}
      defaultValue={params.get("query") || ""}
      onChange={e => handleSearch(e.target.value)}
      placeholder="Search meetings"
      aria-label="Search meetings"
      className="mb-6 w-full rounded border p-3"
    />
  );
}
