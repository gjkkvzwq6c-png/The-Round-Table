"use client";

import { useCallback, useEffect, useState } from "react";
import { Exchange, Figure, FigureResponse, Seat } from "@/types";
import { RoundTable } from "@/components/RoundTable/RoundTable";
import { FigureSearch } from "@/components/FigureSearch/FigureSearch";
import { ConversationPanel } from "@/components/Conversation/ConversationPanel";
import { loadState, saveState } from "@/lib/storage";

function makeEmptySeats(): Seat[] {
  return Array.from({ length: 8 }, (_, i) => ({ index: i, figure: null }));
}

export default function Home() {
  const [seats, setSeats] = useState<Seat[]>(makeEmptySeats);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSeatIndex, setActiveSeatIndex] = useState<number | null>(null);
  const [pendingExchangeId, setPendingExchangeId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setSeats(saved.seats);
      setExchanges(saved.exchanges);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    if (!hydrated) return;
    saveState(seats, exchanges);
  }, [seats, exchanges, hydrated]);

  const seatedFigures = seats
    .filter(s => s.figure !== null)
    .map(s => s.figure as Figure);

  const seatIndices = seats
    .filter(s => s.figure !== null)
    .map(s => s.index);

  const handleSeatClick = (index: number) => {
    const seat = seats[index];
    if (seat.figure) {
      setSeats(prev =>
        prev.map(s => (s.index === index ? { ...s, figure: null } : s))
      );
    } else {
      setActiveSeatIndex(index);
      setSearchOpen(true);
    }
  };

  const handleFigureSelect = (figure: Figure) => {
    if (activeSeatIndex === null) return;
    setSeats(prev =>
      prev.map(s => (s.index === activeSeatIndex ? { ...s, figure } : s))
    );
    setSearchOpen(false);
    setActiveSeatIndex(null);
  };

  const handleSubmit = (question: string) => {
    if (seatedFigures.length === 0) return;
    const id = crypto.randomUUID();
    const newExchange: Exchange = {
      id,
      question,
      responses: [],
      timestamp: Date.now(),
    };
    setExchanges(prev => [...prev, newExchange]);
    setPendingExchangeId(id);
  };

  const handleRespond = useCallback(
    async (
      exchangeId: string,
      selectedFigures: Array<{ figure: Figure; seatIndex: number }>
    ) => {
      if (selectedFigures.length === 0) return;
      setPendingExchangeId(null);
      setIsLoading(true);
      setError(null);

      const exchange = exchanges.find(e => e.id === exchangeId);
      if (!exchange) return;

      // Optimistic: add loading cards
      const loadingResponses: FigureResponse[] = selectedFigures.map(({ figure }) => ({
        figure,
        text: "",
        isLoading: true,
      }));

      setExchanges(prev =>
        prev.map(e =>
          e.id === exchangeId ? { ...e, responses: loadingResponses } : e
        )
      );

      try {
        const res = await fetch("/api/converse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: exchange.question,
            figures: selectedFigures.map(({ figure }) => figure),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Request failed");
        }

        const data = await res.json();

        const finalResponses: FigureResponse[] = selectedFigures.map(({ figure }) => {
          const match = data.responses.find(
            (r: { figureId: string; text: string; error?: string }) => r.figureId === figure.id
          );
          return {
            figure,
            text: match?.text ?? "",
            isLoading: false,
            error: match?.error,
          };
        });

        setExchanges(prev =>
          prev.map(e =>
            e.id === exchangeId ? { ...e, responses: finalResponses } : e
          )
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
        setExchanges(prev =>
          prev.map(e =>
            e.id === exchangeId
              ? {
                  ...e,
                  responses: selectedFigures.map(({ figure }) => ({
                    figure,
                    text: "",
                    isLoading: false,
                    error: "Could not reach the table.",
                  })),
                }
              : e
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [exchanges]
  );

  const handleClearTable = () => {
    setSeats(makeEmptySeats());
    setExchanges([]);
    setPendingExchangeId(null);
    setError(null);
  };

  const excludedIds = seatedFigures.map(f => f.id);

  if (!hydrated) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0704]">
      {/* Header */}
      <header className="shrink-0 border-b border-amber-900/30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-amber-400 font-serif text-xl sm:text-2xl tracking-wide">
            The Round Table
          </h1>
          <p className="text-amber-800/60 text-xs hidden sm:block">
            Seat the great minds of history and put them to the test
          </p>
        </div>
        <button
          onClick={handleClearTable}
          className="text-amber-800/50 text-xs hover:text-amber-600/70 transition-colors"
        >
          Clear table
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left panel: Round Table */}
        <div className="shrink-0 flex flex-col items-center justify-center py-4 px-4 md:w-[380px] md:border-r md:border-amber-900/30 bg-gradient-to-b from-black/20 to-transparent">
          <RoundTable seats={seats} onSeatClick={handleSeatClick} />
          <p className="text-amber-800/50 text-xs mt-3 text-center">
            {seatedFigures.length === 0
              ? "Click any seat to add a figure"
              : `${seatedFigures.length} of 8 seats filled · click a seat to remove`}
          </p>
        </div>

        {/* Right panel: Conversation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <ConversationPanel
            exchanges={exchanges}
            isLoading={isLoading}
            error={error}
            seatedFigures={seatedFigures}
            seatIndices={seatIndices}
            pendingExchangeId={pendingExchangeId}
            onSubmit={handleSubmit}
            onRespond={handleRespond}
            onDismissError={() => setError(null)}
          />
        </div>
      </div>

      {/* Figure search modal */}
      {searchOpen && (
        <FigureSearch
          onSelect={handleFigureSelect}
          onClose={() => {
            setSearchOpen(false);
            setActiveSeatIndex(null);
          }}
          excludeIds={excludedIds}
        />
      )}
    </div>
  );
}
