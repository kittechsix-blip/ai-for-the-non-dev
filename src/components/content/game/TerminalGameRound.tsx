import { useState, useEffect, useRef, useCallback } from 'react'
import type { TerminalCommand, Difficulty } from '../../../data/types'
import type { AnswerRecord } from './ResultsScreen'

interface Props {
  commands: TerminalCommand[]
  difficulty: Difficulty
  inputMode: 'free-type' | 'multiple-choice'
  onComplete: (answers: AnswerRecord[], score: number, bestStreak: number) => void
  onQuit: () => void
}

const TIMER_BY_DIFFICULTY: Record<Difficulty, number> = {
  beginner: 15,
  intermediate: 12,
  advanced: 8,
}

const ROUND_SIZE: Record<Difficulty, number> = {
  beginner: 15,
  intermediate: 20,
  advanced: 25,
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getMultiplier(streak: number): number {
  if (streak >= 10) return 3
  if (streak >= 5) return 2
  if (streak >= 3) return 1.5
  return 1
}

function normalizeInput(input: string): string {
  let val = input.trim().toLowerCase()
  if (!val.startsWith('/')) val = '/' + val
  return val
}

function generateChoices(
  correct: TerminalCommand,
  pool: TerminalCommand[]
): string[] {
  const distractors = shuffle(
    pool.filter(c => c.id !== correct.id)
  ).slice(0, 3).map(c => c.command)
  return shuffle([correct.command, ...distractors])
}

export function TerminalGameRound({ commands, difficulty, inputMode, onComplete, onQuit }: Props) {
  const maxTime = TIMER_BY_DIFFICULTY[difficulty]
  const roundSize = Math.min(ROUND_SIZE[difficulty], commands.length)
  const [questions] = useState(() => shuffle(commands).slice(0, roundSize))
  const [questionIdx, setQuestionIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(maxTime)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [userInput, setUserInput] = useState(difficulty === 'beginner' ? '/' : '')
  const [hintUsed, setHintUsed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [flashState, setFlashState] = useState<'correct' | 'wrong' | null>(null)
  const [revealAnswer, setRevealAnswer] = useState('')
  const [scorePop, setScorePop] = useState<number | null>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [fireAnimating, setFireAnimating] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const questionStartRef = useRef(Date.now())
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const current = questions[questionIdx]

  // Generate choices for multiple-choice mode
  useEffect(() => {
    if (inputMode === 'multiple-choice' && current) {
      setChoices(generateChoices(current, commands))
    }
  }, [questionIdx, inputMode, current, commands])

  // Timer
  useEffect(() => {
    questionStartRef.current = Date.now()
    setTimeLeft(maxTime)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [questionIdx, maxTime])

  // Time's up
  useEffect(() => {
    if (timeLeft === 0 && !flashState) {
      handleAnswer(false)
    }
  }, [timeLeft, flashState])

  // Auto-focus input
  useEffect(() => {
    if (inputMode === 'free-type' && !flashState) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [questionIdx, flashState, inputMode])

  const handleAnswer = useCallback((isCorrect: boolean) => {
    clearInterval(timerRef.current)
    const elapsed = Date.now() - questionStartRef.current

    const answer: AnswerRecord = {
      commandId: current.id,
      correct: isCorrect,
      timeMs: elapsed,
      hintUsed,
    }

    const newAnswers = [...answers, answer]
    let newStreak = streak
    let newScore = score

    if (isCorrect) {
      newStreak = streak + 1
      const multiplier = getMultiplier(newStreak)
      const speedBonus = Math.floor((timeLeft / maxTime) * 50)
      const points = Math.floor((100 + speedBonus) * multiplier * (hintUsed ? 0.5 : 1))
      newScore = score + points
      setScorePop(points)
      if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
        setFireAnimating(true)
        setTimeout(() => setFireAnimating(false), 400)
      }
    } else {
      newStreak = 0
      setRevealAnswer(current.command)
    }

    setStreak(newStreak)
    setBestStreak(prev => Math.max(prev, newStreak))
    setScore(newScore)
    setAnswers(newAnswers)
    setFlashState(isCorrect ? 'correct' : 'wrong')

    setTimeout(() => {
      setFlashState(null)
      setRevealAnswer('')
      setScorePop(null)
      setHintUsed(false)
      setShowHint(false)
      setUserInput(difficulty === 'beginner' ? '/' : '')

      if (questionIdx + 1 >= roundSize) {
        // Check for perfect round bonus
        const finalAnswers = newAnswers
        const allCorrect = finalAnswers.every(a => a.correct)
        const finalScore = allCorrect ? newScore + 500 : newScore
        onComplete(finalAnswers, finalScore, Math.max(bestStreak, newStreak))
      } else {
        setQuestionIdx(prev => prev + 1)
      }
    }, isCorrect ? 800 : 1500)
  }, [current, answers, streak, score, hintUsed, timeLeft, maxTime, questionIdx, roundSize, bestStreak, difficulty, onComplete])

  const handleSubmit = useCallback(() => {
    if (flashState || !userInput.trim()) return
    const normalized = normalizeInput(userInput)
    const allValid = [current.command, ...current.aliases].map(c => c.toLowerCase())
    const isCorrect = allValid.includes(normalized)
    handleAnswer(isCorrect)
  }, [flashState, userInput, current, difficulty, handleAnswer])

  const handleChoiceClick = useCallback((choice: string) => {
    if (flashState) return
    const isCorrect = choice === current.command
    handleAnswer(isCorrect)
  }, [flashState, current, handleAnswer])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === 'Tab' && difficulty !== 'advanced') {
      e.preventDefault()
      setHintUsed(true)
      setShowHint(true)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleAnswer(false)
    }
  }, [handleSubmit, difficulty, handleAnswer])

  if (!current) return null

  const timerPercent = (timeLeft / maxTime) * 100
  const timerColor = timerPercent > 50 ? 'bg-green' : timerPercent > 25 ? 'bg-yellow' : 'bg-red'
  const multiplier = getMultiplier(streak)

  return (
    <div className="px-4 py-4 max-w-lg mx-auto">
      {/* Top bar: score + streak */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onQuit} className="text-muted hover:text-primary text-sm">&larr;</button>
        <div className="flex items-center gap-4">
          {streak > 0 && (
            <div className={`flex items-center gap-1 ${fireAnimating ? 'pulse-fire' : ''}`}>
              <span>🔥</span>
              <span className="text-yellow font-bold text-sm">×{streak}</span>
              {multiplier > 1 && (
                <span className="text-xs text-muted">(×{multiplier})</span>
              )}
            </div>
          )}
          <div className="relative">
            <span className="text-primary font-bold">{score.toLocaleString()}</span>
            {scorePop !== null && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-green text-xs font-bold score-pop">
                +{scorePop}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((questionIdx + 1) / roundSize) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted">{questionIdx + 1}/{roundSize}</span>
      </div>

      {/* Terminal window */}
      <div className={`bg-bg border border-surface-3 rounded-2xl overflow-hidden ${
        flashState === 'correct' ? 'flash-correct' : flashState === 'wrong' ? 'flash-wrong' : ''
      }`}>
        {/* Scenario */}
        <div className="p-5 pb-3">
          <div className="font-mono text-sm leading-relaxed">
            <span className="text-muted">$</span>{' '}
            <span className="text-primary">{current.scenario}</span>
          </div>
        </div>

        {/* Input area */}
        <div className="px-5 pb-3">
          {inputMode === 'free-type' ? (
            <div className="flex items-center gap-2 font-mono">
              <span className="text-accent font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!!flashState}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-green font-mono text-sm outline-none caret-green placeholder-surface-3"
                placeholder="type a command..."
              />
              {!flashState && !userInput && <span className="terminal-cursor" />}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {choices.map(choice => (
                <button
                  key={choice}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={!!flashState}
                  className={`font-mono text-sm py-3 px-3 rounded-xl font-semibold transition-colors ${
                    flashState && choice === current.command
                      ? 'bg-green/20 text-green border border-green/40'
                      : flashState
                        ? 'bg-surface-2 text-muted opacity-50'
                        : 'bg-surface-2 hover:bg-surface-3 text-primary'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reveal correct answer on wrong */}
        {revealAnswer && (
          <div className="px-5 pb-3">
            <div className="font-mono text-sm">
              <span className="text-muted">Answer:</span>{' '}
              <span className="text-green font-bold">{revealAnswer}</span>
            </div>
          </div>
        )}

        {/* Timer bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
                style={{ width: `${timerPercent}%` }}
              />
            </div>
            <span className={`text-xs font-mono font-bold min-w-[2ch] ${
              timerPercent <= 25 ? 'text-red' : 'text-muted'
            }`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-4">
        {difficulty !== 'advanced' ? (
          <button
            onClick={() => { setHintUsed(true); setShowHint(true) }}
            disabled={!!flashState || showHint}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
              showHint
                ? 'bg-surface text-muted cursor-default'
                : 'bg-surface-2 hover:bg-surface-3 text-muted hover:text-primary'
            }`}
          >
            {showHint ? `💡 ${current.hint}` : '💡 Hint'}
          </button>
        ) : (
          <div />
        )}
        {inputMode === 'free-type' && (
          <button
            onClick={handleSubmit}
            disabled={!!flashState || !userInput.trim()}
            className="bg-accent hover:bg-accent/80 disabled:opacity-30 text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors"
          >
            Enter
          </button>
        )}
      </div>

      {/* Mobile hint */}
      {inputMode === 'free-type' && (
        <p className="text-center text-muted text-xs mt-4">
          Press <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-[10px]">Enter</kbd> to submit
          {difficulty !== 'advanced' && (
            <> · <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-[10px]">Tab</kbd> for hint</>
          )}
        </p>
      )}
    </div>
  )
}
