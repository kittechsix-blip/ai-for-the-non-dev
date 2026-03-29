import type { WorkflowStep as WorkflowStepType } from '../../../data/types'

interface Props {
  step: WorkflowStepType
  checkedItems: boolean[]
  onToggleCheck: (idx: number) => void
}

export function WorkflowStep({ step, checkedItems, onToggleCheck }: Props) {
  const paragraphs = step.description.split('\n\n')

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-primary">{step.title}</h2>

      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-[14px] leading-[1.65] text-primary/90"
            dangerouslySetInnerHTML={{
              __html: para
                .replace(/\n/g, '<br />')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </div>

      {step.checklist && step.checklist.length > 0 && (
        <div className="bg-surface rounded-xl p-4 space-y-2.5">
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Checklist</p>
          {step.checklist.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checkedItems[idx] || false}
                onChange={() => onToggleCheck(idx)}
                className="mt-0.5 w-[18px] h-[18px] rounded border-2 border-surface-3 bg-surface-2 accent-green shrink-0 cursor-pointer"
              />
              <span
                className={`text-[13px] leading-[1.6] transition-colors ${
                  checkedItems[idx] ? 'text-muted line-through' : 'text-primary/85'
                }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      )}

      {step.tip && (
        <div className="rounded-xl p-4 border border-yellow/20" style={{ background: 'rgba(251,191,36,.08)' }}>
          <p className="text-xs font-semibold text-yellow mb-1.5">Tip</p>
          <p className="text-[13px] leading-[1.6] text-primary/85">{step.tip}</p>
        </div>
      )}
    </div>
  )
}
