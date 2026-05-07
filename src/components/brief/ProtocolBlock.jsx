const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function ProtocolBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Protocol
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((p, i) => (
        <div key={i} style={{ marginBottom: i < data.length - 1 ? 16 : 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: INK, fontFamily: 'system-ui, sans-serif', marginBottom: 2 }}>
            {p.name}
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
            {p.detail}
          </p>
        </div>
      ))}
    </section>
  )
}
