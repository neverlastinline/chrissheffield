import { z } from "zod";
import { POSITIONS } from "@/types/database";

const stat = z.coerce.number().int().min(0).max(100);

export const cardSchema = z.object({
  player_name: z.string().min(2, "Player name is required").max(80),
  team: z.string().min(2, "Team is required").max(60),
  position: z.enum(POSITIONS),
  kicks: stat,
  handballs: stat,
  marks: stat,
  tackles: stat,
  goals: stat,
  image_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type CardInput = z.infer<typeof cardSchema>;
