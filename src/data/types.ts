export type ContentType = 'course' | 'game' | 'flashcard' | 'workflow' | 'explainer'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ContentItem {
  id: string
  type: ContentType
  title: string
  description: string
  icon: string
  iconBg: string
  difficulty: Difficulty
  estimatedTime: string
  tags: string[]
  ready: boolean
}

export interface ChatMessage {
  who: string
  color?: string
  message: string
}

export interface Quiz {
  question: string
  options: string[]
  correctIndex: number
  feedback: string
}

export interface Lesson {
  icon: string
  color: string
  title: string
  oneLiner: string
  analogy: string
  explain: string
  scenario: ChatMessage[]
  scenarioFooter?: string
  takeaway: string
  quiz: Quiz
}

export interface Course extends ContentItem {
  type: 'course'
  lessons: Lesson[]
  lessonsCount?: number // override for placeholder courses with empty lessons array
}

export interface FlashcardDeck extends ContentItem {
  type: 'flashcard'
  cards: { front: string; back: string }[]
}

export interface Game extends ContentItem {
  type: 'game'
  gameType: 'matching' | 'sorting'
  pairs?: { term: string; definition: string }[]
  items?: { label: string; sortOrder: number }[]
}

export interface Workflow extends ContentItem {
  type: 'workflow'
  steps: WorkflowStep[]
}

export interface WorkflowStep {
  title: string
  description: string
  checklist?: string[]
  tip?: string
}

export interface Explainer extends ContentItem {
  type: 'explainer'
  sections: ExplainerSection[]
}

export interface ExplainerSection {
  type: 'analogy' | 'explanation' | 'example' | 'callout'
  title?: string
  content: string
}

export type AnyContent = Course | FlashcardDeck | Game | Workflow | Explainer
