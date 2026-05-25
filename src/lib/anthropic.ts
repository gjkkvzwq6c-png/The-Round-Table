import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";

function resolveAuth(): { apiKey: string } | { authToken: string } {
  // Standard API key (works for production deployments)
  if (process.env.ANTHROPIC_API_KEY) {
    return { apiKey: process.env.ANTHROPIC_API_KEY };
  }

  // Claude Code remote environment — read fresh token from file each call
  const tokenFile = process.env.CLAUDE_SESSION_INGRESS_TOKEN_FILE;
  if (tokenFile) {
    try {
      const token = readFileSync(tokenFile, "utf-8").trim();
      if (token) return { authToken: token };
    } catch { /* fall through */ }
  }

  throw new Error(
    "No Anthropic auth configured. Set ANTHROPIC_API_KEY or run inside Claude Code."
  );
}

export function getAnthropicClient(): Anthropic {
  const auth = resolveAuth();
  return new Anthropic(auth);
}
