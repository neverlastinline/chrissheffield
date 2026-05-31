import Link from "next/link";
import { getPaidSession } from "@/lib/stripe";
import { GuideContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await getPaidSession(session_id);

  // Not paid / missing / invalid session — block access.
  if (!session) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">
          Payment not found
        </h1>
        <p className="mt-3 text-slate-300">
          We couldn&apos;t verify a completed payment for this link. If you just
          paid, give it a few seconds and refresh — otherwise head back and try
          again.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
        >
          Back to the guide
        </Link>
      </main>
    );
  }

  // Paid — unlock the content and offer the PDF download.
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-emerald-300">
            ✓ Payment confirmed — you&apos;re in.
          </p>
          <p className="text-sm text-emerald-200/80">
            Read it below, and download the PDF to keep.
          </p>
        </div>
        <a
          href={`/api/download?session_id=${encodeURIComponent(session.id)}`}
          className="inline-flex flex-none items-center rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400"
        >
          Download PDF
        </a>
      </div>

      <GuideContent />

      <div className="mt-12 border-t border-white/10 pt-8 text-center">
        <a
          href={`/api/download?session_id=${encodeURIComponent(session.id)}`}
          className="inline-flex items-center rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
        >
          Download the PDF
        </a>
        <p className="mt-4 text-sm text-slate-500">
          Bookmark this page to come back to it anytime.
        </p>
      </div>
    </main>
  );
}
