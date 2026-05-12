import { lazy, Suspense, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  PrimaryButton,
  GhostButton,
} from '../components/bubblegum'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizResults } from '../hooks/useQuiz'
import type { LessonSlide, Question } from '../types'

const StaffNotation = lazy(() =>
  import('../components/music/StaffNotation').then((m) => ({ default: m.StaffNotation }))
)

const BUBBLEGUM_CONFETTI = ['#ff7faf', '#ffaf95', '#ffd66b', '#a8e6b8', '#a8d8ff', '#cfb6ff']

function deriveSlidesFromQuestions(questions: Question[]): LessonSlide[] {
  return questions.map((q) => ({
    id: `${q.id}-slide`,
    topic: q.topic,
    explanation: q.explanation,
    questionText: q.type === 'true-false' ? q.text : undefined,
    keyFact: q.options[q.correctAnswer],
    reference: q.reference,
  }))
}

export function Lesson() {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string
    moduleId: string
    lessonId: string
  }>()
  const navigate = useNavigate()
  const { completeLesson } = useProgress()
  const resultRef = useRef<QuizResults | null>(null)
  const xpRef = useRef(0)

  const [phase, setPhase] = useState<'study' | 'quiz'>('study')
  const [slideIndex, setSlideIndex] = useState(0)

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)
  const lesson = mod?.lessons.find((l) => l.id === lessonId)

  const slides: LessonSlide[] = lesson
    ? (lesson.slides ?? deriveSlidesFromQuestions(lesson.questions))
    : []

  const handleComplete = (results: QuizResults) => {
    resultRef.current = results
    if (!course || !mod || !lesson) return
    const xp = completeLesson({
      courseId: course.id,
      moduleId: mod.id,
      lessonId: lesson.id,
      correctCount: results.correctCount,
      totalCount: results.totalCount,
      questions: lesson.questions,
      answers: results.answers,
    })
    xpRef.current = xp
    if (results.score >= 90) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: BUBBLEGUM_CONFETTI,
      })
    }
  }

  const quiz = useQuiz({
    questions: lesson?.questions ?? [],
    onComplete: handleComplete,
  })

  if (!course || !mod || !lesson) {
    return (
      <BubblegumLayout hideTabBar back title="Not found">
        <div className="mt-12 rounded-3xl bg-white p-6 text-center">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">Track not found.</p>
          <div className="mt-4">
            <PrimaryButton onClick={() => navigate(`/learn/${courseId ?? ''}`)}>
              Back to album →
            </PrimaryButton>
          </div>
        </div>
      </BubblegumLayout>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (quiz.completed && resultRef.current) {
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <ResultsView
          results={resultRef.current}
          questions={lesson.questions}
          xpEarned={xpRef.current}
          lessonTitle={lesson.title}
          onPlayNext={() => navigate(`/learn/${course.id}`)}
          onBackToSetlist={() => navigate('/learn')}
          onClose={() => navigate(`/learn/${course.id}`)}
        />
      </BubblegumLayout>
    )
  }

  return (
    <BubblegumLayout hideHeader hideTabBar>
      <QuizHeader
        progressValue={
          phase === 'study'
            ? slideIndex / Math.max(slides.length, 1)
            : quiz.progress / 100
        }
        stepLabel={
          phase === 'study'
            ? `STUDY ${Math.min(slideIndex + 1, slides.length)}/${slides.length}`
            : `${quiz.currentIndex + 1}/${lesson.questions.length}`
        }
        onClose={() => navigate(`/learn/${course.id}/modules/${mod.id}`)}
      />

      {/* STUDY PHASE */}
      {phase === 'study' && slideIndex < slides.length && (
        <StudyView
          slide={slides[slideIndex]}
          slideIndex={slideIndex}
          totalSlides={slides.length}
          onPrev={() => setSlideIndex((i) => Math.max(0, i - 1))}
          onNext={() => setSlideIndex((i) => i + 1)}
          onSkip={() => setPhase('quiz')}
          onStartQuiz={() => setPhase('quiz')}
          lessonTitle={lesson.title}
          xpReward={lesson.xpReward}
        />
      )}

      {/* QUIZ PHASE */}
      {phase === 'quiz' && (
        <QuestionView
          question={quiz.currentQuestion}
          selectedAnswer={quiz.selectedAnswer}
          showFeedback={quiz.showFeedback}
          isCorrect={quiz.isCorrect}
          isLast={quiz.currentIndex === lesson.questions.length - 1}
          onSelect={quiz.selectAnswer}
          onContinue={quiz.advance}
          xpReward={lesson.xpReward}
        />
      )}
    </BubblegumLayout>
  )
}

// ── Quiz header — ✕ button + progress dots + step label ─────────────────────

