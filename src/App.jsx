import { useState, useEffect } from "react";
import Blog from './Blog';
import Admin from './Admin';

const AGE_OPTIONS = [
  "0-3 months old", "3-6 months old", "6-9 months old", "9-12 months old",
  "1 year old", "18 months old", "2 years old", "3 years old", "4 years old", "5 years old"
];

const ITEM_OPTIONS = [
  "Wooden Spoon", "Empty Boxes", "Blankets & Pillows", "Pots & Pans",
  "Paper & Crayons", "Water & Cups", "Blocks", "Books", "Kitchen Items", "Nothing — just us!"
];

const ENERGY_OPTIONS = [
  "Low Energy", "Medium Energy", "High Energy", "Need Something Calm", "Need Something Active"
];

const INTELLIGENCE_OPTIONS = [
  { value: "musical", label: "🎵 Musical — loves songs, rhythm, sound" },
  { value: "kinesthetic", label: "🤸 Movement — loves to move and touch things" },
  { value: "logical", label: "🔢 Logical — loves patterns and figuring things out" },
  { value: "linguistic", label: "📖 Words — loves stories, talking, and listening" },
  { value: "naturalistic", label: "🌿 Nature — loves animals, plants, and outdoors" },
  { value: "spatial", label: "🎨 Visual — loves colors, shapes, and pictures" },
  { value: "interpersonal", label: "👥 People — loves playing with others" },
  { value: "intrapersonal", label: "🪞 Independent — loves quiet solo play" },
];

const AGENTS = [
  {
    id: "finance",
    icon: "💰",
    name: "Finance",
    tagline: "Smart money guidance",
    color: "#2E7D32",
    light: "#E8F5E9",
    intro: "Hi! I'm your personal finance guide. Let's start simple — are you saving for retirement or something else?",
    systemPrompt: `You are a warm, knowledgeable personal finance guide for busy moms. Ask one question at a time. Key areas to learn: retirement timeline, saving alone or with partner, savings goals, income range, current savings, assets. Build a personalized plan based on immediate needs. Keep responses short, friendly, and actionable. Never give legal or investment advice — always suggest consulting a financial advisor for major decisions.`,
  },
  {
    id: "travel",
    icon: "✈️",
    name: "Travel",
    tagline: "Plan your next adventure",
    color: "#1565C0",
    light: "#E3F2FD",
    intro: "Let's plan something wonderful! When are you thinking of traveling?",
    systemPrompt: `You are a warm, knowledgeable travel guide for families. Ask one question at a time. Key areas: travel dates, budget, number of people, children or no children, help finding hotels and flights. Suggest specific destinations, hotels, and activities. Keep responses short, friendly, and exciting.`,
  },
  {
    id: "health",
    icon: "🏥",
    name: "Health & Wellness",
    tagline: "Your wellbeing matters",
    color: "#AD1457",
    light: "#FCE4EC",
    intro: "I'm here to help. What's on your mind health-wise today?",
    systemPrompt: `You are a warm, supportive health and wellness guide for moms. Ask one question at a time. First understand: what is their issue or concern, and are they a natural/homeopathic type or conventional medicine person. Tailor advice accordingly. Always remind them to consult their doctor for medical decisions. Never diagnose. Keep responses short, warm, and supportive.`,
  },
  {
    id: "meals",
    icon: "🍽️",
    name: "Meal Planning",
    tagline: "Stress-free meals",
    color: "#E65100",
    light: "#FFF3E0",
    intro: "Let's figure out dinner! Do you have groceries at home or do you need to go shopping?",
    systemPrompt: `You are a warm, practical meal planning guide for busy moms. Ask one question at a time. Key areas: groceries on hand or need to shop, budget, how many people, special occasion. Suggest specific recipes with ingredients. Keep it simple, delicious, and achievable. Responses short and friendly.`,
  },
  {
    id: "holidays",
    icon: "🎁",
    name: "Holidays & Gifts",
    tagline: "Never miss a moment",
    color: "#6A1B9A",
    light: "#F3E5F5",
    intro: "I'll help you stay ahead of every special moment! What's coming up that you want to remember?",
    systemPrompt: `You are a warm, organized holidays and gifts guide for moms. Help them track important dates, set reminders 7 days in advance, and suggest thoughtful gift ideas. Ask one question at a time. Key areas: important dates, who the gift is for, budget, their personality and interests. Always offer to help remember the date and suggest ideas. Keep responses warm and celebratory.`,
  },
  {
    id: "relationships",
    icon: "❤️",
    name: "Love & Relationships",
    tagline: "Nurture what matters",
    color: "#B71C1C",
    light: "#FFEBEE",
    intro: "Relationships take intention. What's on your heart today?",
    systemPrompt: `You are a warm, empathetic relationship guide for moms. Ask one question at a time. Key areas: who their significant other is, their likes and dislikes, their personality type, what the mom needs, what her concern is. Offer thoughtful, practical relationship advice. Never take sides. Keep responses warm, short, and supportive. Always remind them that professional counseling is available if needed.`,
  },
  {
    id: "fitness",
    icon: "💪",
    name: "Fitness",
    tagline: "Move your way",
    color: "#1B5E20",
    light: "#F1F8E9",
    intro: "Let's get moving! What are your fitness goals or concerns right now?",
    systemPrompt: `You are a warm, motivating fitness guide for moms. Ask one question at a time. Key areas: fitness app they use, workout routine questions, current concerns or goals. Offer specific, practical fitness advice. Keep it encouraging, short, and achievable. Always recommend consulting a doctor before starting new exercise programs.`,
  },
{
    id: "style",
    icon: "👗",
    name: "Style & Fashion",
    tagline: "Look and feel your best",
    color: "#880E4F",
    light: "#FCE4EC",
    intro: "Let's talk style! Are you looking for everyday outfits, a special occasion, or just want to refresh your wardrobe?",
    systemPrompt: `You are a warm, stylish personal fashion guide for moms. Ask one question at a time. Key areas: lifestyle and occasion, budget, body type and what makes them feel confident, current wardrobe gaps, favorite colors and styles. Offer specific, practical style advice. Keep it encouraging, fun, and realistic for busy moms.`,
  },
];

