export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <h1 className="text-2xl font-bold">Sacrament Meeting Planner</h1>
        <p className="mt-1 text-slate-200">Provo Ward</p>
        <p className="mt-1 text-sm text-slate-300">{currentDate}</p>
      </div>
    </header>
  );
}