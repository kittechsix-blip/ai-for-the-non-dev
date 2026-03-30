import { useState } from 'react'
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
  const [showStepPicker, setShowStepPicker] = useState(false)
  const { state, setCurrentStep, toggleCheckItem, markCompleted, reset } =
    useWorkflowProgress(workflowId)

  const total = workflow.steps.length
  const current = state.currentStep
  const step = workflow.steps[current]
  const isLast = current === total - 1
  const isFirst = current === 0
  const progress = ((current + 1) / total) * 100

  // Find template step index (last step with "template" in title)
  const templateStepIndex = workflow.steps.findIndex(s =>
    s.title.toLowerCase().includes('template')
  )

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
      <div className="max-w-lg mx-auto px-5 py-12 text-center space-y-5 md:max-w-2xl lg:max-w-3xl">
        <div className="text-6xl md:text-7xl">🎉</div>
        <h2 className="text-2xl font-bold text-primary md:text-3xl">Workflow Complete!</h2>
        <p className="text-muted text-[14px] leading-[1.6] md:text-base">
          You've finished <strong className="text-primary">{workflow.title}</strong>. You now know
          enough to build your first Claude Skill from scratch.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
          {templateStepIndex !== -1 && (
            <button
              onClick={() => {
                reset()
                setTimeout(() => setCurrentStep(templateStepIndex), 50)
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-purple text-white text-base font-semibold border-none cursor-pointer hover:brightness-110 transition-all min-h-[56px]"
            >
              📋 Jump to Template
            </button>
          )}
          <button
            onClick={reset}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface text-primary text-base font-semibold border border-surface-3 cursor-pointer hover:bg-surface-2 transition-colors min-h-[56px]"
          >
            Start Over
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-accent text-white text-base font-semibold border-none cursor-pointer hover:brightness-110 transition-all min-h-[56px]"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-5 space-y-5 md:max-w-2xl lg:max-w-3xl md:px-8 md:py-8">
      {/* Progress indicator with step picker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-muted md:text-sm">
          <button
            onClick={() => setShowStepPicker(!showStepPicker)}
            className="bg-transparent border-none cursor-pointer text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>Step {current + 1} of {total}</span>
            <span className="text-[10px]">{showStepPicker ? '▲' : '▼'}</span>
          </button>
          <div className="flex items-center gap-3">
            {templateStepIndex !== -1 && (
              <button
                onClick={() => setCurrentStep(templateStepIndex)}
                className="bg-purple/20 text-purple px-3 py-1 rounded-full text-xs font-semibold border-none cursor-pointer hover:bg-purple/30 transition-colors"
              >
                📋 Template
              </button>
            )}
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step picker dropdown */}
        {showStepPicker && (
          <div className="bg-surface-2 rounded-xl p-2 space-y-1 max-h-[300px] overflow-y-auto">
            {workflow.steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx)
                  setShowStepPicker(false)
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm border-none cursor-pointer transition-colors ${
                  idx === current
                    ? 'bg-accent text-white'
                    : 'bg-transparent text-primary/80 hover:bg-surface-3'
                }`}
              >
                <span className="text-muted mr-2">{idx + 1}.</span>
                {s.title}
                {s.title.toLowerCase().includes('template') && (
                  <span className="ml-2 text-purple">📋</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="h-2 bg-surface-2 rounded-full overflow-hidden md:h-2.5">
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

      {/* Navigation - BIGGER BUTTONS */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className={`flex-1 py-4 rounded-xl text-base font-semibold border cursor-pointer transition-colors min-h-[56px] md:py-5 md:text-lg md:min-h-[64px] ${
            isFirst
              ? 'border-surface-3 text-muted/40 cursor-not-allowed bg-transparent'
              : 'border-surface-3 text-primary bg-surface hover:bg-surface-2'
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-xl bg-accent text-white text-base font-semibold border-none cursor-pointer hover:brightness-110 transition-all min-h-[56px] md:py-5 md:text-lg md:min-h-[64px]"
        >
          {isLast ? 'Complete ✓' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
