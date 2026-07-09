import { useState } from "react";

const config = {
  transitionready: {
    name: "TransitionReady",
    url: "transitionready.tech",
    audience: "educators and special education professionals",
    color: "#2563EB",
    accent: "#1E40AF",
    light: "#EFF6FF",
    tagline: "Educator-Focused Lesson Planning",
    contactEmail: "customerservice@transitionready.online",
    extraSection: {
      title: "FERPA Compliance",
      content: `TransitionReady is designed with FERPA (Family Educational Rights and Privacy Act) compliance in mind. We do not collect, store, or process student education records. All lesson plans, rubrics, and materials generated through our platform belong to the educator and contain no student-identifying information. Educators are responsible for ensuring that any content they create through our platform complies with their institution's FERPA obligations.`
    }
  },
  playreadylearn: {
    name: "PlayReadyLearn",
    url: "playreadylearn.com",
    audience: "parents and caregivers",
    color: "#DC2626",
    accent: "#1D4ED8",
    light: "#FEF2F2",
    tagline: "Learning Through Play",
    contactEmail: "customerservice@transitionready.online",
    extraSection: {
      title: "COPPA Compliance",
      content: `PlayReadyLearn is designed with COPPA (Children's Online Privacy Protection Act) compliance in mind. We do not create profiles for children, and we do not collect any personally identifiable information about children under 13. Our service is directed at parents and caregivers, who are the account holders. We only ask for a child's general age range to personalize activity suggestions — no names, birthdates, or identifying information are ever collected or stored.`
    }
  }
};

