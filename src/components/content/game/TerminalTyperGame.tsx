import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Game, Difficulty, TerminalCommand } from '../../../data/types'
import { useGameProgress, type RoundResult } from '../../../hooks/useGameProgress'
import { DifficultySelect } from './DifficultySelect'
import { StudyMode } from './StudyMode'
import { TerminalGameRound } from './TerminalGameRound'
import { ResultsScreen, type AnswerRecord } from './ResultsScreen'

type Phase = 'select' | 'study' | 'playing' | 'results'

const NEXT_DIFFICULTY: Record<Difficulty, Difficulty | null> = {
  beginner: 'intermediate',
  intermediate: 'advanced',
  advanced: null,
}

interface Props {
  game: Game
}

export function TerminalTyperGame({ game }: Props) {
  const navigate = useNavigate()
  const allCommands = game.commands || []
  const { state: progress, updateAfterRound } = useGameProgress(game.id)

  const [phase, setPhase] = useState<Phase>('select')
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner')
  const [inputMode, setInputMode] = useState<'free-type' | 'multiple-choice'>('free-type')
  const [roundAnswers, setRoundAnswers] = useState<AnswerRecord[]>([])
  const [roundScore, setRoundScore] = useState(0)
  const [roundBestStreak, setRoundBestStreak] = useState(0)

  const filteredCommands = useMemo<TerminalCommand[]>(() => {
    if (difficulty === 'beginner') {
      return allCommands.filter(c => c.difficulty === 'beginner')
    }
    if (difficulty === 'intermediate') {
      return allCommands.filter(c => c.difficulty === 'beginner' || c.difficulty === 'intermediate')
    }
    return allCommands
  }, [allCommands, difficulty])

  const handleStart = (diff: Difficulty, mode: 'free-type' | 'multiple-choice') => {
    setDifficulty(diff)
    setInputMode(mode)
    setPhase('playing')
  }

  const handleComplete = (answers: AnswerRecord[], score: number, bestStreak: number) => {
    setRoundAnswers(answers)
    setRoundScore(score)
    setRoundBestStreak(bestStreak)

    const mastered = answers.filter(a => a.correct).map(a => a.commandId)
    const toReview = answers.filter(a => !a.correct).map(a => a.commandId)
    const accuracy = answers.length > 0 ? Math.round((mastered.length / answers.length) * 100) : 0

    const result: RoundResult = {
      score,
      bestStreak,
      accuracy,
      mastered,
      toReview,
    }
    updateAfterRound(result)
    setPhase('results')
  }

  const handlePlayAgain = () => {
    setPhase('playing')
  }

  const handleTryHarder = () => {
    const next = NEXT_DIFFICULTY[difficulty]
    if (next) {
      setDifficulty(next)
    }
    setPhase('playing')
  }

  if (phase === 'select') {
    return (
      <DifficultySelect
        onStart={handleStart}
        onStudy={() => setPhase('study')}
        progress={progress}
      />
    )
  }

  if (phase === 'study') {
    return (
      <StudyMode
        commands={allCommands}
        onBack={() => setPhase('select')}
      />
    )
  }

  if (phase === 'playing') {
    return (
      <TerminalGameRound
        key={`${difficulty}-${Date.now()}`}
        commands={filteredCommands}
        difficulty={difficulty}
        inputMode={inputMode}
        onComplete={handleComplete}
        onQuit={() => setPhase('select')}
      />
    )
  }

  if (phase === 'results') {
    return (
      <ResultsScreen
        score={roundScore}
        bestStreak={roundBestStreak}
        answers={roundAnswers}
        commands={allCommands}
        onPlayAgain={handlePlayAgain}
        onTryHarder={handleTryHarder}
        onHome={() => navigate('/')}
        canTryHarder={NEXT_DIFFICULTY[difficulty] !== null}
      />
    )
  }

  return null
}
