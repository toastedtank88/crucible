import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const GOLD = '#C4973A'
const LINEN = '#F5F0E8'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']

function getMondayOfCurrentWeek() {
  const today = new Date()
  const day = today.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function toISO(date) {
  return date.toISOString().split('T')[0]
}

// ── Icons ──────────────────────────────────────────────────────────────────

function ThumbsUpIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? GOLD : 'none'} stroke={active ? GOLD : MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function ThumbsDownIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#ef4444' : 'none'} stroke={active ? '#ef4444' : MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  )
}

function ChevronIcon({ up }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={up ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
    </svg>
  )
}

// ── Small utilities ─────────────────────────────────────────────────────────

function MetaStat({ value, label }) {
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: 700, color: INK, lineHeight: 1, margin: 0 }}>{value}</p>
      <p style={{ fontSize: 10, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4, marginBottom: 0 }}>{label}</p>
    </div>
  )
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
    </div>
  )
}

// ── Swap picker ─────────────────────────────────────────────────────────────

function SwapPicker({ recipes, loading, currentRecipeId, onSelect, onClose }) {
  return (
    <div style={{ marginTop: 20, borderTop: `1px solid ${RULE}`, paddingTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Choose a Meal
        </span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', padding: 0 }}
        >
          Cancel
        </button>
      </div>
      {loading ? (
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>Loading…</p>
      ) : (
        recipes.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r)}
            disabled={r.id === currentRecipeId}
            style={{
              width: '100%',
              background: r.id === currentRecipeId ? '#EDE9E3' : 'transparent',
              border: `1px solid ${RULE}`,
              borderRadius: 4,
              padding: '10px 14px',
              textAlign: 'left',
              cursor: r.id === currentRecipeId ? 'default' : 'pointer',
              opacity: r.id === currentRecipeId ? 0.5 : 1,
              marginBottom: 4,
              display: 'block',
            }}
          >
            <p style={{ fontSize: 15, color: INK, margin: 0, fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {r.meal_name}
            </p>
            {r.cuisine_type && (
              <p style={{ fontSize: 11, color: MUTED, fontFamily: 'system-ui, sans-serif', margin: '2px 0 0', letterSpacing: '0.06em' }}>
                {r.cuisine_type}
              </p>
            )}
          </button>
        ))
      )}
    </div>
  )
}

// ── Recipe detail ───────────────────────────────────────────────────────────

