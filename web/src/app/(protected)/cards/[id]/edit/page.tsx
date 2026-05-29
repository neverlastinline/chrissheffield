import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CardForm } from "../../card-form";
import { updateCard } from "../../actions";

export const metadata: Metadata = {
  title: "Edit card",
  description: "Edit one of your AFL player cards.",
};

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("id", id)
    .single();

  if (!card) notFound();

  const action = updateCard.bind(null, id);

  return (
    <div className="container py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Edit card</h1>
        <p className="text-muted-foreground">{card.player_name}</p>
      </div>
      <CardForm
        action={action}
        defaultValues={card}
        submitLabel="Save changes"
      />
    </div>
  );
}
