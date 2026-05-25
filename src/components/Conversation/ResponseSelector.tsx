"use client";

import { useState } from "react";
import { Figure } from "@/types";

const SELECTOR_COLORS = [
  "border-amber-500 text-amber-400 bg-amber-900/40",
  "border-emerald-500 text-emerald-400 bg-emerald-900/40",
  "border-sky-500 text-sky-400 bg-sky-900/40",
  "border-rose-500 text-rose-400 bg-rose-900/40",
  "border-violet-500 text-violet-400 bg-violet-900/40",
  "border-teal-500 text-teal-400 bg-teal-900/40",
  "border-orange-500 text-orange-400 bg-orange-900/40",
  "border-cyan-500 text-cyan-400 bg-cyan-900/40",
];

interface ResponseSelectorProps {
  figures: Figure[];
  seatIndices: number[];
  onRespond: (selectedFigures: Array<{ figure: Figure; seatIndex: number }>) => void;
}

export function ResponseSelector({ figures, seatIndices, onRespond }: ResponseSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleFigure = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRespond = (respondTo: Array<{ figure: Figure; seatIndex: number }>) => {
    if (respondTo.length === 0) return;
    onRespond(respondTo);
  };

  return (
    <div className="border border-amber-800/30 rounded-xl p-4 bg-black/30 space-y-3">
      <p className="text-amber-600/80 text-xs uppercase tracking-widest font-medium">
        Who should respond?
      </p>

      <div className="flex flex-wrap gap-2">
        {figures.map((figure, i) => {
          const seatIndex = seatIndices[i];
          const colors = SELECTOR_COLORS[seatIndex % 8];
          const isSelected = selected.has(figure.id);

          return (
            <button
              key={figure.id}
              onClick={() => toggleFigure(figure.id)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 ${
                isSelected
                  ? colors
                  : "border-amber-900/40 text-amber-700/60 bg-transparent hover:border-amber-700/50 hover:text-amber-600/80"
              }`}
            >
              {figure.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => {
            const all = figures.map((figure, i) => ({ figure, seatIndex: seatIndices[i] }));
            handleRespond(all);
          }}
          className="px-4 py-1.5 bg-amber-700/20 border border-amber-600/40 text-amber-300 text-xs rounded-lg hover:bg-amber-700/30 transition-colors font-medium"
        >
          Ask All
        </button>

        {selected.size > 0 && (
          <button
            onClick={() => {
              const respondTo = figures
                .map((figure, i) => ({ figure, seatIndex: seatIndices[i] }))
                .filter(({ figure }) => selected.has(figure.id));
              handleRespond(respondTo);
            }}
            className="px-4 py-1.5 bg-amber-600/20 border border-amber-500/50 text-amber-200 text-xs rounded-lg hover:bg-amber-600/30 transition-colors font-medium"
          >
            Ask Selected ({selected.size})
          </button>
        )}
      </div>
    </div>
  );
}
