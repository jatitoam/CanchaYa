# Functional Requirements Document (FRD): Reserve a Field

## Overview
This document outlines the functional requirements for the "Reserve a Field" feature in CanchaYa. The goal is to allow amateur football organisers to quickly find and secure an available Saturday time slot.

## Feature Flow: Reserve a Field

### Screen 1: Available Slots List
The entry point where users browse available fields and their specific Saturday time slots.

**Inputs:**
- **Scroll/Browse:** Navigate through the list of fields.
- **Filter (Optional):** Basic selection by surface type or price range.
- **Selection:** Tap on a specific field to view details or a specific time slot to initiate booking.

**Outputs:**
- **Field Card:** Displays field name, neighborhood, surface, size, and hourly price.
- **Time Slots:** Horizontal or vertical list of available hours for the upcoming Saturday.
- **Availability Status:** Visual indicator of whether a slot is free or already taken.

---

### Screen 2: Field Details & Booking Confirmation
A modal or dedicated screen shown after selecting a slot, providing more context and a final confirmation button.

**Inputs:**
- **Confirm Booking Button:** The primary "one-tap" action to secure the slot.
- **Back/Cancel:** Return to the list without reserving.

**Outputs:**
- **Field Specifications:** Surface type (e.g., Synthetic), Size (e.g., 5-a-side), Neighborhood.
- **Selected Slot Info:** Clearly displays the chosen date and time (e.g., Saturday, Oct 12th, 4:00 PM - 5:00 PM).
- **Total Price:** Clear display of the amount to be paid at the venue.

---

### Screen 3: Booking Success
The final state confirming that the reservation has been recorded.

**Inputs:**
- **Dismiss/Home:** Return to the main dashboard.

**Outputs:**
- **Confirmation Message:** "Field Reserved Successfully!"
- **Reservation Details Summary:** Field name, time, and instructions (e.g., "Pay at arrival").
- **Booking ID:** A unique reference for the reservation.

---

## Edge Case & Error States

### Error State: Slot Concurrency Conflict
**Scenario:** Two users attempt to book the exact same slot at the same time. User A clicks "Confirm" milliseconds before User B.

**Behavior:**
- **System Action:** Validates slot availability immediately upon the "Confirm" tap.
- **Output for User B:** A pop-up notification stating: *"Sorry, this slot was just taken. Please select another time."*
- **Resolution:** User B is redirected back to the **Available Slots List** which is automatically refreshed to show the slot as "Booked".

### Edge Case: Field Owner Updates Availability Mid-Booking
**Scenario:** A field owner marks a slot as unavailable (manual update) while a user is on the Confirmation Screen.

**Behavior:**
- **System Action:** Final check performed before finalizing the booking.
- **Output:** An error message: *"This slot is no longer available. The owner has updated the schedule."*
- **Resolution:** User returns to the main list.
