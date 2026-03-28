import { useState } from 'react'
import type { TerminalCommand, Difficulty } from '../../../data/types'

interface Props {
  commands: TerminalCommand[]
  onBack: () => void
}

const difficultyTabs: { level: Difficulty | 'all'; label: string }[] = [
  { level: 'all', label: 'All' },
  { level: 'beginner', label: 'Beginner' },
  { level: 'intermediate', label: 'Intermediate' },
  { level: 'advanced', label: 'Advanced' },
]

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-green/10 text-green',
  intermediate: 'bg-yellow/10 text-yellow',
  advanced: 'bg-red/10 text-red',
}

export function StudyMode({ commands, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Difficulty | 'all'>('all')

  const filtered = activeTab === 'all'
    ? commands
    : commands.filter(c => c.difficulty === activeTab)

  const grouped = filtered.reduce<Record<string, TerminalCommand[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  const categories = Object.keys(grouped).sort()

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-muted hover:text-primary text-sm font-semibold transition-colors"
        >
          &larr; Back
        </button>
        <h2 className="text-xl font-extrabold text-primary">Command Reference</h2>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {difficultyTabs.map(tab => (
          <button
            key={tab.level}
            onClick={() => setActiveTab(tab.level)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.level
                ? 'bg-accent text-white'
                : 'bg-surface-2 text-muted hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-muted mb-4">{filtered.length} commands</div>

      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-xs uppercase font-bold text-muted tracking-wider mb-3">{category}</h3>
          <div className="flex flex-col gap-2">
            {grouped[category].map(cmd => (
              <div key={cmd.id} className="bg-surface rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono text-green text-sm font-bold">{cmd.command}</code>
                  {cmd.aliases.length > 0 && (
                    <span className="text-xs text-muted">
                      ({cmd.aliases.join(', ')})
                    </span>
                  )}
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColors[cmd.difficulty]}`}>
                    {cmd.difficulty}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{cmd.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
