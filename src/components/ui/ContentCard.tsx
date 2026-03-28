import { useNavigate } from 'react-router-dom'
import type { ContentItem } from '../../data/types'

interface ContentCardProps {
  item: ContentItem
  completedCount?: number
}

const difficultyColors: Record<string, string> = {
  beginner: 'text-green',
  intermediate: 'text-yellow',
  advanced: 'text-red',
}

const typeRoutes: Record<string, string> = {
  course: '/course',
  game: '/game',
  flashcard: '/flashcards',
  workflow: '/workflow',
  explainer: '/explain',
}

export function ContentCard({ item, completedCount = 0 }: ContentCardProps) {
  const navigate = useNavigate()
  const lessonsCount = 'lessonsCount' in item && (item as { lessonsCount?: number }).lessonsCount
    ? (item as { lessonsCount: number }).lessonsCount
    : 'lessons' in item ? (item as { lessons: unknown[] }).lessons.length : 0
  const pct = item.ready && lessonsCount > 0
    ? Math.round((completedCount / lessonsCount) * 100)
    : 0

  return (
    <div
      onClick={() => {
        if (item.ready) navigate(`${typeRoutes[item.type]}/${item.id}`)
      }}
      className={`content-card bg-surface border border-surface-3 rounded-[var(--radius-card)] p-6 cursor-pointer transition-all relative overflow-hidden block ${
        item.ready
          ? 'hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.3)] active:scale-[.98]'
          : 'opacity-50 pointer-events-none'
      }`}
    >
      {!item.ready && (
        <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider bg-surface-3 text-muted px-2.5 py-1 rounded-full">
          COMING SOON
        </span>
      )}
      <div
        className="content-card-icon w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-4"
        style={{ background: item.iconBg }}
      >
        {item.icon}
      </div>
      <h3 className="content-card-title text-[17px] font-bold mb-1.5">{item.title}</h3>
      <p className="content-card-desc text-[13px] text-muted leading-relaxed mb-4">{item.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted">
        {lessonsCount > 0 && (
          <span className="bg-surface-2 px-2.5 py-0.5 rounded-full font-semibold">
            {lessonsCount} lessons
          </span>
        )}
        <span>{item.estimatedTime}</span>
        <span className={`font-semibold ${difficultyColors[item.difficulty]}`}>
          {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
        </span>
      </div>
      {item.ready && pct > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-surface-2">
          <div className="h-full bg-accent rounded-tr-sm transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  )
}