function RecipeDetail({ recipe, showSwap, onOpenSwap, onSwap, onCloseSwap, recipes, loadingRecipes }) {
  const swapBtnStyle = {
    width: '100%',
    background: 'none',
    border: `1px solid ${RULE}`,
    borderRadius: 4,
    padding: '10px',
    fontSize: 12,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: MUTED,
    fontFamily: 'system-ui, sans-serif',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'block',
  }

  if (!recipe) {
    return (
      <div style={{ paddingTop: 16 }}>
        <p style={{ fontSize: 14, color: MUTED, fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
          No recipe linked.
        </p>
        {!showSwap && (
          <button onClick={onOpenSwap} style={swapBtnStyle}>Pick a Recipe</button>
        )}
        {showSwap && (
          <SwapPicker
            recipes={recipes}
            loading={loadingRecipes}
            currentRecipeId={null}
            onSelect={onSwap}
            onClose={onCloseSwap}
          />
        )}
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 20 }}>
      {/* Meta stats */}
      {(recipe.servings || recipe.prep_time_minutes || recipe.cook_time_minutes) && (
        <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
          {recipe.servings && <MetaStat value={recipe.servings} label="Servings" />}
          {recipe.prep_time_minutes && <MetaStat value={`${recipe.prep_time_minutes}m`} label="Prep" />}
          {recipe.cook_time_minutes && <MetaStat value={`${recipe.cook_time_minutes}m`} label="Cook" />}
        </div>
      )}

      {/* Ingredients */}
      {recipe.ingredients?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionDivider label="Ingredients" />
          {recipe.ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 7 }}>
              <span style={{ fontSize: 14, color: MUTED, fontFamily: 'system-ui, sans-serif', minWidth: 72, flexShrink: 0 }}>
                {ing.quantity}
              </span>
              <span style={{ fontSize: 14, color: INK }}>{ing.item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      {recipe.instructions?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionDivider label="Instructions" />
          {recipe.instructions.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: GOLD, fontFamily: 'system-ui, sans-serif', fontWeight: 700, minWidth: 20, paddingTop: 2, flexShrink: 0 }}>
                {i + 1}
              </span>
              <p style={{ fontSize: 15, color: INK, lineHeight: 1.6, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {recipe.notes && (
        <div style={{ background: '#EDE9E3', borderRadius: 4, padding: '12px 14px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 6 }}>
            Note
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{recipe.notes}</p>
        </div>
      )}

      {/* Swap button / picker */}
      {!showSwap && (
        <button onClick={onOpenSwap} style={swapBtnStyle}>Swap Meal</button>
      )}
      {showSwap && (
        <SwapPicker
          recipes={recipes}
          loading={loadingRecipes}
          currentRecipeId={recipe.id}
          onSelect={onSwap}
          onClose={onCloseSwap}
        />
      )}
    </div>
  )
}

// ── Friday card ─────────────────────────────────────────────────────────────

function FridayCard() {
  return (
    <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18 }}>
      <p style={{ fontSize: 11, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 6 }}>
        Friday
      </p>
      <p style={{ fontSize: 17, color: MUTED, fontStyle: 'italic', margin: 0 }}>Family Out</p>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function MenuTab() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedIso, setExpandedIso] = useState(null)
  const [showSwap, setShowSwap] = useState(false)
  const [allRecipes, setAllRecipes] = useState([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)

  const monday = getMondayOfCurrentWeek()

  useEffect(() => {
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    supabase
      .from('recent_menus')
      .select('*, recipe:recipes(*)')
      .gte('date_served', toISO(monday))
      .lte('date_served', toISO(sunday))
      .order('date_served', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setMenus(data || [])
        setLoading(false)
      })
  }, [])

  function handleToggle(iso) {
    if (expandedIso === iso) {
      setExpandedIso(null)
      setShowSwap(false)
    } else {
      setExpandedIso(iso)
      setShowSwap(false)
    }
  }

  async function handleRate(menuId, value) {
    const target = menus.find((m) => m.id === menuId)
    const newRating = target?.rating === value ? null : value

    setMenus((prev) => prev.map((m) => (m.id === menuId ? { ...m, rating: newRating } : m)))

    const { error } = await supabase
      .from('recent_menus')
      .update({ rating: newRating })
      .eq('id', menuId)

    if (error) {
      setMenus((prev) => prev.map((m) => (m.id === menuId ? { ...m, rating: target?.rating } : m)))
    }
  }

  async function handleOpenSwap() {
    setShowSwap(true)
    if (allRecipes.length === 0) {
      setLoadingRecipes(true)
      const { data } = await supabase
        .from('recipes')
        .select('id, meal_name, cuisine_type')
        .order('meal_name')
      setAllRecipes(data || [])
      setLoadingRecipes(false)
    }
  }

  async function handleSwap(recipe) {
    const menu = menus.find((m) => m.date_served === expandedIso)
    if (!menu) return

    setMenus((prev) =>
      prev.map((m) =>
        m.id === menu.id
          ? { ...m, meal_name: recipe.meal_name, cuisine_type: recipe.cuisine_type, recipe_id: recipe.id, recipe }
          : m
      )
    )
    setShowSwap(false)

    await supabase
      .from('recent_menus')
      .update({ recipe_id: recipe.id, meal_name: recipe.meal_name, cuisine_type: recipe.cuisine_type })
      .eq('id', menu.id)
  }

  const weekLabel = monday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()

  const weekDays = WEEKDAYS.map((dayName, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const iso = toISO(date)
    return { dayName, iso, menu: menus.find((m) => m.date_served === iso) ?? null }
  })

  const satSunDays = ['Saturday', 'Sunday'].map((dayName, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + 5 + i)
    const iso = toISO(date)
    return { dayName, iso, menu: menus.find((m) => m.date_served === iso) ?? null }
  })

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Loading menu…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif' }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
            Week of {weekLabel}
          </span>
          <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
        </div>

        {/* Mon–Thu */}
        {weekDays.map(({ dayName, iso, menu }) => {
          const isExpanded = expandedIso === iso
          const hasMenu = menu !== null

          return (
            <div key={iso} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18 }}>
              {/* Header row */}
              <div
                onClick={() => hasMenu && handleToggle(iso)}
                style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: hasMenu ? 'pointer' : 'default', gap: 8 }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 4 }}>
                    {dayName}
                  </p>
                  <p style={{ fontSize: 17, color: hasMenu ? INK : MUTED, lineHeight: 1.3, margin: '0 0 3px', fontStyle: hasMenu ? 'normal' : 'italic' }}>
                    {hasMenu ? menu.meal_name : 'No meal planned'}
                  </p>
                  {menu?.cuisine_type && (
                    <p style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em', margin: 0 }}>
                      {menu.cuisine_type}
                    </p>
                  )}
                </div>

                {/* Rating buttons + chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingTop: 2 }}>
                  {hasMenu && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRate(menu.id, 1) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: menu.rating === 1 ? 1 : 0.4 }}
                      >
                        <ThumbsUpIcon active={menu.rating === 1} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRate(menu.id, -1) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: menu.rating === -1 ? 1 : 0.4 }}
                      >
                        <ThumbsDownIcon active={menu.rating === -1} />
                      </button>
                    </>
                  )}
                  {hasMenu && <ChevronIcon up={isExpanded} />}
                </div>
              </div>

              {/* Expanded recipe */}
              {isExpanded && hasMenu && (
                <RecipeDetail
                  recipe={menu.recipe}
                  showSwap={showSwap}
                  onOpenSwap={handleOpenSwap}
                  onSwap={handleSwap}
                  onCloseSwap={() => setShowSwap(false)}
                  recipes={allRecipes}
                  loadingRecipes={loadingRecipes}
                />
              )}
            </div>
          )
        })}

        {/* Friday — always Family Out, no recipe, no actions */}
        <FridayCard />

        {/* Sat–Sun */}
        {satSunDays.map(({ dayName, iso, menu }) => {
          const isExpanded = expandedIso === iso
          const hasMenu = menu !== null

          return (
            <div key={iso} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18 }}>
              <div
                onClick={() => hasMenu && handleToggle(iso)}
                style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: hasMenu ? 'pointer' : 'default', gap: 8 }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 4 }}>
                    {dayName}
                  </p>
                  <p style={{ fontSize: 17, color: hasMenu ? INK : MUTED, lineHeight: 1.3, margin: '0 0 3px', fontStyle: hasMenu ? 'normal' : 'italic' }}>
                    {hasMenu ? menu.meal_name : 'No meal planned'}
                  </p>
                  {menu?.cuisine_type && (
                    <p style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em', margin: 0 }}>
                      {menu.cuisine_type}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingTop: 2 }}>
                  {hasMenu && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRate(menu.id, 1) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: menu.rating === 1 ? 1 : 0.4 }}
                      >
                        <ThumbsUpIcon active={menu.rating === 1} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRate(menu.id, -1) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: menu.rating === -1 ? 1 : 0.4 }}
                      >
                        <ThumbsDownIcon active={menu.rating === -1} />
                      </button>
                    </>
                  )}
                  {hasMenu && <ChevronIcon up={isExpanded} />}
                </div>
              </div>

              {isExpanded && hasMenu && (
                <RecipeDetail
                  recipe={menu.recipe}
                  showSwap={showSwap}
                  onOpenSwap={handleOpenSwap}
                  onSwap={handleSwap}
                  onCloseSwap={() => setShowSwap(false)}
                  recipes={allRecipes}
                  loadingRecipes={loadingRecipes}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
