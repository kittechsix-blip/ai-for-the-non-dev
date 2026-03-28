import { useState, useCallback } from 'react'
import { getGameProgress, saveGameProgress, type GameProgress } from '../lib/storage'

export interface RoundResult {
  score: number
  bestStreak: number
  accuracy: number
  mastered: string[]
  toReview: string[]
}

export function useGameProgress(gameId: string) {
  const [state, setState] = useState<GameProgress>(() => getGameProgress(gameId))

  const updateAfterRound = useCallback(
    (result: RoundResult) => {
      const next: GameProgress = {
        highScore: Math.max(state.highScore, result.score),
        bestStreak: Math.max(state.bestStreak, result.bestStreak),
        bestAccuracy: Math.max(state.bestAccuracy, result.accuracy),
        commandsMastered: [...new Set([...state.commandsMastered, ...result.mastered])],
        commandsToReview: result.toReview.filter(
          id => !result.mastered.includes(id)
        ),
        lastPlayed: new Date().toISOString(),
        roundsCompleted: state.roundsCompleted + 1,
      }
      setState(next)
      saveGameProgress(gameId, next)
      return next
    },
    [gameId, state]
  )

  const reset = useCallback(() => {
    const fresh: GameProgress = {
      highScore: 0,
      bestStreak: 0,
      bestAccuracy: 0,
      commandsMastered: [],
      commandsToReview: [],
      lastPlayed: '',
      roundsCompleted: 0,
    }
    setState(fresh)
    saveGameProgress(gameId, fresh)
  }, [gameId])

  return { state, updateAfterRound, reset }
}
