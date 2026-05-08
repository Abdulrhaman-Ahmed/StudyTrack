# 📚 StudyTrack — Vite + React + Tailwind CSS

A personal study progress tracker. All progress saves automatically to **localStorage** — close & reopen the browser and everything is still there.

---

## 🚀 How to run

### Requirements
- **Node.js 18+** → https://nodejs.org

### Steps (3 commands only)

```bash
# 1. Enter the project folder
cd studytrack

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 📦 Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — you can host it on Netlify, Vercel, GitHub Pages, etc.

---

## 📁 Project structure

```
studytrack/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx          ← entry point
    ├── App.jsx           ← root layout + routing
    ├── index.css         ← Tailwind directives + global styles
    ├── data.js           ← all subjects, units, lessons + helpers
    ├── hooks/
    │   └── useLocalStorage.js
    ├── components/
    │   ├── Icon.jsx
    │   ├── ProgressRing.jsx
    │   ├── LessonRow.jsx
    │   ├── UnitCard.jsx
    │   └── Sidebar.jsx
    └── pages/
        ├── OverviewPage.jsx
        ├── SubjectPage.jsx
        └── ExamsPage.jsx
```

---

## ✅ Subjects included

| Subject | Units | Lessons |
|---|---|---|
| Social Studies | 2 (Unit 5 & 6) | 20 |
| Physics | 2 terms × 2 units | 22 |
| Islamic Studies | 6 units | 18 |
| Christian Studies | 4 units | 13 |
| Arabic Language | 5 sections | 24 |
| Mathematics | 4 units | 28 |
| Programming | 8 units (Theory + Practical) | 80 |
| English | 12 units | 60 |
| Economics | 4 units | 18 |

**Past Exams:** 2023 · 2024 · 2025 · 2026
