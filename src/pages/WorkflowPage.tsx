import { useParams, useNavigate } from 'react-router-dom'
import { workflows } from '../data/workflows'
import { TopBar } from '../components/layout/TopBar'
import { WorkflowStepper } from '../components/content/workflow'

export function WorkflowPage() {
  const { workflowId } = useParams<{ workflowId: string }>()
  const navigate = useNavigate()
  const workflow = workflows.find(w => w.id === workflowId)

  if (!workflow) {
    return (
      <div className="text-center py-20 text-muted">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold text-primary mb-2">Workflow not found</h2>
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
      <TopBar title={workflow.title} />
      <WorkflowStepper workflow={workflow} workflowId={workflow.id} />
    </div>
  )
}
