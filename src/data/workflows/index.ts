import type { Workflow } from '../types'
import { buildAClaudeSkill } from './build-a-claude-skill'
import { claudeCodeSetupChecklist } from './claude-code-setup-checklist'
import { keepingAiOnTrack } from './keeping-ai-on-track'
import { theAiLoop } from './the-ai-loop'
import { yourAiTeam } from './your-ai-team'
import { lockItDown } from './lock-it-down'

export const workflows: Workflow[] = [
  buildAClaudeSkill,
  claudeCodeSetupChecklist,
  yourAiTeam,
  theAiLoop,
  keepingAiOnTrack,
  lockItDown,
]
