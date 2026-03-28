import { useNavigate } from 'react-router-dom'

interface CourseFinaleProps {
  quizCorrect: boolean[]
  totalLessons: number
  onReset: () => void
}

export function CourseFinale({ quizCorrect, totalLessons, onReset }: CourseFinaleProps) {
  const navigate = useNavigate()
  const score = quizCorrect.filter(Boolean).length

  return (
    <div className="max-w-[720px] mx-auto px-5 pb-10">
      <div className="bg-surface border border-surface-3 rounded-[var(--radius-card)] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,.3)]">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold mb-4">You Did It!</h2>
        <div className="inline-block bg-accent-glow text-accent font-bold text-lg px-6 py-3 rounded-2xl mb-5">
          Quiz Score: {score}/{totalLessons}
        </div>
        <p className="text-muted text-sm mb-8">
          You now understand every major feature — no jargon needed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="block w-full max-w-xs mx-auto mb-3 px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm border-none cursor-pointer hover:brightness-110 transition-all"
        >
          &larr; Back to All Topics
        </button>
        <button
          onClick={onReset}
          className="block w-full max-w-xs mx-auto px-6 py-3 rounded-full bg-transparent border-[1.5px] border-surface-3 text-muted font-semibold text-sm cursor-pointer hover:border-accent hover:text-primary transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
