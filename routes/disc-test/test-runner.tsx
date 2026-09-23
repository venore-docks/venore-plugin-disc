"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Progress } from "@venore/plugin-sdk/ui";
import { DISC_QUESTIONS } from "../../shared/disc-engine/questions";
import { shuffleInPlace } from "../../shared/disc-engine/shuffle";
import { submitDiscReportAction } from "./actions";

type RawInput = { more: Record<string, string>; less: Record<string, string> };

// Runner portado de nestpro/components/MoreLess/index.tsx — mesmo fluxo de "mais provável" seguido
// de "menos provável" por pergunta, opção já marcada como "mais" fica desabilitada na rodada
// "menos" (wasSelected). Ordem das opções embaralha uma vez por pergunta (useMemo por índice), não
// a cada re-render como o original — mesmo resultado visível, sem o efeito colateral de mutar o
// array em todo render.
export function DiscTestRunner({
  environmentLabel,
  instanceId,
  redirectUrl,
}: {
  environmentLabel: string;
  instanceId?: string;
  // Instância criada por outro plugin (createDiscInstanceExternal) — depois de enviar, volta pra
  // lá em vez da página interna de relatório do disc. Ver disc-test/page.tsx.
  redirectUrl?: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [current, setCurrent] = useState(0);
  const [moreLess, setMoreLess] = useState(true);
  const [wasSelected, setWasSelected] = useState("");
  const [rawInput, setRawInput] = useState<RawInput>({ more: {}, less: {} });
  const [error, setError] = useState<string | null>(null);

  const question = DISC_QUESTIONS[current];
  const options = useMemo(() => shuffleInPlace([...question.options]), [current]);
  const progress = Math.round((current / DISC_QUESTIONS.length) * 100);

  function handleSelect(value: string) {
    const questionNumber = String(current + 1);
    const nextRawInput: RawInput = moreLess
      ? { ...rawInput, more: { ...rawInput.more, [questionNumber]: value } }
      : { ...rawInput, less: { ...rawInput.less, [questionNumber]: value } };

    setRawInput(nextRawInput);
    setWasSelected(value);

    if (!moreLess) {
      setMoreLess(true);
      setWasSelected("");
      if (current < DISC_QUESTIONS.length - 1) {
        setCurrent(current + 1);
        return;
      }
      submit(nextRawInput);
      return;
    }

    setMoreLess(false);
  }

  function submit(finalInput: RawInput) {
    setError(null);
    startTransition(async () => {
      const result = await submitDiscReportAction({ rawInput: finalInput, environmentLabel, instanceId });
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      if (redirectUrl) {
        router.push(`${redirectUrl}?reportId=${result.data.id}`);
        return;
      }
      router.push(`/disc/r/${result.data.id}`);
    });
  }

  const [headerBefore, headerAfter] = question.header.split("{split}");
  const moreLessLabel = moreLess ? (
    <span className="font-bold text-primary">mais</span>
  ) : (
    <span className="font-bold text-destructive">menos</span>
  );

  if (isPending) {
    return <p className="py-16 text-center text-sm text-muted-foreground">Calculando seu resultado…</p>;
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 py-8">
      <Progress value={progress} />
      <p className="text-lg leading-relaxed">
        {headerBefore}
        <span className="font-medium">{environmentLabel}</span>
        {headerAfter} {moreLessLabel} provável que:
      </p>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <Button
            key={option.value + option.text}
            type="button"
            variant="outline"
            className="h-auto justify-start whitespace-normal py-3 text-left"
            disabled={!moreLess && option.value === wasSelected}
            onClick={() => handleSelect(option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="self-start"
        disabled={current === 0 && moreLess}
        onClick={() => {
          if (!moreLess) {
            setMoreLess(true);
            setWasSelected("");
            return;
          }
          if (current > 0) setCurrent(current - 1);
        }}
      >
        Voltar uma questão
      </Button>
    </div>
  );
}
