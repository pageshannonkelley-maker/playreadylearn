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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!consent) {
      setError("Please check the box to let us know it's okay to email you.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, consent }),
      });
      const data = await response.json();
      if (data.success) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "claude_lead_captured", {
            event_category: "engagement",
            event_label: "playreadylearn_contact_form",
          });
        }
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setConsent(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <nav style={{ background: COLORS.button, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold", textDecoration: "none" }}>🌿 PlayReadyLearn</a>
      </nav>

      <div style={{ maxWidth: "560px", margin: "48px auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: "28px", color: COLORS.text, marginBottom: "8px" }}>Get in Touch 🌸</h1>
        <p style={{ fontSize: "14px", color: COLORS.lightText, marginBottom: "32px" }}>
          Leave your email and we'll keep you posted with updates, tips, and new features.
        </p>

        {submitted ? (
          <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: "12px", padding: "24px", color: "#2E7D32", fontWeight: "bold" }}>
            ✅ Thanks! We'll be in touch.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: COLORS.bg, border: `2px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px" }}>
            {error && (
              <div style={{ background: "#FFEBEE", border: "1px solid #EF9A9A", borderRadius: "10px", padding: "14px", marginBottom: "20px", color: "#C62828", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", color: COLORS.lightText, marginBottom: "6px" }}>Name (optional)</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", color: COLORS.lightText, marginBottom: "6px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "15px", fontFamily: "Georgia, serif", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", color: COLORS.lightText, marginBottom: "6px" }}>Message (optional)</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Anything you'd like to share?"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "14px", fontFamily: "Georgia, serif", minHeight: "100px", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px", fontSize: "13px", color: COLORS.lightText, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: "3px" }}
              />
              <span>
                Yes, please email me updates, tips, and marketing about PlayReadyLearn. We'll only use
                your email for this purpose, and you can ask us to stop at any time by emailing{" "}
                <a href="mailto:customerservice@transitionready.online" style={{ color: COLORS.accent }}>
                  customerservice@transitionready.online
                </a>.
              </span>
            </label>

            <button type="submit" disabled={submitting} style={{
              width: "100%", padding: "14px", borderRadius: "10px", border: "none",
              background: submitting ? "#C4B49A" : COLORS.button,
              color: "#FFF8F0", fontSize: "16px", fontWeight: "bold",
              cursor: submitting ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
            }}>
              {submitting ? "Sending..." : "Submit 🌿"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
