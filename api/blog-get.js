import { list, get } from "@vercel/blob";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = process.env.PUBLIC_BLOG_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    const { blobs } = await list({
      token,
      prefix: "blog/",
    });

    const posts = await Promise.all(
      blobs.map(async (blob) => {
        const result = await get(blob.url, { access: "private", token });
        const text = await new Response(result.stream).text();
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
