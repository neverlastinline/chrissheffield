import { guideMeta, sections } from "@/lib/guide-data.mjs";
import { BuyButton } from "./buy-button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16 sm:py-24">
      {/* Hero */}
      <section className="text-center">
        <p className="mb-4 inline-block rounded-full bg-claude-coral px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {guideMeta.edition ?? "Digital guide"} · Instant access
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-claude-ink sm:text-5xl">
          {guideMeta.title}
        </h1>
        <p className="mt-4 text-xl text-claude-coraldark">
          {guideMeta.subtitle}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-claude-ink/80">
          {guideMeta.tagline}
        </p>
        <div className="mt-10">
          <BuyButton priceLabel={guideMeta.priceLabel} />
        </div>
        {guideMeta.promise && (
          <p className="mx-auto mt-8 max-w-xl text-sm italic text-claude-muted">
            {guideMeta.promise}
          </p>
        )}
      </section>

      {/* What's inside */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-semibold text-claude-ink">
          What&apos;s inside
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {sections.map((section: { heading: string }, i: number) => (
            <li
              key={section.heading}
              className="flex gap-3 rounded-lg border border-claude-line bg-claude-card p-4"
            >
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-claude-coral text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-claude-ink">{section.heading}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Value prop */}
      <section className="mt-16 rounded-2xl border border-claude-line bg-claude-card p-8 text-center">
        <h2 className="text-2xl font-semibold text-claude-ink">
          Stop planning. Start shipping.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-claude-ink/80">
          Everything you need to get senior-engineer output from Claude Opus 4.8
          — read it on the web and download the PDF to keep.
        </p>
        <div className="mt-8">
          <BuyButton priceLabel={guideMeta.priceLabel} />
        </div>
      </section>

      <footer className="mt-20 border-t border-claude-line pt-8 text-center text-sm text-claude-muted">
        <p>
          © {new Date().getFullYear()} {guideMeta.author}. One-time purchase ·
          Powered by Stripe.
        </p>
      </footer>
    </main>
  );
}
