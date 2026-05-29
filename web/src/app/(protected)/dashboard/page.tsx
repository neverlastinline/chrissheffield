import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { CreditCard, Swords, Trophy, History } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Footy Feud overview, deck size and recent results.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [cardsRes, gamesRes] = await Promise.all([
    supabase.from("cards").select("id", { count: "exact", head: true }),
    supabase
      .from("games")
      .select("*")
      .order("played_at", { ascending: false })
      .limit(5),
  ]);

  const deckSize = cardsRes.count ?? 0;
  const games = gamesRes.data ?? [];
  const wins = games.filter((g) => g.outcome === "win").length;
  const losses = games.filter((g) => g.outcome === "loss").length;

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          G&apos;day, {user?.user_metadata?.display_name ?? "coach"}
        </h1>
        <p className="text-muted-foreground">Here&apos;s your form guide.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Deck size</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{deckSize}</div>
            <CardDescription>
              {deckSize < 5
                ? `Add ${5 - deckSize} more to play`
                : "Ready to feud"}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Last 5 games
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {wins}W – {losses}L
            </div>
            <CardDescription>
              {games.length} games played recently
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Jump in</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full" disabled={deckSize < 5}>
              <Link href="/play">Play a round</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cards/new">Add a card</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="h-5 w-5" /> Recent results
            </CardTitle>
            <CardDescription>Your last few feuds vs CPU.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {games.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No games yet. Build a deck and{" "}
              <Link href="/play" className="text-primary hover:underline">
                play your first round
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y">
              {games.map((g) => (
                <li
                  key={g.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-muted-foreground">
                    {format(new Date(g.played_at), "PP p")}
                  </span>
                  <span className="font-mono">
                    {g.user_score} – {g.cpu_score}
                  </span>
                  <Badge
                    variant={
                      g.outcome === "win"
                        ? "default"
                        : g.outcome === "loss"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {g.outcome}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
