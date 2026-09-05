# Product Requirements Document (PRD) — CanchaYa

## Overview

CanchaYa is a directory of soccer and futsal fields in Guatemala City. A player who wants to
organise a match opens CanchaYa, looks through the fields, opens the one that interests them, and
sees which hours are still free that day. A booking starts by selecting an available slot and reviewing the field, exact time and price.
This release ends at review; no booking is saved or confirmed.

## Problem

Organising an amateur match in Guatemala City means phoning four or five fields one after another
just to find out which one has a free hour. Availability is not published anywhere: it lives in the
head of whoever answers the phone. The organiser loses half an hour on calls, and the field owner
answers the same question ten times a day, most of the time to say "we are full".

Nobody can compare fields either. Price, surface and size are only discovered during the call, so
the organiser usually books the first field that says yes instead of the one that actually fits.

## Target user

**Primary — the organiser.** The person in the group chat who ends up booking the field. Between 20
and 45 years old, plays once or twice a week, decides on the same day or the day before. Not a
frequent customer of any one field; they go wherever there is an open hour at a fair price.

**Secondary — the field owner.** Small businesses with one or two fields. They want the empty hours
filled and fewer phone calls that go nowhere. In this first version they do not use CanchaYa
themselves; their information is published for them.

## Job to be done

*"When I have to find a field for tonight's match, I want to see in one place which fields exist,
what they cost and which hours are free, so that I can select a suitable slot without retyping the field or time."*

## Core features

- A list of all the fields in the directory, on the first screen.
- A filter so the organiser can narrow the list by surface type (Indoor Wood, Natural Grass,
  Synthetic Grass).
- A detail view for each field showing everything the organiser needs to decide: address,
  neighbourhood, surface, size, price per hour, rating and amenities.
- Available slots are selectable booking entry points; taken slots remain visible and inert.
- A review screen carries the selected field and exact slot automatically, displays the price,
  and asks only for the organiser's name and phone.
- The field's phone number is visible and callable on its detail page.
- Every field keeps a contact-form link for inquiries about an existing booking.

## Out of scope

The new booking flow ends at review. It does not submit, persist personal details, hold a slot or
change availability. The existing contact form remains a separate inquiry flow with its existing
submission behavior.

- **Saving or confirming bookings.** A destination for booking writes will be added separately.
- **User accounts, sign-up or login.** There is nothing to log in to.
- **Anything the app has to remember** — favourites, history, saved searches, a slot that stays
  marked as taken because someone chose it.
- Payments or deposits of any kind.
- Reviews written by users. Each field's rating is shown, not collected.
- An owner-facing area to publish or edit availability.
- Chat, notifications, maps, or booking more than one day ahead.

## Success criteria

- An organiser who opens CanchaYa for the first time finds a field that suits them and gets to its
  booking review in under one minute, without help.
- At least 7 out of 10 people we test with can explain, without being told, which hours are free at
  a given field.
- Organisers reach review with the exact field and slot they selected and never retype either.
- No booking data is written and no selected slot changes status.
- At least three field owners ask to be added to the directory in the first month.
