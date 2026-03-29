import { useNavigate } from 'react-router-dom'
import type { Workflow } from '../../../data/types'
import { useWorkflowProgress } from '../../../hooks/useWorkflowProgress'
import { WorkflowStep } from './WorkflowStep'

interface Props {
  workflow: Workflow
  workflowId: string
}

export function WorkflowStepper({ workflow, workflowId }: Props) {
  const navigate = useNavigate()
  const { state, setCurrentStep, toggleCheckItem, markCompleted, reset } =
    useWorkflowProgress(workflowId)

  const total = workflow.steps.length
  const current = state.currentStep
  const step = workflow.steps[current]
  const isLast = current === total - 1
  const isFirst = current === 0
  const progress = ((current + 1) / total) * 100

  const handleNext = () => {
    if (isLast) {
      markCompleted()
    } else {
      setCurrentStep(current + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirst) setCurrentStep(current - 1)
  }

  if (state.completed) {
    return (
      <div className="max-w-lg mx-auto px-5 py-12 text-center space-y-5">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-primary">Workflow Complete!</h2>
        <p className="text-muted text-[14px] leading-[1.6]">
          You've finished <strong className="text-primary">{workflow.title}</strong>. You now know
          enough to build your first Claude Skill from scratch.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-surface text-primary text-sm font-semibold border border-surface-3 cursor-pointer"
          >
            Start Over
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold border-none cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-5 space-y-5">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-muted">
          <span>
            Step {current + 1} of {total}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <WorkflowStep
        step={step}
        checkedItems={state.checkedItems[current] || []}
        onToggleCheck={(idx) => toggleCheckItem(current, idx)}
      />

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold border cursor-pointer transition-colors ${
            isFirst
              ? 'border-surface-3 text-muted/40 cursor-not-allowed bg-transparent'
              : 'border-surface-3 text-primary bg-surface hover:bg-surface-2'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
        >
          {isLast ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  )
}
