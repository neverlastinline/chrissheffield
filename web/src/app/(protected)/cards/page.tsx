import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { PlayerCard } from "@/components/player-card";
import { DeleteCardButton } from "./delete-card-button";

export const metadata: Metadata = {
  title: "My cards",
  description: "Manage your AFL player card deck.",
};

export default async function CardsPage() {
  const supabase = await createClient();
  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="container py-10">
        <p className="text-destructive">Failed to load cards: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My deck</h1>
          <p className="text-muted-foreground">
            {cards?.length ?? 0} card{cards?.length === 1 ? "" : "s"} — you need
            at least 5 to play.
          </p>
        </div>
        <Button asChild>
          <Link href="/cards/new">
            <Plus className="h-4 w-4" /> New card
          </Link>
        </Button>
      </div>

      {cards && cards.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {cards.map((c) => (
            <div key={c.id} className="space-y-2">
              <Link href={`/cards/${c.id}/edit`}>
                <PlayerCard card={c} />
              </Link>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/cards/${c.id}/edit`}>Edit</Link>
                </Button>
                <DeleteCardButton id={c.id} name={c.player_name} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center space-y-4">
          <p className="text-muted-foreground">
            No cards yet. Build your first player to get into the game.
          </p>
          <Button asChild>
            <Link href="/cards/new">
              <Plus className="h-4 w-4" /> Create your first card
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
