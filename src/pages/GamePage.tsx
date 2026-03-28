import { useParams, useNavigate } from 'react-router-dom'
import { games } from '../data/games'
import { TopBar } from '../components/layout/TopBar'
import { TerminalTyperGame } from '../components/content/game/TerminalTyperGame'

export function GamePage() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const game = games.find(g => g.id === gameId)

  if (!game) {
    return (
      <div className="text-center py-20 text-muted">
        <div className="text-5xl mb-4">🎮</div>
        <h2 className="text-xl font-bold text-primary mb-2">Game not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-accent font-semibold"
        >
          &larr; Back to home
        </button>
      </div>
    )
  }

  return (
    <div>
      <TopBar title={game.title} />
      {game.gameType === 'terminal-typer' && (
        <TerminalTyperGame game={game} />
      )}
    </div>
  )
}
