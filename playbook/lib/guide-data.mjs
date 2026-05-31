// Canonical content for "The Claude Opus 4.8 Playbook".
// Single source of truth — rendered on the unlocked web page (lib/content.tsx)
// AND used to generate the downloadable PDF (scripts/generate-pdf.mjs).
//
// ✏️  EDIT THIS FILE to replace the starter content with your real expertise,
//     then run `npm run pdf` to regenerate content/guide.pdf.
//
// Section shape:
//   heading   string
//   body      string[]                      paragraphs
//   bullets?  string[]                       coral-dot list
//   callout?  { label, body }                highlighted tip box
//   template? { label, text }                copy-paste prompt (monospace box)

export const guideMeta = {
  title: "The Claude Opus 4.8 Playbook",
  subtitle: "Get senior-engineer output from Anthropic's most capable model",
  author: "Chris Sheffield",
  priceLabel: "$1.99",
  edition: "2026 Edition",
  tagline:
    "A practical, no-fluff field guide to coding with Claude Opus 4.8 — model selection, prompting patterns, extended thinking, prompt caching, agentic loops, and a copy-paste template library you can use today.",
  promise:
    "By the end you'll know exactly when to reach for Opus 4.8, how to prompt it so it lands the task on the first try, how to keep your token bill low, and how to go from idea to a live, paid product in a single weekend.",
};

