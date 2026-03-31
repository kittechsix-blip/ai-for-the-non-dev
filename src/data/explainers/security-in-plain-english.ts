import type { Explainer } from '../types'

export const securityInPlainEnglish: Explainer = {
  id: 'security-in-plain-english',
  type: 'explainer',
  title: 'Security in Plain English',
  description: 'The 9 security checks every vibe coder needs — explained with zero jargon.',
  icon: '🔐',
  iconBg: 'linear-gradient(135deg, #ef4444, #f97316)',
  difficulty: 'beginner',
  estimatedTime: '8 min',
  tags: ['security', 'beginner', 'supabase', 'vibe-coding', 'explainer'],
  ready: true,
  sections: [
    {
      type: 'callout',
      title: 'Why This Matters (Even for You)',
      content:
        'You built an app with AI. Congrats — that\'s a real achievement. But right now, your app might be as secure as a house with no locks. The front door is open, the windows are up, and the alarm isn\'t plugged in.\n\n' +
        'This isn\'t about paranoia. It\'s about the same common sense you already use in real life. You lock your car. You don\'t leave your wallet on a park bench. You don\'t hand your house key to a stranger.\n\n' +
        'Your app deserves the same treatment. The good news? There are only **9 things** to check. That\'s it. Nine locks to install, and your app goes from wide-open to well-protected.',
    },
    {
      type: 'analogy',
      title: 'The House Analogy',
      content:
        'Think of your app as a house you built.\n\n' +
        '**The database** is your filing cabinet — it holds everything important.\n' +
        '**API keys** are your house keys — they unlock access to your services.\n' +
        '**Users** are visitors — most are friendly, but you still lock the door.\n' +
        '**Hackers** are burglars — they look for unlocked doors and open windows.\n' +
        '**Security headers** are your guest list — they control who gets in and from where.\n' +
        '**Error messages** are your alarm — a bad one tells burglars exactly where the valuables are.\n\n' +
        'Every check in this guide is one of those protections. Nine locks. Nine checks. One secure house.',
    },
    {
      type: 'explanation',
      title: 'The 9 Locks — Quick Overview',
      content:
        '**1. Row Level Security (RLS)** — Lock your filing cabinets. Control who can read, write, and delete data in your database. Like a library: everyone can read the books, but only the librarian can add or remove them.\n\n' +
        '**2. Auth Flow Testing** — Give your login a poker face. Make sure your login page doesn\'t accidentally reveal which emails are real. Like a bouncer who says "you\'re not on the list" to everyone — no hints. <em>(Only if your app has a login.)</em>\n\n' +
        '**3. Rate Limiting** — Put a speed bump on your driveway. Stop bots from hammering your app with thousands of requests per second. Like Costco\'s "one sample per customer" rule.\n\n' +
        '**4. Input Sanitization** — Scan every package at the door. Check everything a user types before your app does anything with it. Like airport security: every bag gets scanned, no exceptions.\n\n' +
        '**5. Environment Variables** — Don\'t tape your keys to the front door. Keep your API keys and passwords out of your code repository. Like a hotel keycard with no room number printed on it.\n\n' +
        '**6. CAPTCHA** — Prove you\'re human. Add a checkpoint on public forms so bots can\'t spam them. Like a revolving door that stops stampedes. <em>(Only if your app has forms.)</em>\n\n' +
        '**7. Security Headers (CSP)** — Set up a guest list. Tell your app exactly which outside sources it\'s allowed to talk to, and block everything else. Like a gated community guard who only lets in approved visitors.\n\n' +
        '**8. Error Handling** — Keep your alarm quiet. Make sure error messages don\'t leak database names, file paths, or code to users. Like a doctor\'s receptionist who says "the doctor is running behind" — not what\'s happening in Room 3.\n\n' +
        '**9. Dependency Scanning** — Check the ingredients list. Run `npm audit` to find known vulnerabilities in your packages. Like checking grocery recall notices before eating something that looks fine.',
    },
    {
      type: 'example',
      title: 'What a Breach Looks Like',
      content:
        'Here\'s a story that happens more often than you\'d think:\n\n' +
        'A vibe coder named Alex built a recipe-sharing app with Claude. It used Supabase for the database and was deployed on Vercel. Alex was proud — the app looked great and worked perfectly.\n\n' +
        'But Alex didn\'t know about `.gitignore`. The `.env` file — containing the Supabase service key — got pushed to GitHub as part of a routine commit.\n\n' +
        '**Within 4 hours**, a bot scanning GitHub for exposed keys found it. Someone used the service key to connect directly to the database. They deleted every row in every table. The app showed blank pages. User-submitted recipes — gone. Profile data — gone.\n\n' +
        'Alex hadn\'t enabled Row Level Security either, so even the anonymous API key could write and delete data. Two unlocked doors, and both got walked through.\n\n' +
        'The fix would have taken 10 minutes: add `.env` to `.gitignore`, enable RLS, create read-only policies. Ten minutes of prevention vs. hours of damage and no way to recover the data.',
    },
    {
      type: 'callout',
      title: 'The Good News',
      content:
        'You don\'t have to do this manually every time. There\'s a Claude skill called **security-audit** that checks all 9 things automatically. You tell Claude "run a security audit" and it scans your entire codebase, grades each check (PASS, FAIL, WARN, or N/A), and tells you exactly what to fix.\n\n' +
        'The **"Lock It Down"** workflow on this platform walks you through each check step by step — and the final step shows you how to install the skill so you never have to think about this checklist again.\n\n' +
        'Nine checks. One skill. And your app goes from vulnerable to hardened.',
    },
  ],
}
