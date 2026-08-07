# CanchaYa

CanchaYa helps amateur football organisers find an open soccer field in Guatemala City. Instead of
phoning five venues to find one free hour, an organiser browses the fields, compares surface, size,
price and rating, opens the one that interests them, and sees which hours are still free. Reserving
is done by calling the field directly — CanchaYa shows the number.

## The Musts

- Display a list of the football fields in the directory.
- Filter the list by surface type.
- Show each field's full detail: neighbourhood, address, surface, size, rating, amenities and hourly price.
- Show each field's time slots, and which are free and which are already taken.
- Show the field's phone number so the organiser can call and reserve.

## Features

| Feature | Priority |
|---------|----------|
| List the football fields | Must Have |
| Filter by surface type | Must Have |
| View field details | Must Have |
| Display today's availability | Must Have |
| Show the field's contact number | Must Have |
| Reserving inside the app | Out of Scope — reserve by phone |
| Owner availability management | Later — see below |
| Online payments | Out of Scope |
| Ratings & reviews | Out of Scope — ratings are shown, not collected |
| In-app chat | Out of Scope |
| Interactive maps | Out of Scope |
| Multi-day scheduling | Out of Scope |
| Advanced notifications & promotions | Out of Scope |

## How the first version is built

CanchaYa v1 is a **static site** — plain HTML, CSS and JavaScript reading `data/fields.json`, styled
with a component library loaded from a CDN. No framework, no npm, no build step, no server, no
database. That is what lets it go live at a real URL in one click, before we spend anything on
infrastructure.

It also sets an honest limit: the app can **show** availability, but it cannot **record** anything,
because there is nowhere to store it. So this version does not reserve at all — it publishes what is
free and hands the organiser the phone number. Reserving in-app, owner availability management,
automatic slot updates and double-booking protection all wait for a back end.

**A note on the specs.** `docs/PRD.md` and `docs/FRD.md` are deliberately **technology-agnostic** —
they describe what a person sees and does, and never how it is built. That separation is the point:
the spec is a decision about the product, and this section is a decision about the build. Full
detail: [`docs/PRD.md`](docs/PRD.md) and [`docs/FRD.md`](docs/FRD.md).

## Success Criteria

- An organiser goes from opening the page to the field's phone number in under one minute.
- At least 70 % of test organisers manage it on their first try, without help.
- At least 7 out of 10 can explain, unprompted, which hours are free at a given field.
- Organisers report they called one field instead of five.

## What's in this repo

```
README.md          this file
docs/PRD.md        what we're building, for whom, and why — technology-agnostic
docs/FRD.md        the three screens and how they connect — technology-agnostic
data/fields.json   the five sample fields, with their time slots
data/fields.csv    the same fields, flat — no slots
```
