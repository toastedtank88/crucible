import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const GOLD = '#C4973A'
const LINEN = '#F5F0E8'
const INK = '#1C1917'
const MUTED = '#78716C'
const RULE = '#D6CFC4'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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

function weekLabel(weekOf) {
  if (!weekOf) return '—'
  return new Date(weekOf + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()
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

// ── Recipe detail (published state) ─────────────────────────────────────────

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
        {!showSwap && <button onClick={onOpenSwap} style={swapBtnStyle}>Pick a Recipe</button>}
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
      {(recipe.servings || recipe.prep_time_minutes || recipe.cook_time_minutes) && (
        <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
          {recipe.servings && <MetaStat value={recipe.servings} label="Servings" />}
          {recipe.prep_time_minutes && <MetaStat value={`${recipe.prep_time_minutes}m`} label="Prep" />}
          {recipe.cook_time_minutes && <MetaStat value={`${recipe.cook_time_minutes}m`} label="Cook" />}
        </div>
      )}

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

      {recipe.notes && (
        <div style={{ background: '#EDE9E3', borderRadius: 4, padding: '12px 14px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 6 }}>
            Note
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{recipe.notes}</p>
        </div>
      )}

      {!showSwap && <button onClick={onOpenSwap} style={swapBtnStyle}>Swap Meal</button>}
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

// ── Main component ──────────────────────────────────────────────────────────

export default function MenuTab() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State 1 — pending
  const [pendingMenu, setPendingMenu] = useState(null)
  const [approving, setApproving] = useState(false)
  const [approveError, setApproveError] = useState(null)

  // State 2 — published
  const [publishedMenus, setPublishedMenus] = useState([])
  const [weekOf, setWeekOf] = useState(null)

  // Shared interaction state
  const [expandedDay, setExpandedDay] = useState(null)
  const [swapDay, setSwapDay] = useState(null)
  const [allRecipes, setAllRecipes] = useState([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    setError(null)

    const { data: staged, error: stagedErr } = await supabase
      .from('staged_menus')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (stagedErr) {
      setError(stagedErr.message)
      setLoading(false)
      return
    }

    if (staged) {
      setPendingMenu(staged)
      setLoading(false)
      return
    }

    await loadPublished()
    setLoading(false)
  }

  async function loadPublished() {
    const { data: menus, error: menusErr } = await supabase
      .from('recent_menus')
      .select('*, recipe:recipes(*)')
      .order('week_of', { ascending: false })
      .order('date_served', { ascending: true })

    if (menusErr) {
      setError(menusErr.message)
      return
    }

    if (menus && menus.length > 0) {
      const mostRecentWeek = menus[0].week_of
      setWeekOf(mostRecentWeek)
      setPublishedMenus(menus.filter((m) => m.week_of === mostRecentWeek))
    }
  }

  async function ensureRecipes() {
    if (allRecipes.length > 0) return
    setLoadingRecipes(true)
    const { data } = await supabase.from('recipes').select('id, meal_name, cuisine_type').order('meal_name')
    setAllRecipes(data || [])
    setLoadingRecipes(false)
  }

  async function handleApprove() {
    if (!pendingMenu || approving) return
    setApproving(true)
    setApproveError(null)

    const webhookUrl = import.meta.env.VITE_N8N_MENU_APPROVE_WEBHOOK
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pendingMenu.id,
          week_of: pendingMenu.week_of,
          meals: pendingMenu.meals,
          queue_id: pendingMenu.queue_id,
        }),
      })
    } catch {
      // Non-fatal — continue to mark approved in DB
    }

    const { error: updateErr } = await supabase
      .from('staged_menus')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', pendingMenu.id)

    if (updateErr) {
      setApproveError(updateErr.message)
      setApproving(false)
      return
    }

    setPendingMenu(null)
    setExpandedDay(null)
    setSwapDay(null)
    setApproving(false)
    await loadPublished()
  }

  // Pending: update a day's meal in staged_menus.meals JSONB
  async function handlePendingSwap(day, recipe) {
    const updatedMeals = (pendingMenu.meals || []).map((m) => {
      const mDay = m.day || m.day_of_week || m.day_name
      return mDay === day ? { ...m, meal_name: recipe.meal_name, cuisine_type: recipe.cuisine_type, recipe_id: recipe.id } : m
    })
    setPendingMenu((prev) => ({ ...prev, meals: updatedMeals }))
    setSwapDay(null)
    await supabase.from('staged_menus').update({ meals: updatedMeals }).eq('id', pendingMenu.id)
  }

  // Published: toggle expand
  function handleToggle(day) {
    if (expandedDay === day) {
      setExpandedDay(null)
      setSwapDay(null)
    } else {
      setExpandedDay(day)
      setSwapDay(null)
    }
  }

  // Published: thumbs rating
  async function handleRate(menuId, value) {
    const target = publishedMenus.find((m) => m.id === menuId)
    const newRating = target?.rating === value ? null : value
    setPublishedMenus((prev) => prev.map((m) => (m.id === menuId ? { ...m, rating: newRating } : m)))
    const { error } = await supabase.from('recent_menus').update({ rating: newRating }).eq('id', menuId)
    if (error) {
      setPublishedMenus((prev) => prev.map((m) => (m.id === menuId ? { ...m, rating: target?.rating } : m)))
    }
  }

  // Published: swap meal
  async function handlePublishedSwap(day, recipe) {
    const menu = publishedMenus.find((m) => m.day_of_week === day)
    if (!menu) return
    setPublishedMenus((prev) =>
      prev.map((m) =>
        m.id === menu.id
          ? { ...m, meal_name: recipe.meal_name, cuisine_type: recipe.cuisine_type, recipe_id: recipe.id, recipe }
          : m
      )
    )
    setSwapDay(null)
    await supabase
      .from('recent_menus')
      .update({ recipe_id: recipe.id, meal_name: recipe.meal_name, cuisine_type: recipe.cuisine_type })
      .eq('id', menu.id)
  }

  async function handleOpenSwap(day) {
    setSwapDay(day)
    await ensureRecipes()
  }

  // ── Loading / error ─────────────────────────────────────────────────────────

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

  // ── State 1: Pending review ─────────────────────────────────────────────────

  if (pendingMenu) {
    const meals = pendingMenu.meals || []
    const getMeal = (day) => meals.find((m) => (m.day || m.day_of_week || m.day_name) === day) ?? null

    return (
      <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Week of {weekLabel(pendingMenu.week_of)}
            </span>
            <div style={{ flex: 1, borderTop: `1px solid ${RULE}`, minWidth: 16 }} />
            <span style={{
              fontSize: 10,
              letterSpacing: '0.1em',
              color: '#92400e',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: 4,
              padding: '3px 8px',
              flexShrink: 0,
            }}>
              Pending Review
            </span>
          </div>

          {/* Days */}
          {WEEK_DAYS.map((day) => {
            if (day === 'Friday') return <FridayCard key="Friday" />

            const meal = getMeal(day)
            const isSwapOpen = swapDay === day

            return (
              <div key={day} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 4 }}>
                      {day}
                    </p>
                    <p style={{ fontSize: 17, color: meal ? INK : MUTED, lineHeight: 1.3, margin: '0 0 3px', fontStyle: meal ? 'normal' : 'italic' }}>
                      {meal ? meal.meal_name : 'No meal planned'}
                    </p>
                    {meal?.cuisine_type && (
                      <p style={{ fontSize: 12, color: MUTED, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em', margin: 0 }}>
                        {meal.cuisine_type}
                      </p>
                    )}
                  </div>
                  {meal && !isSwapOpen && (
                    <button
                      onClick={() => handleOpenSwap(day)}
                      style={{
                        background: 'none',
                        border: `1px solid ${RULE}`,
                        borderRadius: 4,
                        padding: '5px 10px',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: MUTED,
                        fontFamily: 'system-ui, sans-serif',
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      Swap
                    </button>
                  )}
                </div>

                {isSwapOpen && (
                  <SwapPicker
                    recipes={allRecipes}
                    loading={loadingRecipes}
                    currentRecipeId={meal?.recipe_id}
                    onSelect={(r) => handlePendingSwap(day, r)}
                    onClose={() => setSwapDay(null)}
                  />
                )}
              </div>
            )
          })}

          {/* Approve */}
          <div style={{ marginTop: 32 }}>
            {approveError && (
              <p style={{ fontSize: 13, color: '#ef4444', fontFamily: 'system-ui, sans-serif', marginBottom: 12, textAlign: 'center' }}>
                {approveError}
              </p>
            )}
            <button
              onClick={handleApprove}
              disabled={approving}
              style={{
                width: '100%',
                background: approving ? RULE : GOLD,
                border: 'none',
                borderRadius: 6,
                padding: '16px',
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: approving ? MUTED : '#fff',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                cursor: approving ? 'default' : 'pointer',
              }}
            >
              {approving ? 'Approving…' : 'Approve Menu'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── State 2: Published menu ─────────────────────────────────────────────────

  const getMealByDay = (day) => publishedMenus.find((m) => m.day_of_week === day) ?? null

  return (
    <div style={{ background: LINEN, minHeight: '100%', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 28px 120px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
            Week of {weekLabel(weekOf)}
          </span>
          <div style={{ flex: 1, borderTop: `1px solid ${RULE}` }} />
        </div>

        {publishedMenus.length === 0 && (
          <p style={{ fontSize: 15, color: MUTED, fontFamily: 'system-ui, sans-serif', paddingTop: 40, textAlign: 'center', fontStyle: 'italic' }}>
            No menu available yet.
          </p>
        )}

        {WEEK_DAYS.map((day) => {
          if (day === 'Friday') return <FridayCard key="Friday" />

          const menu = getMealByDay(day)
          const isExpanded = expandedDay === day
          const isSwapOpen = swapDay === day
          const hasMenu = menu !== null

          return (
            <div key={day} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18 }}>
              <div
                onClick={() => hasMenu && handleToggle(day)}
                style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: hasMenu ? 'pointer' : 'default', gap: 8 }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 4 }}>
                    {day}
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
                  showSwap={isSwapOpen}
                  onOpenSwap={() => handleOpenSwap(day)}
                  onSwap={(r) => handlePublishedSwap(day, r)}
                  onCloseSwap={() => setSwapDay(null)}
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
