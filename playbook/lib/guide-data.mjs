// Canonical content for "The Claude Opus 4.8 Playbook".
// This single source of truth is rendered on the unlocked web page (lib/content.tsx)
// AND used to generate the downloadable PDF (scripts/generate-pdf.mjs).
//
// ✏️  EDIT THIS FILE to replace the starter content with your real expertise,
//     then run `npm run pdf` to regenerate content/guide.pdf.

export const guideMeta = {
  title: "The Claude Opus 4.8 Playbook",
  subtitle: "Get production-quality work out of Anthropic's most capable model",
  author: "Chris Sheffield",
  priceLabel: "$1.99",
  tagline:
    "A no-fluff field guide to coding with Claude Opus 4.8 (claude-opus-4-8) — how to prompt it, run agentic loops, use thinking and prompt caching, and ship real software faster than you thought possible.",
};

export const sections = [
  {
    heading: "1. Why Opus 4.8 changes how you work",
    body: [
      "Claude Opus 4.8 is the most capable model in the Claude 4.x family — the one you reach for when the task is genuinely hard: multi-file refactors, debugging across an unfamiliar codebase, or designing an architecture from a vague brief. It holds far more context coherently than older models, so you can hand it a whole problem instead of spoon-feeding snippets.",
      "The shift in mindset: stop using it like autocomplete and start using it like a senior engineer you delegate to. Your leverage comes from framing the problem and reviewing the result — not from typing. Opus 4.8 is fast enough (especially in Claude Code's fast mode) that a tight delegate-review loop beats writing the code yourself on anything non-trivial.",
    ],
    bullets: [
      "Use Opus 4.8 for the hard 20% — reasoning, architecture, gnarly bugs.",
      "Reach for a smaller, cheaper model (Haiku/Sonnet) for bulk, simple, or high-volume edits.",
      "Give it the whole problem and a clear definition of done, then get out of the way.",
    ],
  },
  {
    heading: "2. Pick the right model for the job",
    body: [
      "The Claude 4.x family is a toolbox, not a single hammer. Knowing the model IDs and their sweet spots saves you both money and latency.",
    ],
    bullets: [
      "Opus 4.8 — `claude-opus-4-8`: deepest reasoning, best for architecture, hard debugging, and long agentic runs.",
      "Sonnet 4.6 — `claude-sonnet-4-6`: the balanced default for everyday coding and good price/performance.",
      "Haiku 4.5 — `claude-haiku-4-5-20251001`: fast and cheap for high-volume, well-scoped edits.",
      "Rule of thumb: prototype the workflow on Opus, then drop to the cheapest model that still passes your tests.",
    ],
  },
  {
    heading: "3. Prompting Opus 4.8 so it nails it first try",
    body: [
      "Opus 4.8 rewards clear intent and punishes vagueness less than older models — but the patterns below still convert intent into reliable output. Treat them as reusable templates.",
    ],
    bullets: [
      "Plan-then-build: ask for a plan, approve it, then have it execute. Catches bad assumptions before they become code.",
      "Point at real files ('match the style of lib/stripe.ts') instead of describing conventions in prose.",
      "State the definition of done up front — including the edge cases you care about.",
      "Constrain the surface ('only touch these files') so the diff stays reviewable.",
      "Ask for the test alongside the feature; it forces the model to pin down behaviour.",
    ],
  },
  {
    heading: "4. Use thinking for the hard problems",
    body: [
      "Extended thinking lets Opus 4.8 reason through a problem before it answers — and it's the single biggest quality lever on hard tasks. Turn it on for architecture decisions, subtle bugs, math, and anything where a wrong first step cascades.",
      "But thinking costs tokens and latency, so don't leave it cranked for trivial edits. Match the thinking budget to the difficulty of the task.",
    ],
    bullets: [
      "High thinking: architecture, root-causing a heisenbug, security-sensitive logic.",
      "Low / no thinking: renames, boilerplate, mechanical edits.",
      "Ask it to explain a failure before fixing it — the reasoning surfaces the real cause.",
    ],
  },
  {
    heading: "5. Prompt caching: the cost lever everyone misses",
    body: [
      "When you build on the Claude API, prompt caching is how you make Opus 4.8 affordable at scale. Cache the stable prefix of your prompt — system instructions, tool definitions, long reference docs, the codebase context — and you pay full price once, then a fraction on every subsequent call that reuses it.",
      "In agentic loops where the same large context is sent on every turn, caching routinely cuts cost and latency dramatically. Structure your prompts so the unchanging part comes first and the variable part (the user's latest message) comes last.",
    ],
    bullets: [
      "Put stable content (system prompt, tools, docs) at the front; mark it as a cache breakpoint.",
      "Keep the per-turn variable content at the end so the cached prefix stays identical.",
      "Watch your cache-hit rate — a low rate usually means your prefix is changing when it shouldn't.",
    ],
  },
  {
    heading: "6. Agentic loops and tool use",
    body: [
      "Opus 4.8 shines in agentic setups — give it tools (read files, run commands, search) and a goal, and it'll work through multi-step tasks autonomously. The art is in the guardrails: clear tools, a clear stopping condition, and a human reviewing the diff.",
    ],
    bullets: [
      "Give tools precise descriptions — the model picks tools off the description, not the name.",
      "Let it run small, verifiable steps; review the diff, not the chat transcript.",
      "Always run the code. 'It compiles' is not 'it works'.",
      "Be extra careful with anything touching money, auth, or data deletion — verify by hand.",
    ],
  },
  {
    heading: "7. Your first 48 hours with Opus 4.8",
    body: [
      "Theory is cheap. Here's a sequence that takes you from idea to a live, paid product in a weekend — using Opus 4.8 as your engineering partner.",
    ],
    bullets: [
      "Hour 0–2: Pick ONE feature someone would pay for. Have Opus write the definition of done.",
      "Hour 2–6: Have it scaffold the app and get a deployed URL live (ugly is fine).",
      "Hour 6–12: Build the one feature end-to-end with tests, plan-then-build.",
      "Hour 12–16: Add hosted checkout (Stripe) and gate the value behind payment.",
      "Hour 16–20: Polish the landing page; have Opus draft your launch posts.",
      "Hour 20+: Ship it. Post to one community. Talk to your first user.",
    ],
  },
];

export const closing =
  "That's the playbook. Opus 4.8 is the most capable coding partner you've ever had — but the people who win with it aren't the ones with the cleverest prompts. They're the ones who delegate clearly, review with discipline, and actually ship. Now go build something and charge for it.";
