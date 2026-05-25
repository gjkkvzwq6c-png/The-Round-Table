"use client";

import { useEffect, useRef } from "react";
import { Exchange as ExchangeType, Figure } from "@/types";
import { Exchange } from "./Exchange";
import { QuestionInput } from "./QuestionInput";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

interface ConversationPanelProps {
  exchanges: ExchangeType[];
  isLoading: boolean;
  error: string | null;
  seatedFigures: Figure[];
  seatIndices: number[];
  pendingExchangeId: string | null;
  onSubmit: (question: string) => void;
  onRespond: (exchangeId: string, selectedFigures: Array<{ figure: Figure; seatIndex: number }>) => void;
  onDismissError: () => void;
}

export function ConversationPanel({
  exchanges,
  isLoading,
  error,
  seatedFigures,
  seatIndices,
  pendingExchangeId,
  onSubmit,
  onRespond,
  onDismissError,
}: ConversationPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [exchanges]);

  const isEmpty = exchanges.length === 0;
  const noFigures = seatedFigures.length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Scrollable conversation area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 min-h-0">
        {error && (
          <ErrorBanner message={error} onDismiss={onDismissError} />
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            {noFigures ? (
              <>
                <div className="text-4xl mb-3 opacity-30">⚔</div>
                <p className="text-amber-700/60 text-sm">
                  Seat a figure at the table to begin the discussion.
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3 opacity-30">📜</div>
                <p className="text-amber-700/60 text-sm">
                  Pose a question to begin the discussion.
                </p>
                <p className="text-amber-800/40 text-xs mt-1">
                  {seatedFigures.length} figure{seatedFigures.length !== 1 ? "s" : ""} at the table, ready to speak.
                </p>
              </>
            )}
          </div>
        )}

        {exchanges.map((exchange) => (
          <Exchange
            key={exchange.id}
            exchange={exchange}
            seatedFigures={seatedFigures}
            seatIndices={seatIndices}
            showSelector={exchange.id === pendingExchangeId}
            onRespond={(selected) => onRespond(exchange.id, selected)}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <QuestionInput
        onSubmit={onSubmit}
        isLoading={isLoading}
        disabled={seatedFigures.length === 0}
      />
    </div>
  );
}
