import { STORAGE_KEY, LEGACY_APP_KEY, LEGACY_COURSE_PREFIX } from './constants'

export interface CourseProgress {
  currentLesson: number
  completedLessons: number[]
  quizAnswered: boolean[]
  quizCorrect: boolean[]
}

export interface AppProgress {
  courses: Record<string, CourseProgress>
}

function defaultProgress(): AppProgress {
  return { courses: {} }
}

function migrateLegacy(): AppProgress | null {
  try {
    const legacy = localStorage.getItem(LEGACY_APP_KEY)
    if (!legacy) return null

    const progress = defaultProgress()
    const legacyData = JSON.parse(legacy) as Record<string, { done?: number; total?: number }>

    for (const [courseId, data] of Object.entries(legacyData)) {
      const courseKey = `${LEGACY_COURSE_PREFIX}${courseId}`
      const courseState = localStorage.getItem(courseKey)
      if (courseState) {
        const parsed = JSON.parse(courseState)
        progress.courses[courseId] = {
          currentLesson: parsed.current || 0,
          completedLessons: parsed.done || [],
          quizAnswered: parsed.quizAnswered || [],
          quizCorrect: parsed.quizCorrect || [],
        }
        localStorage.removeItem(courseKey)
      } else if (data.done) {
        progress.courses[courseId] = {
          currentLesson: 0,
          completedLessons: Array.from({ length: data.done }, (_, i) => i),
          quizAnswered: [],
          quizCorrect: [],
        }
      }
    }

    localStorage.removeItem(LEGACY_APP_KEY)
    return progress
  } catch {
    return null
  }
}

export function loadProgress(): AppProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    const migrated = migrateLegacy()
    if (migrated) {
      saveProgress(migrated)
      return migrated
    }
    return defaultProgress()
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(progress: AppProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch { /* quota exceeded — silent fail */ }
}

export function getCourseProgress(courseId: string): CourseProgress {
  const progress = loadProgress()
  return progress.courses[courseId] || {
    currentLesson: 0,
    completedLessons: [],
    quizAnswered: [],
    quizCorrect: [],
  }
}

export function saveCourseProgress(courseId: string, course: CourseProgress): void {
  const progress = loadProgress()
  progress.courses[courseId] = course
  saveProgress(progress)
}