export const sections = [
  {
    heading: "Why Opus 4.8 changes how you work",
    body: [
      "Claude Opus 4.8 is the most capable model in the Claude 4.x family — the one you reach for when the task is genuinely hard: multi-file refactors, debugging across an unfamiliar codebase, or turning a vague brief into an architecture. It holds large amounts of context coherently, so you can hand it a whole problem instead of spoon-feeding snippets.",
      "The shift in mindset is the whole game: stop using it like autocomplete and start using it like a senior engineer you delegate to. Your leverage comes from framing the problem and reviewing the result — not from typing. Opus 4.8 is fast enough (especially in Claude Code's fast mode) that a tight delegate-and-review loop beats writing the code yourself on anything non-trivial.",
    ],
    bullets: [
      "Use Opus 4.8 for the hard 20% — reasoning, architecture, gnarly bugs, long agent runs.",
      "Hand it the whole problem plus a clear definition of done, then get out of the way.",
      "Spend your attention on direction and review, where your judgement actually compounds.",
    ],
    callout: {
      label: "The one-line mental model",
      body: "You are the lead engineer. Opus 4.8 is a brilliant, tireless senior who needs a clear brief and an honest code review. Manage it like one.",
    },
  },
  {
    heading: "Pick the right model for the job",
    body: [
      "The Claude 4.x family is a toolbox, not a single hammer. Knowing the model IDs and their sweet spots saves you real money and latency — using Opus for everything is like hiring a principal engineer to rename variables.",
    ],
    bullets: [
      "Opus 4.8 — claude-opus-4-8: deepest reasoning. Architecture, hard debugging, long autonomous runs.",
      "Sonnet 4.6 — claude-sonnet-4-6: the balanced everyday default. Great price/performance for normal coding.",
      "Haiku 4.5 — claude-haiku-4-5-20251001: fast and cheap. High-volume, well-scoped, mechanical edits.",
      "Workflow: prototype on Opus to get it right, then drop to the cheapest model that still passes your tests.",
    ],
    callout: {
      label: "Cost instinct",
      body: "Match model to difficulty, not to habit. A mixed pipeline — Opus to plan, Sonnet to build, Haiku to mass-edit — is often both cheaper and faster than Opus-everywhere.",
    },
  },
  {
    heading: "Prompting so it lands on the first try",
    body: [
      "Opus 4.8 rewards clear intent. Vague prompts still get vague code — these patterns convert intent into reliable output. Treat them as reusable templates, not one-off messages.",
    ],
    bullets: [
      "Plan-then-build: get a plan, approve it, then execute. Catches bad assumptions before they become code.",
      "Point at real files ('match the style of lib/stripe.ts') instead of describing conventions in prose.",
      "State the definition of done up front — including the edge cases you care about.",
      "Constrain the surface ('only touch these files') so the diff stays reviewable.",
      "Ask for the test alongside the feature; it forces the model to pin down behaviour.",
    ],
    template: {
      label: "Copy-paste: the reliable feature prompt",
      text: 'Goal: <what done looks like, including edge cases>.\nContext: follow the patterns in <real/file/path.ts>.\nConstraints: only modify <these files>. Keep changes small.\nFirst, give me a short plan. Wait for my OK before writing code.\nThen implement it and add a test that proves the behaviour.',
    },
  },
  {
    heading: "Use extended thinking for the hard problems",
    body: [
      "Extended thinking lets Opus 4.8 reason through a problem before it answers — and it's the single biggest quality lever on hard tasks. Turn it on for architecture decisions, subtle bugs, math, and anything where a wrong first step cascades into wasted work.",
      "Thinking costs tokens and latency, so don't leave it cranked for trivial edits. Match the thinking budget to the difficulty of the task in front of you.",
    ],
    bullets: [
      "High thinking: architecture, root-causing a heisenbug, security-sensitive logic, tricky algorithms.",
      "Low / off: renames, boilerplate, formatting, mechanical edits.",
      "Stuck? Ask it to explain the failure before fixing it — the reasoning usually surfaces the real cause.",
    ],
    callout: {
      label: "Pro tip",
      body: "When a bug resists two fixes, stop patching. Ask: \"Explain, step by step, why this is happening before proposing a fix.\" Thinking turns guesswork into diagnosis.",
    },
  },
  {
    heading: "Prompt caching: the cost lever everyone misses",
    body: [
      "When you build on the Claude API, prompt caching is how you make Opus 4.8 affordable at scale. Cache the stable prefix of your prompt — system instructions, tool definitions, long reference docs, codebase context — and you pay full price once, then a fraction on every subsequent call that reuses it.",
      "In agentic loops, where the same large context is sent on every turn, caching routinely cuts cost and latency dramatically. The trick is structure: keep the unchanging part at the front and the variable part (the user's latest message) at the very end, so the cached prefix stays byte-for-byte identical.",
    ],
    bullets: [
      "Put stable content first (system prompt, tools, docs) and mark a cache breakpoint after it.",
      "Keep per-turn variable content last so the cached prefix never shifts.",
      "Watch your cache-hit rate — a low rate almost always means your prefix is changing when it shouldn't.",
    ],
    callout: {
      label: "Rule of thumb",
      body: "Anything you'd send on more than two calls and that doesn't change between them belongs in the cached prefix. Cached reads are a fraction of the price of fresh input tokens.",
    },
  },
  {
    heading: "Agentic loops and tool use",
    body: [
      "Opus 4.8 shines in agentic setups: give it tools (read files, run commands, search the web) and a goal, and it works through multi-step tasks autonomously. The art is in the guardrails — clear tools, a clear stopping condition, and a human reviewing the diff.",
    ],
    bullets: [
      "Write precise tool descriptions — the model selects tools off the description, not the name.",
      "Let it run small, verifiable steps; review the diff, not the chat transcript.",
      "Always run the code. 'It compiles' is not 'it works'.",
      "Be extra careful with anything touching money, auth, or data deletion — verify those by hand.",
    ],
    callout: {
      label: "Guardrail",
      body: "Give the agent a budget and a stop condition: 'Make the failing test pass, then stop and show me the diff.' Open-ended autonomy is how small tasks become large, unreviewable ones.",
    },
  },
  {
    heading: "Debugging with Opus 4.8",
    body: [
      "Opus 4.8 is at its best as a diagnostician. The mistake people make is asking for a fix before the model understands the bug. Feed it the evidence and make it reason first.",
    ],
    bullets: [
      "Paste the exact error, the failing input, and the relevant code — not a paraphrase.",
      "Ask for the root cause and two candidate fixes before any code is written.",
      "Have it add a failing test that reproduces the bug, then make the test pass.",
      "If the fix doesn't work, give it the new output — never let it guess blind twice.",
    ],
    template: {
      label: "Copy-paste: the debugging prompt",
      text: "Here is the error, the input that triggers it, and the code:\n<paste all three>\nDo not fix it yet. First explain the root cause step by step.\nThen propose two fixes with trade-offs. I'll pick one.\nFinally, add a test that fails before the fix and passes after.",
    },
  },
  {
    heading: "Context management for long sessions",
    body: [
      "Long agentic sessions drift: the model accumulates context, some of it stale, and quality slowly degrades. Managing context is a skill that separates people who ship from people who fight the tool.",
    ],
    bullets: [
      "Keep a short project guide file (CLAUDE.md / AGENTS.md) at the repo root — stack, commands, conventions, gotchas. It's read every session and saves endless re-explaining.",
      "Start a fresh session for a genuinely new task instead of dragging old context along.",
      "Summarise decisions into the repo (docs, comments) so the next session inherits them.",
      "When a session gets confused, reset and re-state the goal cleanly — cheaper than untangling it.",
    ],
    callout: {
      label: "Highest-ROI setup move",
      body: "A 30-line project guide at your repo root is the best hour you'll spend. It makes every future session sharper and is the closest thing to permanent memory you get for free.",
    },
  },
  {
    heading: "Common mistakes that quietly burn tokens (and time)",
    body: [
      "Knowing the failure modes is half the battle. These are the ones that cost real money and momentum.",
    ],
    bullets: [
      "Using Opus for everything — pay principal-engineer rates to rename variables.",
      "No prompt caching in loops — re-paying for the same context on every turn.",
      "Over-scoping the first version — one shipped feature beats ten planned ones.",
      "Letting it refactor everything at once until the diff is unreviewable.",
      "Trusting generated code in security-sensitive paths without verifying it by hand.",
      "Endless polishing instead of putting it in front of a real user.",
    ],
  },
  {
    heading: "Your first 48 hours with Opus 4.8",
    body: [
      "Theory is cheap. Here's a concrete sequence that takes you from idea to a live, paid product in a weekend — with Opus 4.8 as your engineering partner.",
    ],
    bullets: [
      "Hour 0–2: Pick ONE feature someone would pay for. Have Opus write the definition of done.",
      "Hour 2–6: Have it scaffold the app and get a deployed URL live (ugly is fine).",
      "Hour 6–12: Build the one feature end-to-end with tests, plan-then-build.",
      "Hour 12–16: Add hosted checkout (Stripe) and gate the value behind payment.",
      "Hour 16–20: Polish the landing page; have Opus draft your launch posts.",
      "Hour 20+: Ship it. Post to one community. Talk to your first user, then iterate.",
    ],
    callout: {
      label: "Meta note",
      body: "The product you're reading this in was built exactly this way — one feature, a Stripe checkout, deployed in an afternoon. The playbook works because it built the playbook.",
    },
  },
  {
    heading: "The prompt template library",
    body: [
      "Keep these where you can grab them. Each is a starting point — adapt the angle brackets to your task.",
    ],
    bullets: [
      "Refactor: 'Refactor <file> for <goal>. Keep behaviour identical; the existing tests must still pass. Show the plan first.'",
      "Explain: 'Walk me through <file/function> like I'm new to this codebase. What would surprise me?'",
      "Review: 'Review this diff for correctness and edge cases. Focus on anything touching money, auth, or data loss.'",
      "Tighten: 'This works but feels clunky. Suggest a simpler design with the same behaviour, and why it's better.'",
      "Ship: 'Write a clear PR description and a launch tweet for this change, in plain language.'",
    ],
  },
];

export const closing =
  "That's the playbook. Opus 4.8 is the most capable coding partner you've ever had — but the people who win with it aren't the ones with the cleverest prompts. They're the ones who delegate clearly, review with discipline, manage context, and actually ship. Now go build something and charge for it.";
