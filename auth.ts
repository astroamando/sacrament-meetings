
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.email(),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log("AUTH CHECK: Invalid form data");
          return null;
        }

        const env = process.env;

const email = env["ADMIN_EMAIL"];
const passwordHash = env["ADMIN_PASSWORD_HASH_BASE64"]
  ? Buffer.from(env["ADMIN_PASSWORD_HASH_BASE64"], "base64").toString("utf8")
  : undefined;

        if (!email || !passwordHash) {
          console.log("ADMIN_EMAIL available:", Boolean(email));
          console.log(
            "ADMIN_PASSWORD_HASH available:",
            Boolean(passwordHash)
          );
          console.log("AUTH CHECK: Missing environment variables");
          return null;
        }

        if (
          parsed.data.email.trim().toLowerCase() !==
          email.trim().toLowerCase()
        ) {
          console.log("AUTH CHECK: Email does not match");
          return null;
        }

        const valid = await bcrypt.compare(
          parsed.data.password,
          passwordHash
        );

        if (!valid) {
          console.log("AUTH CHECK: Password does not match");
          return null;
        }

        console.log("AUTH CHECK: Login successful");

        return {
          id: "bishopric-admin",
          email,
          name: "Bishopric Administrator",
        };
      },
    }),
  ],
});
