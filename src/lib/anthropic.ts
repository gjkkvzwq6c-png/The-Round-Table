import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const authToken = process.env.ANTHROPIC_AUTH_TOKEN;

    if (!apiKey && !authToken) {
      throw new Error("Neither ANTHROPIC_API_KEY nor ANTHROPIC_AUTH_TOKEN is set.");
    }

    client = authToken
      ? new Anthropic({ authToken })
      : new Anthropic({ apiKey: apiKey! });
  }
  return client;
}
