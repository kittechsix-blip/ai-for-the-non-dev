import { useEffect, useRef } from 'react'
import type { Lesson } from '../../../data/types'

interface LessonNavProps {
  lessons: Lesson[]
  current: number
  completed: number[]
  onSelect: (idx: number) => void
}

export function LessonNav({ lessons, current, completed, onSelect }: LessonNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const active = scrollRef.current?.querySelector('[data-active="true"]')
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [current])

  return (
    <div className="max-w-[900px] mx-auto mb-7 px-5 overflow-x-auto" ref={scrollRef}>
      <div className="flex gap-1.5" style={{ minWidth: 'max-content', padding: '2px 0' }}>
        {lessons.map((lesson, i) => {
          const isActive = i === current
          const isDone = completed.includes(i)

          return (
            <button
              key={i}
              data-active={isActive}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border-[1.5px] text-[11px] font-semibold cursor-pointer transition-all whitespace-nowrap select-none ${
                isActive
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface border-surface-3 text-muted hover:border-accent hover:text-primary'
              }`}
            >
              <span className="text-[13px]">{lesson.icon}</span>
              <span>{lesson.title}</span>
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center text-[7px] shrink-0 ${
                  isDone
                    ? 'bg-green border-green text-white'
                    : isActive
                    ? 'border-white/40 text-transparent'
                    : 'border-surface-3 text-transparent'
                }`}
              >
                {isDone ? '✓' : ''}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
