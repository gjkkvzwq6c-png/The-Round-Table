import { Exchange, Seat } from "@/types";

const STORAGE_KEY = "round-table-state";

interface StoredState {
  seats: Seat[];
  exchanges: Exchange[];
}

export function saveState(seats: Seat[], exchanges: Exchange[]): void {
  if (typeof window === "undefined") return;
  const state: StoredState = { seats, exchanges };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
