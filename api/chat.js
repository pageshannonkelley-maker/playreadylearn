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

function formatTextResponse(text, provider) {
  return { content: [{ type: "text", text }], provider };
}

function createFallbackResponse(message, debug) {
  return {
    content: [{ type: "text", text: message }],
    fallback: true,
    ...(debug ? { debug } : {}),
  };
}

async function tryClaude(messages, systemPrompt, maxTokens) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Claude error: ${response.status} ${body.slice(0,300)}`);
  }
  const data = await response.json();
  const text = data.content?.find(block => block.type === "text" && typeof block.text === "string")?.text || data.content?.[0]?.text || "";
  return formatTextResponse(text, "claude");
}

async function tryGemini(messages, systemPrompt) {
  const lastMessage = messages[messages.length - 1]?.content || "";
  const conversation = messages
    .slice(0, -1)
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\n${conversation ? `Previous conversation:\n${conversation}\n\n` : ""}User: ${lastMessage}\n\nAssistant:`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, { 
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ text: fullPrompt }] 
      }]
    })
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Gemini error: ${response.status} ${body.slice(0,300)}`);
  }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map(part => part.text).join("")?.trim() || "Let me think about that!";

  return formatTextResponse(text, "gemini");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { messages, systemPrompt, maxTokens } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    console.warn('Invalid request to /api/chat - missing or empty messages', { messages });
    return res.status(400).json({ error: 'Invalid request: "messages" must be a non-empty array' });
  }
  const activeSystemPrompt = systemPrompt || SUNNY_SYSTEM_PROMPT;
  // Default raised from 400 to 2000: 400 was cutting off longer generations
  // (e.g. the Admin panel's "Generate Post with Sunny" blog posts, which ask
  // for 400-600 words plus JSON structure — comfortably more than 400 tokens),
  // producing truncated, invalid JSON that failed to parse. Callers can still
  // pass a smaller/larger maxTokens explicitly if needed.
  const activeMaxTokens = Number.isFinite(maxTokens) && maxTokens > 0 ? maxTokens : 2000;

  const hasProviderKey = Boolean(process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY);
  console.log('ENV CHECK:', { hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY, hasGeminiKey: !!process.env.GEMINI_API_KEY });
  if (!hasProviderKey) {
    return res.status(200).json({
      content: [{
        type: "text",
        text: "I’m here and ready to help! Tell me your child’s age, what you have nearby, and how much energy you have, and I’ll suggest a simple activity."
      }]
    });
  }

  try {
    const result = await tryClaude(messages, activeSystemPrompt, activeMaxTokens);
    return res.status(200).json(result);
  } catch (claudeError) {
    console.warn("Claude failed, trying Gemini:", claudeError.message);
    try {
      const result = await tryGemini(messages, activeSystemPrompt);
      // TEMPORARY DIAGNOSTIC: surface why Claude failed even though Gemini
      // succeeded, so this is visible without waiting for a full outage.
      // Safe to remove once Claude is confirmed working again.
      return res.status(200).json({ ...result, claudeFailureReason: claudeError.message });
    } catch (geminiError) {
      console.error("Both providers failed - Claude:", claudeError.message, "Gemini:", geminiError.message);
      return res.status(200).json(createFallbackResponse(
        "I’m having trouble reaching my helper right now. Please try again in a moment.",
        {
          hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
          hasGeminiKey: !!process.env.GEMINI_API_KEY,
          claudeError: claudeError.message,
          geminiError: geminiError.message,
        }
      ));
    }
  }
}
