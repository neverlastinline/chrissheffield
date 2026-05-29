"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteCard } from "./actions";

export function DeleteCardButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleClick() {
    if (!confirm(`Delete ${name}?`)) return;
    startTransition(async () => {
      try {
        await deleteCard(id);
        toast({ title: "Card deleted", description: name });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    });
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Delete ${name}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
