// ─── Subject definitions ────────────────────────────────────────────────────

export const SUBJECTS = [
  {
    id: "social",
    name: "Social Studies",
    icon: "🌍",
    accent: "#1fd4a0",
    bg: "rgba(31,212,160,0.1)",
    units: [
      { name: "Unit 5", lessons: Array.from({ length: 10 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 6", lessons: Array.from({ length: 10 }, (_, i) => `Lesson ${i + 1}`) },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    sections: [
      {
        name: "Term 1",
        units: [
          { name: "Unit 9",  lessons: Array.from({ length: 6 }, (_, i) => `Lesson ${i + 1}`) },
          { name: "Unit 10", lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`) },
        ],
      },
      {
        name: "Term 2",
        units: [
          { name: "Unit 3", lessons: Array.from({ length: 6 }, (_, i) => `Lesson ${i + 1}`) },
          { name: "Unit 4", lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`) },
        ],
      },
    ],
  },
  {
    id: "islam",
    name: "Islamic Studies",
    icon: "☪️",
    accent: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    units: Array.from({ length: 6 }, (_, u) => ({
      name: `Unit ${u + 1}`,
      lessons: Array.from({ length: 3 }, (_, i) => `Lesson ${i + 1}`),
    })),
  },
  {
    id: "christian",
    name: "Christian Studies",
    icon: "✝️",
    accent: "#fb7185",
    bg: "rgba(251,113,133,0.1)",
    units: [
      { name: "Unit 1", lessons: Array.from({ length: 3 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 2", lessons: Array.from({ length: 3 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 3", lessons: Array.from({ length: 2 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 4", lessons: Array.from({ length: 2 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 5", lessons: Array.from({ length: 3 }, (_, i) => `Lesson ${i + 1}`) },
    ],
  },
  {
    id: "arabic",
    name: "Arabic Language",
    icon: "📖",
    accent: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    units: [
      { name: "Reading — القراءة",             lessons: Array.from({ length: 6 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Texts — النصوص",                lessons: Array.from({ length: 6 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Grammar: Subordinates — توابع", lessons: Array.from({ length: 4 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Grammar: Styles — أساليب",      lessons: Array.from({ length: 4 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Written Rules — قواعد كتابية",  lessons: Array.from({ length: 4 }, (_, i) => `Lesson ${i + 1}`) },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    icon: "📐",
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    units: Array.from({ length: 4 }, (_, u) => ({
      name: `Unit ${u + 1}`,
      lessons: Array.from({ length: 7 }, (_, i) => `Lesson ${i + 1}`),
    })),
  },
  {
    id: "programming",
    name: "Programming",
    icon: "💻",
    accent: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    programming: true,
    units: Array.from({ length: 8 }, (_, u) => ({
      name: `Unit ${u + 1}`,
      theory:    Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1} — Theory`),
      practical: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1} — Practical`),
    })),
  },
  {
    id: "english",
    name: "English",
    icon: "🇬🇧",
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    units: Array.from({ length: 12 }, (_, u) => ({
      name: `Unit ${u + 1}`,
      lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`),
    })),
  },
  {
    id: "economics",
    name: "Economics",
    icon: "📊",
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.1)",
    units: [
      { name: "Unit 1", lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 2", lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 3", lessons: Array.from({ length: 5 }, (_, i) => `Lesson ${i + 1}`) },
      { name: "Unit 4", lessons: Array.from({ length: 3 }, (_, i) => `Lesson ${i + 1}`) },
    ],
  },
]

export const EXAM_YEARS = [2023, 2024, 2025, 2026]

// ─── Progress helpers ────────────────────────────────────────────────────────

export function getSubjectProgress(sub, state) {
  let total = 0, done = 0

  const count = (unitName, lesson) => {
    total++
    if (state[`${sub.id}__${unitName}__${lesson}`]) done++
  }

  if (sub.programming) {
    sub.units.forEach(u => {
      ;[...u.theory, ...u.practical].forEach(l => count(u.name, l))
    })
  } else if (sub.sections) {
    sub.sections.forEach(s => s.units.forEach(u => u.lessons.forEach(l => count(u.name, l))))
  } else {
    sub.units.forEach(u => u.lessons.forEach(l => count(u.name, l)))
  }

  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
}

export function getOverallProgress(state) {
  let total = 0, done = 0
  SUBJECTS.forEach(s => {
    const p = getSubjectProgress(s, state)
    total += p.total
    done  += p.done
  })
  return total ? Math.round((done / total) * 100) : 0
}
