import type { Workflow } from '../types'

export const keepingAiOnTrack: Workflow = {
  id: 'keeping-ai-on-track',
  type: 'workflow',
  title: 'Keeping AI on Track',
  description:
    'How AI remembers, why it forgets, and how to keep it focused on your work — the memory management skills that change everything.',
  icon: '🧠',
  iconBg: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
  difficulty: 'beginner',
  estimatedTime: '25 min',
  tags: ['memory', 'context', 'persistence', 'beginner', 'no-code'],
  ready: true,
  steps: [
    {
      title: 'The Goldfish Problem',
      description:
        "Here's something that surprises most people: every time you start a new conversation with AI, it has *zero memory* of anything you've ever talked about. None. It doesn't remember your name, your job, your preferences, or that incredible brainstorming session you had yesterday.\n\n" +
        "Each conversation is a blank slate — like talking to a new coworker on their very first day, every single time.\n\n" +
        'This is what developers call the "context window" problem. AI can only hold a certain amount of information in its working memory (think of it as a whiteboard). Once the whiteboard is full, the oldest stuff starts disappearing.\n\n' +
        "The Everything Claude Code repo has an entire system for dealing with this — hooks that automatically save and load context, memory files that persist between sessions, and \"instincts\" that capture what works. We're going to learn the beginner-friendly version of all of this.",
      checklist: [
        'I understand that AI has no memory between conversations by default',
        "I understand the whiteboard analogy — AI's working memory is limited",
      ],
      tip: "This is why you sometimes get great results in a conversation and then can't recreate them the next day. The AI wasn't being inconsistent — it forgot everything.",
    },
    {
      title: 'The Whiteboard — Understanding Token Limits',
      description:
        'Let\'s get concrete about that whiteboard. AI\'s memory is measured in "tokens" — roughly, a token is about \u00BE of a word. Most AI models can hold somewhere between 100,000 and 200,000 tokens in a single conversation. Sounds like a lot, right?\n\n' +
        "It is — for short conversations. But here's what eats tokens fast:\n\n" +
        '- Every message you send\n' +
        '- Every response AI gives back\n' +
        '- Any documents you paste in\n' +
        '- The conversation history (AI re-reads the ENTIRE conversation every time you send a message)\n\n' +
        "So a 30-message conversation with long responses can fill that whiteboard faster than you'd think. When it fills up, the earliest messages start getting \"pushed off the edge\" — AI can no longer see them.\n\n" +
        "**What this means for you:** If you're 45 minutes into a conversation and AI suddenly seems to forget what you agreed on earlier — it probably did. The early context fell off the whiteboard.",
      checklist: [
        'I understand what tokens are (roughly \u00BE of a word)',
        "I know why long conversations can cause AI to 'forget' earlier context",
      ],
      tip: "Next time AI seems to contradict something it said earlier in a long conversation, it's not being difficult — it literally can't see that part of the conversation anymore. That's your cue to summarize.",
    },
    {
      title: 'The Cheat Sheet — Writing Instructions AI Loads Every Time',
      description:
        'Developers solve the memory problem with something called a CLAUDE.md file — a "cheat sheet" that AI reads at the start of every session. It contains who the user is, what they\'re working on, and how they like things done.\n\n' +
        "You can do the exact same thing. Here's how:\n\n" +
        '**Option A — In Claude chat:** Start every conversation by pasting a short "about me" block:\n\n' +
        '"Before we start, here\'s context about me:\n' +
        '- Name: [your name]\n' +
        '- Role: [your job]\n' +
        "- I'm working on: [current project]\n" +
        '- My audience: [who you create for]\n' +
        '- Tone I prefer: [casual/formal/etc.]\n' +
        '- Pet peeves: [things AI should avoid]\n\n' +
        'Keep this in mind for everything we discuss."\n\n' +
        "**Option B — In Cowork mode:** Claude already has memory built in through its CLAUDE.md file and Cowork's persistent context. You can build this context over time by working with it.\n\n" +
        'Save your "about me" block somewhere you can grab it in two seconds. Pasting 5 lines of context at the start saves you 15 minutes of AI getting your preferences wrong.',
      checklist: [
        "I wrote my personal 'about me' block with at least 5 details",
        'I saved it somewhere easy to access (notes app, pinned doc, etc.)',
        'I tried starting a new AI conversation with it and noticed the difference',
      ],
      tip: 'This is the single highest-impact habit in this entire series. Five seconds of pasting context = dramatically better results for the entire conversation.',
    },
    {
      title: 'The Summary Save — Preserving What Matters',
      description:
        "You had a productive 30-minute AI conversation. You made decisions, created a plan, and agreed on next steps. Tomorrow you'll want to continue — but AI won't remember any of it.\n\n" +
        "Here's the fix: Before you end a conversation, ask AI to summarize itself.\n\n" +
        '"Summarize this conversation in a format I can paste into our next session. Include: key decisions we made, the current state of the project, action items, and any preferences you learned about how I work."\n\n' +
        'Copy that summary. Save it. When you start a new conversation, paste it in first: "Here\'s where we left off: [paste summary]"\n\n' +
        'This is the non-dev version of what the Everything Claude Code repo calls "session hooks" — automated saves at the end of every session. You\'re doing it manually, but the effect is the same: continuity across conversations.',
      checklist: [
        'I asked AI to summarize a conversation before ending it',
        'I saved the summary and used it to start a new conversation',
        "I experienced the 'pickup where we left off' feeling",
      ],
      tip: 'Make this a habit for any multi-session project. "Summarize where we are" should be your last message in every working session — like saving a document before you close it.',
    },
    {
      title: 'The Long Conversation Reset',
      description:
        "You're deep in a conversation. AI is getting confused, repeating itself, or forgetting things you said 20 messages ago. The whiteboard is full.\n\n" +
        "Don't panic. Don't start over and lose everything. Do a **mid-conversation reset:**\n\n" +
        '1. Ask AI: "Summarize everything we\'ve decided so far in this conversation. Include the current state of the work and all open questions."\n\n' +
        '2. Copy that summary.\n\n' +
        '3. Start a NEW conversation.\n\n' +
        '4. Paste: "Here\'s context for what we\'re working on: [paste summary]. Let\'s continue from here."\n\n' +
        'You gave AI a fresh, clean whiteboard with all the important stuff written on it. This is what developers call "strategic compaction" — and it works beautifully.\n\n' +
        "Signs you need a reset: AI contradicts earlier decisions, gives repetitive answers, misses context you provided earlier, or the conversation is over 30 messages long.",
      checklist: [
        'I know the signs that a conversation needs a reset (contradictions, repetition, missed context)',
        'I practiced the mid-conversation reset technique',
      ],
      tip: "Some people set a personal rule: after 25 messages, always do a reset. It's like clearing your desk — you don't wait until it's buried, you tidy up regularly.",
    },
    {
      title: 'Teaching AI What "Good" Looks Like',
      description:
        'The Everything Claude Code repo has a feature called "instincts" — it automatically extracts what works from past sessions and saves those patterns for the future. Over time, the AI gets better because it learns your preferences.\n\n' +
        "You can do a simplified version of this. After AI gives you a result you love, tell it:\n\n" +
        '"That was excellent. What made this response work well? Break down the approach you took so I can ask for the same quality next time."\n\n' +
        "Save AI's answer. It becomes a reusable instruction. Next time you need a similar result, paste it: \"Follow this approach: [paste the breakdown]\"\n\n" +
        'Over time, you build a library of "what works" — your personal instincts file. This is one of the most powerful patterns from professional AI users, and it requires zero code.',
      checklist: [
        'I asked AI to explain why a good result was good',
        'I saved the explanation as a reusable instruction',
        'I used that saved instruction in a new conversation and got consistent quality',
      ],
      tip: "This is like building a recipe box. Every time AI nails something, capture the recipe. After a month, you'll have a collection of prompts that reliably produce great work.",
    },
    {
      title: 'Your AI Cheat Sheet — The Full Package (Cowork Exercise)',
      description:
        "Let's bring it all together. In Cowork mode (or a document), build your complete AI cheat sheet. This is your personal version of a developer's CLAUDE.md file.\n\n" +
        '**My AI Cheat Sheet**\n\n' +
        '\uD83D\uDC64 ABOUT ME\n' +
        '- Name: ___\n' +
        '- Role: ___\n' +
        '- Industry: ___\n' +
        '- Main projects: ___\n' +
        '- Audience I create for: ___\n\n' +
        '\uD83C\uDFA8 MY PREFERENCES\n' +
        '- Preferred tone: ___\n' +
        '- Typical content length: ___\n' +
        '- Things AI should never do: ___\n' +
        '- Things I always want: ___\n\n' +
        '\uD83E\uDD1D MY AI TEAM (from Workflow 1)\n' +
        '- Agent 1: [role] \u2014 [when to use]\n' +
        '- Agent 2: [role] \u2014 [when to use]\n' +
        '- Agent 3: [role] \u2014 [when to use]\n\n' +
        '\uD83D\uDD04 MY LOOP (from Workflow 2)\n' +
        '- [Your personalized Plan/Execute/Review/Iterate template]\n\n' +
        '\uD83D\uDCDA WHAT WORKS (Instincts)\n' +
        '- [Paste breakdowns of great results here over time]\n\n' +
        'Start every important AI conversation by pasting the relevant sections of this cheat sheet. Watch how the quality of every interaction improves.',
      checklist: [
        'I created my complete AI cheat sheet',
        'It includes sections from all three workflows (team, loop, memory)',
        "I saved it somewhere I'll actually use it",
        'I tried starting a conversation with it and experienced the difference',
      ],
      tip: "This cheat sheet is a living document. Update it as you learn what works. In 3 months it'll be dramatically better than what you write today — and so will your AI results.",
    },
    {
      title: "The Big Picture — You're an AI Systems Thinker Now",
      description:
        "Step back and look at what you've learned across these three workflows:\n\n" +
        "**Workflow 1 (Your AI Team):** You don't need one AI — you need *roles*. A researcher, an editor, a planner, a reviewer. Give AI a job title and watch it perform.\n\n" +
        "**Workflow 2 (The AI Loop):** Don't use AI like a vending machine. Follow the rhythm: Plan \u2192 Execute \u2192 Review \u2192 Iterate. Great results come from the process, not the prompt.\n\n" +
        "**Workflow 3 (Keeping AI on Track):** AI forgets everything. Your job is to help it remember — with cheat sheets, summaries, resets, and saved instructions.\n\n" +
        'These three ideas — **specialization, process, and memory** — are the same ideas that power the most advanced AI developer tools in the world. The Everything Claude Code repo uses code to automate them. You do them manually. But the thinking is identical.\n\n' +
        "You're not \"chatting with AI\" anymore. You're *designing how AI works for you.* That's what this was all about.",
      checklist: [
        'I can explain specialization, process, and memory as the three pillars of working with AI',
        'I have a saved AI cheat sheet, a personal workflow template, and at least 3 agent roles ready to use',
        'I feel confident designing my own AI workflows for new tasks',
      ],
      tip: "You now know more about effective AI use than most people who've been chatting with AI for years. The difference wasn't a fancy tool — it was understanding the system behind the tools.",
    },
  ],
}
