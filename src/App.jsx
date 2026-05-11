import { useState } from 'react'
import { SUBJECTS, getOverallProgress } from './data'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import ProgressRing from './components/ProgressRing'
import Icon from './components/Icon'
import OverviewPage from './pages/OverviewPage'
import SubjectPage from './pages/SubjectPage'
import ExamsPage from './pages/ExamsPage'
import Swal from 'sweetalert2'

export default function App() {
  const [state, setState] = useLocalStorage('studytrack_v3', {})
  const [view, setView] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // ── رسائل تشجيعية ─────────────────────────────────────────────────────
  const messages = [
    'كمّل شوية كمان وإنت هتفرح بنفسك جدًا 🚀',
    'كل صفحة بتقربك من حلمك 📚',
    'تعب النهارده = راحة بكرة 😌',
    'ركّز دلوقتي واستريح بعدين براحتك 💯',
    'إنت قدها والله 🔥',
    'متقفش دلوقتي، إنت بدأت بالفعل 👏',
    'كل دقيقة مذاكرة بتفرق ⏳',
    'النجاح محتاج نفس طويل بس إنت تقدر 🏆',
    'قوم ذاكر عشان النسخة اللي نفسك تبقى عليها 🌟',
    'مستقبلك مستني منك خطوة بس 🎯',
    'شد حيلك، الامتحان مش مستحيل 💪',
    'ركّز في اللي عليك وسيب الباقي على ربنا 🤍',
    'المذاكرة دلوقتي أحسن من الندم بعدين 😮‍💨',
    'حتى لو ببطء المهم متقفش 🐢',
    'إنت مش فاشل، إنت بس محتاج تكمل ✨',
    'افتكر ليه بدأت 📖',
    'كله بيتعب، بس مش كله بيكمل 🧠',
    'خليك فاكر إن النجاح ليه طعم يستاهل 🍯',
    'نص ساعة كمان وهتنجز كتير ⏰',
    'ذاكر النهارده عشان تنام مرتاح 😴',
    'كل معلومة بتثبت هتفيدك بعدين 📘',
    'متضيعش تعبك اللي فات 🚫',
    'قوم بس ابدأ والباقي هيكمل لوحده ⚡',
    'التركيز دلوقتي هيريّحك قدام 🎓',
    'حلمك محتاج منك مجهود بسيط كمان 🌠',
    'يوم ورا يوم هتوصل 🛣️',
    'إنت أقوى من الكسل 🦾',
    'حتى لو مخنوق ذاكر برضه 😤',
    'البداية صعبة بس إنت عديتها 🧗',
    'كل ما تكمل ثقتك في نفسك هتكبر 💎',
    'خلّي هدفك قدام عينك 👀',
    'محدش هينقذك غير نفسك 🚶',
    'اجتهد وربنا مش هيضيع تعبك 🤲',
    'إوعى تستسلم في آخر الطريق 🛑',
    'مستقبلك أهم من أي تضييع وقت ⌛',
    'ركّز دلوقتي وافرح بعدين 🎉',
    'دقيقة تركيز أحسن من ساعة تشتت 🧩',
    'كل يوم مذاكرة بيعمل فرق 📈',
    'إنت مش متأخر، إنت لسه بتحاول 💫',
    'النجاح بيحب الناس اللي بتكمل 🥇',
    'قوم ذاكر قبل ما الندم ييجي ⚠️',
    'خلّي عندك ثقة إنك هتعدي 🌈',
    'تعبك النهارده هيفرح أهلك بكرة ❤️',
    'كل إنجاز صغير بيتحسب 📝',
    'متقلقش، خطوة خطوة 👣',
    'ركّز على اللي تقدر تعمله دلوقتي 🔍',
    'إنت عندك القدرة بس محتاج تقوم ⚔️',
    'افتح الكتاب وخد أول خطوة 📕',
    'يوم المذاكرة بيخلص، بس نتيجته بتفضل 🏅',
    'مفيش حد ناجح من غير تعب 🛠️',
    'إوعى تضيع مستقبلك بإيدك 🚫',
    'المجهود عمره ما بيروح هدر 💥',
    'حتى لو تعبان، كمّل على قد ما تقدر 😓',
    'النجاح مش للعباقرة بس، للمكملين 🧠',
    'خليك ثابت مهما زهقت 🧱',
    'كل شابتر تخلصه إنجاز 📚',
    'قوم دلوقتي ومتأجلش ⏳',
    'إنت أقرب مما تتخيل 🌍',
    'ركّز ساعة وارتاح براحتك بعدين ☕',
    'خليك فاكر شعور النجاح 🥹',
    'كل تعب وليه نهاية حلوة 🌷',
    'الإنجاز بيبدأ بقرار 🧭',
    'بطل تفكير وابدأ مذاكرة ⚡',
    'الوقت بيجري، استغله صح 🕒',
    'متستناش المود، ابدأ وخلاص 🎬',
    'إنت تقدر تعمل أكتر من كده 🚀',
    'شد حيلك عشان نفسك 🤍',
    'اللي بيكمل هو اللي بيوصل 🏁',
    'النهارده فرصة جديدة 🌞',
    'خليك فخور بنفسك حتى لو خطوة صغيرة 🫶',
    'كل ساعة مذاكرة هتفيدك ⌚',
    'النجاح محتاج التزام مش حماس بس 🔒',
    'قوم حارب كسلك ⚔️',
    'كل ما تذاكر أكتر القلق هيقل 🌤️',
    'إنت مش لوحدك، كله بيتعب 🤝',
    'كمّل عشان متندمش 🧠',
    'المذاكرة دلوقتي أهون من الضغط بعدين 😵',
    'هدفك يستاهل التعب 🏔️',
    'خليك مركز على حلمك 🌌',
    'حتى الأيام الصعبة بتعدي 🌧️',
    'إنت بتبني مستقبلك دلوقتي 🏗️',
    'افتكر إحساس النتيجة الحلوة 🎊',
    'خطوة صغيرة أحسن من مفيش 👣',
    'قوم ذاكر وربنا يوفقك 🤲',
    'النجاح محتاج صبر بس 🌱',
    'متقارنش نفسك بحد 🚫',
    'كل واحد ليه رحلته 🛤️',
    'خليك مستمر مهما حصل 🔄',
    'التعب مؤقت لكن النجاح بيفضل 🏆',
    'ركّز في هدفك وسيب أي حاجة تانية 🎯',
    'إنت تستحق تنجح 💖',
    'كمّل عشان حلمك ميضيعش 🌠',
    'المذاكرة صعبة بس الندم أصعب 😔',
    'النهارده تعب، بكرة فرحة 🎈',
    'خليك قد التحدي 🥊',
    'قوم ذاكر حتى لو مش طايق 😤',
    'كل مجهود محسوب 📊',
    'إوعى تستهون بنفسك 👑',
    'إنت قادر تنجح فعلًا 💯',
    'كمّل… إنت قربت جدًا 🚀'
  ]

  // ── Mutations ─────────────────────────────────────────────────────────
  const toggleLesson = (subId, unitName, lesson) => {
    const k = `${subId}__${unitName}__${lesson}`

    setState(prev => {
      const next = { ...prev }

      if (next[k]) {
        delete next[k]
      } else {
        next[k] = 1

        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)]

        Swal.fire({
          title: randomMessage,
          timer: 2500,
          showConfirmButton: false,
          background: '#181c2a',
          color: '#fff',
          toast: true,
          position: 'top-end',
          icon: 'success',
          customClass: {
            popup: 'rounded-2xl shadow-2xl'
          }
        })
      }

      return next
    })
  }

  const toggleExam = (year) => {
    const k = `exam__${year}`

    setState(prev => {
      const next = { ...prev }

      if (next[k]) delete next[k]
      else next[k] = 1

      return next
    })
  }

  const resetAll = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      setState({})
      setView('overview')
    }
  }

  // ── Derived ───────────────────────────────────────────────────────────
  const currentSub = SUBJECTS.find(s => s.id === view)
  const overall = getOverallProgress(state)

  const topbarTitle =
    view === 'overview'
      ? 'Overview'
      : view === 'exams'
      ? 'Past Exams'
      : `${currentSub?.icon}  ${currentSub?.name}`

  const topbarSub =
    view === 'overview'
      ? `${SUBJECTS.length} subjects tracked`
      : view === 'exams'
      ? 'Track your exam practice'
      : (() => {
          if (!currentSub) return ''
          const done = Object.keys(state).filter(k =>
            k.startsWith(`${currentSub.id}__`)
          ).length

          return `${done} checks completed`
        })()

  // ── Sidebar ───────────────────────────────────────────────────────────
  const sidebar = (
    <Sidebar
      view={view}
      setView={(v) => {
        setView(v)
        setMobileOpen(false)
      }}
      state={state}
      onReset={resetAll}
    />
  )

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#0b0d14' }}
    >
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">{sidebar}</div>

      {/* Mobile sidebar */}
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

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
          style={{
            background: '#12151f',
            borderColor: 'rgba(255,255,255,0.05)'
          }}
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

            <p
              className="text-[11px] mt-0.5 truncate"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {topbarSub}
            </p>
          </div>

          {/* Countdown to exams */}
          {(() => {
            const examDate = new Date('2026-06-06')
            const today = new Date()
            today.setHours(0,0,0,0)
            const diffMs = examDate - today
            const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
            return (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0"
                style={{ background: daysLeft <= 7 ? 'rgba(239,68,68,0.12)' : daysLeft <= 30 ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.12)' }}
              >
                <span className="text-lg">{daysLeft <= 7 ? '🔴' : daysLeft <= 30 ? '🟡' : '🟢'}</span>
                <div>
                  <div className="text-[12px] font-display font-bold leading-none" style={{ color: daysLeft <= 7 ? '#f87171' : daysLeft <= 30 ? '#fbbf24' : '#34d399' }}>
                    {daysLeft} يوم
                  </div>
                  <div
                    className="text-[9px] mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    للامتحانات 📝
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Overall pill */}
          <div
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl flex-shrink-0"
            style={{ background: 'rgba(124,109,248,0.09)' }}
          >
            <ProgressRing
              pct={overall}
              size={28}
              stroke={3}
              color="#7c6df8"
            />

            <div>
              <div className="text-[12px] font-display font-bold text-white/80 leading-none">
                {overall}%
              </div>

              <div
                className="text-[9px] mt-0.5"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                overall
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-5 py-6">
          {view === 'overview' && (
            <OverviewPage state={state} onSelectSubject={setView} />
          )}

          {view === 'exams' && (
            <ExamsPage state={state} onToggle={toggleExam} />
          )}

          {currentSub && (
            <SubjectPage
              sub={currentSub}
              state={state}
              onToggle={toggleLesson}
            />
          )}
        </main>
      </div>
    </div>
  )
}