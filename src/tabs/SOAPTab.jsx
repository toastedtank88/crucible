import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../supabase'

const LINEN = '#F5F0E8'
const INK = '#1C1917'
const GOLD = '#C4973A'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const mdComponents = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: '32px 0 10px', lineHeight: 1.25, fontFamily: "'Georgia', 'Times New Roman', serif" }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <div style={{ marginTop: 32, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap' }}>
          {children}
        </span>
        <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
      </div>
    </div>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: 16, fontWeight: 600, color: INK, margin: '20px 0 6px', fontFamily: "'Georgia', 'Times New Roman', serif" }}>{children}</h3>
  ),
  p: ({ children }) => (
    <p style={{ fontSize: 16, lineHeight: 1.8, color: INK, margin: '0 0 14px' }}>{children}</p>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 700, color: INK }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: 'italic' }}>{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16, margin: '16px 0', color: MUTED }}>
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: 20, margin: '0 0 14px', color: INK }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: 20, margin: '0 0 14px', color: INK }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 4 }}>{children}</li>
  ),
  hr: () => (
    <div style={{ borderTop: `1px solid ${RULE}`, margin: '24px 0' }} />
  ),
}

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
        <ReactMarkdown components={mdComponents}>{entry.content}</ReactMarkdown>
        {entry.evening_content && (
          <>
            <div style={{ borderTop: `1px solid ${RULE}`, margin: '40px 0 28px' }} />
            <p style={{ fontSize: 11, letterSpacing: '0.18em', color: GOLD, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'system-ui, sans-serif' }}>
              Evening Reflection
            </p>
            <ReactMarkdown components={mdComponents}>{entry.evening_content}</ReactMarkdown>
          </>
        )}
      </div>
    </div>
  )
}
