const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function TradingBlock({ data }) {
  if (!data) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Trading
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: INK, fontFamily: 'system-ui, sans-serif', marginBottom: 6 }}>
        {data.regime}
      </p>
      <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>
        {data.note}
      </p>
    </section>
  )
}
