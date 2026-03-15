const { config } = require("dotenv");
const { OpenAI } = require("openai");
const { PERSONAS } = require("../personas");

config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const handleMessage = async (req, res) => {
  try {
    const { message, chatHistory, persona = "goggins" } = req.body;

    const systemPrompt = PERSONAS[persona] || PERSONAS.goggins;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(chatHistory || []),
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages,
    });

    const responseMessage = response.choices[0].message.content;
    res.json({ reply: responseMessage });
  } catch (error) {
    console.error("Error in chat completion:", error);
    res.status(500).json({
      error: "Failed to get response from AI",
      details: error.message,
    });
  }
};

module.exports = { handleMessage };
