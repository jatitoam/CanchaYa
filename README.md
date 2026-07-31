# CanchaYa

CanchaYa helps amateur football organizers find and reserve an open soccer field for Saturday matches.
Instead of phoning five venues to find one free hour, an organizer browses the fields, compares surface,
size, price and rating, and sends a reservation for an open slot in one tap. Field owners fill hours that
would otherwise sit empty.

## The Musts

- Display a list of available football fields.
- Show each field's Saturday time slots, and which are already taken.
- Display field information: neighbourhood, surface, size, rating, and hourly price.
- Filter the list by surface type.
- Reserve an open slot in one tap.

## Features

| Feature | Priority |
|---------|----------|
| List available football fields | Must Have |
| Display Saturday availability | Must Have |
| View field details | Must Have |
| Filter by surface type | Must Have |
| One-tap reservation | Must Have |
| Owner availability management | Later — see below |
| Online payments | Out of Scope |
| Ratings & reviews | Out of Scope |
| In-app chat | Out of Scope |
| Split payments | Out of Scope |
| Interactive maps | Out of Scope |
| Multi-day scheduling | Out of Scope |
| Advanced notifications & promotions | Out of Scope |

## How the first version is built

CanchaYa v1 is a **static site** — plain HTML, CSS and JavaScript reading `data/fields.json`. No
framework, no build step, no server, no database. That is what lets it go live at a real URL in one
click, before we spend anything on infrastructure.

It also sets an honest limit: the app can **show** availability, but it cannot **record** a reservation,
because there is nowhere to store it. So a reservation is completed by sending the details to the field,
and the owner holds the slot. Owner availability management, automatic slot updates and double-booking
protection all wait for a back end.

Full detail: [`docs/PRD.md`](docs/PRD.md) and [`docs/FRD.md`](docs/FRD.md).

## Success Criteria

- An organizer goes from opening the page to sending a reservation in under one minute.
- At least 70% of test organizers manage it on their first try, without help.
- At least 20 reservations sent through the app in the first month.
- Organizers report they stopped phoning around.

## What's in this repo

```
README.md          this file
docs/PRD.md        what we're building, for whom, and why
docs/FRD.md        how the reserve-a-field flow behaves, screen by screen
data/fields.json   the five sample fields, with their Saturday slots
data/fields.csv    the same fields, flat — no slots
```
