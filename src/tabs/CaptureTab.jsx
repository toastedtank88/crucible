import { useState } from 'react'

const LINEN = '#F5F0E8'
const INK = '#1C1917'
const GOLD = '#C4973A'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const DOMAINS = ['Projects', 'Family', 'Health', 'Finance', 'Faith', 'Learning', 'Other']

export default function CaptureTab() {
  const [text, setText] = useState('')
  const [domain, setDomain] = useState('Projects')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    const webhookUrl = import.meta.env.VITE_N8N_CAPTURE_WEBHOOK
    if (!webhookUrl) {
      setStatus('misconfigured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), domain, timestamp: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setText('')
      setTimeout(() => setStatus(null), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 20px', fontFamily: 'system-ui, sans-serif' }}>
          Quick Capture
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: INK, margin: '0 0 24px', lineHeight: 1.2 }}>
          What's on your mind?
        </h1>
        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 28 }} />

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Capture a thought, task, or idea…"
            rows={6}
            style={{
              width: '100%',
              background: 'transparent',
              border: `1px solid ${RULE}`,
              borderRadius: 4,
              padding: '14px 16px',
              fontSize: 16,
              lineHeight: 1.6,
              color: INK,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              resize: 'vertical',
              outline: 'none',
              marginBottom: 16,
            }}
          />

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 10 }}>
              Domain
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDomain(d)}
                  style={{
                    background: domain === d ? GOLD : 'transparent',
                    border: `1px solid ${domain === d ? GOLD : RULE}`,
                    borderRadius: 20,
                    padding: '5px 14px',
                    fontSize: 12,
                    color: domain === d ? '#fff' : MUTED,
                    fontFamily: 'system-ui, sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || !text.trim()}
            style={{
              width: '100%',
              padding: '14px',
              background: status === 'sent' ? '#4CAF50' : GOLD,
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
              cursor: status === 'sending' ? 'wait' : 'pointer',
              opacity: !text.trim() && status !== 'sent' ? 0.5 : 1,
            }}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Captured' : status === 'error' ? 'Try Again' : 'Capture'}
          </button>

          {status === 'error' && (
            <p style={{ fontSize: 13, color: '#ef4444', fontFamily: 'system-ui, sans-serif', marginTop: 12, textAlign: 'center' }}>
              Failed to send. Check your connection.
            </p>
          )}
          {status === 'misconfigured' && (
            <p style={{ fontSize: 13, color: '#ef4444', fontFamily: 'system-ui, sans-serif', marginTop: 12, textAlign: 'center' }}>
              VITE_N8N_CAPTURE_WEBHOOK is not set.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
