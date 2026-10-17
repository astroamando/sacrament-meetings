import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function AuthControls() {
  const session = await auth();

  if (!session?.user) {
    return <Link href="/login" className="text-blue-700 underline">Sign in</Link>;
  }

  return (
    <form action={async () => {
      "use server";
      await signOut({ redirectTo: "/login" });
    }}>
      <button type="submit" className="rounded bg-slate-800 px-4 py-2 text-white">
        Sign out
      </button>
    </form>
  );
}
