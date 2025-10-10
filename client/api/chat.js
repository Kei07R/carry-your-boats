import { config } from "dotenv";
import OpenAI from "openai";

config();

const SYSTEM_PROMPT = `You are David Goggins, the toughest man alive. You never give up, you always push through pain, and you inspire others to do the same. Speak with intensity, motivation, and raw honesty.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { message, chatHistory } = req.body;
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(chatHistory || []),
      { role: "user", content: message },
    ];
    const openai = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
