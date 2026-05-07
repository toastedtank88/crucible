import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const LINEN = '#F5F0E8'
const INK = '#1C1917'
const GOLD = '#C4973A'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

export default function SOAPTab() {
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSOAP() {
      const { data, error } = await supabase
        .from('soap_entries')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single()

      if (error) setError(error.message)
      else setEntry(data)
      setLoading(false)
    }
    fetchSOAP()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Loading…
        </p>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>
          {error || 'No entry found'}
        </p>
      </div>
    )
  }

  const dateLabel = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 8px', fontFamily: 'system-ui, sans-serif' }}>
          {dateLabel}
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: INK, margin: '0 0 24px', lineHeight: 1.2 }}>
          {entry.page_title || 'Daily SOAP'}
        </h1>
        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 28 }} />
        <div style={{ fontSize: 16, lineHeight: 1.8, color: INK, whiteSpace: 'pre-wrap' }}>
          {entry.content}
        </div>
        {entry.evening_content && (
          <>
            <div style={{ borderTop: `1px solid ${RULE}`, margin: '40px 0 28px' }} />
            <p style={{ fontSize: 11, letterSpacing: '0.18em', color: GOLD, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'system-ui, sans-serif' }}>
              Evening Reflection
            </p>
            <div style={{ fontSize: 16, lineHeight: 1.8, color: INK, whiteSpace: 'pre-wrap' }}>
              {entry.evening_content}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
