import { getSubjectProgress } from '../data'
import UnitCard from '../components/UnitCard'

export default function SubjectPage({ sub, state, onToggle }) {
  const p = getSubjectProgress(sub, state)
  const unitCount = sub.sections
    ? sub.sections.reduce((a, s) => a + s.units.length, 0)
    : (sub.units?.length || 0)

  return (
    <div className="animate-[fadeIn_0.25s_ease_both]">
      {/* Subject header */}
      <div
        className="flex items-center gap-4 mb-5 pb-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: sub.bg }}
        >
          {sub.icon}
        </div>
        <div className="flex-1">
          <h2 className="font-display font-bold text-xl text-white leading-tight">{sub.name}</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {unitCount} units · {p.total} lessons
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-3xl font-display font-bold leading-none" style={{ color: sub.accent }}>{p.pct}%</div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>{p.done} / {p.total} done</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${p.pct}%`, background: `linear-gradient(90deg,${sub.accent}88,${sub.accent})` }}
        />
      </div>

      {/* Units */}
      {sub.programming ? (
        sub.units.map(u => (
          <UnitCard
            key={u.name}
            unit={u}
            subId={sub.id}
            accent={sub.accent}
            isProgramming
            state={state}
            onToggle={onToggle}
          />
        ))
      ) : sub.sections ? (
        sub.sections.map(sec => (
          <div key={sec.name} className="mb-6">
            <p
              className="text-[9px] font-bold uppercase tracking-[1.6px] mb-3 px-1"
              style={{ color: 'rgba(255,255,255,0.22)' }}
            >
              {sec.name}
            </p>
            {sec.units.map(u => (
              <UnitCard
                key={u.name}
                unit={u}
                subId={sub.id}
                accent={sub.accent}
                state={state}
                onToggle={onToggle}
              />
            ))}
          </div>
        ))
      ) : (
        sub.units.map(u => (
          <UnitCard
            key={u.name}
            unit={u}
            subId={sub.id}
            accent={sub.accent}
            state={state}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  )
}
