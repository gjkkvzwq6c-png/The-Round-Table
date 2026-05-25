"use client";

import { Exchange as ExchangeType, Figure } from "@/types";
import { ResponseCard } from "./ResponseCard";
import { ResponseSelector } from "./ResponseSelector";

interface ExchangeProps {
  exchange: ExchangeType;
  seatedFigures: Figure[];
  seatIndices: number[];
  showSelector: boolean;
  onRespond: (selectedFigures: Array<{ figure: Figure; seatIndex: number }>) => void;
}

export function Exchange({
  exchange,
  seatedFigures,
  seatIndices,
  showSelector,
  onRespond,
}: ExchangeProps) {
  return (
    <div className="space-y-3">
      {/* Question bubble */}
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-gray-800/80 border border-gray-700/40 rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-amber-100/90 text-sm leading-relaxed">{exchange.question}</p>
        </div>
      </div>

      {/* Response selector (shown before any responses) */}
      {showSelector && exchange.responses.length === 0 && (
        <ResponseSelector
          figures={seatedFigures}
          seatIndices={seatIndices}
          onRespond={onRespond}
        />
      )}

      {/* Responses */}
      {exchange.responses.length > 0 && (
        <div className="space-y-2 pl-2">
          {exchange.responses.map((response) => {
            const seatIndex = seatIndices[
              seatedFigures.findIndex(f => f.id === response.figure.id)
            ] ?? 0;
            return (
              <ResponseCard
                key={response.figure.id}
                response={response}
                seatIndex={seatIndex}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
