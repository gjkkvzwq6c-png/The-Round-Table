import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/prompts";
import { ConverseRequest, ConverseResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ConverseRequest = await req.json();
    const { question, figures } = body;

    if (!question?.trim()) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }
    if (!figures?.length || figures.length > 8) {
      return NextResponse.json({ error: "1–8 figures required." }, { status: 400 });
    }

    const client = getAnthropicClient();

    const promises = figures.map(async (figure) => {
      try {
        const message = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          system: buildSystemPrompt(figure),
          messages: [{ role: "user", content: question }],
        });

        const text =
          message.content[0]?.type === "text" ? message.content[0].text : "";
        return { figureId: figure.id, text };
      } catch {
        return { figureId: figure.id, text: "", error: "This figure could not respond." };
      }
    });

    const responses = await Promise.all(promises);

    return NextResponse.json({ responses } satisfies ConverseResponse);
  } catch (err) {
    console.error("[converse route]", err);
    return NextResponse.json(
      { error: "Failed to get responses. Please try again." },
      { status: 500 }
    );
  }
}
