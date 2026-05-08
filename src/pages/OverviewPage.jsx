import { SUBJECTS, getSubjectProgress, getOverallProgress } from '../data'
import ProgressRing from '../components/ProgressRing'

function SubjectCard({ sub, state, onClick }) {
  const p = getSubjectProgress(sub, state)

  return (
    <div
      onClick={onClick}
      className="rounded-2xl border p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10"
      style={{ background: '#181c2a', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: sub.bg }}
        >
          {sub.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-semibold truncate" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {sub.name}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {p.done}/{p.total} lessons
          </div>
        </div>
        <ProgressRing pct={p.pct} size={38} stroke={3} color={sub.accent} />
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xl font-display font-bold" style={{ color: sub.accent }}>{p.pct}%</span>
        {p.pct === 100 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(31,212,160,0.12)', color: '#1fd4a0' }}>
            ✓ Done
          </span>
        )}
      </div>

      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${p.pct}%`, background: sub.accent }}
        />
      </div>
    </div>
  )
}

export default function OverviewPage({ state, onSelectSubject }) {
  const overall = getOverallProgress(state)
  let totalLessons = 0, doneLessons = 0
  SUBJECTS.forEach(s => {
    const p = getSubjectProgress(s, state)
    totalLessons += p.total
    doneLessons  += p.done
  })

  return (
    <div className="animate-[fadeIn_0.25s_ease_both]">
      {/* Hero stat card */}
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ background: 'linear-gradient(135deg,#12151f,#181c2e)', borderColor: 'rgba(124,109,248,0.14)' }}
      >
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <ProgressRing pct={overall} size={84} stroke={6} color="#7c6df8" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16px] font-display font-bold text-white">{overall}%</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Overall Progress
            </p>
            <p className="text-2xl font-display font-bold text-white">
              {doneLessons} <span className="text-base font-normal" style={{ color: 'rgba(255,255,255,0.28)' }}>/ {totalLessons}</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>lessons completed</p>
          </div>

          {/* Mini subject list */}
          <div className="ml-auto hidden lg:flex flex-col gap-1.5">
            {SUBJECTS.slice(0, 4).map(s => {
              const p = getSubjectProgress(s, state)
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-[11px] w-28 truncate" style={{ color: 'rgba(255,255,255,0.32)' }}>{s.name}</span>
                  <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: s.accent }} />
                  </div>
                  <span className="text-[10px] font-mono w-7 text-right" style={{ color: s.accent }}>{p.pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {SUBJECTS.map(sub => (
          <SubjectCard
            key={sub.id}
            sub={sub}
            state={state}
            onClick={() => onSelectSubject(sub.id)}
          />
        ))}
      </div>
    </div>
  )
}
