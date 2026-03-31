import type { Workflow } from '../types'

export const lockItDown: Workflow = {
  id: 'lock-it-down',
  type: 'workflow',
  title: 'Lock It Down',
  description:
    'The 9-step security checklist for vibe coders — no jargon, no code degree needed.',
  icon: '🛡️',
  iconBg: 'linear-gradient(135deg, #ef4444, #7c3aed)',
  difficulty: 'beginner',
  estimatedTime: '30 min',
  tags: [
    'security',
    'supabase',
    'beginner',
    'vibe-coding',
    'checklist',
    'automation',
  ],
  ready: true,
  steps: [
    {
      title: "Why Security Isn't Optional",
      description:
        'You used AI to build something real. Maybe it talks to a database. Maybe it has an API. Maybe it\'s live on the internet right now. That\'s amazing — but it also means strangers can poke at it.\n\n' +
        "This isn't about being paranoid. It's about the same common sense you use in real life. You lock your car. You don't leave your wallet on a park bench. You don't give your house key to a stranger.\n\n" +
        "Your app deserves the same treatment. Over the next 9 steps, you're going to walk through a checklist that professional developers use before shipping anything. The difference? We're going to explain every single step in plain English, with zero jargon.",
      checklist: [
        "Understand that security isn't about *if* someone tries to break in — it's about *when*",
        '"AI built it for me" doesn\'t mean it\'s automatically safe',
        'Commit to spending 30 minutes making your app dramatically safer',
      ],
      tip: "You don't need to be a security expert to do this. You need to check 9 boxes. That's it. Think of it like a fire safety inspection — you're not a firefighter, but you can check that the smoke detectors work.",
    },
    {
      title: 'Lock Your Filing Cabinets (RLS)',
      description:
        "Your database holds everything — user data, content, settings. By default, Supabase lets anyone with your API URL read AND write to every table. That's like having a filing cabinet in a public building with all the drawers open.\n\n" +
        "**Row Level Security (RLS)** puts locks on each drawer. You decide who can open what. For most vibe-coded apps, the rule is: visitors can *look* at things, but they can't *add, change, or delete* anything.\n\n" +
        'Here\'s what "enabling RLS" means in plain English: you\'re telling your database "don\'t let anyone do anything unless I\'ve written a specific rule that says they can." It flips the default from "everything is allowed" to "nothing is allowed unless you say so."\n\n' +
        'If your app uses Supabase, ask Claude: **"Enable RLS on all my tables and create read-only policies for the anon role. Add explicit deny policies for INSERT, UPDATE, and DELETE."**\n\n' +
        'If you\'re not using Supabase, ask Claude: **"What database access controls does my project need?"**',
      checklist: [
        'Know what RLS stands for and what it does (locks your database drawers)',
        'Check if your project uses Supabase (look for a `supabase` folder or `@supabase/supabase-js` in package.json)',
        'Ask Claude to enable RLS or confirm it\'s already on',
      ],
      tip: "You can check if RLS is already enabled by going to your Supabase dashboard → Table Editor → click any table → look for \"RLS Enabled\" badge. If it says \"RLS Disabled\" in red, that table is wide open.",
    },
    {
      title: 'Give Your Login a Poker Face (Auth)',
      description:
        "If your app has a login page, it needs a poker face. Here's why:\n\n" +
        'When someone types a wrong email, what does your app say? If it says "No account found with that email" — you\'ve told a hacker that a *different* email they try might work. If it says "Wrong password" — you\'ve confirmed the email exists and now they only need to guess the password.\n\n' +
        'The fix is to always say the same thing: **"Invalid credentials."** Same message whether the email is wrong, the password is wrong, or the account doesn\'t exist. Same poker face, every time.\n\n' +
        "**Does your app have a login?** If not, check \"N/A\" below and move on. Not every app needs auth, and pretending yours does when it doesn't is a waste of time.",
      checklist: [
        'Determine if your app has login/signup functionality',
        "If yes: check that error messages don't reveal whether an email exists",
        'If no: mark this step as N/A — no auth means no auth to test',
      ],
      tip: 'Test this yourself. Go to your login page, type a fake email, and see what the error says. If it says anything other than a generic message, ask Claude to fix the error handling.',
    },
    {
      title: 'Put a Speed Bump on Your Driveway (Rate Limits)',
      description:
        'Without rate limiting, someone (or a bot) can hit your app thousands of times per second. That could crash your app, drain your Supabase quota, or run up your API bill overnight.\n\n' +
        'A **rate limiter** is a speed bump. It says: "You can make 60 requests per minute. After that, slow down." It doesn\'t block legitimate users — it blocks abuse.\n\n' +
        'Ask Claude: **"Add a client-side rate limiter to my API calls. Use a sliding window of 60 requests per 60 seconds."**\n\n' +
        'For extra protection, check if your hosting provider (Vercel, Netlify, Cloudflare) has built-in rate limiting you can turn on in settings.',
      checklist: [
        'Understand that rate limiting prevents bots from hammering your app',
        'Ask Claude to add a rate limiter to your API client',
        'Check your hosting provider for additional rate limiting options',
      ],
      tip: "60 requests per minute is a good starting point for most apps. A real human browsing your app might make 5-10 requests per minute. 60 gives plenty of room while still catching bots.",
    },
    {
      title: 'Scan Every Package at the Door (Input Validation)',
      description:
        "Every time a user types something into your app — a search bar, a form field, a URL — you need to check it before your app does anything with it. Why? Because a malicious user could type code instead of text, and if your app runs that code, they've hijacked it.\n\n" +
        "This is called **XSS (cross-site scripting)** — but forget the name. The analogy is airport security: every bag gets scanned regardless of who's carrying it. Your app needs to scan every input regardless of who's typing.\n\n" +
        'What "scanning" means in practice:\n' +
        '• **Strip HTML tags** from text inputs (so someone can\'t inject a `<script>` tag)\n' +
        '• **Remove weird characters** like null bytes that can confuse your database\n' +
        '• **Validate types** — if a field expects a number, reject letters\n\n' +
        'Ask Claude: **"Create an input sanitization utility for my app. It should sanitize search text, validate numeric inputs, escape HTML, and validate table names."**',
      checklist: [
        'Understand that user input should never be trusted — always check it',
        'Ask Claude to create a sanitization utility for your project',
        'Verify your search bar and any form fields use the sanitization functions',
      ],
      tip: 'Even if your app is read-only, your search bar is an input. If someone types `<script>alert(\'hacked\')</script>` into your search and your app renders it as HTML, they\'ve injected code into your page. Sanitize everything.',
    },
    {
      title: "Don't Tape Your Keys to the Door (Env Vars)",
      description:
        'Your app has secret passwords — API keys, database credentials, service tokens. These live in a file called `.env` (short for "environment variables"). Here\'s the critical rule:\n\n' +
        '**Your `.env` file should NEVER be uploaded to GitHub.**\n\n' +
        "If it is, anyone on the internet can see your passwords. Bots constantly scan GitHub for leaked keys — and they can find yours within minutes of you pushing it.\n\n" +
        'The fix has three parts:\n' +
        '1. **Tell git to ignore it.** Add `.env` and `.env.*` to your `.gitignore` file.\n' +
        '2. **Create a safe template.** Make a file called `.env.example` that shows what keys your app needs without including the actual values.\n' +
        '3. **Check your history.** Even if `.env` is ignored now, it might have been committed in the past. Ask Claude to check.\n\n' +
        'Ask Claude: **"Update my .gitignore to exclude all .env files. Create a .env.example template. Check if any secrets were ever committed to git history."**',
      checklist: [
        'Verify `.env` is listed in your `.gitignore` file',
        'Create a `.env.example` file with placeholder values',
        'Ask Claude to check git history for any accidentally committed secrets',
      ],
      tip: "If you find secrets in your git history, don't panic — but do rotate them (create new ones and delete the old ones). The old keys are compromised even if you delete the file, because git remembers everything.",
    },
    {
      title: 'Prove You\'re Human (CAPTCHA)',
      description:
        "If your app has a contact form, signup form, or any place where visitors can submit information, bots will find it and spam it. A **CAPTCHA** is a checkpoint that makes bots fail while humans pass through.\n\n" +
        "You've seen these before — the \"I'm not a robot\" checkbox, or picking which images have traffic lights. Behind the scenes, a CAPTCHA generates a token that your server verifies. If the token is valid, the submission goes through. If not, it's blocked.\n\n" +
        "**Cloudflare Turnstile** is the recommended option — it's free, privacy-friendly, and usually invisible (no annoying image puzzles).\n\n" +
        "**Does your app have public forms?** If it's read-only with no forms, check \"N/A\" below and move on.",
      checklist: [
        'Determine if your app has any public-facing forms',
        'If yes: ask Claude to add Cloudflare Turnstile or reCAPTCHA to your forms',
        'If no: mark this step as N/A — no forms means no spam risk from this vector',
      ],
      tip: "Cloudflare Turnstile is free and usually invisible — users won't even see a challenge. Google reCAPTCHA v3 works similarly. Both need a server-side token check to be effective — a client-side-only CAPTCHA can be bypassed.",
    },
    {
      title: 'Set Up Your Guest List (Security Headers)',
      description:
        "Your app talks to the outside world — it loads scripts, connects to APIs, and serves pages in browsers. **Security headers** are rules you set that control exactly what your app is allowed to do and what other websites are allowed to do with your app.\n\n" +
        "The most important one is **CSP (Content Security Policy)**. It's a guest list. You tell your app: \"You can load scripts from yourself and your API. That's it. Everything else is denied.\" This prevents hackers from injecting a rogue script that steals data.\n\n" +
        'Other important headers:\n' +
        '• **X-Frame-Options: DENY** — Prevents other websites from embedding your app in a frame (stops clickjacking attacks)\n' +
        '• **X-Content-Type-Options: nosniff** — Prevents browsers from guessing file types (stops a sneaky attack vector)\n' +
        '• **Referrer-Policy** — Controls what information is sent when someone clicks a link on your page\n\n' +
        'Ask Claude: **"Add Content Security Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers to my app\'s HTML."**',
      checklist: [
        'Understand that security headers are a guest list for what your app can load',
        'Ask Claude to add CSP and security headers to your HTML or server config',
        'Verify that `unsafe-eval` is NOT in your CSP (that would defeat the purpose)',
      ],
      tip: 'If your app loads fonts from Google or scripts from a CDN, you\'ll need to include those domains in your CSP. Ask Claude: "What domains should I allowlist in my CSP based on my app\'s current dependencies?"',
    },
    {
      title: 'Keep Your Alarm Quiet (Error Handling)',
      description:
        'When something goes wrong in your app, what does the user see? If they see a raw error message like `Error: relation "users" does not exist at character 15` — you\'ve told a hacker exactly how your database is structured.\n\n' +
        'Good error handling follows one rule: **tell the user what happened in plain English, but keep the technical details to yourself.**\n\n' +
        'What the user should see: "Something went wrong. Please try again."\n' +
        'What the developer console should see: the full error with details.\n' +
        'What the user should NEVER see: database table names, SQL queries, file paths, or stack traces.\n\n' +
        'Ask Claude: **"Create a safe error handler for my app that maps HTTP status codes to user-friendly messages. Never expose database details, table names, or stack traces to the user."**',
      checklist: [
        "Understand that error messages can accidentally leak your app's internals",
        'Ask Claude to create a safe error mapping function',
        'Test by intentionally breaking something and checking what the user sees',
      ],
      tip: "Break your app on purpose (try an invalid URL, disconnect your internet, search for something weird) and look at what the error message says. If you see any database names, file paths, or code — that's a leak.",
    },
    {
      title: 'Check the Ingredients (Dependencies)',
      description:
        "Your app is built with dozens (sometimes hundreds) of packages written by other people. Most of them are great. But occasionally, one gets flagged with a known vulnerability — like a food recall notice.\n\n" +
        'The command **`npm audit`** checks all your packages against a database of known security issues and tells you what\'s wrong and how to fix it.\n\n' +
        'Run this in your terminal: `npm audit`\n\n' +
        'If it finds issues, try: `npm audit fix`\n\n' +
        'If it finds something it can\'t auto-fix, ask Claude: **"I ran npm audit and it found vulnerabilities. Here\'s the output — what should I do?"**\n\n' +
        "Also be cautious about *when* you update. If there's a known supply chain attack on a specific package, it's better to wait than to blindly run `npm update`.",
      checklist: [
        'Run `npm audit` in your project directory',
        'Fix what you can with `npm audit fix`',
        "Ask Claude about anything that can't be auto-fixed",
      ],
      tip: 'Make this a habit. Run `npm audit` before every major push. It takes 5 seconds and might save you from shipping a known vulnerability.',
    },
    {
      title: 'Install Your Security Guard (The Skill)',
      description:
        "You've walked through all 9 checks. You understand what they are, why they matter, and how to fix them. But here's the real power move: **you never have to do this manually again.**\n\n" +
        'The **security-audit** skill is a reusable Claude instruction that checks all 9 things automatically. When you install it, you can tell Claude "run a security audit on this project" and it will scan your entire codebase, grade each check (PASS / FAIL / WARN / N/A), and tell you exactly what to fix.\n\n' +
        '**To install it:**\n\n' +
        '1. Copy the security-audit folder into your Claude Code skills directory:\n' +
        '`cp -r security-audit ~/.claude/skills/security-audit`\n\n' +
        "2. That's it. Now in any project, tell Claude: **\"Run a security audit.\"**\n\n" +
        '**To make it automatic (optional):**\n\n' +
        'You can set up a git hook that runs the audit before every push:\n' +
        '`bash ~/.claude/skills/security-audit/scripts/install-hook.sh ~/path/to/your/project`\n\n' +
        'This means you cannot push insecure code to GitHub without seeing the report first.\n\n' +
        "**Don't have Claude Code yet?** No worries — you can still run through the 9 checks manually anytime. This workflow is your reference guide whether you automate it or not.",
      checklist: [
        'Copy the security-audit skill to your Claude skills directory',
        'Run it on your current project by telling Claude "run a security audit"',
        '(Optional) Install the pre-push hook to automate it',
      ],
      tip: 'Run the audit on your main project right now. Seeing a real report on your own code — with your own file paths and grades — is the single best way to internalize everything you learned in this workflow.',
    },
  ],
}