export default function PrivacyPolicy({ app = "transitionready" }) {
  const c = config[app];
  const effectiveDate = "May 2026";

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#FAFAF9",
      minHeight: "100vh",
      color: "#1C1917"
    }}>
      {/* Header */}
      <div style={{
        background: c.color,
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <div style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "13px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          marginBottom: "12px"
        }}>
          {c.tagline}
        </div>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: "700",
          color: "#FFFFFF",
          margin: "0 0 8px 0",
          letterSpacing: "-0.5px"
        }}>
          {c.name}
        </h1>
        <p style={{
          fontSize: "20px",
          color: "rgba(255,255,255,0.85)",
          margin: "0",
          fontStyle: "italic"
        }}>
          Privacy Policy
        </p>
        <p style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          margin: "16px 0 0 0",
          fontFamily: "'Arial', sans-serif"
        }}>
          Effective Date: {effectiveDate}
        </p>
      </div>

      {/* Core promise banner */}
      <div style={{
        background: c.light,
        borderLeft: `4px solid ${c.color}`,
        margin: "32px auto",
        maxWidth: "760px",
        padding: "20px 24px",
        borderRadius: "0 8px 8px 0"
      }}>
        <p style={{
          margin: 0,
          fontSize: "17px",
          lineHeight: "1.6",
          fontWeight: "600",
          color: c.accent
        }}>
          Our core promise: We never collect, store, or share information about children. 
          {app === "transitionready"
            ? " We never store student records or identifying information."
            : " Children are never directly in our system."}
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 24px 64px"
      }}>
        <Section title="1. Who We Are" color={c.color}>
          <p>
            {c.name} ({c.url}) is an AI-powered tool designed for {c.audience}. 
            We are committed to protecting the privacy of our users and, above all, the children in their care.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>
        </Section>

        <Section title="2. What We Collect" color={c.color}>
          <p><strong>Information you provide when creating an account:</strong></p>
          <ul>
            <li>Name and email address</li>
            <li>Password (encrypted and never readable by us)</li>
            {app === "transitionready" && <li>Professional role (e.g., special education teacher)</li>}
            {app === "playreadylearn" && <li>Child's general age range (e.g., 4–6 years) — not name or birthdate</li>}
          </ul>

          <p><strong>Content you choose to save:</strong></p>
          <ul>
            {app === "transitionready"
              ? <>
                  <li>Lesson plans and transition plans you generate and save</li>
                  <li>Rubrics and materials you create</li>
                </>
              : <>
                  <li>Activity ideas and plans you save</li>
                  <li>Preferences you set for activity suggestions</li>
                </>
            }
          </ul>

          <p><strong>Usage data (anonymous):</strong></p>
          <ul>
            <li>Pages visited and features used</li>
            <li>Device type and browser (no fingerprinting)</li>
            <li>General location (country/region only)</li>
          </ul>
        </Section>

        <Section title="3. What We Never Collect" color={c.color}>
          <div style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "16px"
          }}>
            <p style={{ margin: 0, fontWeight: "600", color: "#166534" }}>
              We do not collect:
            </p>
            <ul style={{ margin: "8px 0 0 0", color: "#166534" }}>
              <li>Any personally identifiable information about children</li>
              <li>Student names, dates of birth, or student ID numbers</li>
              {app === "transitionready" && <li>IEP records or confidential student education records</li>}
              <li>Social Security numbers or government IDs</li>
              <li>Payment information (we use secure third-party processors)</li>
              <li>Location beyond country/region</li>
            </ul>
          </div>
          <p>
            {app === "transitionready"
              ? "Any student references in plans you create belong entirely to you and are stored under your account only. We strongly recommend using initials or codes rather than full student names in any content you generate."
              : "Your child is never a user of our platform. You, the parent or caregiver, are the user. We intentionally designed the system this way to protect children."}
          </p>
        </Section>

        <Section title={`4. ${c.extraSection.title}`} color={c.color}>
          <p>{c.extraSection.content}</p>
        </Section>

        <Section title="5. How We Use Your Information" color={c.color}>
          <p>We use your information solely to:</p>
          <ul>
            <li>Provide and improve our service</li>
            <li>Save and retrieve content you explicitly choose to save</li>
            <li>Send you service-related emails (account updates, not marketing, unless you opt in)</li>
            <li>Analyze anonymous usage patterns to improve the product</li>
          </ul>
          <p>We do not use your information for advertising. We do not sell your data. Ever.</p>
        </Section>

        <Section title="6. Data Sharing" color={c.color}>
          <p>We share your data only with:</p>
          <ul>
            <li><strong>Anthropic</strong> — AI processing for content generation (subject to Anthropic's privacy policy). Prompts sent to the AI are not stored by us beyond your session unless you save them.</li>
            <li><strong>Hosting and infrastructure providers</strong> — to operate the platform securely.</li>
            <li><strong>Legal requirements</strong> — if required by law, court order, or to protect the safety of our users.</li>
          </ul>
          <p>We never share your data with advertisers, data brokers, or third parties for commercial purposes.</p>
        </Section>

        <Section title="7. Data Retention and Deletion" color={c.color}>
          <ul>
            <li>Your saved content is retained until you delete it or close your account.</li>
            <li>Accounts inactive for 24 consecutive months may be automatically deleted after notice.</li>
            <li><strong>You can request deletion of all your data at any time</strong> by emailing us at {c.contactEmail}. We will process deletion requests within 30 days.</li>
            <li>Anonymous usage data may be retained in aggregated form after account deletion.</li>
          </ul>
        </Section>

        <Section title="8. Security" color={c.color}>
          <p>
            We use industry-standard security practices including encrypted connections (HTTPS), 
            encrypted password storage, and access controls. However, no system is perfectly secure. 
            We encourage you to use a strong, unique password and to notify us immediately if you 
            suspect unauthorized access to your account.
          </p>
        </Section>

        <Section title="9. Your Rights" color={c.color}>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Correct</strong> — update inaccurate information in your account settings</li>
            <li><strong>Delete</strong> — request deletion of your account and all associated data</li>
            <li><strong>Portability</strong> — request your saved content in a readable format</li>
            <li><strong>Opt out</strong> — unsubscribe from marketing emails at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at <strong>{c.contactEmail}</strong>.</p>
        </Section>

        <Section title="10. Changes to This Policy" color={c.color}>
          <p>
            We may update this policy from time to time. We will notify you of significant changes 
            via email or a prominent notice in the app at least 30 days before changes take effect. 
            Your continued use of the platform after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="11. Contact Us" color={c.color}>
          <p>
            Questions, concerns, or requests regarding this Privacy Policy should be directed to:
          </p>
          <div style={{
            background: "#F5F5F4",
            borderRadius: "8px",
            padding: "16px 20px",
            fontFamily: "'Arial', sans-serif",
            fontSize: "15px"
          }}>
            <strong>{c.name}</strong><br />
            {c.url}<br />
            Email: <a href={`mailto:${c.contactEmail}`} style={{ color: c.color }}>{c.contactEmail}</a>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <h2 style={{
        fontFamily: "'Arial', sans-serif",
        fontSize: "18px",
        fontWeight: "700",
        color: color,
        borderBottom: `2px solid ${color}`,
        paddingBottom: "8px",
        marginBottom: "16px",
        letterSpacing: "-0.3px"
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: "16px",
        lineHeight: "1.75",
        color: "#292524"
      }}>
        {children}
      </div>
    </div>
  );
}
