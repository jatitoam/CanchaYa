# CanchaYa MVP PRD

## Problem
Amateur football organisers waste time calling or messaging multiple venues to find an available field. Field owners also spend time answering repetitive availability questions. The MVP provides a simple way to see open Saturday slots and reserve one with a single tap.

## Target user
- Primary: Amateur football organisers looking for a field for Saturday matches.
- Secondary: Field owners who want to publish available Saturday time slots.

## User stories
- As an organiser, I want to view a list of available fields with Saturday time slots so I can quickly find a suitable option.
- As an organiser, I want to reserve an available slot with one tap so I can secure my match.
- As an organiser, I want to see basic field information (location, surface, size, price) before booking.
- As a field owner, I want my open Saturday slots to be listed so I fill hours that would otherwise sit
  empty. *(In the first version I send them and they are added for me — see Build constraints.)*

## Core features
- List of available football fields.
- Display open Saturday time slots, including which are already taken.
- Field details: neighbourhood, surface, size, rating and hourly price (in US dollars).
- Filter the list by surface type.
- Reserve a slot in one tap — which, in the first version, sends the reservation to the field.

## Build constraints

The first version of CanchaYa is a **static site**: plain HTML, CSS and JavaScript reading
`data/fields.json`. No framework, no `npm`, no build step, no server and no database.

This is a deliberate choice, not a limitation we are stuck with. It means the site is exactly the files
we write, so it can be published at a real URL in one click — and we find out whether organisers use it
before we spend anything building infrastructure for them.

It also decides what the first version can honestly do. The app can **show** availability, because that
lives in the data file; it cannot **record** a reservation, because there is nowhere to record it to. So
a reservation is completed by sending the details to the field, and the slot is held by the owner. The
screen-by-screen split of what is built now and what waits for a back end is in `FRD.md`.

## Out of scope

**Waiting on a back end** (the constraints above, not a change of mind):
- Storing reservations, and flipping a slot's status automatically.
- Preventing two organisers from taking the same slot.
- An owner-facing screen to publish availability — for now owners send us their slots and we update the
  data file by hand.

**Out of scope regardless:**
- Online payments or deposits.
- Letting users leave ratings and reviews (each field's existing rating is shown, not collected).
- In-app chat.
- Split payments.
- Interactive maps.
- Multi-day scheduling — Saturdays only.
- Advanced notifications and promotions.

## Success criteria
- An organiser can go from opening the page to sending a reservation in under one minute.
- At least 70% of test organisers do it on their first try, without help.
- At least 20 reservations sent through the app in the first month.
- Organisers say they stopped phoning around — that is the behaviour this replaces, and the one worth
  measuring.
