export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body || {};

  if (!process.env.BLOG_ADMIN_PASSWORD || password !== process.env.BLOG_ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(200).json({ success: true });
}
