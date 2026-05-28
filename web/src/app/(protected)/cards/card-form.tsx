"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import type { Card } from "@/types/database";
import { POSITIONS, STATS } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ActionState } from "./actions";

type Action = (state: ActionState, formData: FormData) => Promise<ActionState>;

const initialState: ActionState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}

export function CardForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: Action;
  defaultValues?: Partial<Card>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          name="player_name"
          label="Player name"
          defaultValue={defaultValues?.player_name ?? ""}
          errors={state.fieldErrors?.player_name}
        />
        <Field
          name="team"
          label="Team"
          defaultValue={defaultValues?.team ?? ""}
          errors={state.fieldErrors?.team}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <select
          id="position"
          name="position"
          defaultValue={defaultValues?.position ?? "Midfielder"}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          required
        >
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium mb-1">Stats (0 – 100)</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STATS.map((s) => (
            <Field
              key={s}
              name={s}
              label={s[0].toUpperCase() + s.slice(1)}
              type="number"
              min={0}
              max={100}
              defaultValue={String(defaultValues?.[s] ?? 50)}
              errors={state.fieldErrors?.[s]}
            />
          ))}
        </div>
      </fieldset>

      <Field
        name="image_url"
        label="Image URL (optional)"
        type="url"
        defaultValue={defaultValues?.image_url ?? ""}
        errors={state.fieldErrors?.image_url}
      />

      <SubmitButton label={submitLabel} />
    </form>
  );
}

function Field({
  name,
  label,
  errors,
  ...inputProps
}: React.ComponentProps<typeof Input> & {
  name: string;
  label: string;
  errors?: string[];
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...inputProps} />
      {errors?.length ? (
        <p className="text-xs text-destructive">{errors[0]}</p>
      ) : null}
    </div>
  );
}
