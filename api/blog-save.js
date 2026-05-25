import { put, list } from "@vercel/blob";

const ADMIN_PASSWORD = "PlayReady2026";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, password, post } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (action === "save") {
      const id = `post_${Date.now()}`;
      const postData = {
        id,
        title: post.title,
        content: post.content,
        category: post.category,
        excerpt: post.excerpt,
        publishedAt: new Date().toISOString(),
        author: "Page Shannon Kelley",
      };
      await put(`blog/${id}.json`, JSON.stringify(postData), {
        access: "public",
        contentType: "application/json",
      });
      return res.status(200).json({ success: true, post: postData });
    }
    if (action === "list") {
      const { blobs } = await list({ prefix: "blog/" });
      return res.status(200).json({ blobs });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
