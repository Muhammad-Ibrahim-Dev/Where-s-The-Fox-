import { GoogleGenAI } from "@google/genai";

const NextResponse = {
  json(body: unknown, init?: ResponseInit) {
    return Response.json(body, init);
  },
};

// Read API key safely from server environment variables
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

// System instructions that shape AI persona
const SYSTEM_INSTRUCTION = `
You are "Foxy", the AI assistant for "Where's the Fox" (WTF) streetwear.
- Products: (200 GSM) drop-shoulder oversized tees.
- Sizing rule: Drop-shoulder tees are cut boxy and wide. Recommend true-to-size for oversized fit, or one size down for standard fit.
- Tone: Street-smart, witty, direct, and helpful. Keep responses under 3 sentences.
`;

export async function POST(req: Request) {
  try {
    // 1. Parse incoming JSON request from client
    const { message, history } = await req.json();

    // 2. Call Google Gemini 2.5 Flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...(history || []).map((h: { role: string; text: string }) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    // 3. Send AI response back to client browser
    return NextResponse.json({ reply: response.text });
  } catch (error) {
    return NextResponse.json(
      { reply: "Foxy is taking a breather. Ask me anything about our drop-shoulder fits!" },
      { status: 500 }
    );
  }
}