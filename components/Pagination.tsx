"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const params = useSearchParams();

  function pageUrl(page: number) {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(page));
    return `${pathname}?${next.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center gap-4">
      {currentPage > 1 && (
        <Link className="rounded bg-blue-700 px-4 py-2 text-white" href={pageUrl(currentPage - 1)}>
          Previous
        </Link>
      )}
      <span>Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <Link className="rounded bg-blue-700 px-4 py-2 text-white" href={pageUrl(currentPage + 1)}>
          Next
        </Link>
      )}
    </nav>
  );
}
