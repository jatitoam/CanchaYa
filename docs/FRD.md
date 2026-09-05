# Functional Requirements Document (FRD) — CanchaYa

## Scope

Browse fields, start a booking from an available slot, and review it. The booking flow ends at
review: no submit action, API write, browser storage, slot hold, availability mutation or success
confirmation. Existing contact inquiries retain their separate submission behavior.

## Screen 1 — Fields (home)

Show all fields with name, neighbourhood, surface, size, hourly price (USD), rating and free-slot
count. Filter by surface (All, Indoor Wood, Natural Grass, Synthetic Grass). Choosing a field
opens its detail page. An empty filter result explains that no fields match and keeps the filter
available. Data-load failures show an error rather than an empty directory.

## Screen 2 — Field detail

Show name, neighbourhood, address, surface, size, rating, amenities, hourly price and the field's
phone number as a callable link. Show today's published time ranges and availability.

- Each available slot is a keyboard-accessible link labelled RESERVAR, opening Screen 3 with the
  field ID and exact slot ID. This is the entry point for a new booking.
- Taken slots show OCUPADO and cannot start a booking.
- Contact this field remains reachable for every field, including fields with no available slots,
  and opens Screen 4 for questions about an existing booking.
- Back to fields returns to Screen 1.
- Remove the previous instruction saying CanchaYa does not reserve spaces.

If no slots are published, explain that and suggest calling; keep the phone and contact link
visible. If all slots are taken, show them as taken. An unknown field shows an error and a link
back to the directory.

## Screen 3 — Booking review

Resolve the field ID and slot ID against the local JSON. The slot must belong to that field and
still have status available. Do not accept field names, times or prices from URL parameters.

Show the field name, exact selected time range for today, and hourly price with currency from the
field data. Current published slots are one hour. These details are not editable; the organiser
never retypes the field or time. Ask only for name (text, maximum 100 characters) and phone (tel,
maximum 20 characters), both labelled and required for the future booking submission.

This is the final screen for now. It has no submission control or form navigation and clearly says
the booking has not been sent or confirmed. Personal details stay in the displayed inputs only.
Back to the field lets the organiser choose a different slot.

Missing, unknown, mismatched or taken slots must not display an actionable review. Show an error
with navigation back to the identified field, or to the directory when the field is unknown.
A loading failure shows a retry message. Refresh resolves the selection again from the URL and JSON.

## Screen 4 — Contact this field

The existing contact form handles questions about a booking the organiser already has. It remains
separate from new booking review, reachable from every detail page and existing directory links.
It asks for name, phone, optional field name and the time of the existing booking, and retains its
existing /api/contacto submission, validation, success and error behavior. It does not create a
booking or change availability.

## Exclusions

No booking persistence or confirmation, payments, accounts, favourites, owner editing, new ratings,
or additional days of availability are introduced.
