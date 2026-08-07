# Functional Requirements Document (FRD) — CanchaYa

## Core feature

Find a field and see its available time slots.

## Context

CanchaYa is a directory of soccer and futsal fields in Guatemala City. The directory currently holds
five fields. This document describes what the organiser sees and does on each screen, and how the
screens connect to each other.

**Scope boundary — read this first.** This first version does not save anything. There are no
accounts, no login and no reservation button. The organiser browses, reads and decides; reserving is
done by phone, using the number shown on the field's screen. Nothing the organiser does on one visit
is remembered on the next.

---

## Screen 1 — Fields (home)

### Purpose

The entry point. Show every field in the directory at a glance, and let the organiser narrow the
list down to the kind of field they are looking for.

### What the user sees

- The CanchaYa name at the top of the screen.
- A filter labelled **Surface**, offering **All** plus each surface type in the directory: Indoor
  Wood, Natural Grass, Synthetic Grass.
- One entry per field, and each entry shows:
  - Field name
  - Neighbourhood or zone (for example, *Zona 10*)
  - Surface type
  - Size (for example, *7-a-side*)
  - Price per hour, in US dollars
  - Rating
  - How many of its time slots are still free (for example, *3 free slots*)

### What the user does

- Chooses a surface in the filter. The list immediately shows only the fields with that surface.
  Choosing **All** brings back the full list.
- Chooses a field. This opens Screen 2 for that field.

### Where it goes

Every field entry leads to **Screen 2 — Field detail**, for the field chosen.

### Empty state

If the chosen surface matches no field, the list is replaced by the message *"No fields with that
surface. Try another one."* The filter keeps the choice the organiser made, so they can change it
without starting over.

---

## Screen 2 — Field detail

### Purpose

Give the organiser everything they need to decide on this particular field, and show which hours are
still free.

### What the user sees

- The field's name, prominently.
- **Where it is:** neighbourhood or zone, and the full street address.
- **What it is like:** surface type, size, rating, and the list of amenities the field offers (for
  example: showers, parking, floodlights, cafeteria, locker rooms, spectator stands).
- **What it costs:** the price per hour, in US dollars.
- **The time slots.** Every slot the field has for the day, each one showing:
  - the time range (for example, *3:00 PM – 4:00 PM*)
  - its status, clearly distinguishable at a glance: **Free** or **Taken**
- A short line under the slots: *"To reserve, call the field. CanchaYa does not hold slots."*

### What the user does

- Reads the field's information and its slots.
- Chooses **Contact this field** to open Screen 3.
- Chooses **Back to fields** to return to Screen 1.

Slots are informative only: neither free nor taken slots can be selected, and nothing happens when
the organiser touches one. Taken slots are shown on purpose — an organiser who sees that the 3:00 PM
hour is already gone learns how quickly that field fills up.

### Where it comes from and where it goes

Reached from Screen 1 by choosing a field. Leads to Screen 3 (Contact this field), and back to
Screen 1.

### Empty state

If the field has no slots at all for the day, the slot area shows *"No hours published for today.
Call the field to ask."* — followed, as always, by the field's phone number on Screen 3. The rest of
the field's information is still shown; an empty slot list must never make the screen look broken.

---

## Screen 3 — Contact this field

### Purpose

Give the organiser the one thing that actually completes the job: how to reach the field and reserve
the hour they chose.

### What the user sees

- The field's name.
- Its **phone number**, in Guatemalan format (+502 nnnn-nnnn), shown large and easy to read aloud.
- Its full **address** and neighbourhood, so the organiser can say where they mean and get there
  afterwards.
- A reminder of the field's price per hour.
- A short instruction: *"Call this number and tell them which hour you want. CanchaYa does not
  reserve for you."*

### What the user does

- Reads or dials the phone number.
- Chooses **Back to the field** to return to Screen 2, where the slot list is.

### Where it comes from and where it goes

Reached only from Screen 2, for the field being viewed. Leads back to Screen 2.

### Error state

If the field being viewed cannot be identified — for example, the organiser arrived here without
having chosen a field — the screen shows *"We could not find that field. Go back to the list of
fields."* together with a way back to Screen 1, rather than a screen with blank spaces where the
name and phone number should be.

---

## Navigation summary

    Screen 1 — Fields  ──(choose a field)──▶  Screen 2 — Field detail
                       ◀──(back to fields)──

    Screen 2 — Field detail  ──(contact this field)──▶  Screen 3 — Contact this field
                             ◀──(back to the field)──

Screen 3 is only ever reached from Screen 2, and there is no way to reach Screens 2 or 3 without
first choosing a field on Screen 1.

## Error state that applies everywhere

If the directory's information cannot be shown at all, on any screen, the organiser sees *"We could
not load the fields right now. Please try again."* — never an empty screen, which would read as
"there are no fields in Guatemala City".

---

## What this version deliberately does not do

| The organiser cannot… | Because… |
|---|---|
| Reserve a slot inside CanchaYa | This version stores nothing. Reserving is done by phone. |
| Create an account or log in | There is nothing to store about a person. |
| Mark a slot as taken | A slot's status is published information; the organiser cannot change it. |
| Save a favourite field or see past searches | Nothing is remembered between visits. |
| See more than one day of availability | Only today's published hours are shown. |
| Leave a rating or a review | Each field's rating is shown, not collected. |
