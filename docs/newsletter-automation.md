# Newsletter automation plan

This is the recommended workflow for turning articles received by email into a reviewed InnoCorner newsletter and public insights posts.

## Recommended setup

1. Create a dedicated inbox such as `news@innocorner.com`.
2. Use Make or self-hosted n8n to watch the inbox.
3. Save each approved source email into Supabase with title, link, sender, date, topic, and original excerpt.
4. Summarize each article into key points, business impact, risk, and suggested action.
5. Rewrite the weekly digest in InnoCorner's voice with attribution to the original sources.
6. Send the draft to `info@innocorner.com` for approval.
7. After approval, publish the newsletter to subscribers and create/update an article on `insights.html`.

## Publishing model

The public Insights page should show only the finished newsletter archive:

- newsletter title
- sent date
- short topic label
- a one- or two-line summary
- a link to the dedicated article page

The collection, summarization, rewriting, and approval mechanism is internal and should not be described on the public
website.

## Editorial standard

Every approved edition should read like a professional InnoCorner publication, not an automation transcript.

- Never mention private workflow details such as how many emails were collected, who forwarded them, labels, approval
  messages, source email IDs, draft mechanics, or internal tooling.
- Rewrite the source material in InnoCorner's voice: strategic, practical, calm, and useful for business leaders.
- Keep the depth close to the original material while concentrating it into a clear briefing. Avoid thin summaries.
- Group related stories into business themes, explain why they matter, and add practical next steps.
- Include a short "Resources mentioned" section only on the public article page when useful, with clean source links or
  source names.
- Do not include source/resource links in subscriber emails or approval emails. The email should be a professional
  InnoCorner briefing and link readers to the public article for any external resources.
- Add relevant images only when rights, source stability, and visual quality are acceptable. Do not hotlink private email
  images, tracking pixels, or copyrighted images unless the source clearly allows it.
- Public archive rows should stay brief: title, sent/published date, topic labels, and one or two lines maximum.
- The full edition belongs on a dedicated article page linked from the archive.

## Email sending identity

Use a domain mailbox such as `newsletter@innocorner.com` for sending newsletters, with replies directed to
`info@innocorner.com`. Before sending bulk email, configure SPF, DKIM, and DMARC for `innocorner.com` in your domain DNS
through the newsletter provider.

See `docs/newsletter-sending-setup.md` for the OVH MX Plan and sender authentication runbook.

## Important rule

Keep a human approval step before publishing. Automated summaries can miss nuance, source restrictions, or legal context.

## Approval workflow

Weekly draft approvals go to `info@innocorner.com`.

Use a unique approval code in the subject:

```txt
Newsletter Draft Approval - YYYY-MM-DD
```

The approval reply must contain the exact approval phrase:

```txt
APPROVED YYYY-MM-DD
```

If the reply contains edits, questions, partial approval, or any other text without the exact approval phrase, the
newsletter stays in draft mode.

After approval:

1. Publish the approved edition to the public Insights archive.
2. Send the approved edition to subscribers from `newsletter@innocorner.com`.
3. Keep private records of approval, sent date, subject, source email IDs, and published edition title outside the public
   website and subscriber email.

## Possible tools

- Gmail or Outlook mailbox for collection.
- Make for fast no-code automation.
- Self-hosted n8n for more control and sensitive workflows.
- Supabase for subscribers, article drafts, approval status, and published posts.
- Brevo, Mailchimp, Buttondown, or a similar email service for subscriber delivery.

## Supabase tables

The migration in `supabase/migrations/20260501190000_newsletter_insights.sql` creates:

- `newsletter_subscribers` for website signups.
- `insight_articles` for drafted and published article/news posts.
- `newsletter_editions` for combined digest drafts and sent editions.

Active Supabase project:

```txt
evhvmngwtruzdsfgcmii
https://evhvmngwtruzdsfgcmii.supabase.co
```

The public website newsletter form writes new subscribers into `newsletter_subscribers` with `status = 'pending'` and
`source = 'website'`. Subscriber delivery through Brevo uses server-side contact/list synchronization because Brevo keys
must not be exposed in browser JavaScript. The GitHub Actions workflow `Sync Brevo Subscribers` reads this Supabase table
with `SUPABASE_SERVICE_ROLE_KEY`, creates/updates Brevo contacts with `BREVO_API_KEY`, and attaches them to
`BREVO_LIST_ID`.

## First production version

Start with a weekly workflow:

- Collect all emails tagged `newsletter`.
- Generate one draft digest every Friday.
- Email the draft to `info@innocorner.com`.
- Publish only after manual approval.

## Portable execution

The workflow should run outside the laptop. The recommended portable runner is GitHub Actions:

- Weekly collection job: every Friday at 14:00 UTC.
- Approval checker: every 30 minutes.
- Secrets stored in GitHub Actions, not in source files.
- Website publishing happens through commits to the repo after approval.

Current workflow file:

```txt
.github/workflows/newsletter-automation.yml
```

Required secrets before full automation can run:

- `BREVO_API_KEY`
- `BREVO_LIST_ID`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`

Until Gmail OAuth secrets are added, the workflow exits safely without reading emails, sending newsletters, or changing
the website.

The current ChatGPT/Codex Gmail connector works for interactive work in this conversation, but a scheduled GitHub job
needs its own Gmail OAuth credentials because it runs independently from the desktop session.
