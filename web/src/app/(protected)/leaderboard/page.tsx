import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top Footy Feud coaches by win count.",
};

export const revalidate = 30;

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("wins", { ascending: false })
    .order("games_played", { ascending: false })
    .limit(50);

  return (
    <div className="container py-10 space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top 50 coaches by wins.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-accent" /> Ladder
          </CardTitle>
          <CardDescription>
            Records are computed from saved feud results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-sm text-destructive">{error.message}</p>
          ) : !data || data.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No games saved yet — be the first to climb.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase">
                <tr>
                  <th className="text-left py-2">#</th>
                  <th className="text-left py-2">Coach</th>
                  <th className="text-right py-2">W</th>
                  <th className="text-right py-2">L</th>
                  <th className="text-right py-2">D</th>
                  <th className="text-right py-2">Played</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((row, i) => {
                  const isMe = row.user_id === user?.id;
                  return (
                    <tr
                      key={row.user_id}
                      className={isMe ? "bg-accent/20 font-medium" : ""}
                    >
                      <td className="py-2">{i + 1}</td>
                      <td className="py-2 flex items-center gap-2">
                        {row.display_name}
                        {isMe && (
                          <Badge variant="secondary" className="text-[10px]">
                            You
                          </Badge>
                        )}
                      </td>
                      <td className="py-2 text-right font-mono">{row.wins}</td>
                      <td className="py-2 text-right font-mono">
                        {row.losses}
                      </td>
                      <td className="py-2 text-right font-mono">{row.draws}</td>
                      <td className="py-2 text-right font-mono">
                        {row.games_played}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
