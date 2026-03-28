import { useNavigate } from 'react-router-dom'

export function TopBar({ title }: { title?: string }) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-surface-3 px-5 py-3 flex items-center gap-3">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-accent text-[13px] font-semibold bg-transparent border-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All Topics
      </button>
      {title && <span className="text-sm font-semibold text-muted ml-auto">{title}</span>}
    </div>
  )
}
