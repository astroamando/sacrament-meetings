export default function Loading() {
  return (
    <div
      className="rounded-lg bg-slate-100 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-lg font-medium text-slate-700">
        Loading meetings...
      </p>
    </div>
  );
}