import { useState, useCallback } from 'react'
import { getWorkflowProgress, saveWorkflowProgress, type WorkflowProgress } from '../lib/storage'

export function useWorkflowProgress(workflowId: string) {
  const [state, setState] = useState<WorkflowProgress>(() => getWorkflowProgress(workflowId))

  const persist = useCallback(
    (next: WorkflowProgress) => {
      setState(next)
      saveWorkflowProgress(workflowId, next)
    },
    [workflowId]
  )

  const setCurrentStep = useCallback(
    (step: number) => {
      persist({ ...state, currentStep: step })
    },
    [state, persist]
  )

  const toggleCheckItem = useCallback(
    (stepIdx: number, itemIdx: number) => {
      const stepChecks = state.checkedItems[stepIdx] || []
      const updated = [...stepChecks]
      updated[itemIdx] = !updated[itemIdx]
      persist({
        ...state,
        checkedItems: { ...state.checkedItems, [stepIdx]: updated },
      })
    },
    [state, persist]
  )

  const markCompleted = useCallback(() => {
    persist({ ...state, completed: true })
  }, [state, persist])

  const reset = useCallback(() => {
    persist({ currentStep: 0, checkedItems: {}, completed: false })
  }, [persist])

  return { state, setCurrentStep, toggleCheckItem, markCompleted, reset }
}
