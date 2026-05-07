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

export default function BriefTab() {
  const [brief, setBrief] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBrief() {
      const { data, error } = await supabase
        .from('daily_briefs')
        .select('id, date, sections, generated_at')
        .order('date', { ascending: false })
        .limit(1)
        .single()

      if (error) setError(error.message)
      else setBrief(data)
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

  const s = brief.sections

  return (
    <div style={{ background: LINEN, minHeight: '100%' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
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
