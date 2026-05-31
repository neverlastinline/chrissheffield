import { sections, closing, guideMeta } from "@/lib/guide-data.mjs";

type Section = {
  heading: string;
  body: string[];
  bullets?: string[];
};

/** Renders the full guide content on the unlocked /success page. */
export function GuideContent() {
  return (
    <article className="prose-invert max-w-none">
      <header className="mb-10 border-b border-white/10 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {guideMeta.title}
        </h1>
        <p className="mt-2 text-lg text-indigo-300">{guideMeta.subtitle}</p>
      </header>

      <div className="space-y-10">
        {(sections as Section[]).map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.body.map((p, i) => (
                <p key={i} className="leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-white/10 pt-8 text-lg font-medium italic text-slate-200">
        {closing}
      </p>
    </article>
  );
}
