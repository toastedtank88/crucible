const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function MenuTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 12 }}>
      <p style={{ fontSize: 13, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Menu</p>
      <div style={{ width: 32, height: 1, background: RULE }} />
      <p style={{ fontSize: 12, color: RULE, fontFamily: 'system-ui, sans-serif' }}>CRU-156</p>
    </div>
  )
}
