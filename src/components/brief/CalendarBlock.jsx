const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function toEventDayString(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + n)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function CalendarBlock({ data, briefDate }) {
  if (!data?.length) return null

  const todayStr = briefDate ? toEventDayString(briefDate) : null
  const tomorrowStr = briefDate ? toEventDayString(addDays(briefDate, 1)) : null

  // Group events by day, preserving order of first appearance
  const groupMap = new Map()
  for (const event of data) {
    if (!groupMap.has(event.day)) groupMap.set(event.day, [])
    groupMap.get(event.day).push(event)
  }
  const groups = [...groupMap.entries()].map(([day, events]) => ({ day, events }))

  function dayLabel(day) {
    if (day === todayStr) return 'Today'
    if (day === tomorrowStr) return 'Tomorrow'
    return day
  }

  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Calendar
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>

      {groups.map((group, gi) => (
        <div key={group.day} style={{ marginBottom: gi < groups.length - 1 ? 20 : 0 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 8 }}>
            {dayLabel(group.day)}
          </p>
          {group.events.map((event, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < group.events.length - 1 ? 10 : 0 }}>
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
        </div>
      ))}
    </section>
  )
}
