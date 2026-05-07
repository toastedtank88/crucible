import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const LINEN = '#F5F0E8'
const INK = '#1C1917'
const GOLD = '#C4973A'
const MUTED = '#78716C'
const RULE = '#D6CFC4'
const SOFT = '#EDE8DF'

function Section({ title, children, style }) {
  return (
    <div style={{ marginBottom: 40, ...style }}>
      <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', margin: '0 0 16px' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function StatRow({ label, value, sub, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: `1px solid ${RULE}` }}>
      <span style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{label}</span>
      <span style={{ fontSize: 16, color: accent ? GOLD : INK, fontFamily: "'Georgia', serif", fontWeight: accent ? 700 : 400 }}>
        {value}
        {sub && <span style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', marginLeft: 6 }}>{sub}</span>}
      </span>
    </div>
  )
}

function ProtocolPill({ protocol }) {
  const typeColor = {
    peptide: '#7C9A7E',
    hormone: '#8B7BA8',
    training: GOLD,
    supplement: '#7A9BB5',
  }
  const color = typeColor[protocol.protocol_type] || MUTED

  return (
    <div style={{ padding: '14px 16px', background: SOFT, borderRadius: 6, marginBottom: 10, borderLeft: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 15, color: INK, fontFamily: "'Georgia', serif", fontWeight: 700 }}>{protocol.name}</span>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', color, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          {protocol.protocol_type}
        </span>
      </div>
      <div style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 }}>
        {protocol.dose && <span>{protocol.dose} · </span>}
        <span>{protocol.frequency}</span>
        {protocol.timing_notes && <span> · {protocol.timing_notes}</span>}
      </div>
    </div>
  )
}

export default function BodyTab() {
  const [latestScan, setLatestScan] = useState(null)
  const [weightLog, setWeightLog] = useState([])
  const [target, setTarget] = useState(null)
  const [protocols, setProtocols] = useState([])
  const [loading, setLoading] = useState(true)
  const [logWeight, setLogWeight] = useState('')
  const [logging, setLogging] = useState(false)
  const [logStatus, setLogStatus] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      const [scanRes, weightRes, targetRes, protocolRes] = await Promise.all([
        supabase.from('body_scans').select('*').order('scan_date', { ascending: false }).limit(1).single(),
        supabase.from('weight_log').select('*').order('logged_date', { ascending: false }).limit(14),
        supabase.from('body_targets').select('*').eq('active', true).limit(1).single(),
        supabase.from('protocols').select('*').eq('status', 'active').order('start_date', { ascending: false }),
      ])
      if (scanRes.data) setLatestScan(scanRes.data)
      if (weightRes.data) setWeightLog(weightRes.data)
      if (targetRes.data) setTarget(targetRes.data)
      if (protocolRes.data) setProtocols(protocolRes.data)
      setLoading(false)
    }
    fetchAll()
  }, [])

  async function handleLogWeight(e) {
    e.preventDefault()
    const w = parseFloat(logWeight)
    if (!w || w < 100 || w > 500) return
    setLogging(true)
    const { error } = await supabase.from('weight_log').insert({
      logged_date: new Date().toISOString().split('T')[0],
      weight_lbs: w,
      notes: 'Logged from PWA',
    })
    if (!error) {
      setLogStatus('saved')
      setLogWeight('')
      // Refresh weight log
      const { data } = await supabase.from('weight_log').select('*').order('logged_date', { ascending: false }).limit(14)
      if (data) setWeightLog(data)
      setTimeout(() => setLogStatus(null), 2000)
    } else {
      setLogStatus('error')
    }
    setLogging(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Loading…</p>
      </div>
    )
  }

  const latestWeight = weightLog[0]
  const gapToTarget = target && latestWeight ? (parseFloat(latestWeight.weight_lbs) - parseFloat(target.target_weight)).toFixed(1) : null
  const scanAge = latestScan ? Math.floor((new Date() - new Date(latestScan.scan_date)) / (1000 * 60 * 60 * 24)) : null

  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>

        {/* Header */}
        <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 8px', fontFamily: 'system-ui, sans-serif' }}>
          Body
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: INK, margin: '0 0 32px', lineHeight: 1.2 }}>
          {latestWeight ? `${latestWeight.weight_lbs} lbs` : '—'}
        </h1>
        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 32 }} />

        {/* Quick Weight Log */}
        <Section title="Log Weight">
          <form onSubmit={handleLogWeight} style={{ display: 'flex', gap: 10 }}>
            <input
              type="number"
              step="0.1"
              placeholder="lbs"
              value={logWeight}
              onChange={e => setLogWeight(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: `1px solid ${RULE}`,
                borderRadius: 4,
                padding: '10px 14px',
                fontSize: 16,
                color: INK,
                fontFamily: "'Georgia', serif",
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={logging || !logWeight}
              style={{
                background: logStatus === 'saved' ? '#4CAF50' : GOLD,
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '10px 20px',
                fontSize: 13,
                letterSpacing: '0.08em',
                fontFamily: 'system-ui, sans-serif',
                cursor: logging ? 'wait' : 'pointer',
                opacity: !logWeight ? 0.5 : 1,
                textTransform: 'uppercase',
              }}
            >
              {logStatus === 'saved' ? 'Saved' : logging ? '…' : 'Log'}
            </button>
          </form>
        </Section>

        {/* Current Stats */}
        <Section title="Current">
          <StatRow
            label="Weight"
            value={latestWeight ? `${latestWeight.weight_lbs} lbs` : '—'}
            sub={latestWeight ? latestWeight.logged_date : null}
          />
          {target && (
            <StatRow
              label="Target"
              value={`${target.target_weight} lbs`}
              sub={target.target_date}
            />
          )}
          {gapToTarget && (
            <StatRow
              label="Gap"
              value={`${gapToTarget} lbs`}
              accent={true}
            />
          )}
          {target && target.target_bf && (
            <StatRow label="Target BF%" value={`${target.target_bf}%`} />
          )}
        </Section>

        {/* Latest Scan */}
        {latestScan && (
          <Section title={`Latest Scan — ${latestScan.scan_type.replace('_', ' ').toUpperCase()}`}>
            <StatRow label="Date" value={latestScan.scan_date} sub={scanAge ? `${scanAge}d ago` : null} />
            <StatRow label="Weight" value={`${latestScan.weight_lbs} lbs`} />
            <StatRow label="Body Fat" value={`${latestScan.bf_percent}%`} />
            {latestScan.lean_mass_lbs && <StatRow label="Lean Mass" value={`${latestScan.lean_mass_lbs} lbs`} />}
            {latestScan.visceral_area && (
              <StatRow
                label="Visceral Area"
                value={`${latestScan.visceral_area} cm²`}
                sub={latestScan.visceral_status}
                accent={latestScan.visceral_status === 'Optimal'}
              />
            )}
          </Section>
        )}

        {/* Weight Trend */}
        {weightLog.length > 1 && (
          <Section title="Recent Weight">
            {weightLog.slice(0, 7).map((entry, i) => (
              <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${RULE}` }}>
                <span style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{entry.logged_date}</span>
                <span style={{ fontSize: 14, color: i === 0 ? INK : MUTED, fontFamily: "'Georgia', serif" }}>{entry.weight_lbs} lbs</span>
              </div>
            ))}
          </Section>
        )}

        {/* Active Protocols */}
        {protocols.length > 0 && (
          <Section title="Active Protocols">
            {protocols.map(p => <ProtocolPill key={p.id} protocol={p} />)}
          </Section>
        )}

      </div>
    </div>
  )
}
