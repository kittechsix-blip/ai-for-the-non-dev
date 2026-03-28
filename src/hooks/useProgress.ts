import { useState, useCallback } from 'react'
import { loadProgress, saveCourseProgress, type CourseProgress } from '../lib/storage'

export function useProgress() {
  const [progress] = useState(loadProgress)

  const getTotalCompleted = useCallback(() => {
    return Object.values(progress.courses).reduce(
      (sum, cp) => sum + cp.completedLessons.length,
      0
    )
  }, [progress])

  const getCourseCompletedCount = useCallback(
    (courseId: string) => {
      return progress.courses[courseId]?.completedLessons.length || 0
    },
    [progress]
  )

  return { progress, getTotalCompleted, getCourseCompletedCount }
}

export function useCourseProgress(courseId: string, totalLessons: number) {
  const stored = loadProgress().courses[courseId]
  const [state, setState] = useState<CourseProgress>(
    stored || {
      currentLesson: 0,
      completedLessons: [],
      quizAnswered: new Array(totalLessons).fill(false),
      quizCorrect: new Array(totalLessons).fill(false),
    }
  )

  const persist = useCallback(
    (next: CourseProgress) => {
      setState(next)
      saveCourseProgress(courseId, next)
    },
    [courseId]
  )

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, totalLessons))
      persist({ ...state, currentLesson: clamped })
    },
    [state, persist, totalLessons]
  )

  const toggleDone = useCallback(
    (idx: number) => {
      const completed = state.completedLessons.includes(idx)
        ? state.completedLessons.filter(i => i !== idx)
        : [...state.completedLessons, idx]
      persist({ ...state, completedLessons: completed })
    },
    [state, persist]
  )

  const answerQuiz = useCallback(
    (lessonIdx: number, selectedIdx: number, correctIdx: number) => {
      const quizAnswered = [...state.quizAnswered]
      const quizCorrect = [...state.quizCorrect]
      quizAnswered[lessonIdx] = true
      quizCorrect[lessonIdx] = selectedIdx === correctIdx
      persist({ ...state, quizAnswered, quizCorrect })
    },
    [state, persist]
  )

  const reset = useCallback(() => {
    persist({
      currentLesson: 0,
      completedLessons: [],
      quizAnswered: new Array(totalLessons).fill(false),
      quizCorrect: new Array(totalLessons).fill(false),
    })
  }, [persist, totalLessons])

  return { state, goTo, toggleDone, answerQuiz, reset }
}
