import { useState } from 'react'
import type { ScenarioQuestion } from '../../../data/types'

interface Props {
  questions: ScenarioQuestion[]
  onComplete: (score: number, total: number) => void
  onQuit: () => void
}

export function ScenarioRound({ questions, onComplete, onQuit }: Props) {
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const current = questions[qIdx]
  const total = questions.length
  const isCorrect = selectedIdx === current.correctIndex

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelectedIdx(idx)
    setAnswered(true)
    if (idx === current.correctIndex) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (qIdx + 1 >= total) {
      onComplete(score, total)
    } else {
      setQIdx(qIdx + 1)
      setSelectedIdx(null)
      setAnswered(false)
    }
  }

  const progress = ((qIdx + 1) / total) * 100

  return (
    <div className="max-w-lg mx-auto px-5 py-5 space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-primary">Round 2: Scenario Quiz</h2>
        <p className="text-sm text-muted">
          Real situations, real solutions. Pick the best answer.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-muted">
          <span>Question {qIdx + 1} of {total}</span>
          <span>{score} correct</span>
        </div>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-surface rounded-xl p-4 border border-surface-3">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Scenario</p>
        <p className="text-[14px] leading-[1.6] text-primary/90">{current.scenario}</p>
      </div>

      {/* Question */}
      <p className="text-[15px] font-semibold text-primary">{current.question}</p>

      {/* Options */}
      <div className="space-y-2.5">
        {current.options.map((opt, idx) => {
          let optClass = 'bg-surface border-surface-3 text-primary/80 hover:border-accent/30 cursor-pointer'
          if (answered) {
            if (idx === current.correctIndex) {
              optClass = 'bg-green/10 border-green/40 text-green'
            } else if (idx === selectedIdx) {
              optClass = 'bg-red/10 border-red/40 text-red'
            } else {
              optClass = 'bg-surface border-surface-3 text-muted/50'
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${optClass}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={`rounded-xl p-4 border ${
            isCorrect
              ? 'bg-green/5 border-green/20'
              : 'bg-red/5 border-red/20'
          }`}
        >
          <p className={`text-xs font-semibold mb-1 ${isCorrect ? 'text-green' : 'text-red'}`}>
            {isCorrect ? 'Correct!' : 'Not quite'}
          </p>
          <p className="text-[13px] leading-[1.6] text-primary/80">{current.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onQuit}
          className="flex-1 py-3 rounded-xl text-sm font-semibold border border-surface-3 text-primary bg-surface cursor-pointer hover:bg-surface-2 transition-colors"
        >
          Quit
        </button>
        {answered && (
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
          >
            {qIdx + 1 >= total ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}
