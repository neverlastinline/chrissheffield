"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { gameResultSchema } from "@/lib/validators/game";

export async function recordGame(input: {
  user_score: number;
  cpu_score: number;
  rounds_played: number;
  outcome: "win" | "loss" | "draw";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = gameResultSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid game result" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { error } = await supabase
    .from("games")
    .insert({ user_id: user.id, ...parsed.data });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/leaderboard");
  return { ok: true };
}
