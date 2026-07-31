# Functional Requirements Document (FRD): Reserve a Field

## Overview

This document describes how the "reserve a field" flow behaves in CanchaYa, screen by screen — what the
organiser sees, what they can do, and what the app does in response. It is written to be specific enough
that someone (or something) building the app does not have to guess.

**Read the Build constraints section in `PRD.md` before this document.** The first version of CanchaYa is
a static site: plain HTML, CSS and JavaScript reading `data/fields.json`. That decides what the app can
actually do today, and the last section of this FRD says exactly which parts get built now and which wait
for a back end.

## The data behind every screen

Everything on screen comes from `data/fields.json`. Each field carries:

`id` · `name` · `neighborhood` · `surfaceType` · `size` · `pricePerHour` · `currency` (`USD`) ·
`address` · `contactPhone` · `rating` · `amenities` · and a nested `slots` array.

Each slot carries: `id` · `time` (a range, e.g. `"2:00 PM - 3:00 PM"`) · `status` (`available` or
`reserved`) · `reservedBy` (`null`, or a name and phone).

Because `status` already lives in the data, the app can **show** which Saturday slots are taken. What it
cannot yet do is **change** that status — see the last section.

---

## Screen 1 — Available fields

The entry point. The organiser lands here and sees every field, with its open Saturday slots.

**What is shown — one card per field:**

- Field name, and neighbourhood
- Surface type and size (e.g. *Synthetic Grass · 7-a-side*)
- Price per hour, in US dollars (e.g. *$45/hour*)
- Rating
- The field's Saturday slots, each showing its time range and whether it is **available** or **taken**

**What the organiser can do:**

- **Filter by surface type** — a dropdown listing every surface that appears in the data, plus "All".
  Choosing one shows only fields with that surface.
- **Tap an available slot** → go to Screen 2 with that field and slot carried across.

**Taken slots are shown but are not tappable.** Showing them is deliberate: an organiser who sees that
3:00 PM is already gone learns something about how fast that field books up.

**Empty state:** if a filter matches no field, the list is replaced by *"No fields with that surface. Try
another."* and the filter stays where it is, so the organiser can change it without starting over.

---

## Screen 2 — Confirm the reservation

Reached by tapping an available slot. Shows what is about to be reserved, and asks for the two details
the field owner needs in order to hold it.

**What is shown:** field name, address, surface and size · the chosen slot's time range · the price for
that hour · the field's contact phone.

**What the organiser enters:** their **name**, and their **phone number** (8 digits — the local format).

**Validation:** both are required. An empty name, or a phone that is not 8 digits, blocks the confirm
action and shows the message next to the input that is wrong — never as a pop-up that covers it.

**What the organiser can do:** **Confirm** → Screen 3 · **Back** → Screen 1, with the filter unchanged.

---

## Screen 3 — Reservation summary

**What is shown:** the field, the address, the day and time range, the price, and the organiser's name
and phone as entered — a summary they can screenshot or read aloud.

**And the action that actually secures the slot:** a **"Send this to the field"** button that opens
WhatsApp to the field's `contactPhone`, pre-filled with the summary text.

This is not a placeholder. In the first version, **the message is the reservation.** The organiser sends
it, the owner replies, and the slot is held. The app's job today is to remove the part that actually
wasted the organiser's time — finding out which fields have an open Saturday hour at all — not to replace
the conversation that confirms it.

**What the screen tells the organiser, in plain words:** *"Your slot is not held until the field replies.
Send the message now."* Saying so is the difference between an honest first version and a broken one.

---

## Edge cases and error states

| Situation | What happens |
|---|---|
| A filter matches no field | The empty state above. The filter is not reset. |
| A slot shows available but the owner already took it by phone | The organiser finds out when the field replies. **The first version cannot prevent this** — see below. |
| Two organisers message about the same slot | Both messages arrive; the owner decides. This version does not arbitrate. |
| `data/fields.json` fails to load | The page shows *"Could not load the fields. Refresh the page."* — never an empty list, which would read as "there are no fields". |
| A field has no available slots | The card still appears, with its slots shown as taken and nothing tappable. |

---

## What v1 builds, and what waits for a back end

The static pin decides this split. A page made of plain HTML, CSS and JavaScript can **read** the data
file and react to clicks; it cannot **write** anything back, because there is nowhere to write to.

| Behaviour | v1 (static, today) | Waits for a back end |
|---|---|---|
| Show every field with its details and rating | ✅ Built — read from `data/fields.json` | |
| Show each field's Saturday slots and whether they are taken | ✅ Built — `status` is already in the data | |
| Filter by surface type | ✅ Built — in the browser | |
| Carry a chosen field and slot to Screen 2 | ✅ Built — in the browser | |
| Validate the organiser's name and phone | ✅ Built — in the browser | |
| Show the reservation summary | ✅ Built | |
| **Send the reservation to the field** | ✅ Built — as a pre-filled WhatsApp message | |
| **Record the reservation** so the slot flips to taken for the next visitor | | ⛔ Needs somewhere to store it |
| **Prevent two people from taking the same slot** | | ⛔ Needs a server to arbitrate |
| **Let the owner publish or update their own slots** | | ⛔ Today the owner sends them and they are edited into the data file by hand |
| **Cancel or change a reservation in the app** | | ⛔ Today: message the field on the same thread |
| Send a confirmation by SMS or email | | ⛔ Later |

**Two consequences worth stating out loud**, because they are the honest limits of the first version and
not oversights:

1. **A slot's status only changes when the data file changes.** A reservation made through the app does
   not flip it. Until there is a back end, availability is as fresh as the last edit to `fields.json`.
2. **Double-booking is possible and is not prevented.** Two organisers can message about the same hour;
   the owner resolves it. This is an accepted limitation of v1, not a defect to be patched with more
   JavaScript.

*Everything in the "waits" column is the list this flow will need once the app has a database — which is
where the project goes next, not where it starts.*
