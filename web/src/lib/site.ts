export const siteConfig = {
  name: "Footy Feud",
  description:
    "The online AFL player-card stat-comparison game. Build your deck, pick a stat, beat the CPU.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  keywords: [
    "AFL",
    "Footy Feud",
    "card game",
    "stat comparison",
    "Top Trumps",
    "Australian Football",
    "Next.js",
    "Supabase",
  ],
  author: "Footy Feud",
} as const;

export type SiteConfig = typeof siteConfig;
