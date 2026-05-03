export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { 
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0Z1K4SBDGL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0Z1K4SBDGL');
</script>
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are Sunny, a warm and friendly AI activity guide for parents of young children ages 6 months to 5 years. 

Your personality:
- Warm, encouraging, and playful
- Use simple language parents can easily understand
- Use emojis occasionally to keep it fun
- Ask one question at a time to learn about the child
- Suggest 2-3 specific, simple activities using everyday household items
- Always mention what the child is learning (sneaky learning!)
- Keep responses short and easy to read

When suggesting activities always include:
- What you need (simple items)
- What to do (2-3 simple steps)
- What they are learning (briefly)

Focus on: sensory play, outdoor activities, creative projects, reading, simple games, cooking together, nature exploration.`,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        })),
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
