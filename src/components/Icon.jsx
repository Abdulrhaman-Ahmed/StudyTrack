const PATHS = {
  dashboard:    <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  folder:       <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>,
  chevronDown:  <path d="M6 9l6 6 6-6"/>,
  check:        <path d="M5 13l4 4L19 7"/>,
  certificate:  <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 12h8M8 9h4"/></>,
  refresh:      <path d="M4 4v6h6M20 20v-6h-6M4 10a9 9 0 0115-4.4M20 14a9 9 0 01-15 4.4"/>,
  book:         <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
  laptop:       <><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M22 19H2"/></>,
  menu:         <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  clock:        <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
  star:         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  trophy:       <><path d="M6 9H4a2 2 0 000 4h2"/><path d="M18 9h2a2 2 0 010 4h-2"/><path d="M6 4h12v8a6 6 0 01-12 0V4z"/><path d="M12 18v3"/><path d="M9 21h6"/></>,
  x:            <path d="M18 6L6 18M6 6l12 12"/>,
}

export default function Icon({ name, size = 16, className = '', style }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  )
}
