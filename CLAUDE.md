# AI for the Non-Dev

A comprehensive education platform teaching non-developers to build with AI. Diverse content types: courses, games, flashcards, workflows, and explainers. Library-style content hub, not a classroom.

## Project Info

- **Repo**: `kittechsix-blip/ai-for-the-non-dev`
- **Stack**: React 19 + Vite + Tailwind CSS 4 + TypeScript
- **Deploy**: Vercel (auto-deploy from `main`)
- **PWA**: Service worker + manifest for offline support
- **State**: localStorage via custom hooks (no external state library)
- **Routing**: React Router v7, browser history mode

## Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## File Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router setup
├── index.css                   # Tailwind directives + CSS custom properties
├── components/
│   ├── layout/                 # Shell, TopBar, Footer
│   ├── ui/                     # Card, Badge, TabBar, ProgressBar, IconBox, InstallBanner
│   └── content/                # Content-type renderers
│       ├── course/             # LessonCard, LessonNav, QuizBlock, AnalogyBox, etc.
│       ├── game/               # GameShell, MatchingGame, SortingGame
│       ├── flashcard/          # FlashcardDeck, FlashcardCard
│       ├── workflow/           # WorkflowStepper, WorkflowStep
│       └── explainer/          # ExplainerPage, ConceptBlock
├── pages/                      # Route targets: Home, CoursePage, GamePage, etc.
├── data/                       # All content as TypeScript data files
│   ├── types.ts                # Shared interfaces (ContentItem, Course, Lesson, etc.)
│   ├── registry.ts             # Master content registry (all types combined)
│   ├── courses/                # Course data (one file per course)
│   ├── games/
│   ├── flashcards/
│   ├── workflows/
│   └── explainers/
├── hooks/                      # useProgress, usePWA, useSwipe
└── lib/                        # storage.ts, constants.ts
```

## Routes

```
/                              → Home (content hub)
/course/:courseId              → CoursePage (lesson 1)
/course/:courseId/:lessonIdx   → CoursePage (specific lesson)
/game/:gameId                  → GamePage
/flashcards/:deckId            → FlashcardPage
/workflow/:workflowId          → WorkflowPage
/explain/:explainerId         → ExplainerPage
```

## Design System

### Colors (Dark Theme Only)

| Token | Value | Tailwind Class |
|-------|-------|---------------|
| Background | `#0f0f14` | `bg-bg` |
| Surface 1 | `#1a1a22` | `bg-surface` |
| Surface 2 | `#24242f` | `bg-surface-2` |
| Surface 3 | `#2e2e3a` | `bg-surface-3` |
| Text | `#f0eff4` | `text-primary` |
| Muted | `#8b8a94` | `text-muted` |
| Accent (orange) | `#e85d26` | `text-accent`, `bg-accent` |
| Green | `#34d399` | `text-green`, `bg-green` |
| Blue | `#60a5fa` | `text-blue` |
| Purple | `#a78bfa` | `text-purple` |
| Yellow | `#fbbf24` | `text-yellow` |
| Teal | `#2dd4bf` | `text-teal` |
| Red | `#f87171` | `text-red` |

### Typography

- **Font**: Inter (Google Fonts), weights 400-800
- **Body**: 13-14px, line-height 1.65
- **Headings**: clamp(1.5rem, 5vw, 2.2rem), weight 800

### Content Box Colors

- **Analogy**: Yellow-tinted `rgba(251,191,36,.08)`
- **Scenario**: Green-tinted `rgba(52,211,153,.06)`
- **Takeaway**: Blue-tinted `rgba(96,165,250,.06)`
- **Quiz**: Purple-tinted `rgba(167,139,250,.06)`

## Content Data Model

All content implements `ContentItem` base interface:
```typescript
interface ContentItem {
  id: string;
  type: 'course' | 'game' | 'flashcard' | 'workflow' | 'explainer';
  title: string;
  description: string;
  icon: string;        // emoji
  iconBg: string;      // CSS gradient
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  ready: boolean;
}
```

Content appears on the home grid automatically when added to `data/registry.ts`. Set `ready: false` for coming-soon items.

## Adding New Content

### New Course
1. Create `src/data/courses/my-course.ts` exporting a `Course` object
2. Import and add to `src/data/courses/index.ts`
3. It appears on home screen automatically via registry

### New Content Type
1. Add type to union in `data/types.ts`
2. Create data directory `data/<type>/`
3. Create renderer components in `components/content/<type>/`
4. Create page in `pages/<Type>Page.tsx`
5. Add route in `App.tsx`

## Content Writing Rules

- **Zero jargon**: If a technical term must appear, explain it immediately in plain English
- **Analogies**: Every concept gets a real-world analogy a 12-year-old would understand
- **Bold key phrases**: In analogies and takeaways, bold the core insight
- **Chat scenarios**: Feel natural, not scripted or corporate
- **Quiz wrong answers**: Plausible but clearly wrong once you've read the lesson
- **Scannable**: Short paragraphs, visual hierarchy via colored boxes

## State / Progress

- Storage key prefix: `aftnd-` (AI For The Non-Dev)
- `aftnd-progress`: Main progress store (typed per content type)
- `useProgress` hook: typed getters/setters, auto-persists to localStorage
- Legacy `htc-*` keys migrated on first load

## Deploy

Push to `main` → Vercel auto-deploys. No build output folder to manage.

For SPA routing, `vercel.json` has rewrites: all paths → `/index.html`.
