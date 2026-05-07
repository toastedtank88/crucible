const GOLD = '#C4973A'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function BodyBlock({ data }) {
  if (!data) return null
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Body
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 10 }}>
        {data.weight_lbs != null && (
          <div>
            <p style={{ fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1 }}>{data.weight_lbs}</p>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em', marginTop: 3 }}>lbs</p>
          </div>
        )}
        {data.bf_percent != null && (
          <div>
            <p style={{ fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1 }}>{data.bf_percent}%</p>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em', marginTop: 3 }}>body fat</p>
          </div>
        )}
        {data.gap_lbs != null && (
          <div>
            <p style={{ fontSize: 22, fontWeight: 700, color: GOLD, lineHeight: 1 }}>{data.gap_lbs}</p>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em', marginTop: 3 }}>lbs to goal</p>
          </div>
        )}
      </div>
      {data.note && (
        <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{data.note}</p>
      )}
    </section>
  )
}
