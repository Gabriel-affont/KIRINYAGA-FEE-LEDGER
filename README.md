# Kirinyaga Fee Ledger
https://gabriel-affont.github.io/KIRINYAGA-FEE-LEDGER/ to see the page

A small calculator that answers one question: **exactly how much household
fee do I need to pay right now?**

Under the HEF band system, government scholarship and HELB loan funding is
sometimes delayed, and the university asks students to cover 60% of their
household tuition share upfront. Most students only find out what that
figure is by asking around or visiting the bursar — this tool computes it
directly from the published fee structure and band circular.

**This is a student-built, unofficial tool.** It is not run by the
university. Always confirm the figure that determines what you actually pay
against your own fee statement or the bursar's office.

## How it works

- Pick your programme and year of study.
- Enter your household's monthly income (auto-detects your band) or select
  your band directly if you already know it.
- See the full breakdown: government scholarship, HELB loan, your
  household's tuition share, and the 60% currently due.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying to GitHub Pages

```bash
npm run build
```

This produces a static site in `out/`. Push that folder to a `gh-pages`
branch (or point GitHub Pages at `out/` via GitHub Actions) and it's live —
no server or database required.

## Adding your own faculty's fee structure

Only one faculty's fee structure is in here right now (Bachelor of
Technology programmes). If you have your faculty's fee structure, you can
add it in about two minutes — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Project structure

```
data/
  bands.json              — the HEF band table (income ranges, percentages, upkeep)
  faculties/*.json        — one file per faculty/programme group's fee structure
lib/
  calculate.ts            — all the fee math, in one place
  types.ts                — shared TypeScript types
components/
  FeeCalculator.tsx       — the interactive form + results
app/
  page.tsx                — loads the data and renders the page
```

If the university changes the 60% rule, that's a single constant in
`lib/calculate.ts` (`HOUSEHOLD_PORTION_DUE_NOW`).

