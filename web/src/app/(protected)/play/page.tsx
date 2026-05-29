import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Swords } from "lucide-react";
import { PlayClient } from "./play-client";

export const metadata: Metadata = {
  title: "Play",
  description: "Play a Footy Feud round against the CPU.",
};

export default async function PlayPage() {
  const supabase = await createClient();
  const { data: cards } = await supabase
    .from("cards")
    .select("id, player_name, team, position, image_url, kicks, handballs, marks, tackles, goals");

  const deck = cards ?? [];

  if (deck.length < 5) {
    return (
      <div className="container py-10 max-w-xl">
        <Alert>
          <Swords className="h-4 w-4" />
          <AlertTitle>Not enough cards</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              You need at least 5 cards in your deck before you can play. You
              have {deck.length}.
            </p>
            <Button asChild size="sm">
              <Link href="/cards/new">Add a card</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <PlayClient deck={deck} />;
}
