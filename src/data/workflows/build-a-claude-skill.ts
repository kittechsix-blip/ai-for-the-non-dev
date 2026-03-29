import type { Workflow } from '../types'

export const buildAClaudeSkill: Workflow = {
  id: 'build-a-claude-skill',
  type: 'workflow',
  title: 'Build a Claude Skill',
  description: 'Create your first reusable Claude instruction file — no coding required.',
  icon: '🛠️',
  iconBg: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
  difficulty: 'beginner',
  estimatedTime: '20 min',
  tags: ['skills', 'claude', 'beginner', 'no-code', 'automation'],
  ready: true,
  steps: [
    {
      title: 'What Even IS a Skill?',
      description:
        "Before we build anything, let's understand what we're making.\n\n" +
        'Imagine you hire a personal assistant. On their first day, you hand them a card that says:\n\n' +
        '"When someone asks you to summarize a meeting, here\'s exactly how I want you to do it: listen for action items, decisions, and open questions. Format it as bullet points. Keep it under 10 lines."\n\n' +
        "That card? **That's a skill.**\n\n" +
        'A Claude Skill is a set of instructions you write once that tells Claude exactly how to handle a specific type of task — **your way, every time**. Instead of re-explaining what you want in every conversation, you write it down once, and Claude follows it automatically whenever someone asks for that type of help.\n\n' +
        'The instructions live in a text file called a **SKILL.md**. Think of it like a recipe card — the ".md" part is the file type, like how photos end in ".jpg". You don\'t need to know what it stands for.',
      checklist: [
        'Understand that a skill = a reusable instruction card for Claude',
        'Know that skills get triggered automatically when someone says the right thing',
        'Feel comfortable that you do NOT need to write code to build one',
      ],
      tip: 'You already write "skills" every day without knowing it. Every time you tell Claude "When I ask you to review an email, check for tone, clarity, and length" — that\'s a skill. We\'re going to save it permanently instead of retyping it.',
    },
    {
      title: 'Meet the Skill Builder Tool',
      description:
        "Now that you know what a skill is, let's meet the tool that helps you build one.\n\n" +
        'The **Skill Builder** is a visual tool with four modes:\n\n' +
        '**Wizard mode** — A guided form that walks you through building your skill step by step. This is what we\'ll use. Think of it like TurboTax but for Claude instructions — it asks you questions and fills in the file for you.\n\n' +
        '**Editor mode** — A text editor where you can write the SKILL.md file directly. Good for later when you\'re comfortable.\n\n' +
        '**Eval Builder** — A testing tool. We\'ll cover this in a later step.\n\n' +
        '**Reference** — Examples and documentation to browse.\n\n' +
        "For this walkthrough, **Wizard mode is your best friend.** It breaks the whole process into bite-sized sections so you never have to stare at a blank page.",
      checklist: [
        'Open the Skill Builder tool',
        'Click on the "Wizard" tab to enter Wizard mode',
        'Take a quick look around — notice the sections listed on the left sidebar',
      ],
      tip: "Don't worry about the other modes right now. Wizard mode does everything you need. You can always switch to Editor mode later once you see what the final file looks like.",
    },
    {
      title: 'Name Your Skill (Identity)',
      description:
        "The first section of the Wizard asks you to name your skill. This is like naming a recipe — it should be short, clear, and describe what the skill does.\n\n" +
        '**The format matters:** Skill names use lowercase letters with dashes between words. So "Email Reviewer" becomes **email-reviewer**. Think of it like a web address — no spaces, no capitals.\n\n' +
        'Good names:\n' +
        '• meeting-summarizer\n' +
        '• blog-post-editor\n' +
        '• customer-reply-drafter\n' +
        '• weekly-report-builder\n\n' +
        'Bad names:\n' +
        '• My Cool Skill (spaces and capitals)\n' +
        '• skill1 (meaningless)\n' +
        '• the-thing-that-helps-me-write-better-emails (way too long)\n\n' +
        '**Pick something you actually do repeatedly with Claude.** Your first skill should automate a real task, not a hypothetical one.',
      checklist: [
        'Think of a task you repeat with Claude at least once a week',
        'Turn it into a kebab-case name (lowercase-with-dashes)',
        'Type the name into the Identity section of the Wizard',
      ],
      tip: 'Stuck on a name? Finish this sentence: "I want Claude to _____ for me." Whatever fills that blank is your skill name. "review my emails" → email-reviewer. "summarize meetings" → meeting-summarizer.',
    },
    {
      title: 'Write Trigger Phrases',
      description:
        "This is the most important step in the whole process — and it's where most skills fail.\n\n" +
        '**Trigger phrases** are the words or sentences that tell Claude "hey, activate this skill." Think of them like wake words — the way "Hey Siri" activates your phone, trigger phrases activate your skill.\n\n' +
        "The trick: **people say the same thing in lots of different ways.** If your skill helps review emails, someone might say:\n\n" +
        '• "Review my email"\n' +
        '• "Check this draft"\n' +
        '• "Make this email better"\n' +
        '• "Can you look over this message?"\n' +
        '• "Help me fix this email before I send it"\n\n' +
        'Your job is to list as many of these variations as you can think of. **More is better.** Claude uses these phrases to decide when your skill should kick in.\n\n' +
        'The Wizard has a "Description & Triggers" section. The description is a one-sentence summary of what the skill does. The trigger phrases go right below it.',
      checklist: [
        'Write a one-sentence description of what your skill does',
        'List at least 5 different ways someone might ask for this task',
        'Include both formal ("Please review this email") and casual ("check this draft") versions',
        'Enter them in the Description & Triggers section of the Wizard',
      ],
      tip: 'Claude tends to UNDER-trigger skills. Be generous — list more trigger phrases than you think you need. If your skill never activates, it\'s usually because the triggers are too narrow, not too broad.',
    },
    {
      title: 'Understand the SKILL.md File',
      description:
        "Before we write the instructions, let's understand what the file looks like. Don't worry — the Wizard fills most of this in for you. But knowing the structure helps you understand what you're building.\n\n" +
        "A SKILL.md file has two parts:\n\n" +
        '**1. The frontmatter** (the header section)\n' +
        'This is the stuff between two lines of three dashes (---). Think of it like the label on a filing folder — it has the skill\'s name and a short description. Claude reads this to decide when to use the skill.\n\n' +
        '**2. The body** (the instructions)\n' +
        "This is everything after the frontmatter. It's organized into sections with headings:\n\n" +
        '• **Overview** — What does this skill do? (1-2 sentences)\n' +
        '• **Steps** — The step-by-step instructions Claude should follow\n' +
        '• **Output Format** — What the result should look like\n' +
        '• **Examples** — Show Claude a sample input and the output you want\n\n' +
        "That's it. Four sections. The Wizard creates all of them for you — you fill in the blanks.",
      checklist: [
        'Understand that frontmatter = the label (name + description between --- lines)',
        'Understand that the body = the actual instructions (Overview, Steps, Output, Examples)',
        'Know that the Wizard fills in the structure — you provide the content',
      ],
      tip: "The frontmatter is what makes skills feel like magic. It's the part that tells Claude WHEN to activate. The body tells Claude WHAT to do. Both matter, but if the frontmatter is wrong, the body never gets read.",
    },
    {
      title: 'Write Your Instructions',
      description:
        "Now for the fun part — telling Claude exactly how to do the task.\n\n" +
        'The Wizard\'s "Instructions" section has four boxes to fill in. Think of it like giving directions to a new employee:\n\n' +
        '**Overview:** One or two sentences explaining the job. "This skill reviews draft emails and provides specific feedback on tone, clarity, and professionalism."\n\n' +
        "**Steps:** A numbered list of what Claude should do, in order. Be specific. Don't say \"review the email\" — say:\n" +
        '1. Read the full email without making changes\n' +
        '2. Check for tone (too formal? too casual?)\n' +
        '3. Flag grammar and spelling issues\n' +
        '4. Suggest a rewritten version\n\n' +
        '**Output Format:** What should the result look like? Bullet points? A table? A rewritten version? "A numbered list of issues, each with the original text, the problem, and a suggested fix."\n\n' +
        '**Examples:** Show Claude a sample. "If someone says \'review this email to my boss,\' produce a list of 3-5 suggestions with rewrites." Real examples are the single best way to get consistent output.',
      checklist: [
        'Write a 1-2 sentence overview of what the skill does',
        'List 3-5 numbered steps Claude should follow (be specific!)',
        'Describe what the output should look like',
        'Add at least one example with a sample input and expected output',
      ],
      tip: "The #1 mistake: being too vague in the Steps section. \"Analyze the email\" means nothing. \"Read the email, identify the primary ask, check if the tone matches the audience, and flag any sentences over 25 words\" — that's a skill Claude can follow.",
    },
    {
      title: 'Add Examples That Teach',
      description:
        "Examples are the secret weapon of great skills. They're like showing a new employee a finished report and saying \"make it look like this.\"\n\n" +
        "In the Instructions section, you'll see an Examples area. Here's what to include:\n\n" +
        "**The input:** What does someone say or provide? Be realistic. Use something you've actually typed to Claude before.\n\n" +
        "**The output:** What should Claude produce? Write out the ACTUAL response you'd want — not a description of it, but the real thing.\n\n" +
        '**Why this works:** Claude learns patterns incredibly well. One good example teaches more than a paragraph of abstract instructions. Two examples and Claude practically reads your mind.\n\n' +
        'If you have time, add a second example that shows a different scenario. For an email reviewer, example 1 might be a casual email to a colleague, and example 2 might be a formal email to a client. This teaches Claude to adapt.',
      checklist: [
        'Write one complete example with a realistic input and the exact output you want',
        'Make sure the example matches the output format you described in the previous step',
        'Consider adding a second example showing a different scenario',
      ],
      tip: "Steal from yourself. Go back through your Claude chat history and find a conversation where Claude gave you exactly what you wanted. That conversation IS your example — copy the input you gave and the output Claude produced.",
    },
    {
      title: 'Test Your Skill with Evals',
      description:
        "You've built the skill — now let's make sure it actually works.\n\n" +
        "**Evals** (short for evaluations) are test cases. Think of them like a dress rehearsal before opening night. You give Claude a prompt, and check whether the skill produces something reasonable.\n\n" +
        'The Wizard has an "Eval Builder" section. Here\'s how it works:\n\n' +
        "1. **Write a test prompt** — Something a real user would say. Use one of your trigger phrases.\n" +
        "2. **Describe what good looks like** — What should the response include? What should it NOT include?\n" +
        '3. **Run it** — The Eval Builder shows you what Claude would produce.\n\n' +
        "You don't need dozens of test cases. Even 2-3 good ones will catch most problems. Focus on:\n" +
        '• Does the skill trigger when it should?\n' +
        '• Does the output follow the format you specified?\n' +
        '• Does it handle a slightly different input gracefully?',
      checklist: [
        'Switch to the Eval Builder section in the Wizard',
        'Create at least 2 test cases using different trigger phrases',
        'Run each test and review the output',
        'If something is off, go back and adjust your instructions or triggers',
      ],
      tip: "If a test fails, the fix is almost always in the Steps section — your instructions weren't specific enough. Add more detail to the step that Claude got wrong, or add another example showing the correct behavior.",
    },
    {
      title: 'Export and Use Your Skill',
      description:
        "Your skill is built and tested. Time to get it out of the Wizard and into the real world.\n\n" +
        "The Wizard has an **Export** button that downloads your skill as a folder (a .zip file — like a compressed package). Inside, you'll find your SKILL.md file ready to use.\n\n" +
        '**To use your skill with Claude Code:**\n' +
        '1. Download the export\n' +
        '2. Unzip the folder\n' +
        '3. Place the SKILL.md file in your Claude Code commands directory\n' +
        '4. Claude will automatically pick it up the next time you start a conversation\n\n' +
        "**Don't have Claude Code?** No problem. You can also:\n" +
        '• Copy the SKILL.md text and paste it at the start of any Claude conversation as instructions\n' +
        '• Share it with teammates who do use Claude Code\n' +
        '• Save it as a reference for how you want Claude to handle this task\n\n' +
        "The skill file is yours. You can edit it anytime, share it, or use it as a starting point for your next skill.",
      checklist: [
        'Click Export in the Wizard to download your skill',
        'Open the downloaded folder and find your SKILL.md file',
        'Try using the skill — either in Claude Code or by pasting the instructions into a Claude conversation',
        'Celebrate — you built your first skill! 🎉',
      ],
      tip: "Your first skill won't be perfect, and that's fine. The best skills get refined over time. Use it for a week, notice what Claude gets wrong, then go back and tweak the instructions. Think of it like training a new hire — the first week is always a learning curve.",
    },
    {
      title: 'Your Plug-and-Play Template',
      description:
        "Here's your fill-in-the-blank skill template. Copy this, replace everything in [BRACKETS] with your own words, and you've got a working skill.\n\n" +
        '---\n' +
        'name: [YOUR-SKILL-NAME — lowercase, dashes between words, e.g., email-reviewer]\n' +
        'description: >\n' +
        '  [WHAT YOUR SKILL DOES — one sentence, e.g., Reviews draft emails for tone, clarity, and professionalism]\n' +
        '  Use when user asks to [TRIGGER PHRASE 1 — e.g., "review my email"],\n' +
        '  [TRIGGER PHRASE 2 — e.g., "check this draft"],\n' +
        '  or [TRIGGER PHRASE 3 — e.g., "make this email better"].\n' +
        '---\n\n' +
        '# [YOUR SKILL NAME — Title Case, e.g., Email Reviewer]\n\n' +
        '## Overview\n' +
        '[1-2 SENTENCES — What does this skill do and why? e.g., Analyzes draft emails and provides specific feedback on tone, clarity, and length. Designed for professional business communication.]\n\n' +
        '## Steps\n' +
        '1. [FIRST THING CLAUDE SHOULD DO — e.g., Read the full email draft without making changes yet]\n' +
        '2. [SECOND THING — e.g., Identify issues with tone, clarity, grammar, and length]\n' +
        '3. [THIRD THING — e.g., Provide specific suggestions with examples of how to fix each issue]\n' +
        '4. [FINAL THING — e.g., Offer a rewritten version if the user asks for one]\n\n' +
        '## Output Format\n' +
        '[WHAT THE RESULT LOOKS LIKE — e.g., A numbered list of issues, each with the original text, the problem, and a suggested fix. End with an overall score from 1-10.]\n\n' +
        '## Examples\n' +
        '**Example 1:**\n' +
        'Input: User says "[EXAMPLE OF WHAT SOMEONE WOULD SAY — e.g., Can you review this email to my boss?]"\n' +
        'Output: [WHAT CLAUDE SHOULD PRODUCE — e.g., A list of 3-5 specific suggestions with rewrites, followed by a tone score]\n\n' +
        "---\n\nThat's it. Fill in the blanks, and you've built your first skill. Save this template somewhere you can find it — you'll want it for skill #2.",
      checklist: [
        'Copy the template above',
        'Replace every [BRACKETED] section with your own content',
        'Make sure your trigger phrases match what you would actually say to Claude',
        'Save the completed file as a SKILL.md',
      ],
      tip: "Start with something you ALREADY ask Claude to do repeatedly. Your first skill should automate a task you're tired of re-explaining. The simpler, the better — you can always make it fancier later.",
    },
  ],
}
