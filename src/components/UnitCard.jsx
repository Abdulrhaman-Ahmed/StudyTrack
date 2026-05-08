import { useState } from 'react'
import Icon from './Icon'
import LessonRow from './LessonRow'

function SectionHeader({ icon, label, color }) {
  return (
    <div
      className="px-4 py-2 flex items-center gap-2 border-b border-white/[0.04]"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <Icon name={icon} size={12} style={{ color }} />
      <span className="text-[10px] font-bold uppercase tracking-[1.4px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}
      </span>
    </div>
  )
}

export default function UnitCard({ unit, subId, accent, isProgramming, state, onToggle }) {
  const [open, setOpen] = useState(false)

  const lessons  = isProgramming ? [...unit.theory, ...unit.practical] : (unit.lessons || [])
  const done     = lessons.filter(l => state[`${subId}__${unit.name}__${l}`]).length
  const total    = lessons.length
  const pct      = total ? Math.round((done / total) * 100) : 0
  const complete = done === total && total > 0

  const barColor = complete ? '#1fd4a0' : accent

  return (
    <div
      className="rounded-xl border overflow-hidden mb-2 transition-colors duration-200"
      style={{
        background:   '#181c2a',
        borderColor:  open ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
      }}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-4 py-[11px] cursor-pointer select-none transition-colors hover:bg-white/[0.03]"
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: complete ? 'rgba(31,212,160,0.12)' : 'rgba(124,109,248,0.1)' }}
        >
          <Icon name="folder" size={13} style={{ color: barColor }} />
        </div>

        <span className="text-[13.5px] font-semibold flex-1 leading-tight" style={{ color: 'rgba(255,255,255,0.78)' }}>
          {unit.name}
        </span>

        {/* Mini progress bar (hidden on mobile) */}
        <div className="items-center gap-2 hidden sm:flex">
          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>
          <span
            className="text-[11px] font-mono min-w-[34px] text-right"
            style={{ color: complete ? '#1fd4a0' : 'rgba(255,255,255,0.3)' }}
          >
            {done}/{total}
          </span>
        </div>

        <Icon
          name="chevronDown"
          size={14}
          className="transition-transform duration-200 ml-1"
          style={{
            color:     'rgba(255,255,255,0.28)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </div>

      {/* Body */}
      {open && (
        <div className="border-t border-white/[0.05] animate-[slideDown_0.2s_ease_both]">
          {isProgramming ? (
            <>
              <SectionHeader icon="book"   label="Theory"    color="#fbbf24" />
              <div className="px-3 py-2">
                {unit.theory.map(l => (
                  <LessonRow
                    key={l} label={l} accent={accent}
                    checked={!!state[`${subId}__${unit.name}__${l}`]}
                    onToggle={() => onToggle(subId, unit.name, l)}
                  />
                ))}
              </div>
              <SectionHeader icon="laptop" label="Practical" color="#38bdf8" />
              <div className="px-3 py-2">
                {unit.practical.map(l => (
                  <LessonRow
                    key={l} label={l} accent={accent}
                    checked={!!state[`${subId}__${unit.name}__${l}`]}
                    onToggle={() => onToggle(subId, unit.name, l)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="px-3 py-2">
              {unit.lessons.map(l => (
                <LessonRow
                  key={l} label={l} accent={accent}
                  checked={!!state[`${subId}__${unit.name}__${l}`]}
                  onToggle={() => onToggle(subId, unit.name, l)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
