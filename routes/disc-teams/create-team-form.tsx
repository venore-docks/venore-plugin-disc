"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, useActionToast } from "@venore/plugin-sdk/ui";
import { createDiscTeamAction, type CreateDiscTeamActionState } from "./actions";

const initialState: CreateDiscTeamActionState = { error: null };

export function CreateDiscTeamForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createDiscTeamAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Equipe criada.", onSuccess: () => router.refresh() });

  return (
    <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1">
        <label className="text-xs text-muted-foreground" htmlFor="disc-team-name">
          Nome da equipe
        </label>
        <Input id="disc-team-name" name="name" placeholder="Ex.: Time comercial" required />
      </div>
      <div className="flex-1 space-y-1">
        <label className="text-xs text-muted-foreground" htmlFor="disc-team-description">
          Descrição (opcional)
        </label>
        <Textarea id="disc-team-description" name="description" rows={1} placeholder="Ex.: Vendas e pós-venda" />
      </div>
      <Button type="submit" disabled={pending}>
        Criar equipe
      </Button>
    </form>
  );
}
