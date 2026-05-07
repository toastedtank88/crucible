const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function MaintenanceBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Maintenance
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: i < data.length - 1 ? 10 : 0, gap: 12 }}>
          <div>
            <p style={{ fontSize: 15, color: INK, marginBottom: 2 }}>{item.item}</p>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em' }}>{item.category}</p>
          </div>
          <p style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap', paddingTop: 3 }}>{item.due_date}</p>
        </div>
      ))}
    </section>
  )
}
