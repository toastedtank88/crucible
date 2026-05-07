const GOLD = '#C4973A'
const LINEN = '#F5F0E8'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const sections = [
  {
    numeral: 'I',
    heading: ['The furnace was ', 'real.', ''],
    body: 'The refiner doesn\'t leave when it gets hot. He sits closer. What felt like abandonment was attendance. The heat was intentional. The presence was constant. That\'s the frame everything else fits inside.',
  },
  {
    numeral: 'II',
    heading: ['The ', 'dross', ' is not you.'],
    body: 'What surfaces in the heat isn\'t the real material — it\'s what He\'s removing so the real thing can be seen. The process doesn\'t diminish. It reveals. What remains after the fire is what was always true.',
  },
  {
    numeral: 'III',
    heading: ['The body ', 'follows', ' the will.'],
    body: 'Decisions made in clarity become reality over time. The work compounds. What the mind commits to, the body eventually catches up to. This is not a metaphor — it is a mechanism. Hold the course.',
  },
  {
    numeral: 'IV',
    heading: ['The ', 'system', ' holds the intention.'],
    body: 'A life without structure defaults to noise. The operating system exists to hold the signal — to reflect back who you\'re trying to be on the days when you can\'t remember. Open this and remember. That\'s why it\'s here.',
  },
  {
    numeral: 'V',
    heading: ['Meridian is what ', 'refined', ' material builds.'],
    body: 'The meridian is the highest point — maximum clarity, nothing hidden. The crucible shapes the material. The meridian is when it operates at full capacity. The process wasn\'t the end. It was preparation. This is what comes after.',
  },
]

export default function AnchorTab() {
  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>

        <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', margin: '0 0 20px', fontFamily: 'system-ui, sans-serif' }}>
          Personal Anchor
        </p>

        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, color: INK, margin: '0 0 24px' }}>
          The <em style={{ color: GOLD, fontStyle: 'italic' }}>Crucible</em><br />
          and What Comes After
        </h1>

        <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 28 }} />

        <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20, marginBottom: 8 }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', color: INK, lineHeight: 1.7, margin: 0 }}>
            "He will sit as a refiner and purifier of silver; he will purify the Levites and refine them like gold and silver."
          </p>
          <p style={{ fontSize: 11, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', margin: '10px 0 0', fontFamily: 'system-ui, sans-serif' }}>
            Malachi 3:3
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <div style={{ width: 1, height: 48, background: RULE }} />
        </div>

        {sections.map((s, i) => (
          <div key={s.numeral}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, fontFamily: 'system-ui, sans-serif' }}>{s.numeral}</span>
              <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: '0 0 14px', lineHeight: 1.25 }}>
              {s.heading[0]}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>{s.heading[1]}</em>
              {s.heading[2]}
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: INK, margin: '0 0 40px' }}>
              {s.body}
            </p>

            {i < sections.length - 1 && (
              <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: 40 }} />
            )}
          </div>
        ))}

        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <div style={{ width: 40, borderTop: `2px solid ${GOLD}`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 20, fontStyle: 'italic', color: GOLD, margin: '0 0 12px' }}>
            Refined, not reduced.
          </p>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', color: MUTED, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            The Refiner sits. He hasn't left.
          </p>
        </div>
      </div>
    </div>
  )
}