function QuizHeader({
  progressValue,
  stepLabel,
  onClose,
}: {
  progressValue: number
  stepLabel: string
  onClose: () => void
}) {
  return (
    <div className="-mx-5 mb-3 flex items-center gap-3 px-5 pt-2 pb-3">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lesson"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-black text-bubblegum-plum touch-manipulation"
      >
        ✕
      </button>
      <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-bubblegum-peach transition-[width] duration-300"
          style={{ width: `${Math.max(0, Math.min(100, progressValue * 100))}%` }}
        />
      </div>
      <Mono size="xs">{stepLabel}</Mono>
    </div>
  )
}

// ── Study view — slide before quiz ──────────────────────────────────────────

function StudyView({
  slide,
  slideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSkip,
  onStartQuiz,
  lessonTitle,
  xpReward,
}: {
  slide: LessonSlide
  slideIndex: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  onSkip: () => void
  onStartQuiz: () => void
  lessonTitle: string
  xpReward: number
}) {
  const isLast = slideIndex === totalSlides - 1
  const isFirst = slideIndex === 0
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <Mono>study · {slide.topic}</Mono>
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-extrabold text-bubblegum-plum-soft underline touch-manipulation"
          >
            Skip to quiz →
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-5">
          <Doodle ch="♪" x={18} y={14} size={18} rot={-15} color="#ffaf95" opacity={0.4} />

          {slide.questionText && (
            <p className="mb-3 text-sm font-semibold text-bubblegum-plum-soft">
              {slide.questionText}
            </p>
          )}

          <p className="text-[22px] font-black leading-[1.15] tracking-[-0.02em] text-bubblegum-plum">
            {lessonTitle}
          </p>

          <div className="mt-3 rounded-2xl bg-bubblegum-peach/30 p-3">
            <p className="flex items-start gap-2 text-sm font-semibold text-bubblegum-plum">
              <span className="text-base leading-none" aria-hidden="true">💡</span>
              <span>{slide.explanation}</span>
            </p>
          </div>

          {slide.keyFact && (
            <div className="mt-3 rounded-2xl bg-bubblegum-mint p-3">
              <Mono size="xs">key fact</Mono>
              <p className="mt-1 text-base font-black text-bubblegum-plum">{slide.keyFact}</p>
            </div>
          )}

          {slide.reference && (
            <p className="mt-3 text-[11px] font-semibold text-bubblegum-plum-dim">
              {slide.reference}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <GhostButton onClick={onPrev} disabled={isFirst} fullWidth={false}>
            ← Back
          </GhostButton>
          <div className="flex-1">
            {isLast ? (
              <PrimaryButton onClick={onStartQuiz}>Start quiz · +{xpReward} XP →</PrimaryButton>
            ) : (
              <PrimaryButton onClick={onNext}>
                Next ({slideIndex + 1}/{totalSlides}) →
              </PrimaryButton>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Question view + Encore/Off-key feedback ─────────────────────────────────

function QuestionView({
  question,
  selectedAnswer,
  showFeedback,
  isCorrect,
  isLast,
  onSelect,
  onContinue,
  xpReward,
}: {
  question: Question
  selectedAnswer: number | null
  showFeedback: boolean
  isCorrect: boolean
  isLast: boolean
  onSelect: (i: number) => void
  onContinue: () => void
  xpReward: number
}) {
  const shortOptions = question.options.every((o) => o.length <= 5)
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col gap-3.5"
    >
      <div>
        <Mono>{question.topic} · question</Mono>
        <p className="mt-1 text-[22px] font-black leading-[1.15] tracking-[-0.02em] text-bubblegum-plum">
          {question.text}
        </p>
      </div>

      {question.staffConfig && (
        <div className="relative overflow-hidden rounded-3xl bg-white p-5">
          <Doodle ch="♪" x={18} y={14} size={18} rot={-15} color="#ffaf95" opacity={0.4} />
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center text-bubblegum-plum-dim">
                Loading notation…
              </div>
            }
          >
            <div className="flex justify-center">
              <StaffNotation {...question.staffConfig} />
            </div>
          </Suspense>
        </div>
      )}

      <div className={`grid gap-2.5 ${shortOptions ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isAnswerCorrect = idx === question.correctAnswer
          const state = !showFeedback
            ? isSelected ? 'selected' : 'idle'
            : isSelected && isAnswerCorrect ? 'right'
            : isSelected && !isAnswerCorrect ? 'wrong'
            : isAnswerCorrect ? 'reveal'
            : 'dim'

          const classes: Record<typeof state, string> = {
            idle:     'bg-white border-bubblegum-cream-hi text-bubblegum-plum active:scale-[0.98]',
            selected: 'bg-white border-bubblegum-plum text-bubblegum-plum',
            right:    'bg-bubblegum-mint border-bubblegum-plum text-bubblegum-plum',
            wrong:    'bg-bubblegum-cherry/20 border-bubblegum-cherry text-bubblegum-plum',
            reveal:   'bg-bubblegum-mint border-bubblegum-plum text-bubblegum-plum',
            dim:      'bg-white border-bubblegum-cream-hi text-bubblegum-plum opacity-55',
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              disabled={showFeedback}
              className={`relative rounded-[18px] border-[3px] p-4 text-center transition-all touch-manipulation select-none ${classes[state]} ${
                shortOptions ? 'text-[22px] font-black' : 'text-sm font-extrabold leading-snug'
              }`}
            >
              {option}
              {state === 'right' && (
                <span
                  className="absolute -right-2 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-bubblegum-plum text-sm text-bubblegum-cream"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
              {state === 'wrong' && (
                <span
                  className="absolute -right-2 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-bubblegum-cherry text-sm text-white"
                  aria-hidden="true"
                >
                  ✕
                </span>
              )}
              {state === 'reveal' && (
                <div className="mt-1">
                  <Mono size="xs" tone="plum">correct</Mono>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!showFeedback && (
        <button
          type="button"
          disabled
          className="mt-1 cursor-not-allowed rounded-full border-2 border-dashed border-bubblegum-plum-dim bg-bubblegum-cream py-3.5 text-sm font-extrabold text-bubblegum-plum-dim"
        >
          Tap a note to answer
        </button>
      )}

      {showFeedback && (
        <FeedbackPanel
          isCorrect={isCorrect}
          isLast={isLast}
          explanation={question.explanation}
          correctOption={question.options[question.correctAnswer]}
          onContinue={onContinue}
          xpReward={xpReward}
        />
      )}
    </motion.div>
  )
}

function FeedbackPanel({
  isCorrect,
  isLast,
  explanation,
  correctOption,
  onContinue,
  xpReward,
}: {
  isCorrect: boolean
  isLast: boolean
  explanation: string
  correctOption: string
  onContinue: () => void
  xpReward: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.36, 0.07, 0.19, 0.97] }}
      className={`relative overflow-hidden rounded-3xl p-5 ${
        isCorrect ? 'bg-bubblegum-mint' : 'border-t-4 border-bubblegum-cherry bg-bubblegum-cherry/20'
      }`}
    >
      <Doodle
        ch={isCorrect ? '♪' : '♭'}
        x={20}
        y={14}
        size={isCorrect ? 22 : 26}
        rot={-15}
        color={isCorrect ? '#3a224f' : '#ff7faf'}
        opacity={isCorrect ? 0.25 : 0.4}
      />

      <div className="flex items-center gap-3.5">
        <span
          className="inline-block leading-none"
          style={{ fontSize: '52px', transform: `rotate(${isCorrect ? -12 : -8}deg)` }}
          aria-hidden="true"
        >
          {isCorrect ? '🎉' : '🎧'}
        </span>
        <div className="flex-1">
          <p className="text-2xl font-black leading-none tracking-[-0.025em] text-bubblegum-plum">
            {isCorrect ? 'Encore!' : 'Off-key — close though!'}
          </p>
          <div className="mt-1">
            {isCorrect ? (
              <Mono size="sm">+{xpReward / 4 | 0} XP for this song</Mono>
            ) : (
              <Mono size="sm" tone="cherry">no XP this song</Mono>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm font-bold leading-relaxed text-bubblegum-plum">
        {!isCorrect && (
          <>
            It's actually <strong className="text-bubblegum-green">{correctOption}</strong>.{' '}
          </>
        )}
        {explanation}
      </p>

      <div className="mt-4">
        <PrimaryButton tone="plum" onClick={onContinue}>
          {isLast ? 'See the set →' : isCorrect ? 'Next track →' : 'Got it, next one →'}
        </PrimaryButton>
      </div>
    </motion.div>
  )
}

// ── Results — end-of-set celebration ────────────────────────────────────────

function bestStreak(answers: (number | null)[], questions: Question[]): number {
  let best = 0
  let cur = 0
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === questions[i].correctAnswer) {
      cur += 1
      best = Math.max(best, cur)
    } else {
      cur = 0
    }
  }
  return best
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function ResultsView({
  results,
  questions,
  xpEarned,
  lessonTitle,
  onPlayNext,
  onBackToSetlist,
  onClose,
}: {
  results: QuizResults
  questions: Question[]
  xpEarned: number
  lessonTitle: string
  onPlayNext: () => void
  onBackToSetlist: () => void
  onClose: () => void
}) {
  const { score, correctCount, totalCount, timeTaken } = results
  const tag =
    score >= 90 ? '🌟 STANDING OVATION'
    : score >= 70 ? '👏 GREAT SET'
    : score >= 50 ? '🎤 KEEP PLAYING'
    : '🎧 ENCORE LATER'
  const headline =
    score >= 90 ? "Crowd's going wild!"
    : score >= 70 ? 'Solid set!'
    : score >= 50 ? 'Almost there!'
    : 'Tune up!'

  const streak = bestStreak(results.answers, questions)

  return (
    <div className="relative -mx-5 flex flex-1 flex-col">
      {/* Confetti doodles scattered behind everything */}
      <Doodle ch="♪" x={28} y={70} size={36} rot={-15} color="#ffaf95" opacity={0.55} />
      <Doodle ch="♬" x={330} y={60} size={42} rot={12} color="#cfb6ff" opacity={0.55} />
      <Doodle ch="♫" x={50} y={210} size={28} rot={-8} color="#a8e6b8" opacity={0.65} />
      <Doodle ch="♩" x={340} y={260} size={38} rot={18} color="#a8d8ff" opacity={0.6} />
      <Doodle ch="♪" x={30} y={400} size={26} rot={-20} color="#ffd66b" opacity={0.7} />
      <Doodle ch="✦" x={360} y={410} size={24} color="#ff7faf" opacity={0.5} />

      <div className="relative z-[1] flex items-center px-5 pt-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close results"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-black text-bubblegum-plum touch-manipulation"
        >
          ✕
        </button>
      </div>

      <div className="relative z-[1] flex-1 overflow-y-auto px-5 pt-2">
        <div className="text-center">
          <Mono size="sm" tone="cherry">{tag}</Mono>
          <p className="mt-2 text-[42px] font-black leading-none tracking-[-0.035em] text-bubblegum-plum">
            {headline}
          </p>
          <p className="mt-1 text-sm font-semibold text-bubblegum-plum-soft">{lessonTitle}</p>
        </div>

        <ScoreDonut score={score} correctCount={correctCount} totalCount={totalCount} />

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <StatTile label="XP earned" value={`+${xpEarned}`} tone="butter" />
          <StatTile label="Best run" value={`×${streak}`} tone="peach" />
          <StatTile label="Time on stage" value={formatTime(timeTaken)} tone="lavender" />
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <PrimaryButton tone="plum" onClick={onPlayNext}>Play next track →</PrimaryButton>
          <GhostButton onClick={onBackToSetlist}>Back to setlist</GhostButton>
        </div>

        <p className="mt-5 mb-6 text-center text-xs font-bold text-bubblegum-plum-soft">
          {score >= 90 ? '🔥 Tomorrow’s track is queued up.' : '🔁 We saved the misses to your B-sides.'}
        </p>
      </div>
    </div>
  )
}

function ScoreDonut({
  score,
  correctCount,
  totalCount,
}: {
  score: number
  correctCount: number
  totalCount: number
}) {
  const r = 42
  const C = 2 * Math.PI * r
  const dash = (score / 100) * C
  return (
    <div className="mt-6 flex justify-center">
      <div className="relative h-[200px] w-[200px]">
        <svg viewBox="0 0 100 100" width="200" height="200">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#ffffff" strokeWidth="12" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#ffd66b"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={`${dash} ${C}`}
            initial={{ strokeDasharray: `0 ${C}` }}
            animate={{ strokeDasharray: `${dash} ${C}` }}
            transition={{ duration: 1.2, ease: [0.36, 0.07, 0.19, 0.97] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="inline-block font-black leading-[0.9] tabular-nums text-bubblegum-plum"
            style={{ fontSize: '64px', letterSpacing: '-0.04em', transform: 'rotate(-2deg)' }}
          >
            {score}
          </span>
          <Mono>{correctCount}/{totalCount} correct</Mono>
        </div>
        <span
          className="absolute right-7 top-1.5 text-xl text-bubblegum-cherry"
          style={{ transform: 'rotate(20deg)' }}
          aria-hidden="true"
        >
          ✦
        </span>
        <span className="absolute bottom-5 -left-1 text-base text-bubblegum-peach" aria-hidden="true">
          ✦
        </span>
      </div>
    </div>
  )
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'butter' | 'peach' | 'lavender'
}) {
  const bg = {
    butter:   'bg-bubblegum-butter',
    peach:    'bg-bubblegum-peach',
    lavender: 'bg-bubblegum-lavender',
  }[tone]
  return (
    <div className={`rounded-[18px] ${bg} p-3 text-center`}>
      <Mono size="xs">{label}</Mono>
      <p
        className="mt-1 inline-block text-[22px] font-black leading-none tabular-nums text-bubblegum-plum"
        style={{ letterSpacing: '-0.02em' }}
      >
        {value}
      </p>
    </div>
  )
}

