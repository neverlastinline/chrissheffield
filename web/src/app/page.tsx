import Link from "next/link";
import { Swords, Shield, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ctaHref = user ? "/play" : "/signup";
  const ctaLabel = user ? "Play a round" : "Get started";

  return (
    <div>
      <section className="container py-20 sm:py-28 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Online AFL card game — head-to-head
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl sm:text-7xl font-black tracking-tighter">
          Footy Feud:{" "}
          <span className="text-primary">stat for stat</span>, mate for mate.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Build a deck of AFL player cards. Pick a stat. If yours is bigger,
          the card&apos;s yours. Empty the CPU&apos;s hand and the win is yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/leaderboard">View leaderboard</Link>
          </Button>
        </div>
      </section>

      <section className="container pb-24 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Build your deck</CardTitle>
            <CardDescription>
              Create custom AFL player cards with five tunable stats — kicks,
              handballs, marks, tackles, goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Mix legends with rookies. Min five cards to play a round.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Swords className="h-6 w-6 text-primary" />
            <CardTitle>Pick your battle</CardTitle>
            <CardDescription>
              Reveal a card, choose the stat you back to win. Highest value
              wins the round. Tied? It&apos;s a wash.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Fast turns, no setup, fully online.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Trophy className="h-6 w-6 text-primary" />
            <CardTitle>Climb the ladder</CardTitle>
            <CardDescription>
              Every result is saved to your record. Top the global leaderboard
              and earn footy bragging rights.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Wins, losses, and draws all count.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
