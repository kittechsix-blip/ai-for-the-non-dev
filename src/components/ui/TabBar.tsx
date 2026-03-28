interface Tab {
  id: string
  label: string
  count: number
}

interface TabBarProps {
  tabs: Tab[]
  activeId: string
  onSelect: (id: string) => void
}

export function TabBar({ tabs, activeId, onSelect }: TabBarProps) {
  return (
    <div className="px-5 pt-6 pb-3 overflow-x-auto">
      <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
        {tabs.map(tab => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all border-[1.5px] whitespace-nowrap select-none ${
                isActive
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface border-surface-3 text-muted hover:border-accent hover:text-primary'
              }`}
            >
              {tab.label}
              <span
                className={`inline-block rounded-full px-1.5 py-px text-[11px] ml-1 ${
                  isActive ? 'bg-white/15' : 'bg-surface-3'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
