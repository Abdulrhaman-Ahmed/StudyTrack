import { EXAM_YEARS } from '../data'
import Icon from '../components/Icon'

export default function ExamsPage({ state, onToggle }) {
  const done = EXAM_YEARS.filter(y => state[`exam__${y}`]).length

  return (
    <div className="animate-[fadeIn_0.25s_ease_both]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: 'rgba(251,191,36,0.1)' }}
        >
          🏆
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-white">Past Exams</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {done} of {EXAM_YEARS.length} reviewed
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EXAM_YEARS.map(year => {
          const isDone = !!state[`exam__${year}`]
          return (
            <div
              key={year}
              onClick={() => onToggle(year)}
              className="rounded-2xl border p-5 cursor-pointer select-none transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background:  isDone ? 'rgba(31,212,160,0.06)' : '#181c2a',
                borderColor: isDone ? 'rgba(31,212,160,0.22)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="font-display text-4xl font-bold mb-1 leading-none"
                style={{ color: isDone ? '#1fd4a0' : 'rgba(255,255,255,0.65)' }}
              >
                {year}
              </div>
              <div className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.28)' }}>Exam Paper</div>
              <div
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={
                  isDone
                    ? { background: 'rgba(31,212,160,0.14)', color: '#1fd4a0' }
                    : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.32)' }
                }
              >
                {isDone
                  ? <><Icon name="check" size={10} /> Reviewed</>
                  : <><Icon name="clock" size={10} /> Pending</>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
