const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function CalendarBlock({ data }) {
  if (!data?.length) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Calendar
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      {data.map((event, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < data.length - 1 ? 12 : 0 }}>
          <div style={{ minWidth: 56, paddingTop: 2 }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em' }}>{event.time}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, color: INK, lineHeight: 1.4, marginBottom: 2 }}>{event.title}</p>
            {event.tag && (
              <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, fontFamily: 'system-ui, sans-serif' }}>
                {event.tag}
              </span>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
