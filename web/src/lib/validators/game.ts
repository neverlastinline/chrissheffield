import { z } from "zod";

export const gameResultSchema = z.object({
  user_score: z.number().int().min(0).max(200),
  cpu_score: z.number().int().min(0).max(200),
  rounds_played: z.number().int().min(1).max(200),
  outcome: z.enum(["win", "loss", "draw"]),
});

export type GameResultInput = z.infer<typeof gameResultSchema>;
