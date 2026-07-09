# Mediwhale ROI Calculator

A self-contained webpage that helps clinics estimate how many retinal scans per
month they need to cover the cost of a retinal camera plus Mediwhale AI screening
software — with revenue projections, break-even analysis, a specialist-review
cost model, and one-click PDF export.

Everything lives in a single file, [`index.html`](index.html) — no build step, no
dependencies, no external assets. The Mediwhale logos are embedded as data URIs.

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
