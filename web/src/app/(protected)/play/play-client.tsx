"use client";

import { useMemo, useState, useTransition } from "react";
import { RotateCcw, Trophy, Swords } from "lucide-react";
import type { StatKey } from "@/types/database";
import { STATS } from "@/types/database";
import {
  compareStat,
  generateCpuDeck,
  shuffle,
  type DeckCard,
} from "@/lib/game/deck";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayerCard } from "@/components/player-card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { recordGame } from "./actions";

type Phase = "ready" | "choose" | "reveal" | "finished";

export function PlayClient({ deck: initialDeck }: { deck: DeckCard[] }) {
  const { toast } = useToast();
  const [, startTransition] = useTransition();

  const [userDeck, setUserDeck] = useState<DeckCard[]>(() =>
    shuffle(initialDeck),
  );
  const [cpuDeck, setCpuDeck] = useState<DeckCard[]>(() =>
    shuffle(generateCpuDeck(initialDeck.length)),
  );
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("choose");
  const [chosenStat, setChosenStat] = useState<StatKey | null>(null);
  const [roundResult, setRoundResult] = useState<
    "user" | "cpu" | "draw" | null
  >(null);
  const [recorded, setRecorded] = useState(false);

  const userCard = userDeck[0];
  const cpuCard = cpuDeck[0];
  const rounds = userScore + cpuScore;
  const totalCards = initialDeck.length;

  const outcome: "win" | "loss" | "draw" = useMemo(() => {
    if (userScore > cpuScore) return "win";
    if (cpuScore > userScore) return "loss";
    return "draw";
  }, [userScore, cpuScore]);

  function pick(stat: StatKey) {
    if (!userCard || !cpuCard || phase !== "choose") return;
    const result = compareStat(userCard, cpuCard, stat);
    setChosenStat(stat);
    setRoundResult(result);
    setPhase("reveal");
    if (result === "user") setUserScore((s) => s + 1);
    if (result === "cpu") setCpuScore((s) => s + 1);
  }

  function next() {
    const nextUser = userDeck.slice(1);
    const nextCpu = cpuDeck.slice(1);
    setUserDeck(nextUser);
    setCpuDeck(nextCpu);
    setChosenStat(null);
    setRoundResult(null);

    if (nextUser.length === 0 || nextCpu.length === 0) {
      setPhase("finished");
      return;
    }
    setPhase("choose");
  }

  function finalizeAndSave() {
    if (recorded) return;
    setRecorded(true);
    startTransition(async () => {
      const res = await recordGame({
        user_score: userScore,
        cpu_score: cpuScore,
        rounds_played: rounds,
        outcome,
      });
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Couldn't save result",
          description: res.error,
        });
        setRecorded(false);
        return;
      }
      toast({
        title:
          outcome === "win"
            ? "Saved — what a win!"
            : outcome === "loss"
              ? "Saved — tough one."
              : "Saved — even contest.",
      });
    });
  }

  function rematch() {
    setUserDeck(shuffle(initialDeck));
    setCpuDeck(shuffle(generateCpuDeck(totalCards)));
    setUserScore(0);
    setCpuScore(0);
    setChosenStat(null);
    setRoundResult(null);
    setPhase("choose");
    setRecorded(false);
  }

  if (phase === "finished") {
    return (
      <div className="container py-10 max-w-xl">
        <Card>
          <CardHeader className="text-center space-y-3">
            <Trophy
              className={cn(
                "mx-auto h-12 w-12",
                outcome === "win"
                  ? "text-accent"
                  : outcome === "loss"
                    ? "text-destructive"
                    : "text-muted-foreground",
              )}
            />
            <CardTitle className="text-4xl">
              {outcome === "win"
                ? "Siren goes — you win!"
                : outcome === "loss"
                  ? "Pipped at the post."
                  : "All square."}
            </CardTitle>
            <CardDescription className="text-lg">
              Final: {userScore} – {cpuScore} over {rounds} round
              {rounds === 1 ? "" : "s"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={finalizeAndSave} disabled={recorded}>
              {recorded ? "Saved" : "Save result"}
            </Button>
            <Button onClick={rematch} variant="outline">
              <RotateCcw className="h-4 w-4" />
              Rematch
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-10 space-y-6">
      {/* Scoreboard */}
      <div className="flex items-center justify-center gap-4">
        <Badge variant="default" className="text-base px-3 py-1">
          You {userScore}
        </Badge>
        <Swords className="h-5 w-5 text-muted-foreground" />
        <Badge variant="destructive" className="text-base px-3 py-1">
          CPU {cpuScore}
        </Badge>
        <span className="text-sm text-muted-foreground ml-2">
          {userDeck.length} card{userDeck.length === 1 ? "" : "s"} left
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <p className="text-sm font-medium text-center">Your card</p>
          {userCard && (
            <PlayerCard
              card={userCard}
              selectedStat={chosenStat}
              variant="default"
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-center">CPU&apos;s card</p>
          {cpuCard && (
            <PlayerCard
              card={cpuCard}
              selectedStat={chosenStat}
              variant="cpu"
              faceDown={phase === "choose"}
            />
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {phase === "choose" && (
          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Pick a stat to attack with.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {STATS.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  onClick={() => pick(s)}
                  className="capitalize"
                >
                  {s} ({userCard[s]})
                </Button>
              ))}
            </div>
          </div>
        )}

        {phase === "reveal" && (
          <div className="space-y-4 text-center">
            <div className="text-xl font-bold">
              {roundResult === "user" && (
                <span className="text-primary">
                  You took the round — {chosenStat} {userCard[chosenStat!]} vs{" "}
                  {cpuCard[chosenStat!]}
                </span>
              )}
              {roundResult === "cpu" && (
                <span className="text-destructive">
                  CPU clipped you — {chosenStat} {userCard[chosenStat!]} vs{" "}
                  {cpuCard[chosenStat!]}
                </span>
              )}
              {roundResult === "draw" && (
                <span className="text-muted-foreground">
                  Tied — both {chosenStat} on {userCard[chosenStat!]}
                </span>
              )}
            </div>
            <Button onClick={next}>Next card</Button>
          </div>
        )}
      </div>
    </div>
  );
}
