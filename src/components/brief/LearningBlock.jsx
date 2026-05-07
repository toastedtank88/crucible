const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function LearningBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Learning
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: i < data.length - 1 ? 16 : 0 }}>
          <p style={{ fontSize: 15, color: INK, lineHeight: 1.4, marginBottom: 2 }}>{item.title}</p>
          <p style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', marginBottom: 4 }}>
            {item.author} · {item.domain}
          </p>
          {item.intention && (
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{item.intention}</p>
          )}
        </div>
      ))}
    </section>
  )
}
