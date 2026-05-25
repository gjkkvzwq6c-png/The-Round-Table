"use client";

import { Seat as SeatComponent } from "./Seat";
import { Seat } from "@/types";

const SEAT_COUNT = 8;
const RADIUS = 130;
const CENTER = 170;
const CONTAINER_SIZE = 340;

function getSeatPosition(index: number): { x: number; y: number } {
  const angleDeg = (index / SEAT_COUNT) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER + RADIUS * Math.sin(angleRad),
  };
}

function getSeatLabelPosition(index: number): { x: number; y: number } {
  const LABEL_RADIUS = RADIUS + 44;
  const angleDeg = (index / SEAT_COUNT) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + LABEL_RADIUS * Math.cos(angleRad),
    y: CENTER + LABEL_RADIUS * Math.sin(angleRad),
  };
}

interface RoundTableProps {
  seats: Seat[];
  onSeatClick: (index: number) => void;
}

export function RoundTable({ seats, onSeatClick }: RoundTableProps) {
  const filledCount = seats.filter(s => s.figure !== null).length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative"
        style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
      >
        {/* Table surface */}
        <div
          className="absolute rounded-full"
          style={{
            width: RADIUS * 1.35,
            height: RADIUS * 1.35,
            left: CENTER - (RADIUS * 1.35) / 2,
            top: CENTER - (RADIUS * 1.35) / 2,
            background: "radial-gradient(circle at 40% 35%, #4a2410, #1e0c04)",
            boxShadow: "0 0 40px rgba(201, 168, 76, 0.15), inset 0 2px 8px rgba(255,255,255,0.05)",
            border: "2px solid rgba(201, 168, 76, 0.4)",
          }}
        />

        {/* Table center emblem */}
        <div
          className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
          style={{
            width: RADIUS * 1.35 - 24,
            height: RADIUS * 1.35 - 24,
            left: CENTER - (RADIUS * 1.35 - 24) / 2,
            top: CENTER - (RADIUS * 1.35 - 24) / 2,
          }}
        >
          <div className="text-amber-600/60 text-xs font-serif tracking-[0.3em] uppercase mb-0.5">
            The
          </div>
          <div className="text-amber-500/80 text-sm font-serif tracking-[0.2em] uppercase leading-tight">
            Round<br />Table
          </div>
          {filledCount > 0 && (
            <div className="text-amber-700/50 text-[10px] mt-1.5 tracking-wider">
              {filledCount} / 8
            </div>
          )}
        </div>

        {/* Seats */}
        {seats.map((seat) => {
          const pos = getSeatPosition(seat.index);
          const labelPos = getSeatLabelPosition(seat.index);

          return (
            <div key={seat.index}>
              {/* Seat button */}
              <div
                className="absolute"
                style={{
                  left: pos.x - 32,
                  top: pos.y - 32,
                  width: 64,
                  height: 64,
                }}
              >
                <SeatComponent
                  seatIndex={seat.index}
                  figure={seat.figure}
                  onClick={() => onSeatClick(seat.index)}
                />
              </div>

              {/* Name label */}
              {seat.figure && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: labelPos.x,
                    top: labelPos.y,
                    transform: "translate(-50%, -50%)",
                    width: 80,
                  }}
                >
                  <div className="text-center text-[10px] text-amber-300/80 font-medium leading-tight truncate">
                    {seat.figure.name.split(" ").slice(0, 2).join(" ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
