export function AnalogyBox({ html }: { html: string }) {
  return (
    <div className="rounded-[var(--radius-card)] p-5 mb-5" style={{ background: 'rgba(251,191,36,.08)' }}>
      <div className="text-xs font-bold tracking-wider text-yellow uppercase mb-2">
        Real-World Analogy
      </div>
      <p className="text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
