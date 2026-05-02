# Newsletter automation plan

This is the recommended workflow for turning articles received by email into a reviewed InnoCorner newsletter and public insights posts.

## Recommended setup

1. Create a dedicated inbox such as `news@innocorner.com`.
2. Use Make or self-hosted n8n to watch the inbox.
3. Save each approved source email into Supabase with title, link, sender, date, topic, and original excerpt.
4. Summarize each article into key points, business impact, risk, and suggested action.
5. Rewrite the weekly digest in InnoCorner's voice with attribution to the original sources.
6. Send the draft to `info@innocorner.com` for approval.
7. On the next approval check after the exact approval phrase is received, publish the newsletter to subscribers and
   create/update an article on `insights.html` automatically.

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
- Keep the depth close to the original material while concentrating it into a clear briefing. Avoid thin summaries. Do
  not drop important details, caveats, figures, names, examples, or practical implications from the articles.
- Group related stories into business themes, explain why they matter, and add practical next steps.
- Include a short "Resources mentioned" section only on the public article page when useful, with clean source links or
  source names.
- Subscriber emails and approval emails may include useful links that were mentioned inside the articles or are needed
  for context. Do not include links that reveal the source newsletter, forwarded email, tracking URL, "view in browser"
  URL, unsubscribe URL, or the origin of where InnoCorner collected the news.
- The email should be a professional InnoCorner briefing, with enough detail to stand on its own. The website article can
  hold the fuller archive version and resource section.
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

The active Codex heartbeat checks the approval inbox repeatedly. Once it sees the exact approval phrase for an
unpublished edition, it should continue without another manual instruction: create the dedicated article page, update the
archive row, commit and push the site, and trigger the Brevo send workflow for list ID 2. It must check for an existing
published article or sent campaign first so the same approval cannot create duplicate publications or duplicate emails.

## Possible tools

- Gmail or Outlook mailbox for collection.
- Make for fast no-code automation.
- Self-hosted n8n for more control and sensitive workflows.
- Supabase for future article drafts, approval status, and published posts if the workflow becomes database-backed.
- Brevo, Mailchimp, Buttondown, or a similar email service for subscriber delivery.

## Subscriber capture

The public website uses Brevo's embedded subscription form. Visitors subscribe directly into the Brevo audience/list,
which avoids a custom website database sync for the first production version.

Custom welcome page:

```txt
https://innocorner.com/newsletter-thank-you.html
```

Use that URL in Brevo as the success page or post-confirmation redirect where available.

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
- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`

Until Gmail OAuth secrets are added, the workflow exits safely without reading emails, sending newsletters, or changing
the website.

The current ChatGPT/Codex Gmail connector works for interactive work in this conversation, but a scheduled GitHub job
needs its own Gmail OAuth credentials because it runs independently from the desktop session.
