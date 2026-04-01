import type { Workflow } from '../types'

export const tokenEfficiency: Workflow = {
  id: 'token-efficiency',
  type: 'workflow',
  title: 'Save Your Tokens',
  description:
    '10 habits that cut your Claude costs by 50–80%. Learn why AI gets expensive and exactly how to fix it.',
  icon: '⚡',
  iconBg: 'linear-gradient(135deg, #fbbf24, #e85d26)',
  difficulty: 'beginner',
  estimatedTime: '15 min',
  tags: ['tokens', 'efficiency', 'cost', 'workflow', 'beginner'],
  ready: true,
  steps: [
    {
      title: 'Why Tokens Matter (The Meter Is Running)',
      description:
        "Most people think AI charges per message — like texting. It doesn't. AI charges per **token**, and here's the twist: every message you send includes the ENTIRE conversation history.\n\n" +
        "Imagine a taxi that charges you not just for this trip, but for every trip you've taken today — combined. That's how tokens work. Message 1 is cheap. Message 30 is reading all 29 previous messages plus your new one. The meter keeps running on everything.\n\n" +
        "Here's what that looks like in real numbers:\n\n" +
        '• **5 messages** → ~7,500 tokens (a quick errand)\n' +
        '• **10 messages** → ~27,500 tokens (a crosstown ride)\n' +
        '• **20 messages** → ~105,000 tokens (a road trip)\n' +
        '• **30 messages** → ~232,000 tokens (a cross-country flight)\n' +
        '• **100 messages** → ~2,500,000 tokens (98.5% spent re-reading old messages)\n\n' +
        "By message 30, you're spending **31× more per message** than you did at the start. That's not a typo. The cost grows exponentially — not because AI is greedy, but because it has to re-read your entire conversation every single time.\n\n" +
        "The good news? A handful of simple habits can cut your token spend by 50–80%. That's what the rest of this workflow teaches you.",
      checklist: [
        'I understand that AI re-reads the entire conversation with every message',
        'I understand why long conversations get dramatically more expensive',
      ],
      tip: "Think of it like a group email chain — every reply includes the entire thread. By reply #30, the email is enormous. That's what's happening inside AI with every message you send.",
    },
    {
      title: 'Conversation Hygiene (The Biggest Wins)',
      description:
        "These three habits have the biggest impact on your token spend. Think of them like cleaning your kitchen as you cook — instead of letting dishes pile up until you can't find the counter.\n\n" +
        '**1. Edit your prompt — don\'t send a follow-up**\n\n' +
        "You send a prompt. AI misunderstands. Your instinct? Type \"No, I meant X\" as a new message. But that new message now includes the original bad prompt AND the bad response AND your correction. You're paying for the mistake three times.\n\n" +
        '**Instead:** Click **Edit** on your original message, fix it, and regenerate. The old exchange gets replaced, not stacked. You save all the tokens from the bad attempt.\n\n' +
        "It's like erasing a wrong answer on a test instead of writing \"Actually, ignore #3, the real answer is...\" below it.\n\n" +
        '**2. Start a fresh chat every 15–20 messages**\n\n' +
        "Long conversations are token incinerators. When a chat gets long:\n\n" +
        '• Ask Claude to **summarize the current state** in a few bullet points\n' +
        '• Copy the summary\n' +
        '• **Start a new chat**\n' +
        '• Paste the summary as your first message\n\n' +
        "You just went from 20+ messages of context to 1 message. Same information, fraction of the cost. It's like moving to a clean desk instead of digging through a stack of papers.\n\n" +
        '**3. Batch your questions into one message**\n\n' +
        'Bad (3 separate messages = 3 full context reloads):\n' +
        '• "Summarize this article"\n' +
        '• "Now list the main points"\n' +
        '• "Now suggest a headline"\n\n' +
        "Good (1 message = 1 context load):\n" +
        '• "Summarize this article, list the main points, and suggest a headline."\n\n' +
        "Bonus: the answer is usually **better** when Claude sees the full picture upfront. You save tokens AND get higher quality.",
      checklist: [
        'I will edit my prompt instead of sending correction messages',
        'I will start a fresh chat when conversations hit 15–20 messages',
        'I will batch related questions into a single message',
      ],
      tip: "One well-crafted message beats three quick ones — every time. You save tokens and get better answers because Claude sees everything at once.",
    },
    {
      title: 'Context Management (Stop Repeating Yourself)',
      description:
        "You wouldn't carry your entire filing cabinet to every meeting. You'd grab the one folder you need. But that's exactly what most people do with AI — re-uploading the same documents, re-explaining their role, re-describing their preferences in every new chat.\n\n" +
        '**4. Use Projects for recurring files**\n\n' +
        "If you reference the same document across multiple chats — a style guide, a contract, a reference sheet — uploading it each time re-tokenizes it every time. That's like photocopying a handbook before every meeting.\n\n" +
        '**Instead:** Upload it once to a **Project**. Every conversation inside that project can reference it from cache. One upload, unlimited chats.\n\n' +
        "Go to **Claude.ai → Projects → New Project** and upload the files you use most.\n\n" +
        '**5. Set up Memory and preferences**\n\n' +
        "Every new chat where you explain \"I'm a marketing manager, I write casually, I need bullet points...\" wastes 3–5 messages on setup. That's hundreds of tokens before you even start working.\n\n" +
        '**Instead:** Go to **Settings → Memory** and save your role, writing style, and preferences once. Claude applies them automatically to every conversation.\n\n' +
        "It's like having a nameplate on your desk — you don't introduce yourself to your coworkers every morning.\n\n" +
        '**6. Turn off features you\'re not using**\n\n' +
        "Web search, connectors, extended thinking — these all add tokens to every response, even when you didn't ask for them. They're like leaving every light on in your house because you might walk into that room later.\n\n" +
        '**Rule of thumb:** If you didn\'t turn a feature on intentionally for this specific task, turn it off.\n\n' +
        '• Writing your own content? **Turn off Search.**\n' +
        '• Simple task? **Keep Extended Thinking off.** Only enable it if the first attempt isn\'t good enough.',
      checklist: [
        'I uploaded my most-used documents to a Project',
        'I saved my role and preferences in Settings → Memory',
        'I turned off web search and other features I don\'t need right now',
      ],
      tip: "If you've explained the same thing to Claude twice across different chats, it belongs in Memory or a Project — not your next message.",
    },
    {
      title: 'Smart Scheduling (Work With the System)',
      description:
        "You wouldn't run five small loads of laundry back-to-back — you'd spread them out and run full loads during off-peak electricity hours. The same logic applies to using Claude.\n\n" +
        '**7. Spread your work across the day**\n\n' +
        "Claude's usage limit runs on a **rolling 5-hour window** — not a midnight reset. This means usage gradually falls off over time.\n\n" +
        "**Strategy:** Divide your AI work into 2–3 sessions (morning, afternoon, evening). By the time you return for your next session, your earlier usage has rolled off and you've got a refreshed limit.\n\n" +
        "If you work 9 AM–12 PM, your morning usage starts dropping off around 2 PM. Your afternoon session gets a mostly fresh limit.\n\n" +
        '**8. Save heavy work for off-peak hours**\n\n' +
        "Like electricity, AI has peak hours. During high-traffic times, the same work costs more of your limit.\n\n" +
        '**Peak hours:** Roughly **7–11 AM Central / 6–10 AM Mountain** on weekdays (that\'s 5–9 AM Pacific).\n\n' +
        '**Strategy:** Use peak hours for lighter work — planning, reviewing, quick questions. Schedule the heavy stuff (long code generation, large file analysis, complex architecture) for **evenings or weekends** when the system is less busy.\n\n' +
        "Morning coffee ☕ + light tasks. Evening 🌙 + heavy generation.\n\n" +
        '**9. Enable overage as a safety net**\n\n' +
        "This isn't about spending more — it's about never being blocked mid-task. Go to **Settings → Usage** and enable \"Overage.\"\n\n" +
        '• You set a **monthly spending cap** (you control the max)\n' +
        '• When your session limit is hit, it switches to **pay-as-you-go** at API rates\n' +
        '• Prevents the worst-case scenario: being cut off in the middle of important work\n\n' +
        "Think of it like having roadside assistance. You hope you never need it, but when your tire blows on the highway at 10 PM, you're glad it's there.",
      checklist: [
        'I will split my AI work into 2–3 sessions across the day',
        'I will save resource-intensive tasks for evenings or weekends',
        'I enabled overage in Settings → Usage as a safety net',
      ],
      tip: "The rolling window means you don't have to cram everything into one session. Spread it out and you'll almost never hit your limit.",
    },
    {
      title: "Pick the Right Model (Don't Use a Sledgehammer)",
      description:
        "You wouldn't use a power drill to hang a picture hook. You wouldn't hire a lawyer to proofread a grocery list. But that's what you're doing when you use the most powerful AI model for every task.\n\n" +
        '**10. Match the model to the job**\n\n' +
        "Claude comes in three sizes. Each is great at different things:\n\n" +
        '**Haiku** (the pocket knife) 🔪\n' +
        '• Grammar and spelling fixes\n' +
        '• Formatting and reformatting text\n' +
        '• Quick translations\n' +
        '• Brainstorming ideas\n' +
        '• Simple Q&A\n' +
        '• **50–70% cheaper** than the bigger models\n\n' +
        '**Sonnet** (the Swiss Army knife) 🛠️\n' +
        '• Writing emails, reports, and documents\n' +
        '• Summarizing long content\n' +
        '• Code generation and debugging\n' +
        '• Analysis and recommendations\n' +
        '• The **sweet spot** for most real work\n\n' +
        '**Opus** (the power tool) ⚡\n' +
        '• Complex reasoning and strategy\n' +
        '• Architecture and system design\n' +
        '• Deep debugging of hard problems\n' +
        '• Multi-step research and analysis\n' +
        '• Worth the cost for genuinely **hard problems**\n\n' +
        '**The rule:** Default to the lightest model that gets the job done. Start with Haiku or Sonnet. Only upgrade to Opus when the first attempt falls short.\n\n' +
        "Most people leave Opus on all day. That's like driving a semi truck to pick up groceries. Save the big rig for when you're actually hauling something heavy.",
      checklist: [
        'I know which model to use for simple tasks (Haiku)',
        'I know which model to use for real work (Sonnet)',
        'I will only use Opus when the task genuinely needs deep reasoning',
      ],
      tip: "Haiku is included free on many Claude plans — use it for brainstorming, grammar, and formatting. Save your Sonnet and Opus tokens for the work that actually needs them.",
    },
    {
      title: '🔧 Bonus: Claude Code Power Tips',
      description:
        "If you use **Claude Code** (the command-line tool for developers), you get several of the habits above for free — built right into the workflow. Here's how.\n\n" +
        '**Subagents = automatic conversation splitting**\n\n' +
        "Claude Code lets you spin up \"subagents\" — mini-conversations that handle one task, then report back with a summary. Each subagent gets a fresh context (no history bloat). This is tips #1–3 built into the tool.\n\n" +
        '• Need to research something? → Subagent.\n' +
        '• Need to explore a codebase? → Subagent.\n' +
        '• Need to review code? → Subagent.\n' +
        '• Only the summary comes back to your main conversation.\n\n' +
        '**CLAUDE.md = permanent memory**\n\n' +
        "Claude Code reads a `CLAUDE.md` file at the start of every session. Your preferences, project context, and rules live there. This is tip #5 — you never waste messages on setup because it's automatic.\n\n" +
        "If you find yourself re-explaining something to Claude Code, add it to CLAUDE.md. You'll never explain it again.\n\n" +
        '**Plan Mode = batching for workflows**\n\n' +
        "Before any multi-step task, Claude Code can enter Plan Mode — where you map out the full scope before executing. This prevents the back-and-forth correction messages that eat tokens. It's tip #3 (batching) applied to entire workflows.\n\n" +
        '**Checkpoint at 15 messages**\n\n' +
        "If your main Claude Code conversation is getting long (15+ messages), consider whether to summarize and continue or start a fresh session. The subagent pattern usually prevents this, but it's good hygiene to watch for it.",
      checklist: [
        'I understand how subagents keep the main context lean',
        'I will keep my CLAUDE.md file current with my preferences',
        'I will use Plan Mode before multi-step work',
        'I will checkpoint when conversations get long',
      ],
      tip: "Claude Code users get the biggest token savings from subagents. Think of them as disposable assistants — they do the legwork and hand you a one-page summary. Your main conversation stays clean and cheap.",
    },
  ],
}
