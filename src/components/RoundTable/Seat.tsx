"use client";

import { Figure } from "@/types";

const SEAT_COLORS = [
  "border-amber-500 shadow-amber-500/30",
  "border-emerald-500 shadow-emerald-500/30",
  "border-sky-500 shadow-sky-500/30",
  "border-rose-500 shadow-rose-500/30",
  "border-violet-500 shadow-violet-500/30",
  "border-teal-500 shadow-teal-500/30",
  "border-orange-500 shadow-orange-500/30",
  "border-cyan-500 shadow-cyan-500/30",
];

const SEAT_BG_COLORS = [
  "bg-amber-900/40",
  "bg-emerald-900/40",
  "bg-sky-900/40",
  "bg-rose-900/40",
  "bg-violet-900/40",
  "bg-teal-900/40",
  "bg-orange-900/40",
  "bg-cyan-900/40",
];

const SEAT_TEXT_COLORS = [
  "text-amber-300",
  "text-emerald-300",
  "text-sky-300",
  "text-rose-300",
  "text-violet-300",
  "text-teal-300",
  "text-orange-300",
  "text-cyan-300",
];

interface SeatProps {
  seatIndex: number;
  figure: Figure | null;
  onClick: () => void;
}

export function Seat({ seatIndex, figure, onClick }: SeatProps) {
  const colorBorder = SEAT_COLORS[seatIndex % 8];
  const colorBg = SEAT_BG_COLORS[seatIndex % 8];
  const colorText = SEAT_TEXT_COLORS[seatIndex % 8];

  if (!figure) {
    return (
      <button
        onClick={onClick}
        className="w-16 h-16 rounded-full border-2 border-dashed border-amber-700/40 bg-black/20 flex items-center justify-center text-amber-700/60 hover:border-amber-500/60 hover:text-amber-500/80 hover:bg-amber-950/20 transition-all duration-200 group"
        title="Click to seat a figure"
      >
        <span className="text-xl font-light group-hover:scale-110 transition-transform">+</span>
      </button>
    );
  }

  const initials = figure.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full border-2 ${colorBorder} ${colorBg} flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 relative group`}
      title={`${figure.name} — click to remove`}
    >
      <span className={`text-sm font-bold ${colorText}`}>{initials}</span>
      <span className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-xs">✕</span>
      </span>
    </button>
  );
}

export { SEAT_COLORS, SEAT_TEXT_COLORS, SEAT_BG_COLORS };
