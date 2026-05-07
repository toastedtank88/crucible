import { useState } from "react";

const GOLD = "#C4973A";
const LINEN = "#F5F0E8";
const INK = "#1C1917";
const MUTED = "#78716C";
const RULE = "#D6CFC4";

const tabs = [
  { id: "brief",   label: "Brief",   icon: BookIcon },
  { id: "soap",    label: "SOAP",    icon: PenIcon },
  { id: "anchor",  label: "Anchor",  icon: AnchorIcon },
  { id: "body",    label: "Body",    icon: BodyIcon },
  { id: "menu",    label: "Menu",    icon: MenuIcon },
  { id: "capture", label: "Capture", icon: CaptureIcon },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function BookIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function PenIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function AnchorIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}
function BodyIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  );
}
function MenuIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}
function CaptureIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

// ─── Anchor Tab ───────────────────────────────────────────────────────────────

const sections = [
  {
    numeral: "I",
    heading: ["The furnace was ", "real."],
    body: "The refiner doesn't leave when it gets hot. He sits closer. What felt like abandonment was attendance. The heat was intentional. The presence was constant. That's the frame everything else fits inside.",
    bold: null,
  },
  {
    numeral: "II",
    heading: ["The ", "dross", " is not you."],
    body: "What surfaces in the heat isn't the real material — it's what He's removing so the real thing can be seen. The process doesn't diminish. It reveals. What remains after the fire is what was always true.",
    bold: null,
  },
  {
    numeral: "III",
    heading: ["The body ", "follows", " the will."],
    body: "Decisions made in clarity become reality over time. The work compounds. What the mind commits to, the body eventually catches up to. This is not a metaphor — it is a mechanism. Hold the course.",
    bold: null,
  },
  {
    numeral: "IV",
    heading: ["The ", "system", " holds the intention."],
    body: "A life without structure defaults to noise. The operating system exists to hold the signal — to reflect back who you're trying to be on the days when you can't remember. Open this and remember. That's why it's here.",
    bold: null,
  },
  {
    numeral: "V",
    heading: ["Meridian is what ", "refined", " material builds."],
    body: "The meridian is the highest point — maximum clarity, nothing hidden. The crucible shapes the material. The meridian is when it operates at full capacity. The process wasn't the end. It was preparation. This is what comes after.",
    bold: null,
  },
];

function AnchorTab() {
  return (
    <div style={{ background: LINEN, minHeight: "100%", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "48px 28px 120px" }}>

        {/* Label */}
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: MUTED, textTransform: "uppercase", margin: "0 0 20px", fontFamily: "system-ui, sans-serif" }}>
          Personal Anchor
        </p>

        {/* Title */}
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, color: INK, margin: "0 0 24px" }}>
          The <em style={{ color: GOLD, fontStyle: "italic" }}>Crucible</em><br />
          and What Comes After
        </h1>

        {/* Horizontal rule */}
        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 28 }} />

        {/* Scripture block */}
        <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20, marginBottom: 8 }}>
          <p style={{ fontSize: 16, fontStyle: "italic", color: INK, lineHeight: 1.7, margin: 0 }}>
            "He will sit as a refiner and purifier of silver; he will purify the Levites and refine them like gold and silver."
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", margin: "10px 0 0", fontFamily: "system-ui, sans-serif" }}>
            Malachi 3:3
          </p>
        </div>

        {/* Centered vertical divider */}
        <div style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}>
          <div style={{ width: 1, height: 48, background: RULE }} />
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={s.numeral}>
            {/* Numeral + rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, fontFamily: "system-ui, sans-serif" }}>{s.numeral}</span>
              <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
            </div>

            {/* Section heading */}
            <h2 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 14px", lineHeight: 1.25 }}>
              {s.heading[0]}
              <em style={{ color: GOLD, fontStyle: "italic" }}>{s.heading[1]}</em>
              {s.heading[2] || ""}
            </h2>

            {/* Body */}
            <p style={{ fontSize: 16, lineHeight: 1.8, color: INK, margin: "0 0 40px" }}>
              {s.body}
            </p>

            {i < sections.length - 1 && (
              <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 40 }} />
            )}
          </div>
        ))}

        {/* Closing */}
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <div style={{ width: 40, borderTop: `2px solid ${GOLD}`, margin: "0 auto 28px" }} />
          <p style={{ fontSize: 20, fontStyle: "italic", color: GOLD, margin: "0 0 12px" }}>
            Refined, not reduced.
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: MUTED, textTransform: "uppercase", fontFamily: "system-ui, sans-serif", margin: 0 }}>
            The Refiner sits. He hasn't left.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder Tabs ─────────────────────────────────────────────────────────

function PlaceholderTab({ label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 12 }}>
      <p style={{ fontSize: 13, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
        {label}
      </p>
      <div style={{ width: 32, height: 1, background: RULE }} />
      <p style={{ fontSize: 13, color: RULE, fontFamily: "system-ui, sans-serif" }}>coming soon</p>
    </div>
  );
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────

function NavBar({ active, setActive }) {
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: LINEN,
      borderTop: `1px solid ${RULE}`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "10px 0 max(10px, env(safe-area-inset-bottom))",
      zIndex: 100,
    }}>
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "4px 10px",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <Icon active={isActive} />
            <span style={{
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isActive ? GOLD : MUTED,
              fontFamily: "system-ui, sans-serif",
              fontWeight: isActive ? 600 : 400,
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("anchor");

  const renderTab = () => {
    switch (active) {
      case "anchor":  return <AnchorTab />;
      case "brief":   return <PlaceholderTab label="Brief" />;
      case "soap":    return <PlaceholderTab label="SOAP" />;
      case "body":    return <PlaceholderTab label="Body" />;
      case "menu":    return <PlaceholderTab label="Menu" />;
      case "capture": return <PlaceholderTab label="Capture" />;
      default:        return null;
    }
  };

  return (
    <div style={{ background: LINEN, minHeight: "100vh" }}>
      <div style={{ paddingBottom: 80 }}>
        {renderTab()}
      </div>
      <NavBar active={active} setActive={setActive} />
    </div>
  );
}
