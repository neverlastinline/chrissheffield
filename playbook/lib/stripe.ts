import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Lazily create the Stripe client so that simply importing this module
 * (e.g. during `next build`) doesn't require the secret key — it's only
 * needed when a request actually hits a route.
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment (see .env.example)."
    );
  }
  _stripe = new Stripe(secretKey);
  return _stripe;
}

/**
 * Returns the Checkout Session if (and only if) it has been paid.
 * Used as our access check — the session id is the buyer's access token.
 */
export async function getPaidSession(sessionId: string | null | undefined) {
  if (!sessionId) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? session : null;
  } catch {
    return null;
  }
}
