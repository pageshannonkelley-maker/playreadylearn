import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Sunny! 🌟 I'm here to help you find fun activities for your little one. How old is your child?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
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
      const reply = data.content?.[0]?.text || "Let me think of some ideas for you!";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFDE7",
      fontFamily: "Merriweather, bold",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "#1565C0",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <span style={{ fontSize: "32px" }}>🌟</span>
        <div>
          <h1 style={{ color: "#FDD835", fontSize: "24px", fontWeight: "bold", margin: 0 }}>
             PlayReadyLearn
          </h1>
          <p style={{ color: "#90CAF9", fontSize: "13px", margin: 0 }}>
             Simple, joyful activities to meet milestones and grow your bond. 0% prep. 100% love.
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        maxWidth: "700px",
        width: "100%",
        margin: "0 auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            gap: "8px",
            alignItems: "flex-start",
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#FDD835",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}>
                🌟
              </div>
            )}
            <div style={{
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              background: msg.role === "user" ? "#E53935" : "#fff",
              color: msg.role === "user" ? "#fff" : "#333",
              fontSize: "15px",
              lineHeight: "1.6",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#FDD835",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}>
              🌟
            </div>
            <div style={{
              padding: "12px 16px",
              borderRadius: "20px 20px 20px 4px",
              background: "#fff",
              color: "#999",
              fontSize: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
              Sunny is thinking... 🌈
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        background: "#fff",
        borderTop: "2px solid #FDD835",
        padding: "16px",
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          gap: "12px",
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Tell Sunny about your child..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "25px",
              border: "2px solid #1565C0",
              fontSize: "15px",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "12px 24px",
              borderRadius: "25px",
              border: "none",
              background: loading ? "#ccc" : "#E53935",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Send 🌟
          </button>
        </div>
      </div>
    </div>
  );
}
