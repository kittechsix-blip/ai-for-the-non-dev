import type { TerminalCommand } from '../../../data/types'

export interface AnswerRecord {
  commandId: string
  correct: boolean
  timeMs: number
  hintUsed: boolean
}

interface Props {
  score: number
  bestStreak: number
  answers: AnswerRecord[]
  commands: TerminalCommand[]
  onPlayAgain: () => void
  onTryHarder: () => void
  onHome: () => void
  canTryHarder: boolean
}

export function ResultsScreen({
  score,
  bestStreak,
  answers,
  commands,
  onPlayAgain,
  onTryHarder,
  onHome,
  canTryHarder,
}: Props) {
  const correct = answers.filter(a => a.correct).length
  const total = answers.length
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  const avgSpeed = total > 0
    ? (answers.reduce((sum, a) => sum + a.timeMs, 0) / total / 1000).toFixed(1)
    : '0.0'

  const mastered = answers.filter(a => a.correct).map(a => a.commandId)
  const toReview = answers.filter(a => !a.correct).map(a => a.commandId)

  const getCommand = (id: string) => commands.find(c => c.id === id)

  const emoji = accuracy === 100 ? '🏆' : accuracy >= 80 ? '🔥' : accuracy >= 50 ? '👍' : '💪'

  return (
    <div className="px-4 py-8 max-w-lg mx-auto text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-extrabold text-primary mb-1">Round Complete!</h2>
      <p className="text-muted text-sm mb-6">
        {accuracy === 100 ? 'Perfect round!' : accuracy >= 80 ? 'Great job!' : 'Keep practicing!'}
      </p>

      <div className="bg-surface rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-accent font-bold text-2xl">{score.toLocaleString()}</div>
            <div className="text-muted text-xs uppercase">Score</div>
          </div>
          <div>
            <div className="text-accent font-bold text-2xl">{bestStreak}</div>
            <div className="text-muted text-xs uppercase">Best Streak</div>
          </div>
          <div>
            <div className="text-accent font-bold text-2xl">{accuracy}%</div>
            <div className="text-muted text-xs uppercase">Accuracy</div>
          </div>
          <div>
            <div className="text-accent font-bold text-2xl">{avgSpeed}s</div>
            <div className="text-muted text-xs uppercase">Avg Speed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-left">
        <div>
          <h3 className="text-xs uppercase font-bold text-green tracking-wider mb-2">Mastered ({mastered.length})</h3>
          <div className="flex flex-col gap-1">
            {mastered.map(id => {
              const cmd = getCommand(id)
              return cmd ? (
                <div key={id} className="text-sm">
                  <span className="text-green">✓</span>{' '}
                  <code className="font-mono text-xs text-muted">{cmd.command}</code>
                </div>
              ) : null
            })}
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase font-bold text-red tracking-wider mb-2">Review ({toReview.length})</h3>
          <div className="flex flex-col gap-1">
            {toReview.map(id => {
              const cmd = getCommand(id)
              return cmd ? (
                <div key={id} className="text-sm">
                  <span className="text-red">✗</span>{' '}
                  <code className="font-mono text-xs text-muted">{cmd.command}</code>
                </div>
              ) : null
            })}
            {toReview.length === 0 && (
              <p className="text-muted text-xs">None — perfect!</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onPlayAgain}
          className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Play Again
        </button>
        {canTryHarder && (
          <button
            onClick={onTryHarder}
            className="w-full bg-surface-2 hover:bg-surface-3 text-primary font-bold py-3 rounded-xl transition-colors"
          >
            Try Harder
          </button>
        )}
        <button
          onClick={onHome}
          className="w-full text-muted hover:text-primary font-semibold py-3 transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  )
}
