import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import FaithAnchorBlock from '../components/brief/FaithAnchorBlock'
import TodayFrameBlock from '../components/brief/TodayFrameBlock'
import ProtocolBlock from '../components/brief/ProtocolBlock'
import RelationshipsBlock from '../components/brief/RelationshipsBlock'
import CalendarBlock from '../components/brief/CalendarBlock'
import TasksBlock from '../components/brief/TasksBlock'
import TradingBlock from '../components/brief/TradingBlock'
import BodyBlock from '../components/brief/BodyBlock'
import LearningBlock from '../components/brief/LearningBlock'
import MilestonesBlock from '../components/brief/MilestonesBlock'
import MaintenanceBlock from '../components/brief/MaintenanceBlock'
import ClosingLineBlock from '../components/brief/ClosingLineBlock'

const LINEN = '#F5F0E8'
const MUTED = '#78716C'
const GOLD = '#C4973A'
const INK = '#1C1917'
const RULE = '#D6CFC4'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

function calcStreak(dates) {
  if (!dates.length) return 0
  const sorted = [...dates].sort((a, b) => new Date(b) - new Date(a))
  let streak = 1
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff = (new Date(sorted[i] + 'T12:00:00') - new Date(sorted[i+1] + 'T12:00:00')) / (1000*60*60*24)
    if (diff === 1) streak++
    else break
  }
  return streak
}

export default function BriefTab() {
  const [brief, setBrief] = useState(null)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBrief() {
      const [briefRes, streakRes] = await Promise.all([
        supabase.from('daily_briefs').select('id, date, sections, generated_at').order('date', { ascending: false }).limit(1).single(),
        supabase.from('daily_briefs').select('date').order('date', { ascending: false }).limit(60),
      ])
      if (briefRes.error) setError(briefRes.error.message)
      else setBrief(briefRes.data)
      if (streakRes.data) setStreak(calcStreak(streakRes.data.map(r => r.date)))
      setLoading(false)
    }
    fetchBrief()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Loading brief…
        </p>
      </div>
    )
  }

  if (error || !brief) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>
          {error || 'No brief found'}
        </p>
      </div>
    )
  }

  if (brief.sections?.parse_error) {
    return (
      <div style={{ background: LINEN, minHeight: '100%' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 4px', fontFamily: 'system-ui, sans-serif' }}>
            Daily Brief
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, color: INK, margin: '0 0 24px', fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>
            {brief.date ? formatDate(brief.date) : ''}
          </p>
          <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 32 }} />
          <p style={{ fontSize: 15, color: MUTED, fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
            Brief generation failed — the workflow ran but the output couldn't be parsed into sections. Re-trigger the n8n workflow to regenerate.
          </p>
        </div>
      </div>
    )
  }

  const s = brief.sections

  return (
    <div style={{ background: LINEN, minHeight: '100%' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>

        {/* Date + Streak Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 4px', fontFamily: 'system-ui, sans-serif' }}>
              Daily Brief
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: INK, margin: 0, fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>
              {brief.date ? formatDate(brief.date) : ''}
            </p>
          </div>
          {streak > 0 && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: GOLD, margin: 0, fontFamily: "'Georgia', serif", lineHeight: 1 }}>
                {streak}
              </p>
              <p style={{ fontSize: 10, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', margin: '3px 0 0', fontFamily: 'system-ui, sans-serif' }}>
                day streak
              </p>
            </div>
          )}
        </div>
        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 36 }} />

        <FaithAnchorBlock data={s.faith_anchor} />
        <TodayFrameBlock data={s.today_frame} />
        <ProtocolBlock data={s.protocol} />
        <RelationshipsBlock data={s.relationships} />
        <CalendarBlock data={s.calendar} />
        <TasksBlock tasks={s.tasks} queue={s.queue} />
        <TradingBlock data={s.trading} />
        <BodyBlock data={s.body} />
        <LearningBlock data={s.learning} />
        <MilestonesBlock data={s.milestones} />
        <MaintenanceBlock data={s.maintenance} />
        <ClosingLineBlock data={s.closing_line} />
      </div>
    </div>
  )
}
