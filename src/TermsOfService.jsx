// Usage:
// <TermsOfService app="transitionready" /> for TransitionReady
// <TermsOfService app="playreadylearn" /> for PlayReadyLearn

const config = {
  transitionready: {
    name: "TransitionReady",
    url: "transitionready.tech",
    color: "#2563EB",
    accent: "#1E40AF",
    light: "#EFF6FF",
    tagline: "Educator-Focused Lesson Planning",
    contactEmail: "hello@transitionready.tech",
    serviceDescription: "an AI-powered lesson planning and transition planning tool for educators and special education professionals",
    prohibitedExtra: [
      "Enter real student names, student ID numbers, Social Security numbers, or any personally identifiable student information into the platform",
      "Use the platform to store or process confidential IEP records or federally protected student education records"
    ]
  },
  playreadylearn: {
    name: "PlayReadyLearn",
    url: "playreadylearn.com",
    color: "#DC2626",
    accent: "#1D4ED8",
    light: "#FEF2F2",
    tagline: "Learning Through Play",
    contactEmail: "hello@playreadylearn.com",
    serviceDescription: "an AI-powered activity planning tool for parents and caregivers of young children",
    prohibitedExtra: [
      "Enter any personally identifiable information about children, including names, birthdates, school names, or addresses",
      "Allow children under 13 to create accounts or directly use the platform without parental supervision"
    ]
  }
};

export default function TermsOfService({ app = "transitionready" }) {
  const c = config[app];
  const effectiveDate = "May 11, 2025";

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
          Terms of Service
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

      {/* Plain English summary */}
      <div style={{
        background: c.light,
        borderLeft: `4px solid ${c.color}`,
        margin: "32px auto",
        maxWidth: "760px",
        padding: "20px 24px",
        borderRadius: "0 8px 8px 0"
      }}>
        <p style={{
          margin: "0 0 8px 0",
          fontFamily: "'Arial', sans-serif",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: c.accent,
          fontWeight: "700"
        }}>
          Plain English Summary
        </p>
        <p style={{
          margin: 0,
          fontSize: "16px",
          lineHeight: "1.6",
          color: c.accent
        }}>
          Use our platform legally and ethically. Don't enter real child information. 
          Your content belongs to you. We provide the service as-is. 
          Questions? Just email us.
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 24px 64px"
      }}>
        <Section title="1. Acceptance of Terms" color={c.color}>
          <p>
            By accessing or using {c.name} ({c.url}), you agree to be bound by these Terms of Service 
            and our Privacy Policy. If you do not agree, please do not use the platform.
          </p>
          <p>
            These terms apply to all users of {c.name}, including {c.serviceDescription}.
          </p>
        </Section>

        <Section title="2. Description of Service" color={c.color}>
          <p>
            {c.name} is {c.serviceDescription}. Our platform uses artificial intelligence, 
            including the Claude API provided by Anthropic, to generate content in response to user prompts.
          </p>
          <p>
            AI-generated content is provided for informational and planning purposes only. 
            It should be reviewed by the user before use and is not a substitute for professional judgment.
          </p>
        </Section>

        <Section title="3. Eligibility" color={c.color}>
          <ul>
            <li>You must be at least 18 years old to create an account.</li>
            <li>You must provide accurate and complete registration information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            {app === "playreadylearn" && (
              <li>
                This platform is intended for parents and caregivers. Children under 13 may not 
                create accounts or use the platform directly.
              </li>
            )}
          </ul>
        </Section>

        <Section title="4. Your Content and Data" color={c.color}>
          <p>
            <strong>You own your content.</strong> Any lesson plans, activity ideas, rubrics, or other 
            materials you create and save through {c.name} belong to you. We do not claim ownership 
            of content you generate.
          </p>
          <p>
            By saving content on our platform, you grant {c.name} a limited license to store and 
            display that content back to you. We do not share your content with other users or third parties.
          </p>
          <p>
            You are responsible for ensuring that any content you create complies with applicable laws 
            and your institution's policies.
          </p>
        </Section>

        <Section title="5. Prohibited Uses" color={c.color}>
          <p>You agree NOT to:</p>
          <ul>
            {c.prohibitedExtra.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            <li>Use the platform for any illegal purpose or in violation of any regulations</li>
            <li>Attempt to reverse engineer, hack, or disrupt the platform or its infrastructure</li>
            <li>Use automated tools to scrape or extract content from the platform at scale</li>
            <li>Impersonate another person or misrepresent your affiliation</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Use the platform to generate content intended to harm, harass, or discriminate</li>
          </ul>
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "8px",
            padding: "14px 18px",
            marginTop: "12px"
          }}>
            <p style={{ margin: 0, color: "#991B1B", fontSize: "15px" }}>
              <strong>Important:</strong> Do not enter real children's personally identifiable information 
              into this platform. This includes names, birthdates, addresses, school records, or any 
              other identifying details. This is both a legal requirement and a moral responsibility.
            </p>
          </div>
        </Section>

        <Section title="6. AI-Generated Content Disclaimer" color={c.color}>
          <p>
            Our platform uses AI to generate content. While we strive for accuracy and quality, 
            AI-generated content may contain errors, omissions, or inappropriate suggestions. 
            You are responsible for reviewing all AI-generated content before using it in professional 
            or personal contexts.
          </p>
          <p>
            {app === "transitionready"
              ? "AI-generated lesson plans and rubrics are starting points, not final documents. All materials should be reviewed and adapted by qualified educators before use with students."
              : "AI-generated activity suggestions are intended as inspiration. Parents and caregivers should use their own judgment about the suitability and safety of any suggested activity for their child."}
          </p>
        </Section>

        <Section title="7. Intellectual Property" color={c.color}>
          <p>
            The {c.name} platform, including its design, code, branding, and non-user-generated content, 
            is owned by {c.name} and protected by intellectual property laws. You may not copy, reproduce, 
            or distribute any part of the platform without our written permission.
          </p>
        </Section>

        <Section title="8. Termination" color={c.color}>
          <p>
            You may close your account at any time by contacting us at {c.contactEmail}. 
            Upon request, we will delete your account and associated data within 30 days.
          </p>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms of Service, 
            with or without notice depending on the severity of the violation.
          </p>
        </Section>

        <Section title="9. Limitation of Liability" color={c.color}>
          <p>
            {c.name} is provided "as is" without warranties of any kind. We are not liable for:
          </p>
          <ul>
            <li>Errors or inaccuracies in AI-generated content</li>
            <li>Loss of data due to technical failures (though we work hard to prevent this)</li>
            <li>Indirect, incidental, or consequential damages arising from use of the platform</li>
            <li>Actions taken based on AI-generated suggestions</li>
          </ul>
          <p>
            Our total liability to you for any claim shall not exceed the amount you paid us in 
            the 12 months preceding the claim, or $100, whichever is greater.
          </p>
        </Section>

        <Section title="10. Changes to These Terms" color={c.color}>
          <p>
            We may update these Terms of Service from time to time. We will notify you of material 
            changes via email or a prominent notice in the app at least 30 days before they take effect. 
            Your continued use of the platform after changes constitutes acceptance of the updated terms.
          </p>
        </Section>

        <Section title="11. Governing Law" color={c.color}>
          <p>
            These Terms are governed by the laws of the State of Texas, without regard to conflict 
            of law principles. Any disputes shall be resolved in the courts of Texas.
          </p>
        </Section>

        <Section title="12. Contact" color={c.color}>
          <p>
            Questions about these Terms of Service? Contact us at:
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
