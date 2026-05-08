import { useState } from 'react'
import { SUBJECTS, getOverallProgress } from './data'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import ProgressRing from './components/ProgressRing'
import Icon from './components/Icon'
import OverviewPage from './pages/OverviewPage'
import SubjectPage from './pages/SubjectPage'
import ExamsPage from './pages/ExamsPage'

export default function App() {
  const [state, setState] = useLocalStorage('studytrack_v3', {})
  const [view, setView]   = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // ── Mutations ──────────────────────────────────────────────────────────────
  const toggleLesson = (subId, unitName, lesson) => {
    const k = `${subId}__${unitName}__${lesson}`
    setState(prev => {
      const next = { ...prev }
      if (next[k]) delete next[k]; else next[k] = 1
      return next
    })
  }

  const toggleExam = (year) => {
    const k = `exam__${year}`
    setState(prev => {
      const next = { ...prev }
      if (next[k]) delete next[k]; else next[k] = 1
      return next
    })
  }

  const resetAll = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      setState({})
      setView('overview')
    }
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentSub = SUBJECTS.find(s => s.id === view)
  const overall    = getOverallProgress(state)

  const topbarTitle = view === 'overview'
    ? 'Overview'
    : view === 'exams'
    ? 'Past Exams'
    : `${currentSub?.icon}  ${currentSub?.name}`

  const topbarSub = view === 'overview'
    ? `${SUBJECTS.length} subjects tracked`
    : view === 'exams'
    ? 'Track your exam practice'
    : (() => {
        if (!currentSub) return ''
        const done  = Object.keys(state).filter(k => k.startsWith(`${currentSub.id}__`)).length
        return `${done} checks completed`
      })()

  // ── Sidebar element (shared between desktop + mobile overlay) ─────────────
  const sidebar = (
    <Sidebar
      view={view}
      setView={(v) => { setView(v); setMobileOpen(false) }}
      state={state}
      onReset={resetAll}
    />
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0b0d14' }}>

      {/* ── Desktop sidebar ────────────────────────────────────────────── */}
      <div className="hidden md:flex h-full">
        {sidebar}
      </div>

      {/* ── Mobile sidebar overlay ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.55)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 flex flex-col">
            {sidebar}
          </div>
        </div>
      )}

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <header
          className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
          style={{ background: '#12151f', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-colors hover:bg-white/5 flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-[15px] text-white truncate leading-tight">
              {topbarTitle}
            </h1>
            <p className="text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {topbarSub}
            </p>
          </div>

          {/* Overall pill */}
          <div
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl flex-shrink-0"
            style={{ background: 'rgba(124,109,248,0.09)' }}
          >
            <ProgressRing pct={overall} size={28} stroke={3} color="#7c6df8" />
            <div>
              <div className="text-[12px] font-display font-bold text-white/80 leading-none">{overall}%</div>
              <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>overall</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-5 py-6">
          {view === 'overview' && (
            <OverviewPage state={state} onSelectSubject={setView} />
          )}
          {view === 'exams' && (
            <ExamsPage state={state} onToggle={toggleExam} />
          )}
          {currentSub && (
            <SubjectPage sub={currentSub} state={state} onToggle={toggleLesson} />
          )}
        </main>
      </div>
    </div>
  )
}
