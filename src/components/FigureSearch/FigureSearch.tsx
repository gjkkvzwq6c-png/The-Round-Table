"use client";

import { useEffect, useRef, useState } from "react";
import { Figure } from "@/types";
import { searchFigures } from "@/lib/figures";

interface FigureSearchProps {
  onSelect: (figure: Figure) => void;
  onClose: () => void;
  excludeIds?: string[];
}

export function FigureSearch({ onSelect, onClose, excludeIds = [] }: FigureSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchFigures(query).filter(f => !excludeIds.includes(f.id));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCustomFigure = () => {
    if (!query.trim()) return;
    const custom: Figure = {
      id: query.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name: query.trim(),
      descriptor: "Custom figure",
    };
    onSelect(custom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-gray-950 border border-amber-700/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
        <div className="p-4 border-b border-amber-900/30">
          <p className="text-amber-500/70 text-xs uppercase tracking-widest mb-2 font-medium">Seat a figure</p>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or era…"
            className="w-full bg-black/40 border border-amber-800/30 rounded-lg px-4 py-2.5 text-amber-100 placeholder-amber-700/50 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>

        <div className="max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-amber-700/60 text-sm mb-3">No matching figures found.</p>
              {query.trim() && (
                <button
                  onClick={handleCustomFigure}
                  className="text-amber-400 text-sm hover:text-amber-300 underline underline-offset-2"
                >
                  Seat &ldquo;{query.trim()}&rdquo; anyway
                </button>
              )}
            </div>
          ) : (
            <>
              {results.map((figure) => (
                <button
                  key={figure.id}
                  onClick={() => onSelect(figure)}
                  className="w-full text-left px-4 py-3 hover:bg-amber-950/40 border-b border-amber-900/20 last:border-0 transition-colors group"
                >
                  <div className="text-amber-200 text-sm font-medium group-hover:text-amber-100">
                    {figure.name}
                  </div>
                  <div className="text-amber-700/70 text-xs mt-0.5">{figure.descriptor}</div>
                </button>
              ))}
              {query.trim() && !results.find(f => f.name.toLowerCase() === query.trim().toLowerCase()) && (
                <button
                  onClick={handleCustomFigure}
                  className="w-full text-left px-4 py-3 hover:bg-amber-950/30 text-amber-500/70 text-sm italic transition-colors"
                >
                  Seat &ldquo;{query.trim()}&rdquo; (custom)
                </button>
              )}
            </>
          )}
        </div>

        <div className="p-3 border-t border-amber-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="text-amber-700/60 text-xs hover:text-amber-500 transition-colors"
          >
            Cancel (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
