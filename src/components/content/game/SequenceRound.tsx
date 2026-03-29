import { useState, useMemo } from 'react'
import type { SequenceItem } from '../../../data/types'

interface Props {
  items: SequenceItem[]
  onComplete: (score: number, total: number) => void
  onQuit: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SequenceRound({ items, onComplete, onQuit }: Props) {
  const shuffled = useMemo(() => shuffle(items), [items])
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleTap = (id: string) => {
    if (submitted) return
    if (selected.includes(id)) {
      // Deselect: remove this and everything after it
      const idx = selected.indexOf(id)
      setSelected(selected.slice(0, idx))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleContinue = () => {
    let correct = 0
    selected.forEach((id, idx) => {
      const item = items.find(i => i.id === id)
      if (item && item.correctOrder === idx + 1) correct++
    })
    onComplete(correct, items.length)
  }

  const getItemState = (item: SequenceItem) => {
    const selectedIdx = selected.indexOf(item.id)
    if (selectedIdx === -1) return 'unselected'
    if (!submitted) return 'selected'
    // After submit: check if this item is in the correct position
    return item.correctOrder === selectedIdx + 1 ? 'correct' : 'wrong'
  }

  const allSelected = selected.length === items.length

  return (
    <div className="max-w-lg mx-auto px-5 py-5 space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-primary">Round 1: Put It In Order</h2>
        <p className="text-sm text-muted">
          Tap the steps in the correct order to build a Claude Skill.
        </p>
      </div>

      {/* Selection count */}
      <div className="text-center text-xs text-muted">
        {selected.length} of {items.length} placed
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {shuffled.map(item => {
          const state = getItemState(item)
          const selectedIdx = selected.indexOf(item.id)
          const isSelected = selectedIdx !== -1

          return (
            <button
              key={item.id}
              onClick={() => handleTap(item.id)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                state === 'correct'
                  ? 'bg-green/10 border-green/40 text-green'
                  : state === 'wrong'
                  ? 'bg-red/10 border-red/40 text-red'
                  : isSelected
                  ? 'bg-accent/10 border-accent/40 text-primary'
                  : 'bg-surface border-surface-3 text-primary/80 hover:border-accent/30'
              }`}
            >
              {isSelected && (
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    state === 'correct'
                      ? 'bg-green text-bg'
                      : state === 'wrong'
                      ? 'bg-red text-bg'
                      : 'bg-accent text-white'
                  }`}
                >
                  {selectedIdx + 1}
                </span>
              )}
              {!isSelected && (
                <span className="w-6 h-6 rounded-full border-2 border-surface-3 shrink-0" />
              )}
              <span>{item.label}</span>
              {submitted && state === 'wrong' && (
                <span className="ml-auto text-xs text-muted">
                  → #{item.correctOrder}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onQuit}
          className="flex-1 py-3 rounded-xl text-sm font-semibold border border-surface-3 text-primary bg-surface cursor-pointer hover:bg-surface-2 transition-colors"
        >
          Quit
        </button>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allSelected}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all ${
              allSelected
                ? 'bg-accent text-white hover:brightness-110'
                : 'bg-surface-2 text-muted cursor-not-allowed'
            }`}
          >
            Check Order
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
          >
            Next Round →
          </button>
        )}
      </div>
    </div>
  )
}
