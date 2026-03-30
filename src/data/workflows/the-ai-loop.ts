import type { Workflow } from '../types'

export const theAiLoop: Workflow = {
  id: 'the-ai-loop',
  type: 'workflow',
  title: 'The AI Loop',
  description:
    'The repeatable rhythm that turns AI from a random helper into a reliable partner — Plan, Execute, Review, Iterate.',
  icon: '🔄',
  iconBg: 'linear-gradient(135deg, #e85d26, #fbbf24)',
  difficulty: 'beginner',
  estimatedTime: '25 min',
  tags: ['workflows', 'iteration', 'review', 'beginner', 'no-code'],
  ready: true,
  steps: [
    {
      title: 'The "One-and-Done" Trap',
      description:
        "Most people use AI like a vending machine. Put in a prompt, get a result, walk away. Sometimes the result is great. Sometimes it's garbage. It feels random.\n\n" +
        "It's not random — it's a process problem. You wouldn't write a final report without drafting, reviewing, and revising. You wouldn't ship a product without testing it. But with AI, people skip all of that.\n\n" +
        'Professional AI users follow a loop — a repeatable rhythm that turns AI from a slot machine into a reliable partner. The Everything Claude Code repo has over 60 commands organized into this exact flow: plan it, build it, review it, fix it, verify it.\n\n' +
        "You don't need 60 commands. You need to understand the loop.",
      checklist: [
        "I can think of a time I accepted an AI result that wasn't great because I didn't know how to improve it",
        "I'm ready to learn a better way",
      ],
      tip: "If AI feels unreliable to you, it's probably not the AI — it's that you're stopping at step 1 of a 4-step process.",
    },
    {
      title: 'The Four Beats',
      description:
        "Here's the loop. Four steps. Memorize these and you'll get better results from AI for the rest of your life.\n\n" +
        '**🎯 PLAN** — Before you type anything, decide: What do I actually want? What format? How long? Who\'s the audience? Spend 30 seconds thinking before you prompt.\n\n' +
        '**✍️ EXECUTE** — Now ask AI. Use a specific prompt (bonus points if you use an agent role from Workflow 1). Get your first draft.\n\n' +
        "**🔍 REVIEW** — Read what AI gave you. Don't skim — actually evaluate it. Is it accurate? Is it the right tone? Did it miss anything? Would you be comfortable putting your name on this?\n\n" +
        '**🔧 ITERATE** — Tell AI what to fix. "Make the intro shorter." "Add a section about pricing." "The tone is too formal — make it conversational." Then review again.\n\n' +
        'Plan → Execute → Review → Iterate. That\'s the loop. Most people only do step 2.',
      checklist: [
        'I can name all four beats: Plan, Execute, Review, Iterate',
        "I understand that skipping the Review step is why AI output often feels 'off'",
      ],
      tip: "The review step is where all the magic happens. It's also the step everyone skips. Don't skip it.",
    },
    {
      title: 'Plan Like You Mean It (Chat Exercise)',
      description:
        "Let's practice the Plan step. Pick something you actually need to create this week — an email, a presentation outline, a social media post, a project plan, anything.\n\n" +
        'Before you open AI, answer these five questions on paper or in your head:\n\n' +
        '1. **What is this?** (Type of content)\n' +
        '2. **Who is it for?** (Audience)\n' +
        '3. **What tone?** (Casual, formal, urgent, friendly?)\n' +
        '4. **How long?** (Word count, number of sections, bullet points?)\n' +
        '5. **What does "great" look like?** (Any examples or standards to match?)\n\n' +
        'Now turn those answers into a prompt. Here\'s the formula:\n\n' +
        '"Write a [what] for [audience]. Tone should be [tone]. Keep it to [length]. Here\'s what good looks like: [example or description]."\n\n' +
        'That 30-second planning exercise will improve your AI results more than any fancy technique.',
      checklist: [
        'I picked a real task I need to do this week',
        'I answered the five planning questions',
        'I turned my answers into a specific prompt',
      ],
      tip: "Write your planning answers down before opening AI. If you go straight to the chat window, you'll skip planning and fall back into vending machine mode.",
    },
    {
      title: 'Execute with Precision',
      description:
        "Now run your planned prompt. But here's the key — set AI up for success by being generous with context.\n\n" +
        'Bad: "Write a project update email."\n\n' +
        'Good: "Write a project update email for my team of 8. The project is a website redesign for our nonprofit. We\'re 3 weeks in, on track, and finished the wireframes. Tone: casual and encouraging. Keep it under 150 words. End with next week\'s focus areas."\n\n' +
        'The second prompt takes 20 extra seconds to write and saves you 10 minutes of back-and-forth.\n\n' +
        'Here\'s a trick from the pros: if you have an example of what "good" looks like — a previous email you liked, a report format your boss prefers — paste it in and say "Match this style." AI is exceptional at pattern matching. Feed it a pattern.',
      checklist: [
        'I ran my planned prompt and got a first draft',
        'I included context about audience, tone, and length',
      ],
      tip: 'Pasting examples is the single most underrated AI technique. "Match this style" + an example beats a 500-word description of what you want.',
    },
    {
      title: 'Review Like a Manager',
      description:
        "You have a first draft. Now put on your manager hat. Here's your review checklist — go through it every time:\n\n" +
        '**✅ Accuracy:** Is everything factually correct? AI makes things up. Check any statistics, dates, names, or claims.\n\n' +
        '**✅ Tone:** Does it sound like you (or the intended voice)? Read it out loud — if it sounds like a robot wrote it, it needs work.\n\n' +
        '**✅ Completeness:** Did it cover everything you asked for? Compare it to your plan from Step 3.\n\n' +
        '**✅ Length:** Too long? Too short? AI tends to be wordy. "Cut this in half" is a valid instruction.\n\n' +
        "**✅ Would you sign it?** This is the gut check. If you wouldn't put your name on it, it's not done.\n\n" +
        'Be specific about what\'s wrong. "I don\'t like it" isn\'t useful feedback — for AI or for humans.',
      checklist: [
        'I reviewed my AI draft using the five-point checklist',
        'I identified at least one thing that needs improvement',
      ],
      tip: 'The Everything Claude Code repo has dedicated "reviewer" agents whose only job is to check other agents\' work. You\'re now that reviewer. Don\'t rubber-stamp AI\'s output.',
    },
    {
      title: 'Iterate — The Feedback Loop (Chat Exercise)',
      description:
        "Now tell AI what to fix. This is where most beginners freeze — they got a mediocre result and don't know what to say.\n\n" +
        'Here are iteration prompts that always work:\n\n' +
        '**For tone:** "Rewrite this in a more [casual/formal/urgent/friendly] tone."\n\n' +
        '**For length:** "Cut this to [X] words" or "Expand the section about [topic]."\n\n' +
        '**For accuracy:** "The part about [X] isn\'t right. Here\'s what\'s actually true: [facts]. Rewrite that section."\n\n' +
        '**For structure:** "Move the conclusion to the top. Lead with the recommendation."\n\n' +
        '**For style:** "Make it sound more like this: [paste an example]."\n\n' +
        "**The power move:** After each iteration, run through the Review checklist again. Is it better? Still needs work? Tell AI. You can iterate 3, 5, 10 times — there's no limit.\n\n" +
        "Plan → Execute → Review → Iterate → Review → Iterate → Done. That's the real loop.",
      checklist: [
        'I gave AI specific feedback on what to change',
        'I reviewed the revised output and compared it to the original',
        'I iterated at least twice before accepting the final version',
      ],
      tip: "Every iteration makes the output better AND teaches you what kind of feedback works. After a few loops, you'll get great results in fewer rounds.",
    },
    {
      title: "Verification — How Professionals Check AI's Work",
      description:
        'The Everything Claude Code repo has something called "verification loops" — automated checks that run after every piece of code to make sure it actually works. No code ships without passing tests.\n\n' +
        "You should apply the same idea to your own AI work. Here's your non-dev verification toolkit:\n\n" +
        '**The Second Opinion:** Paste AI\'s output into a NEW conversation and say "Review this [email/report/plan] for errors, unclear language, and anything that doesn\'t sound right." AI checking AI\'s work catches a surprising amount.\n\n' +
        '**The Audience Test:** Ask AI "If you were a [your audience], what questions would you have after reading this?" This reveals gaps you missed.\n\n' +
        '**The Facts Check:** For anything with statistics, dates, or claims — ask AI "List every factual claim in this document" and then verify them yourself.\n\n' +
        'Verification isn\'t optional. It\'s how you go from "AI-assisted" to "AI-reliable."',
      checklist: [
        "I tried the 'second opinion' technique — had AI review its own work in a new conversation",
        'I understand why verification is a separate step, not part of review',
      ],
      tip: "The \"second opinion\" technique is shockingly effective. A fresh AI conversation doesn't have the bias of the conversation that created the content. It will catch things the original missed.",
    },
    {
      title: 'Build Your Own Loop Template (Cowork Exercise)',
      description:
        "Now let's make this permanent. In Cowork mode (or a document you keep handy), create your personal AI workflow template. Here's a starter:\n\n" +
        '**My AI Loop Template**\n\n' +
        '📋 PLAN\n' +
        '- What am I making? ___\n' +
        "- Who's it for? ___\n" +
        '- What tone? ___\n' +
        '- How long? ___\n' +
        '- Example of "great": ___\n\n' +
        '✍️ EXECUTE\n' +
        '- Agent role: "You are a ___"\n' +
        '- Full prompt: [built from plan above]\n\n' +
        '🔍 REVIEW\n' +
        '- [ ] Accuracy check\n' +
        '- [ ] Tone check (read out loud)\n' +
        '- [ ] Completeness vs. plan\n' +
        '- [ ] Length check\n' +
        '- [ ] Would I sign this?\n\n' +
        '🔧 ITERATE\n' +
        '- Feedback to give: ___\n' +
        '- Second opinion needed? (Y/N)\n\n' +
        "Save this somewhere you'll actually use it. Pull it up every time you work with AI. After a few weeks, it'll become second nature and you won't need the template anymore.",
      checklist: [
        'I created my personal AI Loop template',
        'I saved it somewhere I can access it quickly',
        'I used it on a real task at least once',
      ],
      tip: "This template connects directly to Workflow 3, where you'll learn how to give this template to AI as a permanent instruction — so it follows the loop automatically.",
    },
  ],
}
