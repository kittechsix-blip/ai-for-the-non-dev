import type { WorkflowStep as WorkflowStepType } from '../../../data/types'

interface Props {
  step: WorkflowStepType
  checkedItems: boolean[]
  onToggleCheck: (idx: number) => void
}

export function WorkflowStep({ step, checkedItems, onToggleCheck }: Props) {
  const paragraphs = step.description.split('\n\n')

  return (
    <div className="space-y-5 md:space-y-6">
      <h2 className="text-xl font-bold text-primary md:text-2xl lg:text-3xl">{step.title}</h2>

      <div className="space-y-3 md:space-y-4">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-[14px] leading-[1.65] text-primary/90 md:text-base md:leading-[1.7] lg:text-[17px]"
            dangerouslySetInnerHTML={{
              __html: para
                .replace(/\n/g, '<br />')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </div>

      {step.checklist && step.checklist.length > 0 && (
        <div className="bg-surface rounded-xl p-4 space-y-3 md:p-6 md:space-y-4">
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1 md:text-sm">Checklist</p>
          {step.checklist.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 cursor-pointer group md:gap-4"
            >
              <input
                type="checkbox"
                checked={checkedItems[idx] || false}
                onChange={() => onToggleCheck(idx)}
                className="mt-0.5 w-[22px] h-[22px] rounded border-2 border-surface-3 bg-surface-2 accent-green shrink-0 cursor-pointer md:w-[26px] md:h-[26px]"
              />
              <span
                className={`text-[14px] leading-[1.6] transition-colors md:text-base ${
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
        <div className="rounded-xl p-4 border border-yellow/20 md:p-5" style={{ background: 'rgba(251,191,36,.08)' }}>
          <p className="text-xs font-semibold text-yellow mb-1.5 md:text-sm md:mb-2">💡 Tip</p>
          <p className="text-[14px] leading-[1.6] text-primary/85 md:text-base">{step.tip}</p>
        </div>
      )}
    </div>
  )
}
