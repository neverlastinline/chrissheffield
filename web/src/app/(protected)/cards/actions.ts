"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cardSchema } from "@/lib/validators/card";

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return cardSchema.safeParse({
    player_name: formData.get("player_name"),
    team: formData.get("team"),
    position: formData.get("position"),
    kicks: formData.get("kicks"),
    handballs: formData.get("handballs"),
    marks: formData.get("marks"),
    tackles: formData.get("tackles"),
    goals: formData.get("goals"),
    image_url: formData.get("image_url") || "",
  });
}

export async function createCard(
  _: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { error } = await supabase.from("cards").insert({
    user_id: user.id,
    ...parsed.data,
    image_url: parsed.data.image_url || null,
  });
  if (error) return { error: error.message };

  revalidatePath("/cards");
  revalidatePath("/dashboard");
  redirect("/cards");
}

export async function updateCard(
  id: string,
  _: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("cards")
    .update({ ...parsed.data, image_url: parsed.data.image_url || null })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/cards");
  revalidatePath(`/cards/${id}`);
  redirect("/cards");
}

export async function deleteCard(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("cards").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/cards");
  revalidatePath("/dashboard");
}
