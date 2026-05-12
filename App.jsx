import { useState, useEffect } from "react";
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'

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
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#3D2B1F",
      padding: "16px 24px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      zIndex: 1000,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
    }}>
      <p style={{
        color: "#E8DCC8",
        fontSize: "14px",
        margin: 0,
        fontFamily: "Georgia, serif",
        lineHeight: "1.5",
        flex: "1 1 300px",
      }}>
        🍪 We use cookies to remember your preferences and improve your experience. 
        We never collect information about children. {" "}
        <a href="/privacy" style={{ color: "#A8C5A0", textDecoration: "underline" }}>
          Learn more
        </a>
      </p>
      <div style={{ display: "flex", gap: "10px", flex: "0 0 auto" }}>
        <button
          onClick={onAccept}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: COLORS.accent,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
          }}
        >
          Got it 🌿
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [age, setAge] = useState("");
  const [item, setItem] = useState("");
  const [energy, setEnergy] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("prl_cookies_accepted");
    if (accepted) setCookiesAccepted(true);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("prl_cookies_accepted", "true");
    setCookiesAccepted(true);
  };

  // Route: /privacy
  if (window.location.pathname === "/privacy") {
    return (
      <>
        <PrivacyPolicy app="playreadylearn" />
        <footer style={{
          textAlign: "center",
          padding: "24px 20px",
          color: COLORS.lightText,
          fontSize: "13px",
          borderTop: `1px solid ${COLORS.border}`,
          fontFamily: "Georgia, serif",
        }}>
          <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", gap: "16px" }}>
            <a href="/" style={{ color: COLORS.lightText }}>Home</a>
            <span>·</span>
            <a href="/terms" style={{ color: COLORS.lightText }}>Terms of Service</a>
            <span>·</span>
            <a href="mailto:hello@playreadylearn.com" style={{ color: COLORS.lightText }}>Contact</a>
          </div>
        </footer>
      </>
    );
  }

  // Route: /terms
  if (window.location.pathname === "/terms") {
    return (
      <>
        <TermsOfService app="playreadylearn" />
        <footer style={{
          textAlign: "center",
          padding: "24px 20px",
          color: COLORS.lightText,
          fontSize: "13px",
          borderTop: `1px solid ${COLORS.border}`,
          fontFamily: "Georgia, serif",
        }}>
          <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", gap: "16px" }}>
            <a href="/" style={{ color: COLORS.lightText }}>Home</a>
            <span>·</span>
            <a href="/privacy" style={{ color: COLORS.lightText }}>Privacy Policy</a>
            <span>·</span>
            <a href="mailto:hello@playreadylearn.com" style={{ color: COLORS.lightText }}>Contact</a>
          </div>
        </footer>
      </>
    );
  }

  const handleCreate = async () => {
    if (!age || !item || !energy) {
      alert("Please fill in all three fields!");
      return;
    }

    const prompt = `A parent needs a Right Now Moment activity. Here's their situation:
- Child's age: ${age}
- Item nearby: ${item}  
- Parent's energy level: ${energy}

Please suggest 2-3 simple, joyful activities they can do RIGHT NOW using what they have. Keep it warm, encouraging, and easy to follow.`;

    setShowChat(true);
    setLoading(true);
    setMessages([{ role: "user", content: prompt }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [{ role: "user", content: prompt }] 
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Let me think of something perfect for you!";
      setMessages([
        { role: "user", content: `Age: ${age} | Item: ${item} | Energy: ${energy}` },
        { role: "assistant", content: reply }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendFollowUp = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Here's another idea!";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    color: COLORS.text,
    fontSize: "15px",
    fontFamily: "Georgia, serif",
    cursor: "pointer",
    appearance: "auto",
  };

  const labelStyle = {
    display: "block",
    fontSize: "15px",
    color: COLORS.text,
    fontFamily: "Georgia, serif",
    marginBottom: "6px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAF7F2",
      fontFamily: "Georgia, serif",
      paddingBottom: cookiesAccepted ? "0" : "80px",
    }}>
      {/* Cookie Banner */}
      {!cookiesAccepted && <CookieBanner onAccept={handleAcceptCookies} />}

      {/* Nav */}
      <nav style={{
        background: COLORS.button,
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold" }}>
          🌿 PlayReadyLearn
        </span>
        <span style={{ color: "#E8DCC8", fontSize: "13px" }}>
          Simple moments. Big growth.
        </span>
      </nav>

      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "40px 20px 20px",
        background: "linear-gradient(180deg, #EDE8E0 0%, #FAF7F2 100%)",
      }}>
        <div style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #A8C5A0, #C5B99A)",
          border: `6px solid ${COLORS.border}`,
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "64px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}>
          🌸
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", color: COLORS.text, marginBottom: "8px" }}>
          Simple, joyful activities
        </h1>
        <p style={{ fontSize: "18px", color: COLORS.lightText, marginBottom: "8px" }}>
          to meet milestones and grow your bond.
        </p>
        <p style={{ fontSize: "14px", color: COLORS.lightText }}>
          No prep. No mess. Just moments. ✨
        </p>
      </div>

      {/* Intake Box */}
      <div style={{
        maxWidth: "560px",
        margin: "24px auto",
        padding: "0 16px",
      }}>
        <div style={{
          background: COLORS.bg,
          border: `2px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "32px",
        }}>
          <h2 style={{ fontSize: "22px", color: COLORS.text, marginBottom: "4px", fontWeight: "bold" }}>
            Find a "Right Now" Moment
          </h2>
          <p style={{ fontSize: "13px", color: COLORS.lightText, marginBottom: "24px" }}>
            (The AI Generator Intake)
          </p>

          <p style={{ fontSize: "15px", color: COLORS.text, marginBottom: "20px", lineHeight: "1.6" }}>
            What does your "right now" look like?
          </p>

          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={labelStyle}>My little one is</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={selectStyle}>
                <option value="">Select age...</option>
                {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
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
              <label style={labelStyle}>And honestly, I am feeling</label>
              <select value={energy} onChange={e => setEnergy(e.target.value)} style={selectStyle}>
                <option value="">Select energy level...</option>
                {ENERGY_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <button
              onClick={handleCreate}
              disabled={loading}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: loading ? "#C4B49A" : COLORS.button,
                color: "#FFF8F0",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                marginTop: "8px",
              }}
            >
              {loading ? "Creating your moment... 🌿" : "Create Our Moment ✨"}
            </button>
          </div>
        </div>

        {/* Chat Response */}
        {showChat && (
          <div style={{
            background: COLORS.white,
            border: `2px solid ${COLORS.border}`,
            borderRadius: "16px",
            padding: "24px",
            marginTop: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px" }}>🌿</span>
              <div>
                <div style={{ fontWeight: "bold", color: COLORS.text, fontSize: "15px" }}>Sunny</div>
                <div style={{ fontSize: "12px", color: COLORS.lightText }}>Your activity guide</div>
              </div>
            </div>

            {messages.filter(m => m.role === "assistant").map((msg, i) => (
              <div key={i} style={{
                fontSize: "15px",
                color: COLORS.text,
                lineHeight: "1.7",
                marginBottom: "16px",
                whiteSpace: "pre-wrap",
              }}>
                {msg.content}
              </div>
            ))}

            {loading && (
              <div style={{ color: COLORS.lightText, fontSize: "14px", fontStyle: "italic" }}>
                Sunny is finding the perfect moment for you... 🌸
              </div>
            )}

            {!loading && messages.length > 0 && (
              <div style={{ marginTop: "16px", borderTop: `1px solid ${COLORS.border}`, paddingTop: "16px" }}>
                <p style={{ fontSize: "14px", color: COLORS.lightText, marginBottom: "10px" }}>
                  Want a different idea or have a question?
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendFollowUp()}
                    placeholder="Ask Sunny anything..."
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: `1px solid ${COLORS.border}`,
                      fontSize: "14px",
                      fontFamily: "Georgia, serif",
                      background: COLORS.white,
                      color: COLORS.text,
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={sendFollowUp}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      border: "none",
                      background: COLORS.accent,
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reset button */}
        {showChat && !loading && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={() => { setShowChat(false); setMessages([]); setAge(""); setItem(""); setEnergy(""); }}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.lightText,
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              Start Over 🌿
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "32px 20px",
        color: COLORS.lightText,
        fontSize: "13px",
        marginTop: "40px",
        borderTop: `1px solid ${COLORS.border}`,
        fontFamily: "Georgia, serif",
      }}>
        <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
        <p style={{ marginTop: "6px" }}>Making every day a learning adventure. 🌿</p>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "16px" }}>
          <a href="/privacy" style={{ color: COLORS.lightText, textDecoration: "none" }}>Privacy Policy</a>
          <span>·</span>
          <a href="/terms" style={{ color: COLORS.lightText, textDecoration: "none" }}>Terms of Service</a>
          <span>·</span>
          <a href="mailto:hello@playreadylearn.com" style={{ color: COLORS.lightText, textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
