"use client";

import { FigureResponse } from "@/types";
import { LoadingDots } from "@/components/ui/LoadingDots";

const CARD_COLORS = [
  { border: "border-amber-500", name: "text-amber-400", bg: "bg-amber-950/20" },
  { border: "border-emerald-500", name: "text-emerald-400", bg: "bg-emerald-950/20" },
  { border: "border-sky-500", name: "text-sky-400", bg: "bg-sky-950/20" },
  { border: "border-rose-500", name: "text-rose-400", bg: "bg-rose-950/20" },
  { border: "border-violet-500", name: "text-violet-400", bg: "bg-violet-950/20" },
  { border: "border-teal-500", name: "text-teal-400", bg: "bg-teal-950/20" },
  { border: "border-orange-500", name: "text-orange-400", bg: "bg-orange-950/20" },
  { border: "border-cyan-500", name: "text-cyan-400", bg: "bg-cyan-950/20" },
];

function getColorIndex(figureId: string): number {
  let hash = 0;
  for (let i = 0; i < figureId.length; i++) {
    hash = (hash * 31 + figureId.charCodeAt(i)) % 8;
  }
  return hash;
}

interface ResponseCardProps {
  response: FigureResponse;
  seatIndex: number;
}

export function ResponseCard({ response, seatIndex }: ResponseCardProps) {
  const colors = CARD_COLORS[seatIndex % 8];

  return (
    <div
      className={`border-l-4 ${colors.border} ${colors.bg} rounded-r-xl px-4 py-3 bg-gray-900/60`}
    >
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className={`text-sm font-semibold ${colors.name}`}>
          {response.figure.name}
        </span>
        <span className="text-amber-800/50 text-xs truncate hidden sm:block">
          {response.figure.descriptor}
        </span>
      </div>

      {response.isLoading ? (
        <div className="py-1">
          <LoadingDots />
        </div>
      ) : response.error ? (
        <p className="text-amber-800/60 text-sm italic">{response.error}</p>
      ) : (
        <p className="text-amber-100/90 text-sm leading-relaxed">{response.text}</p>
      )}
    </div>
  );
}

export { getColorIndex };
