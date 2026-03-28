import type { Game } from '../types'
import { terminalTyperCommands } from './terminal-typer-commands'

export const terminalTyper: Game = {
  id: 'terminal-typer',
  type: 'game',
  gameType: 'terminal-typer',
  title: 'Terminal Typer',
  description: 'Type the right slash command for each scenario. Test your Claude Code knowledge under pressure.',
  icon: '⌨️',
  iconBg: 'linear-gradient(135deg, #34d399, #2dd4bf)',
  difficulty: 'beginner',
  estimatedTime: '5-10 min',
  tags: ['claude-code', 'commands', 'typing'],
  ready: true,
  commands: terminalTyperCommands,
}
