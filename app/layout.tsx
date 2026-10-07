import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLinks from "@/components/NavLinks";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and review sacrament meeting agendas and programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} flex min-h-screen flex-col bg-slate-50 text-slate-900`}>
        <Header />

        <div className="mx-auto w-full max-w-5xl px-6 py-4 print:hidden">
          <NavLinks />
        </div>

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}