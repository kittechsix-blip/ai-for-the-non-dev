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
    <div className="px-5 pt-6 pb-3 overflow-x-auto md:px-8">
      <div className="tab-bar flex gap-1.5 md:gap-2" style={{ minWidth: 'max-content' }}>
        {tabs.map(tab => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`px-6 py-3.5 rounded-full text-[17px] font-semibold cursor-pointer transition-all border-[1.5px] whitespace-nowrap select-none md:px-7 md:py-4 md:text-lg ${
                isActive
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface border-surface-3 text-muted hover:border-accent hover:text-primary'
              }`}
            >
              {tab.label}
              <span
                className={`inline-block rounded-full px-2 py-px text-[13px] ml-1.5 ${
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
