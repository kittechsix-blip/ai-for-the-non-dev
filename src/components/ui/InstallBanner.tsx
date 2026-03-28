import { usePWA } from '../../hooks/usePWA'

export function InstallBanner() {
  const { canInstall, triggerInstall, dismiss } = usePWA()
  if (!canInstall) return null

  return (
    <div className="px-5 py-3">
      <div className="bg-accent-glow border border-accent/30 rounded-xl px-4 py-3 flex items-center justify-between gap-2.5">
        <p className="text-[13px] text-accent font-medium">Install for offline access</p>
        <button
          onClick={triggerInstall}
          className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-semibold border-none cursor-pointer whitespace-nowrap"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          className="bg-transparent border-none text-accent text-lg cursor-pointer p-0.5 leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
