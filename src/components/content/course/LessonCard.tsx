import type { Lesson } from '../../../data/types'
import { useSwipe } from '../../../hooks/useSwipe'
import { AnalogyBox } from './AnalogyBox'
import { ScenarioBox } from './ScenarioBox'
import { TakeawayBox } from './TakeawayBox'
import { QuizBlock } from './QuizBlock'

interface LessonCardProps {
  lesson: Lesson
  lessonIdx: number
  totalLessons: number
  isDone: boolean
  quizAnswered: boolean
  quizCorrect: boolean
  onPrev: () => void
  onNext: () => void
  onToggleDone: () => void
  onQuizAnswer: (selectedIdx: number) => void
}

export function LessonCard({
  lesson,
  lessonIdx,
  totalLessons,
  isDone,
  quizAnswered,
  quizCorrect,
  onPrev,
  onNext,
  onToggleDone,
  onQuizAnswer,
}: LessonCardProps) {
  const swipe = useSwipe({
    onSwipeLeft: lessonIdx < totalLessons - 1 ? onNext : undefined,
    onSwipeRight: lessonIdx > 0 ? onPrev : undefined,
  })

  return (
    <div
      className="lesson-container max-w-[720px] mx-auto px-5 pb-10"
      {...swipe}
    >
      <div className="bg-surface border border-surface-3 rounded-[var(--radius-card)] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.3)]">
        {/* Header */}
        <div className="lesson-header p-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: lesson.color }}
            >
              {lesson.icon}
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-muted">
              Lesson {lessonIdx + 1} of {totalLessons}
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mb-1">{lesson.title}</h2>
          <p className="text-[13px] text-muted">{lesson.oneLiner}</p>
        </div>

        {/* Body */}
        <div className="lesson-body px-6 pb-6">
          <AnalogyBox html={lesson.analogy} />

          <div className="text-xs font-bold tracking-wider uppercase text-muted mb-2">
            What It Actually Does
          </div>
          <p
            className="text-[14px] leading-relaxed text-primary/90 mb-5"
            dangerouslySetInnerHTML={{ __html: lesson.explain }}
          />

          <ScenarioBox messages={lesson.scenario} footer={lesson.scenarioFooter} />
          <TakeawayBox html={lesson.takeaway} />
          <QuizBlock
            quiz={lesson.quiz}
            answered={quizAnswered}
            correct={quizCorrect}
            onAnswer={onQuizAnswer}
          />
        </div>

        {/* Footer */}
        <div className="lesson-footer px-6 pb-5 flex items-center justify-between gap-3">
          <button
            onClick={onPrev}
            disabled={lessonIdx === 0}
            className="px-5 py-2.5 rounded-full border-[1.5px] border-surface-3 bg-transparent text-muted text-sm font-semibold cursor-pointer disabled:opacity-30 disabled:cursor-default hover:border-accent hover:text-primary transition-all"
          >
            &larr;
          </button>
          <button
            onClick={onToggleDone}
            className={`px-5 py-2.5 rounded-full border-[1.5px] text-sm font-semibold cursor-pointer transition-all ${
              isDone
                ? 'bg-green/10 border-green text-green'
                : 'bg-transparent border-green/40 text-green hover:bg-green/10'
            }`}
          >
            {isDone ? '✓ Done' : 'Mark Done'}
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2.5 rounded-full border-none bg-accent text-white text-sm font-semibold cursor-pointer hover:brightness-110 transition-all"
          >
            {lessonIdx === totalLessons - 1 ? 'Finish →' : '→'}
          </button>
        </div>
        <div className="text-center text-[11px] text-muted/50 pb-4">
          Swipe left or right to navigate
        </div>
      </div>
    </div>
  )
}
