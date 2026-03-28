export function TakeawayBox({ html }: { html: string }) {
  return (
    <div className="rounded-[var(--radius-card)] p-5 mb-5" style={{ background: 'rgba(96,165,250,.06)' }}>
      <div className="text-xs font-bold tracking-wider text-blue uppercase mb-2">
        Key Takeaway
      </div>
      <p className="text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
