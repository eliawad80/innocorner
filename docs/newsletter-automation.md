# Newsletter automation plan

This is the recommended workflow for turning articles received by email into a reviewed InnoCorner newsletter and public insights posts.

## Recommended setup

1. Create a dedicated inbox such as `news@innocorner.com`.
2. Use Make or self-hosted n8n to watch the inbox.
3. Save each approved source email into Supabase with title, link, sender, date, topic, and original excerpt.
4. Summarize each article into key points, business impact, risk, and suggested action.
5. Rewrite the weekly digest in InnoCorner's voice with attribution to the original sources.
6. Send the draft to `elias.awad80@gmail.com` for approval.
7. After approval, publish the newsletter to subscribers and create/update an article on `insights.html`.

## Publishing model

The public Insights page should show only the finished newsletter archive:

- newsletter title
- sent date
- short topic label
- expandable or linked newsletter details

The collection, summarization, rewriting, and approval mechanism is internal and should not be described on the public
website.

## Email sending identity

Use a domain mailbox such as `noreply@innocorner.com` for sending newsletters, with replies directed to
`info@innocorner.com`. Before sending bulk email, configure SPF, DKIM, and DMARC for `innocorner.com` in your domain DNS
through the newsletter provider.

See `docs/newsletter-sending-setup.md` for the OVH MX Plan and sender authentication runbook.

## Important rule

Keep a human approval step before publishing. Automated summaries can miss nuance, source restrictions, or legal context.

## Approval workflow

Weekly draft approvals go to `elias.awad80@gmail.com`.

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
2. Send the approved edition to subscribers from `noreply@innocorner.com`.
3. Keep a record of the approval email, sent date, subject, source email IDs, and published edition title.

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

## First production version

Start with a weekly workflow:

- Collect all emails tagged `newsletter`.
- Generate one draft digest every Friday.
- Email the draft to `elias.awad80@gmail.com`.
- Publish only after manual approval.
