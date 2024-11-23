import { NextResponse } from "next/server";
import Instructor from "@instructor-ai/instructor";
import { Groq } from "groq-sdk";

import { TransactionSchema } from "../../../lib/type";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const instructor = Instructor({
  client: groq,
  mode: "TOOLS",
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (image.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image too large" }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const transaction = await instructor.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this UPI payment screenshot now extract all transactions details in the format.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${image.type};base64,${base64}`,
            },
          },
        ],
      },
    ],
    model: "llama-3.2-90b-vision-preview",
    response_model: {
      schema: TransactionSchema,
      name: "transaction",
    },
    max_tokens: 1024,
    temperature: 0.1,
  });
  console.log(transaction);

  return NextResponse.json(transaction);
}
