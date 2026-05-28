import type { Card, StatKey } from "@/types/database";
import { STATS } from "@/types/database";

export type DeckCard = Pick<
  Card,
  "id" | "player_name" | "team" | "position" | "image_url"
> &
  Record<StatKey, number>;

export function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const FIRST_NAMES = [
  "Marcus", "Jordan", "Tom", "Lachie", "Patrick", "Charlie", "Jack", "Sam",
  "Zach", "Toby", "Harry", "Bailey", "Connor", "Hugh", "Will", "Nick",
];
const LAST_NAMES = [
  "Walker", "Daicos", "Mitchell", "Neale", "Cripps", "Curnow", "Heeney",
  "Brayshaw", "Petracca", "Bontempelli", "Macrae", "Steele", "Anderson",
  "Rozee", "Butters", "McCluggage",
];
const TEAMS = [
  "Brisbane Lions", "Collingwood", "Carlton", "Geelong Cats", "Sydney Swans",
  "Melbourne", "Port Adelaide", "GWS Giants", "Western Bulldogs", "Hawthorn",
];
const POSITIONS = ["Forward", "Midfielder", "Defender", "Ruck", "Utility"] as const;

function rand(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function generateCpuDeck(size: number): DeckCard[] {
  const deck: DeckCard[] = [];
  for (let i = 0; i < size; i++) {
    const fn = FIRST_NAMES[rand(0, FIRST_NAMES.length - 1)];
    const ln = LAST_NAMES[rand(0, LAST_NAMES.length - 1)];
    deck.push({
      id: `cpu-${i}`,
      player_name: `${fn} ${ln}`,
      team: TEAMS[rand(0, TEAMS.length - 1)],
      position: POSITIONS[rand(0, POSITIONS.length - 1)],
      image_url: null,
      kicks: rand(35, 95),
      handballs: rand(35, 95),
      marks: rand(35, 95),
      tackles: rand(35, 95),
      goals: rand(20, 95),
    });
  }
  return deck;
}

export function compareStat(
  user: DeckCard,
  cpu: DeckCard,
  stat: StatKey,
): "user" | "cpu" | "draw" {
  if (user[stat] > cpu[stat]) return "user";
  if (cpu[stat] > user[stat]) return "cpu";
  return "draw";
}

export function bestStatFor(card: DeckCard): StatKey {
  let best: StatKey = STATS[0];
  for (const s of STATS) if (card[s] > card[best]) best = s;
  return best;
}

export const ALL_STATS = STATS;
