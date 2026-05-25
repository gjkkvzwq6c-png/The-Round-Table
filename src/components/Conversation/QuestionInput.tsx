"use client";

import { useRef, useState } from "react";
import { LoadingDots } from "@/components/ui/LoadingDots";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function QuestionInput({ onSubmit, isLoading, disabled }: QuestionInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const q = value.trim();
    if (!q || isLoading || disabled) return;
    onSubmit(q);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="border-t border-amber-900/30 bg-gray-950/80 backdrop-blur-sm p-4">
      <div className="flex gap-3 items-end max-w-full">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={
            disabled
              ? "Seat a figure at the table to begin…"
              : "Pose a question or statement… (Enter to send)"
          }
          rows={1}
          className="flex-1 resize-none bg-black/40 border border-amber-800/30 rounded-xl px-4 py-2.5 text-amber-100 placeholder-amber-800/50 text-sm focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || isLoading || !value.trim()}
          className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900/40 disabled:cursor-not-allowed text-amber-100 disabled:text-amber-700/50 text-sm font-medium rounded-xl transition-colors"
        >
          {isLoading ? <LoadingDots /> : "Ask"}
        </button>
      </div>
      {isLoading && (
        <p className="text-amber-700/60 text-xs mt-2 pl-1">
          The table is deliberating…
        </p>
      )}
    </div>
  );
}
