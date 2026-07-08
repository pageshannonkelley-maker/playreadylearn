import { list } from "@vercel/blob";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { blobs } = await list({
      token: process.env.PUBLIC_BLOG_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
      prefix: "blog/",
    });

    const posts = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        const text = await response.text();
        return JSON.parse(text);
      })
    );

    posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
