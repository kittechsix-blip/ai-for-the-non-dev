import type { FlashcardDeck } from '../types'

export const skillBuilderFlashcards: FlashcardDeck = {
  id: 'skill-builder',
  type: 'flashcard',
  title: 'Build a Claude Skill',
  description: 'Master the key concepts behind building reusable Claude Skills.',
  icon: '🧩',
  iconBg: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
  difficulty: 'beginner',
  estimatedTime: '10 min',
  tags: ['skills', 'claude', 'beginner', 'no-code', 'SKILL.md'],
  ready: true,
  cards: [
    {
      front: 'What is a Claude Skill?',
      back: 'A reusable set of instructions you write once that tells Claude exactly how to handle a specific type of task — like a recipe card you hand a chef so they make YOUR dish perfectly every time.',
    },
    {
      front: 'What file type holds a Claude Skill?',
      back: 'A SKILL.md file. The ".md" stands for Markdown — a plain text format. Think of it like how photos end in .jpg. You don\'t need to understand Markdown to build one.',
    },
    {
      front: 'What are the two main parts of a SKILL.md file?',
      back: '1. Frontmatter — the "label" section between --- lines (name + description)\n2. Body — the actual instructions (Overview, Steps, Output Format, Examples)',
    },
    {
      front: 'What is frontmatter?',
      back: 'The header section at the top of a SKILL.md file, wrapped between two lines of three dashes (---). It contains the skill\'s name and description. Think of it like the label on a filing folder.',
    },
    {
      front: 'What does the "name" field in frontmatter look like?',
      back: 'Lowercase letters with dashes between words (kebab-case). Example: email-reviewer, meeting-summarizer, blog-post-editor. No spaces, no capitals.',
    },
    {
      front: 'What are trigger phrases?',
      back: 'Words or sentences in the description field that tell Claude when to activate the skill — like wake words. "Review my email," "check this draft," and "make this email better" could all trigger an email-reviewer skill.',
    },
    {
      front: 'Why should you include MANY trigger phrases?',
      back: 'People say the same thing in lots of different ways. Claude tends to under-trigger skills, so more phrases = higher chance the skill activates when it should. Be generous — list more than you think you need.',
    },
    {
      front: 'What are the four body sections of a SKILL.md?',
      back: '1. Overview — what does this skill do? (1-2 sentences)\n2. Steps — numbered instructions Claude follows in order\n3. Output Format — what the result looks like\n4. Examples — sample input and expected output',
    },
    {
      front: 'What\'s the #1 mistake people make in the Steps section?',
      back: 'Being too vague. "Analyze the email" means nothing. Instead: "Read the email, identify the primary ask, check if the tone matches the audience, and flag sentences over 25 words." Specificity is everything.',
    },
    {
      front: 'Why are examples the "secret weapon" of great skills?',
      back: 'Claude learns patterns incredibly well. One good example teaches more than a paragraph of abstract instructions. Two examples and Claude practically reads your mind. Show the ACTUAL output you want, not a description of it.',
    },
    {
      front: 'What are the four modes of the Skill Builder tool?',
      back: '1. Wizard — guided form (best for beginners)\n2. Editor — write SKILL.md directly\n3. Eval Builder — create test cases\n4. Reference — docs and examples',
    },
    {
      front: 'Which Skill Builder mode should beginners use?',
      back: 'Wizard mode. It walks you through each section step by step — like TurboTax but for Claude instructions. It asks questions and fills in the file for you.',
    },
    {
      front: 'What does the Wizard\'s "Identity" section ask for?',
      back: 'Your skill\'s name (in kebab-case) and its category. This is like naming a recipe — it should be short, clear, and describe what the skill does.',
    },
    {
      front: 'What goes in the "Description & Triggers" section of the Wizard?',
      back: 'A one-sentence description of what the skill does, followed by multiple trigger phrases — all the different ways someone might ask for this task.',
    },
    {
      front: 'What are evals?',
      back: 'Short for "evaluations" — test cases for your skill. Like a dress rehearsal before opening night. You give Claude a prompt using your trigger phrases and check whether the skill produces something reasonable.',
    },
    {
      front: 'How many eval test cases do you need?',
      back: 'Even 2-3 good ones will catch most problems. Focus on: Does the skill trigger? Does the output match your format? Does it handle slightly different inputs?',
    },
    {
      front: 'If an eval test fails, where is the fix usually needed?',
      back: 'In the Steps section — your instructions weren\'t specific enough. Add more detail to the step Claude got wrong, or add another example showing the correct behavior.',
    },
    {
      front: 'What does the Export button do?',
      back: 'Downloads your skill as a .zip folder containing your SKILL.md file, ready to use with Claude Code or paste into any Claude conversation.',
    },
    {
      front: 'Can you use a skill without Claude Code?',
      back: 'Yes! Copy the SKILL.md text and paste it at the start of any Claude conversation as instructions. Or share it with teammates who use Claude Code.',
    },
    {
      front: 'What\'s the best task for your FIRST skill?',
      back: 'Something you already ask Claude to do repeatedly. Your first skill should automate a task you\'re tired of re-explaining. The simpler, the better — you can always make it fancier later.',
    },
    {
      front: 'What makes a BAD trigger phrase?',
      back: 'Being too narrow or too technical. "Configure semantic matching keywords" is bad. "Review my email," "check this draft," "help me fix this" — casual, natural phrases people would actually say — are good.',
    },
    {
      front: 'What makes a GOOD skill name?',
      back: 'Short, descriptive, kebab-case. Examples: meeting-summarizer, blog-post-editor, customer-reply-drafter. Bad: "My Cool Skill" (spaces/caps), "skill1" (meaningless), or anything longer than 4-5 words.',
    },
    {
      front: 'What\'s a "Mad Libs" SKILL.md template?',
      back: 'A fill-in-the-blank version of a SKILL.md file where every blank has [BRACKETS] with hints explaining what goes there. Copy it, replace the brackets with your content, and you have a working skill.',
    },
    {
      front: 'What does the Output Format section prevent?',
      back: 'Inconsistent responses. Without it, Claude guesses what format you want — sometimes bullets, sometimes paragraphs, sometimes tables. Specifying the format means you get the same structure every time.',
    },
    {
      front: 'How do you improve a skill over time?',
      back: 'Use it for a week, notice what Claude gets wrong, then tweak the instructions. It\'s like training a new hire — the first week is always a learning curve. Add examples for the cases it mishandles.',
    },
  ],
}
