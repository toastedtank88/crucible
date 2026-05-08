const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const DOMAIN_ORDER = ['Spirit', 'Body', 'Project', 'Wealth', 'Family']

const DOMAIN_COLORS = {
  Spirit:  '#B8973A',
  Body:    '#6A9B6A',
  Project: '#5A7A9E',
  Wealth:  '#B8882A',
  Family:  '#A87075',
}

function TaskRow({ task, showDomain }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', border: `1.5px solid ${GOLD}`, marginTop: 7, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, color: INK, lineHeight: 1.5, marginBottom: 1 }}>{task.title}</p>
        {(showDomain || task.due_date) && (
          <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em' }}>
            {showDomain && task.domain}{(showDomain && task.due_date) ? ' · ' : ''}{task.due_date ? task.due_date : ''}
          </p>
        )}
      </div>
    </div>
  )
}

function DomainGroup({ domain, tasks }) {
  const color = DOMAIN_COLORS[domain] ?? MUTED
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 10, letterSpacing: '0.14em', color, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 8 }}>
        {domain}
      </p>
      {tasks.map(t => <TaskRow key={t.id ?? t.title} task={t} showDomain={false} />)}
    </div>
  )
}

function groupByDomain(tasks) {
  const groups = {}
  for (const t of tasks) {
    if (!groups[t.domain]) groups[t.domain] = []
    groups[t.domain].push(t)
  }
  return DOMAIN_ORDER.filter(d => groups[d]?.length > 0).map(d => ({ domain: d, tasks: groups[d] }))
}

export default function TasksBlock({ tasks, queue }) {
  const hasTasks = tasks?.length > 0
  const hasQueue = queue?.length > 0
  if (!hasTasks && !hasQueue) return null

  const isQuillData = hasTasks && tasks[0]?.id !== undefined
  const domainGroups = isQuillData ? groupByDomain(tasks) : null

  return (
    <section style={{ marginBottom: 40 }}>
      {hasTasks && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Tasks · Today
            </span>
            <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{tasks.length}</span>
          </div>
          {isQuillData && domainGroups
            ? domainGroups.map(g => <DomainGroup key={g.domain} {...g} />)
            : tasks.map((t, i) => <TaskRow key={i} task={t} showDomain={true} />)
          }
        </>
      )}
      {hasQueue && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: hasTasks ? '16px 0 14px' : '0 0 14px' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Queue
            </span>
            <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
          </div>
          {queue.map((t, i) => <TaskRow key={i} task={t} showDomain={true} />)}
        </>
      )}
    </section>
  )
}
