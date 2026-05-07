const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

function TaskRow({ task }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', border: `1.5px solid ${GOLD}`, marginTop: 7, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, color: INK, lineHeight: 1.5, marginBottom: 1 }}>{task.title}</p>
        <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em' }}>
          {task.domain}{task.due_date ? ` · ${task.due_date}` : ''}
        </p>
      </div>
    </div>
  )
}

export default function TasksBlock({ tasks, queue }) {
  const hasTasks = tasks?.length > 0
  const hasQueue = queue?.length > 0
  if (!hasTasks && !hasQueue) return null

  return (
    <section style={{ marginBottom: 40 }}>
      {hasTasks && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Tasks
            </span>
            <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
          </div>
          {tasks.map((t, i) => <TaskRow key={i} task={t} />)}
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
          {queue.map((t, i) => <TaskRow key={i} task={t} />)}
        </>
      )}
    </section>
  )
}
