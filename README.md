# Ads Risk Check

Free educational scorecard. Paste a Google Ads or Meta Ads suspension or policy notice and get a **HIGH / MED / LOW** card with plain-language reasons and a next-step checklist.

The score is a **heuristic**. It matches a fixed list of phrases in the browser. It is not a model of Google or Meta, and it is **not a guarantee** that any account will be reinstated.

**Not legal advice. Educational only. We do not appeal accounts for you.**

## What it does

- **Home (`/`)**: paste notice text, or load a fictional sample, and get a screenshot-friendly risk card. Scoring stays on the device. The notice is not uploaded.
- **Quiz (`/quiz`)**: five questions about what the notice said and what you did next. You get a shareable archetype. It is a sketch of your answers, not a lookup of an ads account.
- **Digest (`/digest`)**: an email field. If `DIGEST_WEBHOOK_URL` is an `https` URL, the server forwards `{ email, source, receivedAt }` and keeps no copy. If it is unset, the server stores nothing and the page says the address was saved in this browser only.
- **Disclaimer**: sticky on every page, plus `/legal/disclaimer`.

There is no login, no database, and no payment. A dashed “your ad here” box is an unsold sponsorship slot.

## How to run

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

`npm test` runs unit tests for the scorer, the quiz tallies, and the digest plan (local vs https webhook).

## Vercel Hobby

Import this GitHub repo into Vercel. Framework preset: **Next.js**. No database, no blob store, and no environment variables are required for the checker.

Hobby is enough: the scorecard is client-side, and the only server route is `POST /api/digest`.

Optional settings:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DIGEST_WEBHOOK_URL` | No | `https` endpoint that receives digest JSON. Must be https. Unset means the server stores nothing. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for metadata. On Vercel, the deployment host is used when this is empty. |

Copy `.env.example` for local names. Do not add Stripe, a wallet, or a “we reinstate accounts” checkout. This version does not sell appeals.

## Disclaimer

Ads Risk Check is not a law firm and not a Google or Meta partner. The card can miss a policy or match a word used in passing. Read the notice yourself and use the platform’s own appeal form if you appeal. See `/legal/disclaimer`.
