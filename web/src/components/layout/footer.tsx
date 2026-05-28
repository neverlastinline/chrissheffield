export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>
          Built with Next.js 15, Supabase &amp; shadcn/ui. Not affiliated with
          the AFL.
        </p>
        <p>© {new Date().getFullYear()} Footy Feud</p>
      </div>
    </footer>
  );
}
