import type { Metadata } from "next";
import { guideMeta } from "@/lib/guide-data.mjs";
import "./globals.css";

export const metadata: Metadata = {
  title: `${guideMeta.title} — ${guideMeta.subtitle}`,
  description: guideMeta.tagline,
  openGraph: {
    title: `${guideMeta.title} — ${guideMeta.subtitle}`,
    description: guideMeta.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${guideMeta.title} — ${guideMeta.subtitle}`,
    description: guideMeta.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
