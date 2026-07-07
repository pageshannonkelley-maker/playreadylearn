import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const { blobs } = await list({
      token: process.env.PUBLIC_BLOG_READ_WRITE_TOKEN,
    });

    const blogFiles = blobs.filter(blob => blob.pathname.startsWith("blog/"));
    const posts = await Promise.all(
      blogFiles.map(async (blob) => {
        const fileResponse = await fetch(blob.url);
        const fileData = await fileResponse.json();
        return {
          ...fileData, 
          url: blob.url, 
        };
      })
    );

    return res.status(200).json({ posts });

  } catch (error) {
    console.error("🚨 Error parsing blog files:", error);
    return res.status(500).json({ error: "Failed to load blog posts" });
  }
}