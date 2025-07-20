// utils/gemini.js
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function checkPhishingEmail(emailText) {
  try {
    const prompt = `
You are a cybersecurity expert. Analyze the following email and classify it as either "Phishing" or "Legitimate". Also explain why.

Email:
${emailText}
`;

    // ✅ Correct method call using the ai.models namespace
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash", // or "gemini-2.5-pro"
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty response from Gemini API");

    return text;
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw new Error("Gemini API request failed.");
  }
}

module.exports = { checkPhishingEmail };
