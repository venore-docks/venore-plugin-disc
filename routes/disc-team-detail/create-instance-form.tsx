"use client";

import { useActionState } from "react";
import { Button, Input, useActionToast } from "@venore/plugin-sdk/ui";
import { createDiscInstanceAction, type CreateDiscInstanceActionState } from "./actions";

const initialState: CreateDiscInstanceActionState = { error: null };

export function CreateDiscInstanceForm({ teamId }: { teamId: string }) {
  const boundAction = createDiscInstanceAction.bind(null, teamId);
  const [state, formAction, pending] = useActionState(boundAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Link de teste gerado." });

  return (
    <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1">
        <label className="text-xs text-muted-foreground" htmlFor="disc-instance-environment">
          Ambiente considerado no teste
        </label>
        <Input id="disc-instance-environment" name="environmentLabel" placeholder="Ex.: no time de vendas" defaultValue="Geral" />
      </div>
      <Button type="submit" disabled={pending}>
        Gerar link de teste
      </Button>
    </form>
  );
}
