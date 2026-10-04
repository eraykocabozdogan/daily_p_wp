# Plan Wallpaper

**Live:** [eraykocabozdogan.github.io/daily_p_wp](https://eraykocabozdogan.github.io/daily_p_wp/)

A Progressive Web App that turns your daily schedule and habits into a **phone
wallpaper**. Each plan item is drawn as an arc on a clock face. You design it once,
export a PNG sized exactly for your phone or monitor, and see your day every time you unlock it.

## Features

- **Clock layouts:** one ring, two rings with configurable time ranges (00:00–12:00
  and 12:00–24:00 by default), or a continuous spiral. Segments align to exact
  time boundaries.
- **Plan items:** name, label and color, with multiple time ranges per item
  (for example, "Gym" from 07:00 to 08:00 and again from 19:00 to 20:00).
- **Habit tracking:** named habits shown as single dots or good/bad **yin-yang**
  pairs, optionally timed, with daily check-off.
- **Device finder:** pick your phone or monitor from a category → brand → model catalog to set
  the exact wallpaper resolution, or enter width and height by hand.
- **Canvas editor:** custom background color or image, text, mouse-wheel zoom,
  draggable labels, centering, and **PNG export**.
- **Accounts:** Google sign-in through Supabase Auth. Each user's state syncs to a
  `user_app_state` table protected by **Row Level Security**. Guest mode works without
  saving anything.
- **Offline-first PWA:** manifest, service worker with app-shell caching, and forced
  shell refresh on new releases.

## Tech

Vanilla JavaScript + HTML Canvas (no build step), Supabase (Postgres, Auth, RLS),
service worker, GitHub Pages hosting. A scheduled GitHub Actions workflow calls a
read-only `keepalive_probe()` RPC so the free-tier Supabase project stays active.

## Run locally

Serve the repository root over HTTP. Service workers don't run from `file://`.

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Google sign-in additionally needs the deployed origin in the Supabase Auth redirect
URLs (see [`plan-wallpaper-pwa/README.txt`](plan-wallpaper-pwa/README.txt)).

## Structure

```
index.html               # App: UI, canvas renderer, state, Supabase sync
sw.js                    # Service worker (app-shell cache)
manifest.webmanifest     # PWA manifest and icons
supabase/                # Keep-alive SQL function and workflow template
.github/workflows/       # Scheduled Supabase keep-alive
```
