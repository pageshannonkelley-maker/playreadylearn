// Add profile URLs to href when these social accounts are ready to connect.
const SOCIAL_LINKS = [
  {
    label: "Pinterest",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M12.2 4C7.9 4 5 6.8 5 10.6c0 2.4 1.3 4.2 3.2 4.2.5 0 .8-.4.7-.9l-.2-.8c-.1-.3 0-.5.2-.8.4-.5.6-1.1.6-1.9 0-1.8 1.3-3.4 3.6-3.4 2 0 3.1 1.2 3.1 2.9 0 2.3-1 4.2-2.5 4.2-.8 0-1.4-.7-1.2-1.5.2-1 .7-2.1.7-2.8 0-.7-.4-1.2-1.1-1.2-.9 0-1.6.9-1.6 2.1 0 .8.3 1.3.3 1.3l-1.1 4.6c-.3 1.3 0 2.9 0 3 .1.1.2.1.3 0 .1-.1 1.6-2 2.1-3.8l.6-2.2c.3.6 1.1 1 2 1 2.6 0 4.4-2.4 4.4-5.6C19 6.5 16.6 4 12.2 4Z" />
      </svg>
    ),
  },
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
    label: "LinkedIn",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M6.7 8.7H4V20h2.7V8.7ZM5.4 4C4.5 4 4 4.6 4 5.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4S6.2 4 5.4 4ZM20 13.5c0-3-1.6-5-4.2-5-1.6 0-2.6.9-3 1.7V8.7h-2.7V20h2.7v-6.3c0-1.7.9-2.7 2.2-2.7s2.1.9 2.1 2.7V20H20v-6.5Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="currentColor">
        <path d="M16.9 4h3.1l-6.7 7.7L21.2 20h-6.1l-4.8-5.6L4.9 20H1.8l7.2-8.3L1.5 4h6.3l4.3 5 4.8-5Zm-1.1 14h1.7L6.9 5.9H5.1L15.8 18Z" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5c-2 0-3.6 1.6-3.6 3.8v2.3c0 .5-.3.9-.8 1.1l-1.1.4c-.4.2-.4.8 0 1 1.2.6 1.8 1.6 2.2 2.6.3.7.9 1.2 1.7 1.2h.8l.8.9.8-.9h.8c.8 0 1.4-.5 1.7-1.2.4-1 1-2 2.2-2.6.4-.2.4-.8 0-1l-1.1-.4c-.5-.2-.8-.6-.8-1.1V8.3c0-2.2-1.6-3.8-3.6-3.8Z" />
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
