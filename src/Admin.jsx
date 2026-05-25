import { useState } from "react";

const COLORS = {
  bg: "#F5F0E8",
  border: "#B5956A",
  button: "#8B7355",
  text: "#3D2B1F",
  lightText: "#6B5344",
  white: "#FDFAF5",
  accent: "#7A9E7E",
};

const CATEGORIES = [
  "Activities",
  "Child Development",
  "Gardner's Intelligence",
  "Mom Life",
  "Meal Planning",
  "Health & Wellness",
  "Finance Tips",
  "Relationships",
];

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();
  if (password === "PlayReady2026") {
    setAuthenticated(true);
  } else {
    alert("Incorrect password");
  }
};
  const generatePost = async () => {
    if (!topic || !category) {
      setError("Please enter a topic and select a category.");
      return;
    }
    setError("");
    setGenerating(true);
    setGeneratedPost(null);

    try {
      const prompt = `You are a warm, knowledgeable parenting blogger writing for PlayReadyLearn. 
      
Write a complete blog post about: "${topic}"
Category: ${category}

The blog is written by Page Shannon Kelley — a special education teacher and mom who believes every child is brilliant in their own way.

FORMAT YOUR RESPONSE AS JSON ONLY (no markdown, no backticks):
{
  "title": "engaging blog post title",
  "excerpt": "2 sentence summary that makes moms want to read more",
  "content": "full blog post, 400-600 words, warm and personal tone, research-based, practical tips moms can use today. Use line breaks between paragraphs."
}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setGeneratedPost(parsed);
    } catch (err) {
      setError("Something went wrong generating the post. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const savePost = async () => {
  setSaving(true);
  console.log("Sending password:", password);
  try {
    const response = await fetch("/api/blog-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        action: "save",
        post: { ...generatedPost, category },
      }),
    });
    const data = await response.json();
    console.log("Response:", data);
    if (data.success) {
      setSaveSuccess(true);
      setGeneratedPost(null);
      setTopic("");
      setCategory("");
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setError("Failed to save: " + data.error);
    }
  } catch (err) {
    setError("Something went wrong saving the post.");
  } finally {
    setSaving(false);
  }
};

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: COLORS.white, border: `2px solid ${COLORS.border}`, borderRadius: "20px", padding: "40px", maxWidth: "400px", width: "90%", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
          <h2 style={{ color: COLORS.text, marginBottom: "8px" }}>Blog Admin</h2>
          <p style={{ color: COLORS.lightText, fontSize: "14px", marginBottom: "24px" }}>Enter your admin password to continue.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", marginBottom: "16px", boxSizing: "border-box" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", background: COLORS.button, color: "#FFF8F0", fontWeight: "bold", fontSize: "15px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
              Enter 🌿
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <nav style={{ background: COLORS.button, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold", textDecoration: "none" }}>🌿 PlayReadyLearn</a>
        <span style={{ color: "#E8DCC8", fontSize: "13px" }}>Blog Admin</span>
      </nav>

      <div style={{ maxWidth: "720px", margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: "28px", color: COLORS.text, marginBottom: "8px" }}>Write a Blog Post 🌸</h1>
        <p style={{ fontSize: "14px", color: COLORS.lightText, marginBottom: "32px" }}>Enter a topic and Sunny will write a full post for you to review and publish.</p>

        {saveSuccess && (
          <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: "10px", padding: "16px", marginBottom: "24px", color: "#2E7D32", fontWeight: "bold" }}>
            ✅ Post published successfully!
          </div>
        )}

        {error && (
          <div style={{ background: "#FFEBEE", border: "1px solid #EF9A9A", borderRadius: "10px", padding: "16px", marginBottom: "24px", color: "#C62828" }}>
            {error}
          </div>
        )}

        <div style={{ background: COLORS.bg, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", color: COLORS.lightText, marginBottom: "6px" }}>Blog Topic</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. How musical intelligence helps toddlers learn to read"
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", color: COLORS.lightText, marginBottom: "6px" }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", background: COLORS.white }}>
              <option value="">Select a category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={generatePost} disabled={generating} style={{
            width: "100%", padding: "14px", borderRadius: "10px", border: "none",
            background: generating ? "#C4B49A" : COLORS.button,
            color: "#FFF8F0", fontSize: "16px", fontWeight: "bold",
            cursor: generating ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
          }}>
            {generating ? "Sunny is writing... 🌿" : "Generate Post with Sunny ✨"}
          </button>
        </div>

        {generatedPost && (
          <div style={{ background: COLORS.white, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px" }}>
            <h2 style={{ color: COLORS.text, fontSize: "22px", marginBottom: "8px" }}>{generatedPost.title}</h2>
            <p style={{ color: COLORS.lightText, fontSize: "14px", fontStyle: "italic", marginBottom: "24px", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "16px" }}>
              {generatedPost.excerpt}
            </p>
            <div style={{ fontSize: "15px", color: COLORS.text, lineHeight: "1.9", whiteSpace: "pre-wrap", marginBottom: "32px" }}>
              {generatedPost.content}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={savePost} disabled={saving} style={{
                flex: 1, padding: "14px", borderRadius: "10px", border: "none",
                background: saving ? "#C4B49A" : COLORS.accent,
                color: "#fff", fontSize: "16px", fontWeight: "bold",
                cursor: saving ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
              }}>
                {saving ? "Publishing..." : "Publish Post 🌿"}
              </button>
              <button onClick={() => { setGeneratedPost(null); setTopic(""); setCategory(""); }} style={{
                padding: "14px 20px", borderRadius: "10px",
                border: `1px solid ${COLORS.border}`, background: "transparent",
                color: COLORS.lightText, cursor: "pointer", fontFamily: "Georgia, serif",
              }}>
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}