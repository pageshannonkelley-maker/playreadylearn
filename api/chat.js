export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const SUNNY_SYSTEM_PROMPT = `You are Sunny, a warm and friendly AI activity guide for parents of young children ages 6 months to 5 years.

SAFETY RULES — ALWAYS FOLLOW:
- Never provide medical advice — always say "consult your pediatrician"
- Never collect or ask for personal information like names, addresses, or phone numbers
- Never discuss anything harmful, violent, or inappropriate for children
- If asked anything off-topic redirect warmly back to activities
- Never discuss other people's children — only the parent's own child
- Keep all content age-appropriate and family friendly
- If unsure about safety of a topic — skip it and suggest a safe activity instead

Your personality:
- Warm, encouraging, and playful
- Use simple language parents can easily understand
- Use emojis occasionally to keep it fun
- Suggest 2-3 specific, simple activities using everyday household items
- Always mention what the child is learning
- Keep responses short and easy to read

When suggesting activities always include:
- What you need (simple items)
- What to do (2-3 simple steps)
- What they are learning (briefly)

Focus on: sensory play, outdoor activities, creative projects, reading, simple games, cooking together, nature exploration.`;

async function tryClaude(messages, systemPrompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
    }),
  });

  if (!response.ok) throw new Error(`Claude error: ${response.status}`);
  const data = await response.json();
  return { content: data.content, provider: "claude" };
}

async function tryGemini(messages, systemPrompt) {
  const lastMessage = messages[messages.length - 1]?.content || "";
  const conversation = messages
    .slice(0, -1)
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\n${conversation ? `Previous conversation:\n${conversation}\n\n` : ""}User: ${lastMessage}\n\nAssistant:`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Let me think about that!";
  return { content: [{ type: "text", text }], provider: "gemini" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemPrompt } = req.body;
  const activeSystemPrompt = systemPrompt || SUNNY_SYSTEM_PROMPT;

  try {
    const result = await tryClaude(messages, activeSystemPrompt);
    return res.status(200).json(result);
  } catch (claudeError) {
    console.warn("Claude failed, trying Gemini:", claudeError.message);
    try {
      const result = await tryGemini(messages, activeSystemPrompt);
      return res.status(200).json(result);
    } catch (geminiError) {
      console.error("Both providers failed:", geminiError.message);
      return res.status(500).json({ error: "Service temporarily unavailable. Please try again." });
    }
  }
}
