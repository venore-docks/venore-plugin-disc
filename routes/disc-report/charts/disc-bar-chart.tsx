"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@venore/plugin-sdk/ui";
import { DISC_LETTER_COLOR, DISC_LETTER_COLOR_INTERNA } from "../../../shared/disc-engine/colors";
import type { DiscCount } from "../../../shared/disc-engine/score-disc";

const chartConfig = {
  externa: { label: "Externa" },
  interna: { label: "Interna" },
};

// Portado de nestpro/components/charts/MoreLessBarChartNest — barras pareadas Externa/Interna por
// letra DISC, mesmas cores por letra do original (nestpro/app/globals.css --disc-*).
export function DiscBarChart({ more, less }: { more: DiscCount; less: DiscCount }) {
  const data = [
    { letter: "D", externa: more.d, interna: less.d, colorExterna: DISC_LETTER_COLOR.d, colorInterna: DISC_LETTER_COLOR_INTERNA.d },
    { letter: "I", externa: more.i, interna: less.i, colorExterna: DISC_LETTER_COLOR.i, colorInterna: DISC_LETTER_COLOR_INTERNA.i },
    { letter: "S", externa: more.s, interna: less.s, colorExterna: DISC_LETTER_COLOR.s, colorInterna: DISC_LETTER_COLOR_INTERNA.s },
    { letter: "C", externa: more.c, interna: less.c, colorExterna: DISC_LETTER_COLOR.c, colorInterna: DISC_LETTER_COLOR_INTERNA.c },
  ];

  return (
    <ChartContainer config={chartConfig} className="aspect-video w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="letter" tickLine={false} axisLine={false} />
        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="externa" radius={4}>
          {data.map((entry) => (
            <Cell key={`externa-${entry.letter}`} fill={entry.colorExterna} />
          ))}
        </Bar>
        <Bar dataKey="interna" radius={4}>
          {data.map((entry) => (
            <Cell key={`interna-${entry.letter}`} fill={entry.colorInterna} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
