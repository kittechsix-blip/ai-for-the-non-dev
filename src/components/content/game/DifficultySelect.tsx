import type { Difficulty } from '../../../data/types'
import type { GameProgress } from '../../../lib/storage'

interface Props {
  onStart: (difficulty: Difficulty, inputMode: 'free-type' | 'multiple-choice') => void
  onStudy: () => void
  progress: GameProgress
}

const tiers: { level: Difficulty; label: string; desc: string; commands: number; timer: string; hints: string }[] = [
  { level: 'beginner', label: 'Beginner', desc: 'The essentials — 15 must-know commands', commands: 15, timer: '15s', hints: 'Yes' },
  { level: 'intermediate', label: 'Intermediate', desc: 'All 40 core commands', commands: 40, timer: '12s', hints: 'Yes' },
  { level: 'advanced', label: 'Advanced', desc: 'Everything — 50+ commands, no hints', commands: 52, timer: '8s', hints: 'No' },
]

export function DifficultySelect({ onStart, onStudy, progress }: Props) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const defaultMode = isMobile ? 'multiple-choice' : 'free-type'

  const handleStart = (level: Difficulty) => {
    const toggle = document.querySelector<HTMLInputElement>('[data-input-mode]')
    const mode = toggle?.checked ? 'multiple-choice' : 'free-type'
    onStart(level, mode)
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">⌨️</div>
        <h1 className="text-2xl font-extrabold text-primary mb-2">Terminal Typer</h1>
        <p className="text-muted text-sm">Type the right slash command for each scenario</p>
      </div>

      {progress.roundsCompleted > 0 && (
        <div className="bg-surface rounded-2xl p-4 mb-6 flex justify-between text-center">
          <div>
            <div className="text-accent font-bold text-lg">{progress.highScore.toLocaleString()}</div>
            <div className="text-muted text-xs uppercase">Best Score</div>
          </div>
          <div>
            <div className="text-accent font-bold text-lg">{progress.bestStreak}</div>
            <div className="text-muted text-xs uppercase">Best Streak</div>
          </div>
          <div>
            <div className="text-accent font-bold text-lg">{progress.bestAccuracy}%</div>
            <div className="text-muted text-xs uppercase">Accuracy</div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {tiers.map(tier => (
          <button
            key={tier.level}
            onClick={() => handleStart(tier.level)}
            className="bg-surface hover:bg-surface-2 rounded-2xl p-4 text-left transition-colors"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-primary">{tier.label}</span>
              <span className="text-xs text-muted">{tier.commands} commands</span>
            </div>
            <p className="text-muted text-sm mb-2">{tier.desc}</p>
            <div className="flex gap-4 text-xs text-muted">
              <span>Timer: {tier.timer}</span>
              <span>Hints: {tier.hints}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-primary">Input Mode</div>
          <div className="text-xs text-muted">Multiple choice is easier on mobile</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            data-input-mode
            defaultChecked={defaultMode === 'multiple-choice'}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-3 peer-focus:outline-none rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          <span className="ms-2 text-xs text-muted min-w-[60px]">
            {defaultMode === 'multiple-choice' ? '4 choices' : 'Free type'}
          </span>
        </label>
      </div>

      <button
        onClick={onStudy}
        className="w-full bg-surface-2 hover:bg-surface-3 text-muted hover:text-primary rounded-2xl p-3 text-sm font-semibold transition-colors"
      >
        📖 Study Commands First
      </button>
    </div>
  )
}
