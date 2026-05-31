import { sections, closing, guideMeta } from "@/lib/guide-data.mjs";

type Section = {
  heading: string;
  body: string[];
  bullets?: string[];
  callout?: { label: string; body: string };
  template?: { label: string; text: string };
};

function Callout({ label, body }: { label: string; body: string }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border border-claude-line bg-claude-card">
      <div className="border-l-4 border-claude-coral px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-claude-coraldark">
          {label}
        </p>
        <p className="mt-1.5 leading-relaxed text-claude-ink">{body}</p>
      </div>
    </div>
  );
}

function Template({ label, text }: { label: string; text: string }) {
  return (
    <div className="my-5 rounded-xl bg-claude-dark px-5 py-4">
      <p className="text-xs font-bold uppercase tracking-wider text-claude-coral">
        {label}
      </p>
      <pre className="mt-2 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-claude-cream">
        {text}
      </pre>
    </div>
  );
}

/** Renders the full guide content on the unlocked /success page. */
export function GuideContent() {
  return (
    <article className="max-w-none">
      <header className="mb-10 border-b border-claude-line pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-claude-ink sm:text-4xl">
          {guideMeta.title}
        </h1>
        <p className="mt-2 text-lg text-claude-coraldark">
          {guideMeta.subtitle}
        </p>
      </header>

      <div className="space-y-12">
        {(sections as Section[]).map((section, i) => (
          <section key={section.heading}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-claude-coral text-sm font-bold text-white">
                {i + 1}
              </span>
              <h2 className="text-xl font-semibold text-claude-ink sm:text-2xl">
                {section.heading}
              </h2>
            </div>
            <div className="mt-1 h-[3px] w-11 rounded-full bg-claude-coral" />

            <div className="mt-4 space-y-3">
              {section.body.map((p, j) => (
                <p key={j} className="leading-relaxed text-claude-ink/90">
                  {p}
                </p>
              ))}
            </div>

            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-claude-ink/90">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-claude-coral" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.callout && (
              <Callout
                label={section.callout.label}
                body={section.callout.body}
              />
            )}
            {section.template && (
              <Template
                label={section.template.label}
                text={section.template.text}
              />
            )}
          </section>
        ))}
      </div>

      <div className="mt-12">
        <Callout label="Final word" body={closing} />
      </div>
    </article>
  );
}
