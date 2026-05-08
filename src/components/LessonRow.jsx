import Icon from './Icon'

export default function LessonRow({ label, checked, onToggle, accent }) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-3 px-3 py-[7px] rounded-lg cursor-pointer transition-colors duration-100 hover:bg-white/[0.04] select-none"
    >
      {/* Checkbox */}
      <div
        className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 border transition-all duration-150"
        style={
          checked
            ? { background: accent, borderColor: accent }
            : { background: 'transparent', borderColor: 'rgba(255,255,255,0.14)' }
        }
      >
        {checked && (
          <span className="animate-[checkPop_0.2s_cubic-bezier(0.34,1.56,0.64,1)_both]">
            <Icon name="check" size={10} className="text-black" />
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className="text-[13px] transition-all duration-150 leading-snug"
        style={{
          color:          checked ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.72)',
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}
