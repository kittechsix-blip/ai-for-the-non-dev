import type { ContentItem } from './types'
import { courses } from './courses'
import { flashcardDecks } from './flashcards'

export const allContent: ContentItem[] = [
  ...courses,
  ...flashcardDecks,
]

export type ContentCategory = 'all' | 'courses' | 'games' | 'flashcards' | 'workflows' | 'explainers'

export const categories: { id: ContentCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'courses', label: 'Courses' },
  { id: 'games', label: 'Games' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'explainers', label: 'Explainers' },
]

export function filterByCategory(items: ContentItem[], category: ContentCategory): ContentItem[] {
  if (category === 'all') return items
  const typeMap: Record<string, string> = {
    courses: 'course',
    games: 'game',
    flashcards: 'flashcard',
    workflows: 'workflow',
    explainers: 'explainer',
  }
  return items.filter(item => item.type === typeMap[category])
}
