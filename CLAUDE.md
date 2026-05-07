# CrucibleOS

Personal operating system. Daily brief with a memory. One place, full context, every morning.

---

## Stack

- **Framework:** Vite + React + Tailwind CSS
- **Database:** Supabase (project ID: `dbnkkournwhgnguugbnq`)
- **Deploy:** Vercel (auto-deploy from `main`)
- **Project tracking:** Linear (CrucibleOS workspace, `CRU-` prefix)

## Dev Commands

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build
npm run preview    # preview production build
```

## Environment Variables

```
VITE_SUPABASE_URL=https://dbnkkournwhgnguugbnq.supabase.co
VITE_SUPABASE_ANON_KEY=<from Supabase dashboard → Settings → API>
```

Set in `.env.local` for development. Set in Vercel dashboard for production.
Never commit `.env.local`.

---

## Architecture

### 6-Tab PWA Nav (bottom, fixed)

| Tab | Route | Data Source |
|-----|-------|-------------|
| Brief | `/` | `public.daily_briefs` |
| SOAP | `/soap` | `public.soap_entries` |
| Anchor | `/anchor` | Static — no DB |
| Body | `/body` | `public.body_scans`, `public.weight_log`, `public.protocols`, `public.protocol_logs` |
| Menu | `/menu` | `public.recent_menus`, `public.recipes` |
| Capture | `/capture` | POST to n8n webhook |

### File Structure

```
src/
  App.jsx              # Root — tab router + nav bar
  main.jsx             # Vite entry
  supabase.js          # Supabase client init
  tabs/
    BriefTab.jsx
    SOAPTab.jsx
    AnchorTab.jsx       # Static — no data fetch
    BodyTab.jsx
    MenuTab.jsx
    CaptureTab.jsx
  components/
    NavBar.jsx
    brief/             # All brief block components
      FaithAnchorBlock.jsx
      TodayFrameBlock.jsx
      ProtocolBlock.jsx
      RelationshipsBlock.jsx
      CalendarBlock.jsx
      TasksBlock.jsx
      TradingBlock.jsx
      BodyBlock.jsx
      LearningBlock.jsx
      MilestonesBlock.jsx
      MaintenanceBlock.jsx
      ClosingLineBlock.jsx
```

### Supabase Client

```js
// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## Design System

### Colors (CSS vars or inline)

```
--linen:   #F5F0E8   // background everywhere
--ink:     #1C1917   // primary text
--gold:    #C4973A   // accent, highlights, active nav
--muted:   #78716C   // secondary text, inactive nav
--rule:    #D6CFC4   // dividers, borders
```

### Typography

- **Headers / editorial content:** `Georgia, 'Times New Roman', serif`
- **UI chrome (nav, labels, tags, buttons):** `system-ui, sans-serif`
- **Body text:** 16px, line-height 1.8
- **Small labels:** 11px, `letter-spacing: 0.14–0.18em`, `text-transform: uppercase`

### Spacing

- Page padding: `28px` horizontal, `48px` top
- Bottom padding: `120px` (clears fixed nav)
- Section gap: `40px`

### Nav Bar

- Fixed bottom
- Background: `#F5F0E8`
- Border top: `1px solid #D6CFC4`
- Padding bottom: `max(10px, env(safe-area-inset-bottom))` — iPhone safe area
- Active tab: icon + label in gold `#C4973A`
- Inactive: `#78716C`, opacity 0.7

### Block Component Pattern

Every Brief section uses the same wrapper pattern:

```jsx
<section style={{ marginBottom: 40 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
    <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui' }}>
      SECTION LABEL
    </span>
    <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
  </div>
  {/* content */}
</section>
```

---

## Key Data Shapes

### daily_briefs

```sql
id            uuid
date          date
generated_at  timestamptz
content       text          -- raw markdown (legacy, ignore)
sections      jsonb         -- USE THIS
notion_page_id text         -- legacy, ignore
```

### sections JSON structure

```json
{
  "faith_anchor": {
    "reference": "Proverbs 1:7, 32",
    "verse": "The fear of the LORD...",
    "framing": "Prose interpretation..."
  },
  "today_frame": "Open prose paragraph for the day.",
  "protocol": [
    { "name": "MAPS Performance", "detail": "Day 2...", "status": "active" }
  ],
  "relationships": [
    { "name": "Susanna Erickson", "note": "...", "days_out": 0 }
  ],
  "calendar": [
    { "day": "Wednesday, May 6", "tag": "training", "time": "6:30 AM", "title": "Strength Training" }
  ],
  "tasks": [
    { "title": "Date Night — Schedule with Susanna", "domain": "Family", "due_date": "Today" }
  ],
  "queue": [
    { "title": "ProgramLoader Build — Day 2 friction capture", "domain": "Projects", "context": "..." }
  ],
  "trading": {
    "regime": "Favorable — SPY 723.77 | +0.80%",
    "note": "Regime is holding..."
  },
  "body": {
    "weight_lbs": 257.4,
    "bf_percent": 21.2,
    "gap_lbs": 17.4,
    "note": "Last scale log is..."
  },
  "learning": [
    { "title": "Mere Christianity", "author": "C.S. Lewis", "domain": "Theology", "intention": "..." }
  ],
  "milestones": [
    { "name": "Two Years Sober", "date": "2026-05-28", "days_out": 22 }
  ],
  "maintenance": [
    { "item": "Test all GFCIs", "category": "Property", "due_date": "2026-05-15" }
  ],
  "closing_line": "Complacency doesn't announce itself..."
}
```

### soap_entries

```sql
id              uuid
date            date
content         text
page_title      text
generated_at    timestamptz
created_at      timestamptz
evening_content text
```

---

## n8n Integration

- **Instance:** https://n8n.crucibleos.io
- **Capture webhook:** POST `{ text, domain, timestamp }` to Quick Capture Router
- All workflows write to Supabase — no Notion dependencies remain
- Do not hardcode webhook URLs — store in `.env.local` as `VITE_N8N_CAPTURE_WEBHOOK`

---

## PWA Requirements

- `public/manifest.json` — `display: standalone`, theme + background color `#F5F0E8`
- Apple meta tags in `index.html`:
  ```html
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  ```
- Service worker: cache app shell for offline fallback
- Icons: 192×192 and 512×512 in `/public/icons/`

---

## Linear Tickets

| Ticket | Description |
|--------|-------------|
| CRU-151 | Parent epic — PWA Full Rebuild |
| CRU-152 | Brief tab |
| CRU-153 | SOAP tab |
| CRU-154 | Anchor tab polish |
| CRU-155 | Body tab |
| CRU-156 | Menu tab |
| CRU-157 | Capture tab |
| CRU-158 | PWA config |

When working a ticket, read the full ticket description in Linear before writing any code.

---

## Rules

- Mobile-first. Every component is built for iPhone viewport first.
- No libraries beyond React, Tailwind, and `@supabase/supabase-js` unless explicitly approved.
- No inline `<style>` tags — use Tailwind classes or inline `style={{}}` props.
- Never reconcile Evolt and InBody scan data — they are separate trend lines.
- `content` field in `daily_briefs` is legacy markdown. Always read from `sections` JSONB.
- Sobriety start date: May 28, 2024. Calculate dynamically — never hardcode a count.
- Friday = family out. Never show a recipe for Friday in the Menu tab.
