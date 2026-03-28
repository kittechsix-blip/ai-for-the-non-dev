import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { flashcardDecks } from '../data/flashcards'
import { TopBar } from '../components/layout/TopBar'
import { useSwipe } from '../hooks/useSwipe'

type GameMode = 'browse' | 'quiz' | 'results'

interface CardState {
  index: number
  isFlipped: boolean
  known: number[]
  learning: number[]
}

export function FlashcardsPage() {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const deck = flashcardDecks.find(d => d.id === deckId)

  const [mode, setMode] = useState<GameMode>('browse')
  const [state, setState] = useState<CardState>({
    index: 0,
    isFlipped: false,
    known: [],
    learning: [],
  })
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([])

  // Shuffle cards on mount or mode change
  useEffect(() => {
    if (deck) {
      const order = deck.cards.map((_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      setShuffledOrder(order)
    }
  }, [deck, mode])

  const currentCardIndex = shuffledOrder[state.index] ?? 0
  const card = deck?.cards[currentCardIndex]
  const totalCards = deck?.cards.length ?? 0
  const remaining = totalCards - state.known.length - state.learning.length

  const flip = useCallback(() => {
    setState(s => ({ ...s, isFlipped: !s.isFlipped }))
  }, [])

  const nextCard = useCallback(() => {
    setState(s => ({
      ...s,
      index: (s.index + 1) % totalCards,
      isFlipped: false,
    }))
  }, [totalCards])

  const prevCard = useCallback(() => {
    setState(s => ({
      ...s,
      index: s.index === 0 ? totalCards - 1 : s.index - 1,
      isFlipped: false,
    }))
  }, [totalCards])

  const markKnown = useCallback(() => {
    setState(s => {
      const newKnown = [...s.known, currentCardIndex]
      const newIndex = s.index >= totalCards - 1 ? 0 : s.index
      if (newKnown.length + s.learning.length >= totalCards) {
        setMode('results')
      }
      return { ...s, known: newKnown, index: newIndex, isFlipped: false }
    })
  }, [currentCardIndex, totalCards])

  const markLearning = useCallback(() => {
    setState(s => {
      const newLearning = [...s.learning, currentCardIndex]
      const newIndex = s.index >= totalCards - 1 ? 0 : s.index
      if (s.known.length + newLearning.length >= totalCards) {
        setMode('results')
      }
      return { ...s, learning: newLearning, index: newIndex, isFlipped: false }
    })
  }, [currentCardIndex, totalCards])

  const reset = useCallback(() => {
    setState({ index: 0, isFlipped: false, known: [], learning: [] })
    setMode('browse')
  }, [])

  const startQuiz = useCallback(() => {
    setState({ index: 0, isFlipped: false, known: [], learning: [] })
    setMode('quiz')
  }, [])

  const swipe = useSwipe({
    onSwipeLeft: mode === 'quiz' ? markLearning : nextCard,
    onSwipeRight: mode === 'quiz' ? markKnown : prevCard,
  })

  if (!deck) {
    return (
      <div className="text-center py-20 text-muted">
        <div className="text-5xl mb-4">🃏</div>
        <p>Deck not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-accent font-semibold">
          &larr; Back home
        </button>
      </div>
    )
  }

  // Results screen
  if (mode === 'results') {
    const pctKnown = Math.round((state.known.length / totalCards) * 100)
    return (
      <div>
        <TopBar title={deck.title} />
        <div className="max-w-[500px] mx-auto px-5 pt-10 pb-10 text-center">
          <div className="text-6xl mb-4">{pctKnown >= 80 ? '🎉' : pctKnown >= 50 ? '💪' : '📚'}</div>
          <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
          <p className="text-muted mb-8">You reviewed all {totalCards} cards</p>

          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-green">{state.known.length}</div>
              <div className="text-sm text-muted">Got it!</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow">{state.learning.length}</div>
              <div className="text-sm text-muted">Still learning</div>
            </div>
          </div>

          <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-green rounded-full transition-all duration-500"
              style={{ width: `${pctKnown}%` }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {state.learning.length > 0 && (
              <button
                onClick={() => {
                  // Review only the "learning" cards
                  setShuffledOrder(state.learning)
                  setState({ index: 0, isFlipped: false, known: [], learning: [] })
                  setMode('quiz')
                }}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Review {state.learning.length} cards again
              </button>
            )}
            <button
              onClick={reset}
              className="w-full py-4 bg-surface-2 text-primary font-bold rounded-xl hover:bg-surface-3 transition-colors"
            >
              Start fresh
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar title={deck.title} />

      {/* Progress */}
      <div className="max-w-[500px] mx-auto px-5 pt-6 pb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">
            {mode === 'browse' ? `Card ${state.index + 1} of ${totalCards}` : `${remaining} remaining`}
          </span>
          {mode === 'quiz' && (
            <div className="flex gap-4 text-xs">
              <span className="text-green font-semibold">{state.known.length} got it</span>
              <span className="text-yellow font-semibold">{state.learning.length} learning</span>
            </div>
          )}
        </div>
        <div className="h-[5px] bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((state.index + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Mode toggle */}
      {mode === 'browse' && (
        <div className="max-w-[500px] mx-auto px-5 pb-4">
          <button
            onClick={startQuiz}
            className="w-full py-3 bg-accent/10 text-accent font-semibold rounded-xl hover:bg-accent/20 transition-colors text-sm"
          >
            Start Quiz Mode (swipe to sort)
          </button>
        </div>
      )}

      {/* Card */}
      <div className="max-w-[500px] mx-auto px-5" {...swipe}>
        <div
          onClick={flip}
          className="relative cursor-pointer select-none"
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: state.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {/* Front */}
            <div
              className="bg-surface border border-surface-3 rounded-2xl p-8 min-h-[280px] flex flex-col justify-center items-center text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-4">
                Question
              </div>
              <p className="text-xl font-semibold leading-relaxed">{card?.front}</p>
              <div className="mt-6 text-muted text-sm">Tap to flip</div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-surface-2 border border-accent/30 rounded-2xl p-8 min-h-[280px] flex flex-col justify-center items-center text-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-4">
                Answer
              </div>
              <p className="text-lg leading-relaxed whitespace-pre-line">{card?.back}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-[500px] mx-auto px-5 pt-6 pb-10">
        {mode === 'browse' ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={prevCard}
              className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={flip}
              className="px-8 h-14 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-opacity"
            >
              Flip
            </button>
            <button
              onClick={nextCard}
              className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <button
              onClick={markLearning}
              className="flex-1 py-4 bg-yellow/10 text-yellow font-bold rounded-xl hover:bg-yellow/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Still learning
            </button>
            <button
              onClick={markKnown}
              className="flex-1 py-4 bg-green/10 text-green font-bold rounded-xl hover:bg-green/20 transition-colors flex items-center justify-center gap-2"
            >
              Got it!
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="max-w-[500px] mx-auto px-5 pb-10 text-center text-sm text-muted">
        {mode === 'browse' ? (
          <p>Swipe or use arrows to browse. Tap card to flip.</p>
        ) : (
          <p>Swipe right = Got it. Swipe left = Still learning.</p>
        )}
      </div>
    </div>
  )
}
