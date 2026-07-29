import { put } from "@vercel/blob";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, consent } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (consent !== true) {
    return res.status(400).json({ error: "Marketing consent is required to submit this form." });
  }

  try {
    const id = `contact_${Date.now()}`;
    const submission = {
      id,
      name: name || "",
      email,
      message: message || "",
      consent: true,
      source: "playreadylearn.com contact form",
      submittedAt: new Date().toISOString(),
    };

    // Private store: requires authentication for all reads/writes (no public URL exposure).
    // storeId comes from the private "email" Blob store; auth is handled automatically
    // via Vercel's OIDC token when this store is connected to the project.
    await put(`contacts/${id}.json`, JSON.stringify(submission), {
      access: "private",
      contentType: "application/json",
      storeId: process.env.BLOB_STORE_EMAIL_PRIVATE_STORE_ID,
    });

    // Also send to the Google Sheet via Apps Script webhook, best-effort.
    // The URL itself is secret-equivalent (Apps Script deployed with "Anyone"
    // execute access), so it must only ever live in an env var, never in code.
    // A failure here should not block the actual submission from succeeding,
    // since the Blob store above is already the authoritative record.
    const sheetsWebhookUrl = process.env.CONTACT_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });
      } catch (sheetsErr) {
        console.warn("Failed to send contact submission to Google Sheet:", sheetsErr.message);
      }
    } else {
      console.warn("CONTACT_SHEETS_WEBHOOK_URL not set — skipping Google Sheet sync.");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
