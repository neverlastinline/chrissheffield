import { cn } from "@/lib/utils";
import type { Card as PlayerCardData, StatKey } from "@/types/database";
import { STATS } from "@/types/database";

type Variant = "default" | "cpu";

export function PlayerCard({
  card,
  variant = "default",
  selectedStat,
  faceDown,
  className,
}: {
  card: Pick<
    PlayerCardData,
    "player_name" | "team" | "position" | "image_url"
  > &
    Record<StatKey, number>;
  variant?: Variant;
  selectedStat?: StatKey | null;
  faceDown?: boolean;
  className?: string;
}) {
  if (faceDown) {
    return (
      <div
        className={cn(
          "aspect-[3/4] w-full rounded-xl border-2 border-dashed",
          "bg-gradient-to-br from-primary/30 to-accent/30",
          "flex items-center justify-center text-3xl font-black tracking-tight",
          "text-primary-foreground/80",
          className,
        )}
      >
        FF
      </div>
    );
  }

  return (
    <div
      className={cn(
        "aspect-[3/4] w-full rounded-xl border-2 shadow-lg overflow-hidden",
        "flex flex-col bg-card",
        variant === "cpu"
          ? "border-destructive/40"
          : "border-primary/40",
        className,
      )}
    >
      <div
        className={cn(
          "p-3 text-xs font-medium uppercase tracking-wider flex items-center justify-between",
          variant === "cpu"
            ? "bg-destructive/10 text-destructive"
            : "bg-primary/10 text-primary",
        )}
      >
        <span>{card.position}</span>
        <span>{card.team}</span>
      </div>
      <div className="flex-1 px-3 py-4 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
          {card.player_name}
        </h3>
        <div className="mt-auto pt-3 grid grid-cols-1 gap-1 text-sm">
          {STATS.map((s) => (
            <div
              key={s}
              className={cn(
                "flex items-center justify-between px-2 py-1 rounded-md",
                selectedStat === s
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "odd:bg-muted/50",
              )}
            >
              <span className="capitalize">{s}</span>
              <span className="font-mono tabular-nums">{card[s]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
