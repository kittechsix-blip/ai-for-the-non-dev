import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Game } from '../../../data/types'
import { SequenceRound } from './SequenceRound'
import { ScenarioRound } from './ScenarioRound'

type Phase = 'intro' | 'sequence' | 'quiz' | 'results'

interface RoundScores {
  sequence: { score: number; total: number }
  quiz: { score: number; total: number }
}

interface Props {
  game: Game
}

export function SkillBuilderGame({ game }: Props) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('intro')
  const [scores, setScores] = useState<RoundScores>({
    sequence: { score: 0, total: 0 },
    quiz: { score: 0, total: 0 },
  })

  const handleSequenceComplete = (score: number, total: number) => {
    setScores(s => ({ ...s, sequence: { score, total } }))
    setPhase('quiz')
  }

  const handleQuizComplete = (score: number, total: number) => {
    setScores(s => ({ ...s, quiz: { score, total } }))
    setPhase('results')
  }

  const handleQuit = () => setPhase('intro')

  const totalScore = scores.sequence.score + scores.quiz.score
  const totalPossible = scores.sequence.total + scores.quiz.total
  const pct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const resultEmoji = pct === 100 ? '🏆' : pct >= 80 ? '🔥' : pct >= 60 ? '👍' : '💪'

  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto px-5 py-10 text-center space-y-6">
        <div className="text-6xl">{game.icon}</div>
        <h2 className="text-2xl font-bold text-primary">{game.title}</h2>
        <p className="text-muted text-[14px] leading-[1.6] max-w-sm mx-auto">
          Two rounds to test your skill-building knowledge. First, put the
          steps in order. Then, solve real scenarios.
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => setPhase('sequence')}
            className="py-3.5 rounded-xl bg-accent text-white text-sm font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
          >
            Start Challenge
          </button>
          <button
            onClick={() => navigate('/')}
            className="py-3 rounded-xl text-sm font-semibold border border-surface-3 text-muted bg-transparent cursor-pointer hover:bg-surface transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'sequence' && game.sequenceItems) {
    return (
      <SequenceRound
        items={game.sequenceItems}
        onComplete={handleSequenceComplete}
        onQuit={handleQuit}
      />
    )
  }

  if (phase === 'quiz' && game.scenarioQuestions) {
    return (
      <ScenarioRound
        questions={game.scenarioQuestions}
        onComplete={handleQuizComplete}
        onQuit={handleQuit}
      />
    )
  }

  if (phase === 'results') {
    return (
      <div className="max-w-lg mx-auto px-5 py-10 text-center space-y-6">
        <div className="text-6xl">{resultEmoji}</div>
        <h2 className="text-2xl font-bold text-primary">Challenge Complete!</h2>
        <p className="text-muted text-[14px]">
          You scored <strong className="text-primary">{totalScore}</strong> out of{' '}
          <strong className="text-primary">{totalPossible}</strong> ({pct}%)
        </p>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="bg-surface rounded-xl p-4 border border-surface-3">
            <p className="text-2xl font-bold text-primary">
              {scores.sequence.score}/{scores.sequence.total}
            </p>
            <p className="text-xs text-muted mt-1">Sequence</p>
          </div>
          <div className="bg-surface rounded-xl p-4 border border-surface-3">
            <p className="text-2xl font-bold text-primary">
              {scores.quiz.score}/{scores.quiz.total}
            </p>
            <p className="text-xs text-muted mt-1">Scenarios</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-xs mx-auto pt-2">
          <button
            onClick={() => {
              setScores({ sequence: { score: 0, total: 0 }, quiz: { score: 0, total: 0 } })
              setPhase('sequence')
            }}
            className="py-3 rounded-xl bg-accent text-white text-sm font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="py-3 rounded-xl text-sm font-semibold border border-surface-3 text-muted bg-transparent cursor-pointer hover:bg-surface transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Fallback — shouldn't hit this
  return null
}