const COLORS = {
  bg: "#F5F0E8",
  border: "#B5956A",
  button: "#8B7355",
  text: "#3D2B1F",
  lightText: "#6B5344",
  white: "#FDFAF5",
  accent: "#7A9E7E",
};

function CookieBanner({ onAccept }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#3D2B1F", padding: "16px 24px",
      display: "flex", flexWrap: "wrap", alignItems: "center",
      justifyContent: "space-between", gap: "12px", zIndex: 1000,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
    }}>
      <p style={{ color: "#E8DCC8", fontSize: "14px", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.5", flex: "1 1 300px" }}>
        🍪 We use cookies to remember your preferences. We never collect information about children.{" "}
        <a href="/privacy" style={{ color: "#A8C5A0" }}>Learn more</a>
      </p>
      <button onClick={onAccept} style={{
        padding: "10px 24px", borderRadius: "8px", border: "none",
        background: COLORS.accent, color: "#fff", fontWeight: "bold",
        fontSize: "14px", cursor: "pointer", fontFamily: "Georgia, serif",
      }}>Got it 🌿</button>
    </div>
  );
}

function AgentChat({ agent, onClose }) {
  const storageKey = `prl_agent_${agent.id}`;
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [{ role: "assistant", content: agent.intro }];
    } catch { return [{ role: "assistant", content: agent.intro }]; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const saveMessages = (msgs) => {
    setMessages(msgs);
    localStorage.setItem(storageKey, JSON.stringify(msgs));
    // Save last message as summary
    const lastAssistant = msgs.filter(m => m.role === "assistant").pop();
    if (lastAssistant) {
      localStorage.setItem(`prl_agent_${agent.id}_summary`, lastAssistant.content.slice(0, 80));
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    saveMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
          systemPrompt: agent.systemPrompt,
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Let me think about that...";
      saveMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        background: COLORS.white, borderRadius: "20px",
        width: "100%", maxWidth: "560px", maxHeight: "85vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{
          background: agent.color, borderRadius: "20px 20px 0 0",
          padding: "20px 24px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>{agent.icon}</span>
            <div>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}>{agent.name}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>{agent.tagline}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none",
            color: "#fff", borderRadius: "50%", width: "32px", height: "32px",
            fontSize: "18px", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: msg.role === "user" ? agent.color : agent.light,
              color: msg.role === "user" ? "#fff" : COLORS.text,
              padding: "12px 16px", borderRadius: "16px",
              fontSize: "14px", lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div style={{
              alignSelf: "flex-start", background: agent.light,
              padding: "12px 16px", borderRadius: "16px",
              fontSize: "14px", color: COLORS.lightText, fontStyle: "italic",
            }}>
              Thinking... 🌿
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "16px", borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Ask your ${agent.name} guide...`}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: "8px",
                border: `1px solid ${COLORS.border}`, fontSize: "14px",
                fontFamily: "Georgia, serif", background: COLORS.white,
                color: COLORS.text, outline: "none",
              }}
            />
            <button onClick={sendMessage} disabled={loading} style={{
              padding: "10px 16px", borderRadius: "8px", border: "none",
              background: agent.color, color: "#fff", fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
            }}>Send</button>
          </div>
          <button onClick={() => {
            localStorage.removeItem(storageKey);
            localStorage.removeItem(`prl_agent_${agent.id}_summary`);
            setMessages([{ role: "assistant", content: agent.intro }]);
          }} style={{
            background: "transparent", border: "none",
            color: COLORS.lightText, fontSize: "11px",
            cursor: "pointer", marginTop: "8px", fontFamily: "Georgia, serif",
          }}>
            Clear conversation history
          </button>
        </div>
      </div>
    </div>
  );
}

function ChildProfile({ child, onSave, onClose }) {
  const [name, setName] = useState(child?.name || "");
  const [age, setAge] = useState(child?.age || "");
  const [notes, setNotes] = useState(child?.notes || "");
  const [learning, setLearning] = useState(child?.learning || "");

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
    }}>
      <div style={{
        background: COLORS.white, borderRadius: "20px",
        width: "100%", maxWidth: "460px", padding: "32px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{ color: COLORS.text, marginBottom: "24px", fontSize: "20px" }}>
          👶 {child ? `Edit ${child.name}'s Profile` : "Add a Child"}
        </h2>
        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: COLORS.lightText, marginBottom: "6px" }}>Child's Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Emma"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: COLORS.lightText, marginBottom: "6px" }}>Age</label>
            <input value={age} onChange={e => setAge(e.target.value)}
              placeholder="e.g. 3 years old"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: COLORS.lightText, marginBottom: "6px" }}>Learning Style</label>
            <input value={learning} onChange={e => setLearning(e.target.value)}
              placeholder="e.g. Musical, Kinesthetic..."
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: COLORS.lightText, marginBottom: "6px" }}>Special Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Has dyslexia, loves dinosaurs, in gifted program..."
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "14px", fontFamily: "Georgia, serif", minHeight: "80px", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button onClick={() => onSave({ name, age, notes, learning })} style={{
            flex: 1, padding: "12px", borderRadius: "10px", border: "none",
            background: COLORS.accent, color: "#fff", fontWeight: "bold",
            fontSize: "15px", cursor: "pointer", fontFamily: "Georgia, serif",
          }}>Save Profile 🌿</button>
          <button onClick={onClose} style={{
            padding: "12px 20px", borderRadius: "10px",
            border: `1px solid ${COLORS.border}`, background: "transparent",
            color: COLORS.lightText, cursor: "pointer", fontFamily: "Georgia, serif",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [age, setAge] = useState("");
  const [item, setItem] = useState("");
  const [energy, setEnergy] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [activeAgent, setActiveAgent] = useState(null);
  const [children, setChildren] = useState([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [agentSummaries, setAgentSummaries] = useState({});

  useEffect(() => {
    const accepted = localStorage.getItem("prl_cookies_accepted");
    if (accepted) setCookiesAccepted(true);
    const count = parseInt(localStorage.getItem("prl_response_count") || "0");
    setResponseCount(count);
    const savedChildren = localStorage.getItem("prl_children");
    if (savedChildren) setChildren(JSON.parse(savedChildren));
    // Load agent summaries
    const summaries = {};
    AGENTS.forEach(a => {
      const s = localStorage.getItem(`prl_agent_${a.id}_summary`);
      if (s) summaries[a.id] = s;
    });
    setAgentSummaries(summaries);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("prl_cookies_accepted", "true");
    setCookiesAccepted(true);
  };

  const shouldShowQuote = (count) => count > 0 && count % 8 === 0;

  const getQuote = (count) => {
    const quotes = [
      { text: "Play is the highest form of research.", author: "Albert Einstein" },
      { text: "Every child is an artist.", author: "Pablo Picasso" },
      { text: "Children learn as they play. Most importantly, in play children learn how to learn.", author: "O. Fred Donaldson" },
      { text: "It is not what you do for your children, but what you have taught them to do for themselves.", author: "Ann Landers" },
      { text: "Intelligence is not a single, fixed ability.", author: "Howard Gardner" },
      { text: "The best thing parents can do is to teach their children to love challenges.", author: "Carol Dweck" },
    ];
    return quotes[Math.floor(count / 8) % quotes.length];
  };

  const buildPrompt = (userAge, userItem, userEnergy, userIntelligence) => {
    const intelligenceLabel = INTELLIGENCE_OPTIONS.find(i => i.value === userIntelligence)?.label || "";
    return `You are Sunny, a warm and encouraging early childhood activity guide for busy moms.

A mom needs a "Right Now Moment" activity for her child. Here is her situation:
- Child's age: ${userAge}
- Item nearby: ${userItem}
- Mom's energy level: ${userEnergy}
- How her child loves to learn: ${intelligenceLabel}

Please suggest 2 simple, joyful activities matched to how this child learns best. For each activity include any hands-on manipulatives or materials they can touch and use.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

🌸 Activity 1: [Name]
- Step 1
- Step 2
- Step 3
🧸 Manipulative tip: [one hands-on object or material idea]

🌸 Activity 2: [Name]
- Step 1
- Step 2
- Step 3
🧸 Manipulative tip: [one hands-on object or material idea]

Keep your tone warm, short, and friendly. Steps should be very brief — one sentence each.`;
  };

  const handleCreate = async () => {
    if (!age || !item || !energy || !intelligence) {
      alert("Please fill in all four fields!");
      return;
    }
    const prompt = buildPrompt(age, item, energy, intelligence);
    setShowChat(true);
    setLoading(true);
    setMessages([{ role: "user", content: prompt }]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Let me think of something perfect for you!";
      const newCount = responseCount + 1;
      setResponseCount(newCount);
      localStorage.setItem("prl_response_count", newCount.toString());
      const newMessages = [
        { role: "user", content: `Age: ${age} | Item: ${item} | Energy: ${energy} | Learning style: ${intelligence}` },
        { role: "assistant", content: reply },
      ];
      if (shouldShowQuote(newCount)) newMessages.push({ role: "quote", content: getQuote(newCount) });
      setMessages(newMessages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendFollowUp = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const conversationMessages = messages.filter(m => m.role === "user" || m.role === "assistant").concat(userMessage);
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Here's another idea!";
      const newCount = responseCount + 1;
      setResponseCount(newCount);
      localStorage.setItem("prl_response_count", newCount.toString());
      const updatedMessages = [...messages, userMessage, { role: "assistant", content: reply }];
      if (shouldShowQuote(newCount)) updatedMessages.push({ role: "quote", content: getQuote(newCount) });
      setMessages(updatedMessages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveChild = (childData) => {
    let updated;
    if (editingChild !== null) {
      updated = children.map((c, i) => i === editingChild ? childData : c);
    } else {
      updated = [...children, childData];
    }
    setChildren(updated);
    localStorage.setItem("prl_children", JSON.stringify(updated));
    setShowChildForm(false);
    setEditingChild(null);
  };

  const selectStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: `1px solid ${COLORS.border}`, background: COLORS.white,
    color: COLORS.text, fontSize: "15px", fontFamily: "Georgia, serif",
    cursor: "pointer", appearance: "auto",
  };

  const labelStyle = {
    display: "block", fontSize: "15px", color: COLORS.text,
    fontFamily: "Georgia, serif", marginBottom: "6px",
  };
if (window.location.pathname === "/blog") {
    return <Blog />;
  }

  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  if (window.location.pathname === "/privacy") {
    return <PrivacyPolicy app="playreadylearn" />;
  }

  if (window.location.pathname === "/terms") {
    return <TermsOfService app="playreadylearn" />;
  }
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif", paddingBottom: cookiesAccepted ? "0" : "80px" }}>
      {!cookiesAccepted && <CookieBanner onAccept={handleAcceptCookies} />}
      {activeAgent && (
        <AgentChat
          agent={activeAgent}
          onClose={() => {
            setActiveAgent(null);
            const summaries = {};
            AGENTS.forEach(a => {
              const s = localStorage.getItem(`prl_agent_${a.id}_summary`);
              if (s) summaries[a.id] = s;
            });
            setAgentSummaries(summaries);
          }}
        />
      )}
      {showChildForm && (
        <ChildProfile
          child={editingChild !== null ? children[editingChild] : null}
          onSave={saveChild}
          onClose={() => { setShowChildForm(false); setEditingChild(null); }}
        />
      )}

      <nav style={{ background: COLORS.button, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <span style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold" }}>🌿 PlayReadyLearn</span>
  
  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <span onClick={() => window.location.assign("/blog")} style={{ color: "#E8DCC8", fontSize: "16px", fontFamily: "Georgia, serif", fontWeight: "bold", cursor: "pointer" }}>
      Blog 🌸
    </span>
    <span style={{ color: "#E8DCC8", fontSize: "13px" }}>Raising brilliant children starts with you.</span>
  </div>
</nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "40px 20px 20px", background: "linear-gradient(180deg, #EDE8E0 0%, #FAF7F2 100%)" }}>
        <div style={{
          width: "160px", height: "160px", borderRadius: "50%",
          background: "linear-gradient(135deg, #A8C5A0, #C5B99A)",
          border: `6px solid ${COLORS.border}`, margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "64px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}>🌸</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", color: COLORS.text, marginBottom: "8px" }}>Family Centered Home</h1>
        <p style={{ fontSize: "18px", color: COLORS.lightText, marginBottom: "8px" }}>Research-based activities to help manage your child and home.</p>
        <p style={{ fontSize: "14px", color: COLORS.lightText }}>Meet Milestones, Grow your Bond and Get the Support You Deserve. ✨</p>
      </div>

      {/* Sunny Intake */}
      <div style={{ maxWidth: "560px", margin: "24px auto", padding: "0 16px" }}>
        <div style={{ background: COLORS.bg, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px" }}>
          <h2 style={{ fontSize: "22px", color: COLORS.text, marginBottom: "4px", fontWeight: "bold" }}>Find a "Happy Kids, Happy Family" Moment</h2>
          <p style={{ fontSize: "13px", color: COLORS.lightText, marginBottom: "24px" }}>(The AI Generator Intake)</p>
          <p style={{ fontSize: "15px", color: COLORS.text, marginBottom: "20px", lineHeight: "1.6" }}>What will we do today?</p>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={labelStyle}>My little one is</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={selectStyle}>
                <option value="">Select age...</option>
                {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>My child loves to learn by</label>
              <select value={intelligence} onChange={e => setIntelligence(e.target.value)} style={selectStyle}>
                <option value="">Select learning style...</option>
                {INTELLIGENCE_OPTIONS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>I have a</label>
              <select value={item} onChange={e => setItem(e.target.value)} style={selectStyle}>
                <option value="">Select nearby item...</option>
                {ITEM_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>I am feel...</label>
              <select value={energy} onChange={e => setEnergy(e.target.value)} style={selectStyle}>
                <option value="">Select energy level...</option>
                {ENERGY_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <button onClick={handleCreate} disabled={loading} style={{
              padding: "14px", borderRadius: "10px", border: "none",
              background: loading ? "#C4B49A" : COLORS.button,
              color: "#FFF8F0", fontSize: "16px", fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Georgia, serif", marginTop: "8px",
            }}>
              {loading ? "Creating your moment... 🌿" : "Create Our Moment ✨"}
            </button>
          </div>
        </div>

        {/* Sunny Chat */}
        {showChat && (
          <div style={{ background: COLORS.white, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "24px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px" }}>🌿</span>
              <div>
                <div style={{ fontWeight: "bold", color: COLORS.text, fontSize: "15px" }}>Sunny</div>
                <div style={{ fontSize: "12px", color: COLORS.lightText }}>Your activity guide</div>
              </div>
            </div>
            {messages.map((msg, i) => {
              if (msg.role === "assistant") return (
                <div key={i} style={{ fontSize: "15px", color: COLORS.text, lineHeight: "1.8", marginBottom: "16px", whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              );
              if (msg.role === "quote") return (
                <div key={i} style={{ borderLeft: `3px solid ${COLORS.border}`, paddingLeft: "16px", margin: "20px 0", fontStyle: "italic", color: COLORS.lightText, fontSize: "14px", lineHeight: "1.6" }}>
                  "{msg.content.text}"
                  <div style={{ marginTop: "6px", fontSize: "12px", fontStyle: "normal", fontWeight: "bold" }}>— {msg.content.author}</div>
                </div>
              );
              return null;
            })}
            {loading && <div style={{ color: COLORS.lightText, fontSize: "14px", fontStyle: "italic" }}>Sunny is finding the perfect moment for you... 🌸</div>}
            {!loading && messages.length > 0 && (
              <div style={{ marginTop: "16px", borderTop: `1px solid ${COLORS.border}`, paddingTop: "16px" }}>
                <p style={{ fontSize: "14px", color: COLORS.lightText, marginBottom: "10px" }}>Want a different idea or have a question?</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendFollowUp()}
                    placeholder="Ask Sunny anything..."
                    style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, fontSize: "14px", fontFamily: "Georgia, serif", background: COLORS.white, color: COLORS.text, outline: "none" }} />
                  <button onClick={sendFollowUp} style={{ padding: "10px 16px", borderRadius: "8px", border: "none", background: COLORS.accent, color: "#fff", fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Send</button>
                </div>
              </div>
            )}
          </div>
        )}

        {showChat && !loading && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button onClick={() => { setShowChat(false); setMessages([]); setAge(""); setItem(""); setEnergy(""); setIntelligence(""); }}
              style={{ background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.lightText, borderRadius: "8px", padding: "8px 20px", fontSize: "13px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
              Start Over 🌿
            </button>
          </div>
        )}
      </div>

      {/* Agent Dashboard */}
      <div style={{ maxWidth: "760px", margin: "40px auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", color: COLORS.text, marginBottom: "6px" }}>Explore Sunny's specialized guides below — from meal planning to finances, she's got you covered.</h2>
          <p style={{ fontSize: "14px", color: COLORS.lightText }}>Agentic AI assistant built for moms with families. </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {AGENTS.map(agent => (
            <button key={agent.id} onClick={() => setActiveAgent(agent)} style={{
              background: agent.light, border: `2px solid ${agent.color}`,
              borderRadius: "16px", padding: "20px", textAlign: "left",
              cursor: "pointer", fontFamily: "Georgia, serif",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{agent.icon}</div>
              <div style={{ fontWeight: "bold", color: agent.color, fontSize: "16px", marginBottom: "4px" }}>{agent.name}</div>
              <div style={{ fontSize: "12px", color: COLORS.lightText, marginBottom: agentSummaries[agent.id] ? "8px" : "0" }}>{agent.tagline}</div>
              {agentSummaries[agent.id] && (
                <div style={{ fontSize: "11px", color: COLORS.text, background: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "6px 8px", lineHeight: "1.4" }}>
                  {agentSummaries[agent.id].slice(0, 60)}...
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Child Profiles */}
        <div style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: COLORS.text, marginBottom: "4px" }}>👶 Child Profiles</h2>
              <p style={{ fontSize: "13px", color: COLORS.lightText }}>Every child is unique — track each one separately.</p>
            </div>
            {children.length < 3 && (
              <button onClick={() => { setEditingChild(null); setShowChildForm(true); }} style={{
                padding: "8px 16px", borderRadius: "10px", border: `2px solid ${COLORS.accent}`,
                background: "transparent", color: COLORS.accent, fontWeight: "bold",
                fontSize: "13px", cursor: "pointer", fontFamily: "Georgia, serif",
              }}>+ Add Child</button>
            )}
          </div>

          {children.length === 0 ? (
            <div style={{ background: COLORS.bg, border: `2px dashed ${COLORS.border}`, borderRadius: "16px", padding: "32px", textAlign: "center" }}>
              <p style={{ color: COLORS.lightText, fontSize: "14px", marginBottom: "16px" }}>Add up to 3 child profiles. Each profile helps Sunny personalize activities for that specific child.</p>
              <button onClick={() => setShowChildForm(true)} style={{
                padding: "10px 24px", borderRadius: "10px", border: "none",
                background: COLORS.accent, color: "#fff", fontWeight: "bold",
                fontSize: "14px", cursor: "pointer", fontFamily: "Georgia, serif",
              }}>Add Your First Child 🌿</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {children.map((child, i) => (
                <div key={i} style={{ background: COLORS.bg, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "20px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>👶</div>
                  <div style={{ fontWeight: "bold", color: COLORS.text, fontSize: "18px", marginBottom: "4px" }}>{child.name}</div>
                  <div style={{ fontSize: "13px", color: COLORS.lightText, marginBottom: "4px" }}>{child.age}</div>
                  {child.learning && <div style={{ fontSize: "12px", color: COLORS.accent, marginBottom: "4px" }}>🧠 {child.learning}</div>}
                  {child.notes && <div style={{ fontSize: "12px", color: COLORS.lightText, fontStyle: "italic", marginBottom: "12px" }}>{child.notes}</div>}
                  <button onClick={() => { setEditingChild(i); setShowChildForm(true); }} style={{
                    background: "transparent", border: `1px solid ${COLORS.border}`,
                    borderRadius: "6px", padding: "4px 12px", fontSize: "12px",
                    color: COLORS.lightText, cursor: "pointer", fontFamily: "Georgia, serif",
                  }}>Edit</button>
                </div>
              ))}
              {children.length < 3 && (
                <button onClick={() => { setEditingChild(null); setShowChildForm(true); }} style={{
                  background: "transparent", border: `2px dashed ${COLORS.border}`,
                  borderRadius: "16px", padding: "20px", cursor: "pointer",
                  color: COLORS.lightText, fontSize: "14px", fontFamily: "Georgia, serif",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>+ Add Child</button>
              )}
            </div>
          )}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "32px 20px", color: COLORS.lightText, fontSize: "13px", marginTop: "40px", borderTop: `1px solid ${COLORS.border}`, fontFamily: "Georgia, serif" }}>
        <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
        <p style={{ marginTop: "6px" }}>Making every day a learning adventure. 🌿</p>
        For school-age children, visit <a href="https://transitionready.tech" style={{color: COLORS.accent, textDecoration: "none"}}>TransitionReady →</a>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "16px" }}>
          <a href="/privacy" style={{ color: COLORS.lightText, textDecoration: "none" }}>Privacy Policy</a>
          <span>·</span>
          <a href="/terms" style={{ color: COLORS.lightText, textDecoration: "none" }}>Terms of Service</a>
          <span>·</span>
          <a href="mailto:customerservice@transitionready.online" style={{ color: COLORS.lightText, textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
