import type { Workflow } from '../types'

export const claudeCodeSetupChecklist: Workflow = {
  id: 'claude-code-setup-checklist',
  type: 'workflow',
  title: 'Claude Code Setup Checklist',
  description:
    'Follow along step-by-step to set up your complete Claude Code workspace — from install to fully configured.',
  icon: '✅',
  iconBg: 'linear-gradient(135deg, #34d399, #2dd4bf)',
  difficulty: 'beginner',
  estimatedTime: '45 min',
  tags: ['claude', 'claude-code', 'setup', 'checklist', 'hands-on'],
  ready: true,
  steps: [
    {
      title: 'Before You Start',
      description:
        "Let's make sure you have everything you need before we dive in. This checklist walks you through the entire Claude Code setup — from a blank computer to a fully configured workspace. **Plan about 45 minutes** from start to finish, though you might move faster once you get rolling.\n\n" +
        "Here's what you need: a computer (Mac, Windows, or Linux all work), an internet connection, and a project idea. The project doesn't need to be fancy — it could be a personal website, a tool you want to build, or even a folder of files you want Claude to help you organize. **Having a real project makes every step feel purposeful** instead of abstract.\n\n" +
        "You do **not** need any coding experience to follow this checklist. Every step tells you exactly what to type and where to type it. If something looks unfamiliar, that's expected — you'll get comfortable with it by doing it.\n\n" +
        "One more thing: keep this checklist open side-by-side with your Terminal (the app where you'll type commands). That way you can read a step, do the thing, check it off, and move on without switching back and forth.",
      checklist: [
        'Confirm you have a computer with internet access',
        'Pick a project or folder you want Claude to help with',
        'Open this checklist in a browser window you can keep visible',
        'Find and open the Terminal app on your computer (on Mac: search "Terminal" in Spotlight)',
      ],
      tip: "If you don't have a project idea yet, create an empty folder on your Desktop called \"my-first-project\" and use that. You can always switch to a real project later — the setup applies to any folder.",
    },
    {
      title: 'Install Claude Code',
      description:
        "Time to install Claude Code on your computer. This happens through the **Terminal** — that black (or white) window where you type text commands. If you've never used it before, don't worry. You're going to type one line, press Enter, and the computer does the rest.\n\n" +
        "First, you need **Node.js** installed. Node.js is a tool that lets your computer run programs like Claude Code. To check if you already have it, type this in your Terminal and press Enter:\n\n" +
        "**node --version**\n\n" +
        'If you see a version number (like v18.0.0 or higher), you\'re good. If you see "command not found," head to **nodejs.org**, download the installer, and run it. Then come back here.\n\n' +
        "Once Node.js is ready, install Claude Code by typing this in your Terminal:\n\n" +
        "**npm install -g @anthropic-ai/claude-code**\n\n" +
        'Press Enter and wait. You\'ll see some text scroll by — that\'s normal. When it finishes and you see your cursor blinking again, the install is done. To verify, type **claude --version** and press Enter. You should see a version number. If you do, you\'re in business.',
      checklist: [
        'Open your Terminal app',
        'Check if Node.js is installed by typing: node --version',
        'If needed, install Node.js from nodejs.org',
        'Install Claude Code by typing: npm install -g @anthropic-ai/claude-code',
        'Verify the install by typing: claude --version',
      ],
      tip: 'If the install command fails with a "permission denied" error, try adding **sudo** in front: **sudo npm install -g @anthropic-ai/claude-code**. It will ask for your computer password — type it in (the characters won\'t show, that\'s normal) and press Enter.',
    },
    {
      title: 'Start Your First Session',
      description:
        "You've installed Claude Code. Now let's actually talk to it.\n\n" +
        "In your Terminal, navigate to your project folder. If your folder is on the Desktop, type:\n\n" +
        '**cd ~/Desktop/my-first-project**\n\n' +
        '(Replace "my-first-project" with your actual folder name.) The **cd** command means "change directory" — it tells the Terminal which folder to work in. Claude Code is aware of the folder you launch it from, so this matters.\n\n' +
        "Now type **claude** and press Enter. That's it — one word. Claude Code starts up, and you'll see a prompt where you can type messages. You're now in a conversation with Claude, and it can see all the files in your project folder.\n\n" +
        'Try saying something like: **"What files are in this folder?"** or **"Help me understand what this project is."** Claude will look around and respond. You\'re having a real conversation — type naturally, like you would in a chat app.\n\n' +
        "When you're done, type **/exit** to leave the Claude Code session and return to your normal Terminal. You can start a new session anytime by typing **claude** again.",
      checklist: [
        'Navigate to your project folder using the cd command',
        'Type "claude" and press Enter to start a session',
        'Ask Claude a question about your folder or project',
        'Read Claude\'s response — you\'re having your first conversation',
        'Type /exit to end the session',
      ],
      tip: 'You can also press **Ctrl+C** to cancel whatever Claude is doing mid-response, or **Escape** to clear what you\'ve typed. These two shortcuts will save you a lot of time.',
    },
    {
      title: 'Create Your CLAUDE.md',
      description:
        "Here's where things get powerful. A **CLAUDE.md** file is a set of permanent instructions that Claude reads every time it starts a session in your project. Think of it like posting house rules on the fridge — anyone who walks in sees them.\n\n" +
        "Start a Claude Code session in your project folder (type **claude** and press Enter). Then tell Claude:\n\n" +
        '**"Create a CLAUDE.md file in this folder with some basic rules for how you should work with me."**\n\n' +
        "Claude will create the file for you. But here's the key: **you should tell Claude your actual preferences.** For example:\n\n" +
        '- "Always explain things in plain English, no jargon"\n' +
        '- "When you write code, add comments explaining what each part does"\n' +
        '- "Ask me before making any changes to existing files"\n' +
        '- "Keep your responses short unless I ask for detail"\n\n' +
        "After Claude creates the file, exit the session (**/exit**) and start a new one (**claude**). Claude will automatically read the CLAUDE.md file. Test it by asking Claude something — you should notice it following your rules. **If it doesn't feel right, edit the file.** The rules are yours to change anytime.",
      checklist: [
        'Start a Claude Code session in your project folder',
        'Ask Claude to create a CLAUDE.md file with your preferences',
        'Tell Claude at least 3 specific rules you want it to follow',
        'Exit the session and start a new one to verify Claude reads the file',
        'Test that Claude follows your rules by asking it a question',
      ],
      tip: 'Start with rules you care about right now and add more later. The CLAUDE.md file grows with you — most people update it every few weeks as they discover new preferences. Three good rules beat twenty vague ones.',
    },
    {
      title: 'Set Up Your Memory',
      description:
        "Your CLAUDE.md file is working, but right now it only has basic preferences. Let's make it smarter by adding **project context** — the background info that helps Claude understand what you're building and how you like to work.\n\n" +
        "Open a Claude Code session and say something like:\n\n" +
        '**"Update CLAUDE.md with more context about this project. This is a [describe your project]. The main technologies are [list what you use]. My priorities are [what matters to you]."**\n\n' +
        "For example: *\"This is a personal portfolio website. It uses HTML and CSS. My priorities are clean design and fast loading times. I prefer minimalist layouts with lots of white space.\"*\n\n" +
        "You can also add **personal working preferences** — things that apply to every project, not this one specifically. These go in a global CLAUDE.md file at **~/.claude/CLAUDE.md** (Claude can create this for you too). Examples:\n\n" +
        '- "I\'m a visual learner — use diagrams and examples when explaining"\n' +
        '- "I work in short bursts — keep tasks focused and achievable in 15 minutes"\n' +
        '- "Check in with me before doing anything destructive like deleting files"\n\n' +
        "The more Claude knows about you and your project, the less you have to repeat yourself. **Every rule you add saves you dozens of future explanations.**",
      checklist: [
        'Add a project description to your CLAUDE.md (what you\'re building, what tools you use)',
        'Add your working style preferences (how you like to receive information)',
        'Ask Claude to create a global CLAUDE.md at ~/.claude/CLAUDE.md for cross-project preferences',
        'Start a fresh session and verify Claude references your project context in its answers',
      ],
      tip: "Think about the last three times you had to correct Claude or re-explain something. Each of those corrections is a rule that belongs in your CLAUDE.md. \"Don't use TypeScript unless I ask\" or \"Always suggest the mobile layout first\" — those specifics prevent repeat frustrations.",
    },
    {
      title: 'Build Your First Command',
      description:
        "A **slash command** is a shortcut you type to run a specific set of instructions. Instead of explaining what you want every time, you type something like **/review** and Claude knows exactly what to do. Think of it like a speed dial button on a phone — one tap, full call.\n\n" +
        "First, let's create the folder where commands live. In your Claude Code session, say:\n\n" +
        '**"Create a .claude/commands folder in this project."**\n\n' +
        "Claude will create the directory for you. Now let's make a command. Tell Claude:\n\n" +
        '**"Create a slash command called \'review\' that reviews the current file for clarity, spelling, and formatting issues. Save it as .claude/commands/review.md."**\n\n' +
        "Claude will create a markdown file (a text file ending in .md) with the instructions for this command. The file name becomes the command name — so **review.md** becomes **/review**.\n\n" +
        "To test it, open any file in your project and type **/review** in your Claude Code session. Claude should analyze the file and give you feedback following the instructions in the command file. **If the output isn't quite right, edit the review.md file** — the instructions are plain English, nothing technical.",
      checklist: [
        'Ask Claude to create the .claude/commands directory in your project',
        'Create your first command file (e.g., review.md) inside that directory',
        'Write clear instructions in the command file for what Claude should do',
        'Test the command by typing /review in a Claude Code session',
        'Adjust the command file if the output needs tweaking',
      ],
      tip: "Good first commands: /review (check a file for issues), /summarize (summarize what you worked on today), /plan (outline next steps for a task). Pick whichever one you'd use the most — you'll build more once you see how fast they are.",
    },
    {
      title: 'Create Your First Skill',
      description:
        "A **skill** is like a command's smarter sibling. While commands need you to type a slash shortcut, skills activate **automatically** when Claude recognizes you're asking for a certain type of help. You write the instructions once, and Claude uses them whenever they're relevant.\n\n" +
        "Skills live in the same **.claude/commands** directory as your commands. The difference is in how the file is written — skills include **trigger phrases** that tell Claude when to activate.\n\n" +
        "In your Claude Code session, say:\n\n" +
        '**"Create a skill file at .claude/commands/explain-code.md. It should activate whenever I say things like \'explain this,\' \'what does this do,\' or \'walk me through this code.\' When triggered, it should explain the code step by step in plain English with no jargon."**\n\n' +
        "Claude will create a SKILL.md-style file with a header section (called **frontmatter** — the stuff between --- lines) that lists the trigger phrases, and a body section with the actual instructions.\n\n" +
        "Test it by opening a file in your project and saying **\"What does this do?\"** in your Claude Code session. Claude should recognize the trigger and use your skill's instructions to explain the code clearly. **The magic here is that you didn't type a command** — Claude figured out what you wanted and activated the right skill on its own.",
      checklist: [
        'Create a skill file in .claude/commands/ with trigger phrases in the frontmatter',
        'Include at least 3-5 different ways someone might request this task',
        'Write clear step-by-step instructions in the body of the skill file',
        'Test the skill by using one of your trigger phrases naturally in conversation',
        'Verify that Claude activates the skill without you typing a slash command',
      ],
      tip: "If your skill doesn't activate, the trigger phrases are probably too narrow. Add more variations — people say the same thing in surprisingly different ways. \"Explain this,\" \"break this down,\" \"help me understand,\" and \"what's happening here\" all mean the same thing but need to be listed separately.",
    },
    {
      title: 'Connect an MCP Server',
      description:
        "An **MCP server** (Model Context Protocol server) gives Claude new abilities beyond reading and writing files. Think of it like installing an app on your phone — each MCP server adds a new superpower. A filesystem MCP lets Claude manage files across your computer. A web search MCP lets Claude look things up online. A database MCP lets Claude query your data.\n\n" +
        "Let's connect one. The easiest to start with is the **filesystem MCP server**, which lets Claude work with files outside your project folder. In your Claude Code session, say:\n\n" +
        '**"Help me set up the filesystem MCP server so you can access files on my Desktop."**\n\n' +
        "Claude will walk you through adding a configuration entry. MCP servers are configured in a settings file — Claude will show you where it lives and what to add. The configuration is a small block of text that tells Claude Code where to find the MCP server and what permissions it has.\n\n" +
        "After adding the configuration, **restart your Claude Code session** (exit and start again). Claude should now be able to access the location you specified. Test it by asking: **\"List the files on my Desktop.\"** If Claude can see them, the MCP server is connected.\n\n" +
        "You can add more MCP servers later as you need them. Each one follows the same pattern: find the server, add its configuration, restart Claude Code.",
      checklist: [
        'Choose an MCP server to start with (filesystem is the easiest)',
        'Ask Claude to help you configure the MCP server',
        'Add the MCP server entry to your settings file',
        'Restart your Claude Code session to load the new server',
        'Test the connection by asking Claude to use the new capability',
      ],
      tip: 'Start with one MCP server and get comfortable before adding more. The filesystem server is the safest starting point because you can control exactly which folders Claude has access to. You can always expand the permissions later.',
    },
    {
      title: 'Set Up Your First Hook',
      description:
        "A **hook** is an automation that runs at a specific moment — like a motion-sensor light that turns on when you walk into a room. You pick the trigger event (\"when this happens\"), and Claude Code runs the action you specify automatically.\n\n" +
        "Hooks can fire at moments like: **before Claude sends a message**, **after Claude changes a file**, or **when a session starts**. The most common first hook is a **notification** — for example, playing a sound or showing an alert when Claude finishes a long task.\n\n" +
        "In your Claude Code session, say:\n\n" +
        '**"Help me set up a hook that runs after you finish editing a file. I want it to show me a summary of what changed."**\n\n' +
        "Claude will help you add a hooks entry to your settings. Hooks are defined in the same settings file where MCP servers live. Each hook has three parts: the **event** (when it triggers), the **command** (what it runs), and optionally a **pattern** (which files or situations it applies to).\n\n" +
        "After adding the hook, test it by asking Claude to make a change to a file in your project. After the edit, your hook should fire and you'll see the summary. **If it doesn't work, double-check that you restarted your session** — hooks, like MCP servers, load when Claude Code starts up.",
      checklist: [
        'Decide what trigger event you want (e.g., after file edit, on session start)',
        'Ask Claude to help you configure a hook in your settings file',
        'Add the hook entry with an event, command, and optional pattern',
        'Restart your Claude Code session to load the hook',
        'Test the hook by triggering the event and watching for the automated action',
      ],
      tip: 'Hooks are powerful but can be noisy if you set too many. Start with one hook on a specific trigger, make sure it works the way you want, and add more gradually. A hook that fires on every file change in a big project will interrupt you constantly.',
    },
    {
      title: 'Final Walkthrough',
      description:
        "You've done it. Let's walk through everything to make sure it all works together as one smooth system.\n\n" +
        "Start a fresh Claude Code session in your project folder. The moment Claude starts, it should read your **CLAUDE.md** file and know your preferences and project context. Ask Claude: **\"What do you know about this project and how I like to work?\"** Claude should reference the rules and context you set up in Steps 4 and 5.\n\n" +
        "Next, test your **command**. Type your slash command (e.g., **/review**) and confirm Claude follows the instructions you wrote. Then test your **skill** — use one of your trigger phrases naturally and check that Claude activates it without you needing a slash command.\n\n" +
        "If you set up an **MCP server**, ask Claude to do something that requires it — like listing files from the folder you gave it access to. And if you configured a **hook**, trigger the event and confirm the automation fires.\n\n" +
        "**Congratulations.** You have a fully configured Claude Code workspace. Your AI assistant knows who you are, what you're building, how you like to work, and has custom tools at its disposal. From here, the path is all about refinement — adding more commands as you discover repeating tasks, updating your CLAUDE.md as your project evolves, and connecting more MCP servers as you need new capabilities.",
      checklist: [
        'Start a fresh session and verify Claude reads your CLAUDE.md automatically',
        'Test your slash command and confirm it produces the right output',
        'Test your skill by using a trigger phrase in natural conversation',
        'Verify your MCP server connection by asking Claude to use it',
        'Verify your hook fires when the trigger event happens',
      ],
      tip: "Take a screenshot of your working setup or write a quick note about what you configured. Future-you will thank past-you when you set up your next project — you'll have a reference for what worked. And remember: every expert started with exactly the checklist you completed today.",
    },
  ],
}
