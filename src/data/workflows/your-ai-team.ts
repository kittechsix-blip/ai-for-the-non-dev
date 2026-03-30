import type { Workflow } from '../types'

export const yourAiTeam: Workflow = {
  id: 'your-ai-team',
  type: 'workflow',
  title: 'Your AI Team',
  description:
    'Stop treating AI as one brain — learn to build a team of specialists that produce dramatically better results.',
  icon: '🤝',
  iconBg: 'linear-gradient(135deg, #7c3aed, #2dd4bf)',
  difficulty: 'beginner',
  estimatedTime: '20 min',
  tags: ['agents', 'delegation', 'roles', 'beginner', 'no-code'],
  ready: true,
  steps: [
    {
      title: 'One Brain vs. a Team',
      description:
        "When most people use AI, they treat it like one person who does everything — writes emails, plans events, gives advice, edits documents, all in the same conversation. That's like hiring one employee and asking them to be your accountant, graphic designer, HR manager, and receptionist all at once. It *works*, but the results are... average.\n\n" +
        'Professional AI users do something different. They give AI a specific **role** before asking it to do anything. "You\'re a copy editor" produces sharper edits than "fix this." "You\'re a project manager helping me plan a product launch" produces better plans than "help me plan stuff."\n\n' +
        'This is the core idea behind **AI agents** — specialized versions of AI, each focused on one job.',
      checklist: [
        'I understand why giving AI a role produces better results than a general ask',
        'I can name one task I regularly do that would benefit from a specialist AI',
      ],
      tip: 'Think of the last time you asked AI to do something and the result was meh. Was AI trying to be too many things at once? That\'s usually the problem.',
    },
    {
      title: 'What Is an AI Agent? (No Code Required)',
      description:
        'In the developer world, an "agent" is a fancy word for an AI that\'s been given a specific job, a set of instructions, and sometimes tools to work with. The Everything Claude Code repo has 30 of these — a planner agent, a reviewer agent, a security agent, and more.\n\n' +
        "But here's the thing: you don't need code to create an agent. An agent is really three things:\n\n" +
        '**1. A role** — Who is the AI pretending to be?\n' +
        '**2. Instructions** — What should it focus on? What should it ignore?\n' +
        '**3. Context** — What does it need to know about your specific situation?\n\n' +
        'When you type "You are a senior copy editor. Review this blog post for clarity, grammar, and flow. My audience is small business owners." — congratulations, you created an agent.',
      checklist: [
        'I can explain what an AI agent is in my own words (no jargon needed)',
        'I know the three parts: role, instructions, context',
      ],
      tip: 'The word "agent" sounds intimidating, but you\'ve been creating them every time you start a message with "Act as a..." or "You are a..." — you didn\'t know it had a name.',
    },
    {
      title: 'Building Your First Agent (Chat Exercise)',
      description:
        "Time to try it. Open a new Claude conversation (or any AI chat) and we're going to build a agent together.\n\n" +
        '**Your task:** Create an email reviewer agent.\n\n' +
        "Copy this into Claude and then paste in any email you've been meaning to send:\n\n" +
        '"You are a professional email reviewer. Your job is to:\n' +
        '- Check the tone (friendly but professional)\n' +
        '- Flag anything that sounds passive-aggressive\n' +
        '- Suggest a clearer subject line\n' +
        "- Keep my original meaning — don't rewrite the whole thing\n\n" +
        'Here\'s the email I\'m about to send: [paste your email]"\n\n' +
        'Notice how specific this is compared to saying "check my email." That specificity is what makes an agent useful.',
      checklist: [
        'I opened a Claude conversation and tried the email reviewer agent',
        'I noticed the difference in quality compared to a vague \'check my email\' prompt',
      ],
      tip: "Save agent prompts that work well for you somewhere you can find them — a notes app, a doc, even a sticky note. You'll reuse them constantly.",
    },
    {
      title: 'The Specialist Advantage',
      description:
        "Here's why specialists beat generalists. When you tell AI \"You're a nutritionist,\" something shifts in how it responds. It starts prioritizing health science over general advice. It mentions things like macronutrient balance instead of vague tips. It thinks like that role.\n\n" +
        'The Everything Claude Code repo takes this to an extreme — it has separate reviewers for TypeScript, Python, Go, Java, and more. Each one knows the rules and best practices of its specific world.\n\n' +
        'You can do the same thing for your world:\n\n' +
        '- **Teacher?** "You are a curriculum designer specializing in 3rd grade math."\n' +
        '- **Marketer?** "You are a B2B email copywriter who writes for SaaS companies."\n' +
        '- **Event planner?** "You are a logistics coordinator for corporate events with 100+ attendees."\n\n' +
        'The more specific the role, the better the output.',
      checklist: [
        'I created a specialist agent for something in my own field',
        'I compared its output to a generic prompt and noticed the difference',
      ],
      tip: 'Don\'t be shy about getting hyper-specific. "You are a social media manager for a small bakery in Austin, Texas" will outperform "You are a social media manager" every time.',
    },
    {
      title: 'Your AI Team Roster (Hands-On Exercise)',
      description:
        "Professional AI users don't create one agent — they build a roster. Think of it like assembling your dream team.\n\n" +
        "Here's the exercise: Grab a piece of paper, open a notes app, or use Cowork mode and think about the 3–5 tasks you do most often at work. For each one, write down:\n\n" +
        '**Task:** [What you do]\n' +
        '**Agent Role:** [Who would you hire to do this?]\n' +
        '**Key Instructions:** [What should they focus on?]\n\n' +
        'Example:\n' +
        '- **Task:** Writing weekly team updates\n' +
        '- **Agent Role:** Internal communications writer\n' +
        '- **Key Instructions:** Keep it under 200 words, lead with wins, bullet-point action items, casual tone\n\n' +
        'This roster is your starting toolkit. You now have a team.',
      checklist: [
        'I identified 3–5 tasks I do regularly',
        'I wrote an agent role + instructions for each one',
        'I saved my roster somewhere I can access it',
      ],
      tip: "This roster will come back in Workflow 3 (Memory & Context) when we show you how to turn it into a permanent cheat sheet that AI loads every time you start a conversation.",
    },
    {
      title: 'Delegating Like a Manager',
      description:
        'Having agents is one thing. Knowing when and how to hand off work is another.\n\n' +
        "Here's the delegation framework that professionals use:\n\n" +
        '**1. Be clear about what "done" looks like.** Don\'t say "write a report." Say "write a 1-page summary with 3 key findings, a recommendation, and a next-steps section."\n\n' +
        '**2. Give examples of good work.** "Here\'s a report I liked — match this style" is 10x more effective than describing what you want from scratch.\n\n' +
        "**3. Set boundaries.** \"Don't make up statistics. If you're not sure about a number, flag it and I'll verify.\" This is how professionals prevent AI from hallucinating confidently.\n\n" +
        "**4. Review before you ship.** An agent's first draft is a *draft*. Your job is to be the manager who reviews, gives feedback, and approves.",
      checklist: [
        'I understand the four parts of good delegation: define done, give examples, set boundaries, review',
        'I can think of a time I got a bad AI result because I skipped one of these steps',
      ],
      tip: "The number one mistake beginners make: accepting AI's first output. Treat every AI response like a first draft from a new hire. It needs your review.",
    },
    {
      title: 'Leveling Up — Multi-Agent Thinking (Cowork Exercise)',
      description:
        'Ready for the advanced move? Instead of one agent per conversation, you can run **multiple agents across different tasks** — like a real manager delegates to different team members.\n\n' +
        'In Cowork mode, you can ask Claude to work on a project where different phases need different expertise:\n\n' +
        '**Phase 1 — Research Agent:** "Research the top 5 competitors in [your industry]. Summarize their pricing, main features, and customer complaints."\n\n' +
        '**Phase 2 — Analyst Agent:** "Based on this research, identify the 3 biggest gaps in the market that we could fill."\n\n' +
        '**Phase 3 — Writer Agent:** "Turn these market gaps into a 1-page pitch I can share with my team. Casual tone, bullet points, no jargon."\n\n' +
        "Each phase builds on the last, but the AI's *role* shifts each time. That's multi-agent thinking — and it's how the pros get compound results from AI.\n\n" +
        "Try this with a real project you're working on. Break it into 2–3 phases, give each phase a different role, and see how the quality improves.",
      checklist: [
        'I broke a real project into 2–3 phases with different AI roles',
        'I tried running each phase in sequence, building on previous results',
        'I noticed that the final output was better than if I\'d asked for everything in one prompt',
      ],
      tip: 'This is the beginner-friendly version of what developers call "multi-agent orchestration." You\'re manually doing what their code does automatically — and that\'s perfectly fine. The thinking matters more than the tools.',
    },
  ],
}
