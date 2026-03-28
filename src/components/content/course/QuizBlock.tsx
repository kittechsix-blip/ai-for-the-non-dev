import { useState } from 'react'
import type { Quiz } from '../../../data/types'

interface QuizBlockProps {
  quiz: Quiz
  answered: boolean
  correct: boolean
  onAnswer: (selectedIdx: number) => void
}

export function QuizBlock({ quiz, answered, correct, onAnswer }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleClick = (idx: number) => {
    if (answered) return
    setSelected(idx)
    onAnswer(idx)
  }

  return (
    <div className="rounded-[var(--radius-card)] p-5" style={{ background: 'rgba(167,139,250,.06)' }}>
      <div className="text-xs font-bold tracking-wider text-purple uppercase mb-3">
        Quick Check
      </div>
      <p className="text-[14px] font-semibold mb-4">{quiz.question}</p>
      <div className="flex flex-col gap-3">
        {quiz.options.map((opt, i) => {
          let classes = 'w-full text-left px-5 py-4 rounded-xl text-[15px] font-medium border cursor-pointer transition-all min-h-[56px] '
          if (!answered) {
            classes += 'bg-surface-2 border-surface-3 text-primary hover:border-accent'
          } else if (i === quiz.correctIndex) {
            classes += 'bg-green/10 border-green text-green'
          } else if (i === selected && selected !== quiz.correctIndex) {
            classes += 'bg-red/10 border-red text-red'
          } else {
            classes += 'bg-surface-2 border-surface-3 text-muted opacity-50'
          }

          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={answered}
              className={classes}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className={`mt-3 text-[13px] ${correct ? 'text-green' : 'text-red'}`}>
          {correct ? '✅ ' : '❌ '}
          {correct ? quiz.feedback : 'Not quite! Correct answer highlighted above.'}
        </p>
      )}
    </div>
  )
}
