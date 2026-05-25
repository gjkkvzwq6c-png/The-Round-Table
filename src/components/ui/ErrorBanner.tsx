"use client";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 bg-red-950/60 border border-red-700/50 text-red-300 rounded-lg px-4 py-3 text-sm">
      <span className="mt-0.5 shrink-0">⚠</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="shrink-0 text-red-400 hover:text-red-200 transition-colors"
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}
