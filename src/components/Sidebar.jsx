import { SUBJECTS, EXAM_YEARS, getSubjectProgress } from '../data'
import Icon from './Icon'

function NavItem({ icon, label, active, onClick, badge, pct, accent }) {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center gap-2.5 px-3 py-[9px] rounded-xl cursor-pointer select-none transition-colors duration-150 mb-0.5 group"
      style={{
        background: active ? 'rgba(124,109,248,0.11)' : 'transparent',
        color:      active ? (accent || '#a99ef5') : 'rgba(255,255,255,0.42)',
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-[13px] font-medium truncate flex-1">{label}</span>
      {badge !== undefined && (
        <span
          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 transition-colors"
          style={{
            background: active ? 'rgba(124,109,248,0.18)' : 'rgba(255,255,255,0.05)',
            color:      active ? (accent || '#a99ef5') : 'rgba(255,255,255,0.28)',
          }}
        >
          {badge}
        </span>
      )}
      {/* progress underline */}
      {pct !== undefined && (
        <div className="absolute bottom-[3px] left-11 right-3 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: accent || '#7c6df8' }}
          />
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ view, setView, state, onReset }) {
  const examsDone = EXAM_YEARS.filter(y => state[`exam__${y}`]).length

  return (
    <aside
      className="flex flex-col h-full w-64 flex-shrink-0 border-r"
      style={{ background: '#12151f', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 font-display"
          style={{ background: 'linear-gradient(135deg,#7c6df8,#a99ef5)', color: '#fff' }}
        >
          S
        </div>
        <div>
          <div className="font-display font-bold text-[15px] text-white leading-tight">StudyTrack</div>
          <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {SUBJECTS.reduce((a, s) => { const p = getSubjectProgress(s, state); return a + p.done }, 0)} lessons done
          </div>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <NavItem
          icon={<Icon name="dashboard" size={15} />}
          label="Overview"
          active={view === 'overview'}
          onClick={() => setView('overview')}
        />

        <p className="text-[9px] font-bold uppercase tracking-[1.6px] px-3 pt-4 pb-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Subjects
        </p>

        {SUBJECTS.map(sub => {
          const p = getSubjectProgress(sub, state)
          return (
            <NavItem
              key={sub.id}
              icon={<span className="text-base leading-none">{sub.icon}</span>}
              label={sub.name}
              active={view === sub.id}
              onClick={() => setView(sub.id)}
              badge={`${p.pct}%`}
              pct={p.pct}
              accent={sub.accent}
            />
          )
        })}

        <p className="text-[9px] font-bold uppercase tracking-[1.6px] px-3 pt-4 pb-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Exams
        </p>
        <NavItem
          icon={<Icon name="trophy" size={15} />}
          label="Past Exams"
          active={view === 'exams'}
          onClick={() => setView('exams')}
          badge={`${examsDone}/${EXAM_YEARS.length}`}
        />
      </nav>

      {/* Reset */}
      <div className="p-3 flex-shrink-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <button
          onClick={onReset}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-150 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          <Icon name="refresh" size={13} />
          Reset All Progress
        </button>
      </div>
    </aside>
  )
}
