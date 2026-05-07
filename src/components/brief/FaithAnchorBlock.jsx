const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function FaithAnchorBlock({ data }) {
  if (!data) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Faith Anchor
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      <p style={{ fontSize: 11, color: GOLD, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.1em', marginBottom: 10 }}>
        {data.reference}
      </p>
      <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16, marginBottom: 14 }}>
        <p style={{ fontSize: 16, fontStyle: 'italic', color: INK, lineHeight: 1.7, margin: 0 }}>
          "{data.verse}"
        </p>
      </div>
      <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
        {data.framing}
      </p>
    </section>
  )
}
