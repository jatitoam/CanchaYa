# CanchaYa — Brand Brief

## What it is
CanchaYa is a directory of soccer and futsal fields in Guatemala City. An organiser browses the
fields, opens the one that interests them, sees which hours are still free, and calls the field to
reserve.

## Palette
- Primary: #1B5E20 (deep pitch green)
- Accent: #F9A825 (amber — use for the price and the free-slot badge)
- Background: #F5F5F0 (warm off-white)

## Fonts
- Headings: Barlow Condensed
- Body: Inter

## Tone
Fast, local, trustworthy. Not this: not a glossy international booking portal — no stock-photo
handshakes and no corporate blue.

## Screens
- Fields (home)
- Field detail
- Contact this field

## Stack, pinned
Plain HTML, CSS and JavaScript reading a local JSON file, styled with Bootstrap 5 loaded from a
CDN. No framework, no npm, no build step.

Bootstrap 5 — two lines, both required:
```html
<!-- in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap Icons — a separate package, its own link -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" rel="stylesheet">
<!-- just before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```
