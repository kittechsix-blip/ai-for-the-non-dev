import { useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { useCourseProgress } from '../hooks/useProgress'
import { TopBar } from '../components/layout/TopBar'
import { LessonNav } from '../components/content/course/LessonNav'
import { LessonCard } from '../components/content/course/LessonCard'
import { CourseFinale } from '../components/content/course/CourseFinale'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courses.find(c => c.id === courseId)

  if (!course) {
    return (
      <div className="text-center py-20 text-muted">
        <div className="text-5xl mb-4">🤔</div>
        <p>Course not found.</p>
      </div>
    )
  }

  const { state, goTo, toggleDone, answerQuiz, reset } = useCourseProgress(course.id, course.lessons.length)
  const isFinale = state.completedLessons.length === course.lessons.length && state.currentLesson === course.lessons.length

  const pct = Math.round((state.completedLessons.length / course.lessons.length) * 100)

  return (
    <div>
      <TopBar title={course.title} />

      {/* Hero */}
      <div className="text-center px-6 pt-9 pb-7 max-w-[720px] mx-auto">
        <div className="inline-block bg-accent-glow text-accent font-semibold text-xs px-3.5 py-1 rounded-full mb-3 tracking-wider">
          {course.lessons.length} lessons &middot; {course.estimatedTime} &middot; {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
        </div>
        <h1 className="text-[clamp(1.5rem,5vw,2.2rem)] font-extrabold leading-tight tracking-tight mb-2">
          {course.title}
        </h1>
        <p className="text-sm text-muted max-w-[440px] mx-auto">{course.description}</p>
      </div>

      {/* Progress bar */}
      <div className="max-w-[720px] mx-auto mb-6 px-6">
        <div className="h-[5px] bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-muted mt-1">
          <span>{state.completedLessons.length} of {course.lessons.length} lessons</span>
          <span>{pct}%</span>
        </div>
      </div>

      {/* Nav pills */}
      <LessonNav
        lessons={course.lessons}
        current={state.currentLesson}
        completed={state.completedLessons}
        onSelect={goTo}
      />

      {/* Lesson or finale */}
      {isFinale ? (
        <CourseFinale
          quizCorrect={state.quizCorrect}
          totalLessons={course.lessons.length}
          onReset={reset}
        />
      ) : state.currentLesson < course.lessons.length ? (
        <LessonCard
          lesson={course.lessons[state.currentLesson]}
          lessonIdx={state.currentLesson}
          totalLessons={course.lessons.length}
          isDone={state.completedLessons.includes(state.currentLesson)}
          quizAnswered={state.quizAnswered[state.currentLesson] || false}
          quizCorrect={state.quizCorrect[state.currentLesson] || false}
          onPrev={() => goTo(state.currentLesson - 1)}
          onNext={() => goTo(state.currentLesson + 1)}
          onToggleDone={() => toggleDone(state.currentLesson)}
          onQuizAnswer={(sel) => answerQuiz(state.currentLesson, sel, course.lessons[state.currentLesson].quiz.correctIndex)}
        />
      ) : null}
    </div>
  )
}
