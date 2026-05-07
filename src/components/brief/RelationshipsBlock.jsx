const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function RelationshipsBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Relationships
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((r, i) => (
        <div key={i} style={{ marginBottom: i < data.length - 1 ? 14 : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: INK, fontFamily: 'system-ui, sans-serif' }}>
              {r.name}
            </p>
            {r.days_out === 0 && (
              <span style={{ fontSize: 11, color: GOLD, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}>Today</span>
            )}
            {r.days_out > 0 && (
              <span style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{r.days_out}d out</span>
            )}
          </div>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{r.note}</p>
        </div>
      ))}
    </section>
  )
}
