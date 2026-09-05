# CanchaYa — Navigation Flow

| Screen | Information | Actions | Empty / error state |
|---|---|---|---|
| Fields (home) | Field summaries, hourly price, rating and free-slot count | Filter surface; choose field → detail | No matching fields; data-load error |
| Field detail | Field information, price, callable phone, today's slots | Available slot → booking review; contact → existing-booking inquiry; back → fields | Unknown field; no published slots; taken slots remain inert |
| Booking review | Selected field, exact time range, hourly price and currency; name and phone inputs only | Back → same field to change selection; no submit action | Missing, invalid, mismatched or taken slot: show error and return link; data-load error |
| Contact form | Existing-booking inquiry: name, phone, optional field and booking time | Send inquiry through existing contact endpoint; back → fields | Existing validation and submission error feedback |

```text
Fields ── choose field ──> Field detail
       <── back ─────────

Field detail ── select available slot ──> Booking review (final step)
             <── back / change slot ─────

Field detail ── contact about existing booking ──> Contact form
```

Booking selection travels as field ID + slot ID in the review URL. The review resolves both against
the local JSON and displays its authoritative name, time and price. No manual field/time entry.
Taken slots never start bookings. No booking or personal details are saved, no slot is held, and
availability stays unchanged. The existing contact submission remains separate.
