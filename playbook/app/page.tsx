import { guideMeta, sections } from "@/lib/guide-data.mjs";
import { BuyButton } from "./buy-button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16 sm:py-24">
      {/* Hero */}
      <section className="text-center">
        <p className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-300">
          Digital guide · Instant access
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {guideMeta.title}
        </h1>
        <p className="mt-4 text-xl text-indigo-300">{guideMeta.subtitle}</p>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-300">
          {guideMeta.tagline}
        </p>
        <div className="mt-10">
          <BuyButton priceLabel={guideMeta.priceLabel} />
        </div>
      </section>

      {/* What's inside */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-semibold text-white">
          What&apos;s inside
        </h2>
        <ul className="mt-8 space-y-4">
          {sections.map((section: { heading: string }) => (
            <li
              key={section.heading}
              className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4"
            >
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-indigo-400" />
              <span className="text-slate-200">{section.heading}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Value prop */}
      <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/10 to-transparent p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Stop planning. Start shipping.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Everything you need to go from idea to a live, paid product this
          weekend — read it on the web and download the PDF to keep.
        </p>
        <div className="mt-8">
          <BuyButton priceLabel={guideMeta.priceLabel} />
        </div>
      </section>

      <footer className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} {guideMeta.author}. One-time purchase ·
          Powered by Stripe.
        </p>
      </footer>
    </main>
  );
}
