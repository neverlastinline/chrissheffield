import type { Metadata } from "next";
import { CardForm } from "../card-form";
import { createCard } from "../actions";

export const metadata: Metadata = {
  title: "New card",
  description: "Add a new AFL player card to your deck.",
};

export default function NewCardPage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">New player card</h1>
        <p className="text-muted-foreground">
          Higher stats win the round. Don&apos;t make your bench too easy to
          beat.
        </p>
      </div>
      <CardForm action={createCard} submitLabel="Create card" />
    </div>
  );
}
