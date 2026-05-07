const GOLD = '#C4973A'
const LINEN = '#F5F0E8'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

function BookIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function PenIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}
function AnchorIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  )
}
function BodyIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  )
}
function MenuNavIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  )
}
function CaptureIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? GOLD : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

const tabs = [
  { id: 'brief',   label: 'Brief',   Icon: BookIcon },
  { id: 'soap',    label: 'SOAP',    Icon: PenIcon },
  { id: 'anchor',  label: 'Anchor',  Icon: AnchorIcon },
  { id: 'body',    label: 'Body',    Icon: BodyIcon },
  { id: 'menu',    label: 'Menu',    Icon: MenuNavIcon },
  { id: 'capture', label: 'Capture', Icon: CaptureIcon },
]

export default function NavBar({ active, setActive }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: LINEN,
      borderTop: `1px solid ${RULE}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 max(10px, env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '4px 10px',
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <Icon active={isActive} />
            <span style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isActive ? GOLD : MUTED,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: isActive ? 600 : 400,
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
