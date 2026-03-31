import { useParams, useNavigate } from 'react-router-dom'
import { explainers } from '../data/explainers'
import { TopBar } from '../components/layout/TopBar'

const sectionStyles: Record<string, { bg: string; label: string; labelColor: string }> = {
  analogy: {
    bg: 'rgba(251,191,36,.08)',
    label: 'Real-World Analogy',
    labelColor: 'text-yellow',
  },
  explanation: {
    bg: 'transparent',
    label: '',
    labelColor: '',
  },
  example: {
    bg: 'rgba(52,211,153,.06)',
    label: 'Picture This',
    labelColor: 'text-green',
  },
  callout: {
    bg: 'rgba(96,165,250,.06)',
    label: 'Key Takeaway',
    labelColor: 'text-blue',
  },
}

export function ExplainerPage() {
  const { explainerId } = useParams<{ explainerId: string }>()
  const navigate = useNavigate()
  const explainer = explainers.find(e => e.id === explainerId)

  if (!explainer) {
    return (
      <div className="text-center py-20 text-muted">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-xl font-bold text-primary mb-2">Explainer not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-accent font-semibold bg-transparent border-none cursor-pointer"
        >
          &larr; Back to home
        </button>
      </div>
    )
  }

  return (
    <div>
      <TopBar title={explainer.title} />

      <div className="max-w-lg mx-auto px-5 py-5 space-y-5 md:max-w-2xl lg:max-w-3xl md:px-8 md:py-8">
        {/* Hero metadata */}
        <div className="flex items-center gap-3 text-xs text-muted md:text-sm">
          <span className="bg-surface-2 px-2.5 py-0.5 rounded-full font-semibold">
            {explainer.estimatedTime}
          </span>
          <span className="font-semibold text-green">{explainer.difficulty}</span>
        </div>

        {/* Sections */}
        <div className="space-y-5 md:space-y-6">
          {explainer.sections.map((section, i) => {
            const style = sectionStyles[section.type]
            const paragraphs = section.content.split('\n\n')
            const isPlain = section.type === 'explanation'

            return (
              <div
                key={i}
                className={`space-y-3 ${!isPlain ? 'rounded-xl p-5 md:p-6' : ''} ${
                  !isPlain && section.type !== 'explanation'
                    ? `border border-${style.labelColor.replace('text-', '')}/20`
                    : ''
                }`}
                style={!isPlain ? { background: style.bg } : undefined}
              >
                {section.title && (
                  <h2 className="text-xl font-bold text-primary md:text-2xl">
                    {section.title}
                  </h2>
                )}

                {style.label && (
                  <p
                    className={`text-xs font-bold tracking-wider uppercase ${style.labelColor}`}
                  >
                    {style.label}
                  </p>
                )}

                {paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="text-[14px] leading-[1.65] text-primary/90 md:text-base md:leading-[1.7] lg:text-[17px]"
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/\n/g, '<br />')
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>

        {/* Back to home */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-xl bg-accent text-white text-base font-semibold border-none cursor-pointer hover:brightness-110 transition-all min-h-[56px] md:py-5 md:text-lg md:min-h-[64px]"
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
