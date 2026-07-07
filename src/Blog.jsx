import { useState, useEffect } from "react";

const COLORS = {
  bg: "#F5F0E8",
  border: "#B5956A",
  button: "#8B7355",
  text: "#3D2B1F",
  lightText: "#6B5344",
  white: "#FDFAF5",
  accent: "#7A9E7E",
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/blog-get");
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("🚨 Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Safe Date Formatting Helper Function
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) 
      ? "Recently" 
      : parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (selectedPost) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
        <nav style={{ background: COLORS.button, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold", textDecoration: "none" }}>🌿 PlayReadyLearn</a>
          <button onClick={() => setSelectedPost(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#FFF8F0", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            ← Back to Blog
          </button>
        </nav>
        <div style={{ maxWidth: "720px", margin: "40px auto", padding: "0 16px" }}>
          <div style={{ background: COLORS.accent, color: "#fff", display: "inline-block", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", marginBottom: "16px" }}>
            {selectedPost.category || "General"}
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", color: COLORS.text, marginBottom: "16px", lineHeight: "1.2" }}>
            {selectedPost.title || "Untitled Post"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <span style={{ fontSize: "28px" }}>🌸</span>
            <div>
              <div style={{ fontWeight: "bold", color: COLORS.text, fontSize: "14px" }}>{selectedPost.author || "PlayReadyLearn"}</div>
              <div style={{ fontSize: "12px", color: COLORS.lightText }}>
                {formatDate(selectedPost.publishedAt)}
              </div>
            </div>
          </div>
          <div style={{ fontSize: "16px", color: COLORS.text, lineHeight: "1.9", whiteSpace: "pre-wrap" }}>
            {selectedPost.content || "No content available."}
          </div>
          <div style={{ marginTop: "48px", padding: "24px", background: COLORS.bg, borderRadius: "16px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <p style={{ color: COLORS.text, fontSize: "15px", marginBottom: "16px" }}>Ready to try these ideas with your child?</p>
            <a href="/" style={{ display: "inline-block", padding: "12px 28px", background: COLORS.button, color: "#FFF8F0", borderRadius: "10px", textDecoration: "none", fontWeight: "bold", fontFamily: "Georgia, serif" }}>
              Try Sunny Now 🌿
            </a>
          </div>
        </div>
        <footer style={{ textAlign: "center", padding: "32px 20px", color: COLORS.lightText, fontSize: "13px", marginTop: "40px", borderTop: `1px solid ${COLORS.border}` }}>
          <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <nav style={{ background: COLORS.button, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ color: "#FFF8F0", fontSize: "22px", fontWeight: "bold", textDecoration: "none" }}>🌿 PlayReadyLearn</a>
        <span style={{ color: "#E8DCC8", fontSize: "13px" }}>Raising brilliant children starts with you.</span>
      </nav>
      <div style={{ textAlign: "center", padding: "48px 20px 32px", background: "linear-gradient(180deg, #EDE8E0 0%, #FAF7F2 100%)" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", color: COLORS.text, marginBottom: "12px" }}>The Sunny Blog 🌸</h1>
        <p style={{ fontSize: "16px", color: COLORS.lightText, maxWidth: "500px", margin: "0 auto" }}>
          Research-based ideas, honest mom moments, and activities that actually work.
        </p>
      </div>
      <div style={{ maxWidth: "760px", margin: "32px auto", padding: "0 16px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: COLORS.lightText, fontStyle: "italic" }}>Loading posts... 🌿</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: COLORS.lightText }}>
            <p style={{ fontSize: "18px", marginBottom: "8px" }}>🌱 First post coming soon!</p>
            <p style={{ fontSize: "14px" }}>Check back shortly for research-based activities and mom life tips.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "24px" }}>
            {posts.map((post, i) => (
              <div key={i} onClick={() => setSelectedPost(post)} style={{
                background: COLORS.white, border: `2px solid ${COLORS.border}`,
                borderRadius: "16px", padding: "28px", cursor: "pointer",
              }}
                onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"}
                onMouseOut={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ background: COLORS.accent, color: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "12px" }}>{post.category || "General"}</span>
                  <span style={{ fontSize: "12px", color: COLORS.lightText }}>
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h2 style={{ fontSize: "20px", color: COLORS.text, marginBottom: "10px", lineHeight: "1.3" }}>{post.title || "Untitled Post"}</h2>
                <p style={{ fontSize: "14px", color: COLORS.lightText, lineHeight: "1.6" }}>{post.excerpt || "Click read more to view this post."}</p>
                <div style={{ marginTop: "16px", fontSize: "13px", color: COLORS.accent, fontWeight: "bold" }}>Read more →</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer style={{ textAlign: "center", padding: "32px 20px", color: COLORS.lightText, fontSize: "13px", marginTop: "40px", borderTop: `1px solid ${COLORS.border}`, fontFamily: "Georgia, serif" }}>
        <p>© {new Date().getFullYear()} PlayReadyLearn — A Ready Learning LLC Product</p>
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