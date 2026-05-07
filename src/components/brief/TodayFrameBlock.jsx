const GOLD = '#C4973A'
const INK = '#1C1917'
const RULE = '#D6CFC4'

export default function TodayFrameBlock({ data }) {
  if (!data) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Today's Frame
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: INK }}>
        {data}
      </p>
    </section>
  )
}
