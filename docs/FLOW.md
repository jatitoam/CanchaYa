| | Screen 1 — Fields (home) | Screen 2 — Field detail | Screen 3 — Contact this field |
|---|---|---|---|
| **Purpose** | The entry point — show every field at a glance, let the organiser narrow the list. | Give the organiser everything they need to decide on this field, and show which hours are free. | Give the organiser the one thing that completes the job: how to reach the field. |
| **Information** | Field name · neighbourhood/zone · surface type · size · price/hour (USD) · rating · how many slots are still free ("3 free slots"). | Name · where it is (neighbourhood + full street address) · what it is like (surface, size, rating, amenities) · what it costs (price/hour) · every slot with its time range and status **Free**/**Taken** · the line *"To reserve, call the field. CanchaYa does not hold slots."* | Name · phone number in `+502 nnnn-nnnn` format, large · full address + neighbourhood · reminder of price/hour · *"Call this number and tell them which hour you want. CanchaYa does not reserve for you."* |
| **Actions** | Choose a **Surface** filter (All + each surface type). Choose a field. | **Contact this field** → Screen 3. **Back to fields** → Screen 1. Slots are informative only — not selectable. | **Back to the field** → Screen 2. |
| **Navigation** | Entry point. Every field entry → Screen 2, for that field. | From Screen 1 by choosing a field. → Screen 3, and back to Screen 1. | Only from Screen 2, for the field being viewed. → back to Screen 2. |
| **Empty/error state** | *"No fields with that surface. Try another one."* | *"No hours published for today. Call the field to ask."* | *"We could not find that field. Go back to the list of fields."* |

The FRD's own navigation summary — put this on screen exactly as written:

```
Screen 1 — Fields  ──(choose a field)──▶  Screen 2 — Field detail
                   ◀──(back to fields)──

Screen 2 — Field detail  ──(contact this field)──▶  Screen 3 — Contact this field
                         ◀──(back to the field)──
```