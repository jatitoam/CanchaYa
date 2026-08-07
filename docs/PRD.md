# Product Requirements Document (PRD) — CanchaYa

## Overview

CanchaYa is a directory of soccer and futsal fields in Guatemala City. A player who wants to
organise a match opens CanchaYa, looks through the fields, opens the one that interests them, and
sees which hours are still free that day. Reserving is done by calling the field directly.

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
what they cost and which hours are free, so that I can make one phone call instead of five."*

## Core features

- A list of all the fields in the directory, on the first screen.
- A filter so the organiser can narrow the list by surface type (Indoor Wood, Natural Grass,
  Synthetic Grass).
- A detail view for each field showing everything the organiser needs to decide: address,
  neighbourhood, surface, size, price per hour, rating and amenities.
- The field's time slots, each one clearly marked as free or already taken.
- The field's phone number, visible, so the organiser can call and reserve.

## Out of scope

This first version is a directory that shows information. It does not save anything, and that is a
deliberate decision, not something missing.

- **Reserving inside CanchaYa.** The organiser reserves by phone. CanchaYa shows the number.
- **User accounts, sign-up or login.** There is nothing to log in to.
- **Anything the app has to remember** — favourites, history, saved searches, a slot that stays
  marked as taken because someone chose it.
- Payments or deposits of any kind.
- Reviews written by users. Each field's rating is shown, not collected.
- An owner-facing area to publish or edit availability.
- Chat, notifications, maps, or booking more than one day ahead.

## Success criteria

- An organiser who opens CanchaYa for the first time finds a field that suits them and gets to its
  phone number in under one minute, without help.
- At least 7 out of 10 people we test with can explain, without being told, which hours are free at
  a given field.
- Organisers tell us they called one field instead of five. That is the behaviour CanchaYa replaces
  and the one worth measuring.
- At least three field owners ask to be added to the directory in the first month.
