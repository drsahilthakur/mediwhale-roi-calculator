# Mediwhale ROI Calculator

A self-contained webpage that helps clinics estimate how many retinal scans per
month they need to cover the cost of a retinal camera plus Mediwhale AI screening
software — with revenue projections, break-even analysis, a specialist-review
cost model, and one-click PDF export.

Everything lives in a single file, [`index.html`](index.html) — no build step, no
dependencies, no external assets. The Mediwhale logos are embedded as data URIs.

- **Live site:** https://mediwhale.netlify.app/ (auto-deploys from this repo's `main`)
- **How-to guide:** [`guide.html`](guide.html) → https://mediwhale.netlify.app/guide.html

## Files

| File | Purpose |
|------|---------|
| `index.html` | The calculator (self-contained: HTML + CSS + JS, logos as data URIs) |
| `guide.html` | One-page how-to infographic, linked from the calculator |
| `og-image.png` | 1200×630 social-preview image referenced by the Open Graph tags |
| `netlify.toml` | Netlify config (no build; publish root `.`) |

## Edit &amp; ship a change

```bash
# edit index.html (or guide.html), then:
git add -A
git commit -m "describe the change"
git push           # Netlify redeploys within seconds
```

## How it works (so anyone can continue it)

- **Model:** all maths runs internally in USD; the chosen currency only converts
  the display at a user-editable FX rate. The core `compute()` function in
  `index.html` derives break-even, margin, payback, ROI, capacity, downstream
  value and clinical impact from the input `state` object. Inputs are defined in
  the `DEFAULTS`, `CHIP_DEFS`, `SLIDERS` and `NUM_FIELDS` tables near the top of
  the `<script>`.
- **Save/share:** the full input `state` is encoded into the URL hash (`#s=…`)
  and `localStorage` so links reopen the exact scenario.
- **Brand assets** (logos) live outside the repo at
  `D:\Claude Cowork\Templates\Brand-Assets`; `og-image.png` was generated from
  the white horizontal logo.
- **High-risk default** of ~25% references Lee et al., *JAMIA* 2024;31(1):130.
- **Gotcha:** `var()` inside a stylesheet `linear-gradient` computed to `none` in
  testing — the CTA gradient uses literal hex, not CSS variables.

## Run it locally

Open `index.html` in any browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on Netlify (continuous deploy from GitHub)

1. Push this folder to a GitHub repository (see below).
2. In Netlify: **Add new site → Import an existing project → GitHub**, and pick
   this repo.
3. Leave **Build command** empty and set **Publish directory** to `.` (the
   included `netlify.toml` already does this). Click **Deploy**.
4. Every `git push` to the default branch redeploys automatically.

## License / usage

Internal planning tool. Figures are estimates, not a quote or financial advice.
