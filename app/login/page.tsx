import type { Metadata } from "next";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Sacrament Meeting Planner",
  description: "Sign in to manage sacrament meeting schedules.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Bishopric Login</h1>
      {error && <p className="mb-4 text-red-700">Invalid email or password.</p>}
      <form
        action={async (formData: FormData) => {
          "use server";
          try {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/meetings",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              redirect("/login?error=credentials");
            }
            throw error;
          }
        }}
        className="space-y-4"
      >
        <label className="block">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block">
          Password
          <input name="password" type="password" required className="mt-1 w-full rounded border p-2" />
        </label>
        <button type="submit" className="rounded bg-blue-700 px-5 py-2 text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
