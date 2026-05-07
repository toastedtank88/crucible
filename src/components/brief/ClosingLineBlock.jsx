const GOLD = '#C4973A'
const MUTED = '#78716C'

export default function ClosingLineBlock({ data }) {
  if (!data) return null
  return (
    <section style={{ paddingTop: 8, textAlign: 'center' }}>
      <div style={{ width: 40, borderTop: `2px solid ${GOLD}`, margin: '0 auto 24px' }} />
      <p style={{ fontSize: 18, fontStyle: 'italic', color: GOLD, lineHeight: 1.5 }}>
        {data}
      </p>
    </section>
  )
}
