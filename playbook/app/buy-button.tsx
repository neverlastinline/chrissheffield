"use client";

import { useState } from "react";

export function BuyButton({ priceLabel }: { priceLabel: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting…" : `Get the Playbook — ${priceLabel}`}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <p className="text-xs text-slate-500">
        Secure one-time payment via Stripe. Instant access + PDF download.
      </p>
    </div>
  );
}
