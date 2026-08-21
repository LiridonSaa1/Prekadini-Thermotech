# Project notes

## Run locally on Replit

The project is a static HTML/CSS/JavaScript site. Its Replit workflow runs:

```text
node server.mjs
```

The server listens on port `5000` and serves `index.html`, `admin.html`, and the
project assets. The website works in LocalStorage fallback mode when Supabase
credentials are not configured in `supabase-config.js`.

## Current layout

The hero metrics are intentionally placed directly below the hero actions and
aligned with the main content column to avoid excessive empty space.