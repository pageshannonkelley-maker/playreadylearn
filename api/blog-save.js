import { list } from "@vercel/blob";
const { url } = await put('articles/blob.txt', 'Hello World!', {
  access: 'public',
  storeId: process.env.PUBLIC_BLOG_STORE_ID,
});
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { post, category, secret } = req.body;

  if (secret !== "PlayReady2026") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const id = `post_${Date.now()}`;
    const postData = {
      id,
      title: post.title,
      content: post.content,
      category: category,
      excerpt: post.excerpt,
      publishedAt: new Date().toISOString(),
      author: "Shannon Page Kelley",
    };

    await put(`blog/${id}.json`, JSON.stringify(postData), {
      access: "public",
      contentType: "application/json",
      token: process.env.PUBLIC_BLOG_READ_WRITE_TOKEN,
      storeId: process.env.PUBLIC_BLOG_STORE_ID,
    });

    return res.status(200).json({ success: true, post: postData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}