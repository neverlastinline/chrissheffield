// Canonical content for "The AI Coding Playbook".
// This single source of truth is rendered on the unlocked web page (lib/content.tsx)
// AND used to generate the downloadable PDF (scripts/generate-pdf.mjs).
//
// ✏️  EDIT THIS FILE to replace the starter content with your real expertise,
//     then run `npm run pdf` to regenerate content/guide.pdf.

export const guideMeta = {
  title: "The AI Coding Playbook",
  subtitle: "Ship real software fast with AI coding agents",
  author: "Chris Sheffield",
  priceLabel: "$19",
  tagline:
    "A no-fluff field guide to getting production-quality work out of AI coding agents like Claude Code — the workflows, prompts, and guardrails that actually move the needle.",
};

export const sections = [
  {
    heading: "1. The mental model: you're the lead, the agent is the team",
    body: [
      "Stop treating the agent like an autocomplete and start treating it like a fast, eager junior team that never gets tired. Your leverage comes from direction, not typing. The best operators spend their time on three things: framing the problem, reviewing the output, and steering the next step.",
      "Every session has a loop: state the goal, let the agent explore and propose, review, correct, repeat. The tighter and faster you run that loop, the more you ship. Slow, vague loops are where projects die.",
    ],
    bullets: [
      "Give the agent a clear definition of done before it writes a line.",
      "Prefer small, verifiable steps over one giant prompt.",
      "Always read the diff. The agent is fast, not infallible.",
    ],
  },
  {
    heading: "2. Set up the repo so the agent can succeed",
    body: [
      "Agents perform dramatically better in a repo that's set up for them. The single highest-ROI move is a short project guide file (e.g. CLAUDE.md or AGENTS.md) at the repo root describing the stack, commands, conventions, and gotchas. This is read on every session and saves you re-explaining context forever.",
    ],
    bullets: [
      "Document the exact commands to install, run, test, and lint.",
      "List the conventions you care about (naming, file layout, error handling).",
      "Add a SessionStart hook so tests and linters are ready in every session.",
      "Keep a 'gotchas' section for the traps that have burned you before.",
    ],
  },
  {
    heading: "3. Prompting patterns that consistently work",
    body: [
      "Vague prompts get vague code. The patterns below convert intent into reliable output. Use them as reusable templates.",
    ],
    bullets: [
      "Plan-then-build: ask for a plan first, approve it, then have it execute. Catches bad assumptions before they become code.",
      "Reference real files: point at existing patterns ('do it like lib/stripe.ts') instead of describing them.",
      "Constrain the surface: 'only touch these files' keeps changes reviewable.",
      "Ask for the test alongside the feature — it forces the agent to define behaviour.",
      "When stuck, ask the agent to explain the failure before fixing it.",
    ],
  },
  {
    heading: "4. The review discipline that keeps you out of trouble",
    body: [
      "Speed without review is how you ship bugs at scale. The goal isn't to read every character — it's to review with intent. Skim for shape, then zoom in on the risky parts: anything touching money, auth, data deletion, or external input.",
    ],
    bullets: [
      "Review the diff, not the chat. The diff is the truth.",
      "Run it. 'It compiles' is not 'it works'.",
      "Watch for confidently wrong code in unfamiliar APIs — verify against docs.",
      "Make the agent justify non-obvious choices; if it can't, push back.",
    ],
  },
  {
    heading: "5. Shipping: from working code to live product",
    body: [
      "Most side projects never ship because the last 20% feels like a wall. Agents flatten that wall: deployment configs, env wiring, payment integration, and landing pages are exactly the kind of well-trodden work they excel at.",
    ],
    bullets: [
      "Get to a deployed URL early — even an ugly one. Momentum compounds.",
      "Wire payments with a hosted checkout (Stripe Checkout) before building accounts.",
      "Keep secrets in environment variables, never in the repo.",
      "Automate the boring path: build, deploy, smoke-test, repeat.",
    ],
  },
  {
    heading: "6. The pitfalls that quietly kill momentum",
    body: [
      "Knowing the failure modes is half the battle. These are the ones that cost real time.",
    ],
    bullets: [
      "Over-scoping the first version. One feature, shipped, beats ten planned.",
      "Letting the agent refactor everything at once — changes become unreviewable.",
      "Trusting generated code in security-sensitive paths without verification.",
      "No tests, so every change is a gamble. Even one smoke test changes the game.",
      "Endless polishing instead of putting it in front of real users.",
    ],
  },
  {
    heading: "7. Your first 48 hours: a concrete plan",
    body: [
      "Theory is cheap. Here's a sequence that takes you from idea to a live, paid product in a weekend.",
    ],
    bullets: [
      "Hour 0–2: Pick ONE feature someone would pay for. Write the definition of done.",
      "Hour 2–6: Scaffold the app with the agent; get a deployed URL live.",
      "Hour 6–12: Build the one feature end-to-end with tests.",
      "Hour 12–16: Add hosted checkout and gate the value behind payment.",
      "Hour 16–20: Polish the landing page; write your launch posts.",
      "Hour 20+: Ship it. Post to one community. Talk to the first user.",
    ],
  },
];

export const closing =
  "That's the playbook. The operators who win with AI agents aren't the ones with the cleverest prompts — they're the ones who run a tight loop, review with discipline, and actually ship. Now go build something and charge for it.";
