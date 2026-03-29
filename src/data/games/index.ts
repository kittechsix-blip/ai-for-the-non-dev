import type { Game } from '../types'
import { terminalTyper } from './terminal-typer'
import { skillBuilderGame } from './skill-builder-game'

export const games: Game[] = [terminalTyper, skillBuilderGame]
