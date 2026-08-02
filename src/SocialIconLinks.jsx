// Add profile URLs to href when these social accounts are ready to connect.
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.3l.7-3h-3V9c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M14 4v9.1a3.9 3.9 0 1 1-3-3.8v3.1a1.2 1.2 0 1 0 .8 1.1V4h2.2c.4 2.2 1.8 3.6 4 4v3c-1.6-.2-3-.9-4-2v4.1a3.9 3.9 0 0 1-3.9 3.9" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M12.2 4C7.9 4 5 6.8 5 10.6c0 2.4 1.3 4.2 3.2 4.2.5 0 .8-.4.7-.9l-.2-.8c-.1-.3 0-.5.2-.8.4-.5.6-1.1.6-1.9 0-1.8 1.3-3.4 3.6-3.4 2 0 3.1 1.2 3.1 2.9 0 2.3-1 4.2-2.5 4.2-.8 0-1.4-.7-1.2-1.5.2-1 .7-2.1.7-2.8 0-.7-.4-1.2-1.1-1.2-.9 0-1.6.9-1.6 2.1 0 .8.3 1.3.3 1.3l-1.1 4.6c-.3 1.3 0 2.9 0 3 .1.1.2.1.3 0 .1-.1 1.6-2 2.1-3.8l.6-2.2c.3.6 1.1 1 2 1 2.6 0 4.4-2.4 4.4-5.6C19 6.5 16.6 4 12.2 4Z" />
      </svg>
    ),
  },
];

export default function SocialIconLinks() {
  return (
    <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
      {SOCIAL_LINKS.map((social) => {
        const isConnected = Boolean(social.href);

        return (
          <a
            key={social.label}
            href={isConnected ? social.href : "#"}
            aria-label={`${social.label} coming soon`}
            aria-disabled={!isConnected}
            title={`${social.label} coming soon`}
            onClick={(event) => {
              if (!isConnected) event.preventDefault();
            }}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid rgba(181, 149, 106, 0.55)",
              color: "#6B5344",
              background: "rgba(253, 250, 245, 0.72)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              cursor: isConnected ? "pointer" : "default",
            }}
          >
            <span style={{ width: "19px", height: "19px", display: "inline-flex" }}>
              {social.icon}
            </span>
          </a>
        );
      })}
    </div>
  );
}
