const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function MilestonesBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Milestones
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < data.length - 1 ? 10 : 0 }}>
          <p style={{ fontSize: 15, color: INK }}>{m.name}</p>
          <div style={{ textAlign: 'right' }}>
            {m.days_out === 0 && (
              <span style={{ fontSize: 11, color: GOLD, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}>Today</span>
            )}
            {m.days_out > 0 && (
              <span style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{m.days_out}d</span>
            )}
            {m.days_out < 0 && (
              <span style={{ fontSize: 11, color: GOLD, fontFamily: 'system-ui, sans-serif' }}>{Math.abs(m.days_out)}d ago</span>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
