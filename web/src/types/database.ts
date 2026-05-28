export const STATS = ["kicks", "handballs", "marks", "tackles", "goals"] as const;
export type StatKey = (typeof STATS)[number];

export const POSITIONS = [
  "Forward",
  "Midfielder",
  "Defender",
  "Ruck",
  "Utility",
] as const;
export type Position = (typeof POSITIONS)[number];

export type Database = {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          name: string;
          short_code: string;
          city: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          short_code: string;
          city: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["teams"]["Insert"]>;
      };
      cards: {
        Row: {
          id: string;
          user_id: string;
          player_name: string;
          team: string;
          position: Position;
          kicks: number;
          handballs: number;
          marks: number;
          tackles: number;
          goals: number;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          player_name: string;
          team: string;
          position: Position;
          kicks?: number;
          handballs?: number;
          marks?: number;
          tackles?: number;
          goals?: number;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["cards"]["Insert"]>;
      };
      games: {
        Row: {
          id: string;
          user_id: string;
          user_score: number;
          cpu_score: number;
          rounds_played: number;
          outcome: "win" | "loss" | "draw";
          played_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_score: number;
          cpu_score: number;
          rounds_played: number;
          outcome: "win" | "loss" | "draw";
        };
        Update: Partial<Database["public"]["Tables"]["games"]["Insert"]>;
      };
    };
    Views: {
      leaderboard: {
        Row: {
          user_id: string;
          display_name: string;
          wins: number;
          losses: number;
          draws: number;
          games_played: number;
        };
      };
    };
  };
};

export type Card = Database["public"]["Tables"]["cards"]["Row"];
export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type Game = Database["public"]["Tables"]["games"]["Row"];
export type LeaderboardRow = Database["public"]["Views"]["leaderboard"]["Row"];
