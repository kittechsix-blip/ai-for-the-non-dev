import type { ChatMessage } from '../../../data/types'

const colorMap: Record<string, string> = {
  blue: 'text-blue',
  accent: 'text-accent',
  red: 'text-red',
  teal: 'text-teal',
  purple: 'text-purple',
  green: 'text-green',
}

export function ScenarioBox({ messages, footer }: { messages: ChatMessage[]; footer?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] p-5 mb-5" style={{ background: 'rgba(52,211,153,.06)' }}>
      <div className="text-xs font-bold tracking-wider text-green uppercase mb-3">
        Picture This
      </div>
      <div className="flex flex-col gap-2.5">
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-2 items-start text-[13px] leading-relaxed">
            <span className={`font-bold shrink-0 ${colorMap[msg.color || 'accent']}`}>
              {msg.who}:
            </span>
            <span dangerouslySetInnerHTML={{ __html: msg.message }} />
          </div>
        ))}
      </div>
      {footer && (
        <p className="text-[13px] text-muted mt-3" dangerouslySetInnerHTML={{ __html: footer }} />
      )}
    </div>
  )
}
