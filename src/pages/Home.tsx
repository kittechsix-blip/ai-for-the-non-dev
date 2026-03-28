import { useState } from 'react'
import { allContent, categories, filterByCategory, type ContentCategory } from '../data/registry'
import { useProgress } from '../hooks/useProgress'
import { InstallBanner } from '../components/ui/InstallBanner'
import { TabBar } from '../components/ui/TabBar'
import { ContentCard } from '../components/ui/ContentCard'
import { Footer } from '../components/layout/Footer'

export function Home() {
  const [activeTab, setActiveTab] = useState<ContentCategory>('all')
  const { getTotalCompleted, getCourseCompletedCount } = useProgress()
  const filtered = filterByCategory(allContent, activeTab)

  const totalLessons = allContent.reduce((sum, item) => {
    if (item.type === 'course') {
      const c = item as unknown as { lessons: unknown[]; lessonsCount?: number }
      return sum + (c.lessonsCount || c.lessons.length)
    }
    return sum
  }, 0)

  const tabs = categories.map(cat => ({
    id: cat.id,
    label: cat.label,
    count: cat.id === 'all' ? allContent.length : filterByCategory(allContent, cat.id).length,
  }))

  return (
    <div>
      <InstallBanner />

      {/* Hero */}
      <div
        className="text-center px-6 pt-14 pb-10"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,93,38,.08) 0%, transparent 70%)' }}
      >
        <div className="hero-icon w-16 h-16 rounded-[18px] mx-auto mb-5 flex items-center justify-center text-[28px] font-black text-white tracking-tight shadow-[0_8px_32px_rgba(232,93,38,.3)]" style={{ background: 'linear-gradient(135deg, var(--color-accent), #ff8a50)' }}>
          AI
        </div>
        <h1 className="hero-title text-[clamp(1.6rem,5vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-2">
          AI for the{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--color-accent), #ff8a50)' }}>
            Non-Dev
          </span>
        </h1>
        <p className="hero-subtitle text-[15px] text-muted max-w-[420px] mx-auto">
          Learn to build with AI — explained like you're learning from a friend. Zero jargon. Real examples. Interactive quizzes.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-row flex justify-center gap-7 px-6 pt-5 pb-2">
        <div className="text-center">
          <div className="stats-value text-[22px] font-extrabold text-accent">{allContent.length}</div>
          <div className="stats-label text-[11px] text-muted font-medium uppercase tracking-wider">Topics</div>
        </div>
        <div className="text-center">
          <div className="stats-value text-[22px] font-extrabold text-accent">{totalLessons}</div>
          <div className="stats-label text-[11px] text-muted font-medium uppercase tracking-wider">Lessons</div>
        </div>
        <div className="text-center">
          <div className="stats-value text-[22px] font-extrabold text-accent">{getTotalCompleted()}</div>
          <div className="stats-label text-[11px] text-muted font-medium uppercase tracking-wider">Completed</div>
        </div>
      </div>

      {/* Tabs */}
      <TabBar
        tabs={tabs}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as ContentCategory)}
      />

      {/* Grid */}
      <div className="px-5 pt-4 pb-10 md:px-8 lg:px-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <div className="text-5xl opacity-50 mb-3">🚧</div>
            <p className="text-sm">Content for this category is coming soon!</p>
          </div>
        ) : (
          <div className="content-grid grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {filtered.map(item => (
              <ContentCard
                key={item.id}
                item={item}
                completedCount={item.type === 'course' ? getCourseCompletedCount(item.id) : 0}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
