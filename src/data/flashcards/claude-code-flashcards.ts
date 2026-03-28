import type { FlashcardDeck } from '../types'

export const claudeCodeFlashcards: FlashcardDeck = {
  id: 'claude-code-flashcards',
  type: 'flashcard',
  title: 'Claude Code Quick Recall',
  description: 'Test your knowledge of Claude Code features with rapid-fire flashcards. Flip, swipe, and master the concepts.',
  icon: '🃏',
  iconBg: 'linear-gradient(135deg, #a78bfa, #c084fc)',
  difficulty: 'beginner',
  estimatedTime: '10 min',
  tags: ['claude', 'claude-code', 'flashcards', 'review'],
  ready: true,
  cards: [
    // Slash Commands
    {
      front: 'What are Slash Commands like in everyday life?',
      back: 'Speed-dial on your phone — one button replaces typing a long number. Type /command instead of a long instruction.',
    },
    {
      front: 'How do you use a Slash Command?',
      back: 'Type / followed by a name, like /pr or /optimize. You can add parameters: /fix-issue 42',
    },
    {
      front: 'Slash Commands vs Skills — who triggers them?',
      back: 'YOU trigger slash commands manually. Skills can trigger automatically when Claude detects they\'re relevant.',
    },

    // Memory
    {
      front: 'What are the 3 layers of Memory?',
      back: '1. Organization rules (company-wide)\n2. Project rules (team-shared)\n3. Personal preferences (just you)',
    },
    {
      front: 'Memory is like a coffee shop barista — why?',
      back: 'The barista learns your order over time. You say it once, and they remember forever. No repeating yourself.',
    },
    {
      front: 'Where does Claude store Memory?',
      back: 'CLAUDE.md files at different levels: user (~/.claude), project (.claude/), and organization.',
    },

    // Checkpoints
    {
      front: 'Checkpoints are like what in video games?',
      back: 'Save points before a boss fight. If things go wrong, reload and try again without losing progress.',
    },
    {
      front: 'Do you need to manually save Checkpoints?',
      back: 'No! They auto-save with every message. Just open the menu and pick a point to rewind to.',
    },
    {
      front: 'What can you rewind with Checkpoints?',
      back: 'Conversation only, files only, or both. Your choice when rewinding.',
    },

    // CLI
    {
      front: 'Name the 3 CLI communication modes',
      back: '1. Interactive (ongoing conversation)\n2. Print mode -p (one question, one answer)\n3. Piping (hand Claude data to analyze)',
    },
    {
      front: 'CLI is like a walkie-talkie with channels — explain',
      back: 'Channel 1 = back-and-forth chat. Channel 2 = send one message, get one reply. Channel 3 = pass a document.',
    },
    {
      front: 'Which CLI mode is like texting?',
      back: 'Print mode (-p). One question in, one answer out, done.',
    },

    // Skills
    {
      front: 'Skills vs Slash Commands — key difference?',
      back: 'Skills activate AUTOMATICALLY when relevant. Slash commands only run when you manually type them.',
    },
    {
      front: 'Skills are like training manuals — how?',
      back: 'Claude keeps expertise in a drawer. When you ask something relevant, Claude grabs the right manual automatically.',
    },
    {
      front: 'How do Skills load efficiently?',
      back: '3 layers: quick description (always ready), detailed instructions (when needed), supporting files (on demand).',
    },

    // Hooks
    {
      front: 'Hooks are like what in your home?',
      back: 'Motion-sensor lights. You don\'t flip a switch — the action triggers automatically when an event happens.',
    },
    {
      front: 'Name 3 events you can attach Hooks to',
      back: 'Before a tool runs, after a file is saved, when a session starts, when a task finishes... (25 total events)',
    },
    {
      front: 'What can Hooks do?',
      back: 'BLOCK dangerous actions (prevent deleting files) or ENHANCE actions (auto-format code when written).',
    },

    // MCP
    {
      front: 'MCP is like giving Claude what?',
      back: 'A phone to call suppliers. Claude can reach out to GitHub, Slack, databases — real-time external data.',
    },
    {
      front: 'Without MCP, what does Claude know?',
      back: 'Only what you tell it. With MCP, Claude can fetch live data from your real systems.',
    },
    {
      front: 'Can Claude chain MCP connections?',
      back: 'Yes! Pull from database → create report → post to Slack. All in one request.',
    },

    // Subagents
    {
      front: 'Subagents are like what profession?',
      back: 'A general contractor with specialists: plumber, electrician, painter. Each handles their part independently.',
    },
    {
      front: 'What\'s special about subagent workspaces?',
      back: 'Each gets their own fresh workspace (toolbox). They don\'t interfere with each other.',
    },
    {
      front: 'Can you limit what subagents do?',
      back: 'Yes! A security reviewer can READ code but not CHANGE it. Fine-grained permissions.',
    },

    // Advanced Features
    {
      front: 'Name 4 Advanced Features',
      back: '1. Planning Mode (blueprints first)\n2. Deep Thinking (more reasoning time)\n3. Background Tasks (run while you work)\n4. Permission Modes (autonomy levels)',
    },
    {
      front: 'Planning Mode is like what?',
      back: 'An architect drawing blueprints before construction. Claude shows the plan, you approve, then it executes.',
    },
    {
      front: 'Permission Modes range from what to what?',
      back: '"Ask before every action" (cautious) to "Just handle it" (full autonomy). You choose the level.',
    },

    // Plugins
    {
      front: 'Plugins are like buying what?',
      back: 'A complete home theater in a box. One package with TV, soundbar, cables — all pre-configured and ready.',
    },
    {
      front: 'What does a Plugin bundle together?',
      back: 'Slash commands, skills, subagents, MCP connections, and hooks — all wired up in one install.',
    },
    {
      front: 'Where do Plugins come from?',
      back: 'Official (Anthropic), community-made, company-internal, or personal. Multiple sources.',
    },

    // Bonus: Connections
    {
      front: 'Quick: Memory vs Checkpoints',
      back: 'Memory = preferences across sessions. Checkpoints = undo within a session.',
    },
    {
      front: 'Quick: Skills vs Hooks',
      back: 'Skills = expertise packages. Hooks = event-triggered automations.',
    },
    {
      front: 'Quick: Subagents vs MCP',
      back: 'Subagents = Claude\'s internal specialists. MCP = connections to external apps.',
    },
  ],
}
