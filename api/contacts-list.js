import { list, get } from "@vercel/blob";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { secret } = req.body || {};
  if (secret !== "PlayReady2026") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const storeId = process.env.BLOB_STORE_EMAIL_PRIVATE_STORE_ID;

    // list() just returns metadata (pathnames), works the same regardless of
    // public/private, as long as storeId/auth resolves to the right store.
    const { blobs } = await list({ prefix: "contacts/", storeId });

    // Private blobs are never fetchable via a raw URL — must go through get()
    // with access: 'private', which streams the content back through this
    // function only (never exposed to the browser directly).
    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        const result = await get(blob.url, { access: "private", storeId });
        const text = await new Response(result.stream).text();
        return JSON.parse(text);
      })
    );

    submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return res.status(200).json({ submissions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
