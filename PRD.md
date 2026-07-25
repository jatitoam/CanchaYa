# Product Requirement Document (PRD): CanchaYa (MVP V1)

**Line Spacing:** 1.15

---

## 1. Problem Statement
Weekend pickup soccer organizers waste 20 to 30 minutes every week manually calling 4 to 5 different facilities just to find an open field slot that fits their group's schedule. This fragmented, tedious process introduces unnecessary coordination friction and stress before the match even begins.

---

## 2. Target User
- **The Organizer**: Individuals responsible for coordinating local weekend pickup soccer matches. They want a frictionless way to find and lock down a Saturday field without spending their lunch break making phone calls.
- **The Field Owner**: Businesses operating recreational soccer facilities who want to maximize their slot utilization with zero operational overhead.

---

## 3. User Stories

### 3.1 Organizer Stories
- **As an Organizer**, I want to see a single list of all available Saturday afternoon soccer slots in my city so that I don't have to call multiple fields.
- **As an Organizer**, I want to reserve an open slot with a single tap so that I can immediately tell my group the game is on.
- **As an Organizer**, I want to view essential field details (price, surface type, neighborhood) on the listing so that I can make a quick decision without asking questions.

### 3.2 Field Owner Stories
- **As a Field Owner**, I want to quickly list my open Saturday slots on a basic dashboard so that local groups can see them without calling me.
- **As a Field Owner**, I want to receive an automatic notification when a slot is claimed so that I know who is coming to use the field.

---

## 4. Core Features (The "Embarrassing" MVP)

### 4.1 Unified Saturday Availability Feed (Organizer View)
- A single, scrollable list view displaying available slots specifically for the upcoming Saturday.
- Each card contains: Field Name, Neighborhood, Surface Type (e.g., Synthetic Grass), Price per Hour, and Time Slot (e.g., 2:00 PM - 3:00 PM).
- No search bar, no filters, and no map view. The user simply scrolls the feed.

### 4.2 One-Tap Reservation
- A prominent "Reserve Slot" button on each field card.
- Tapping the button immediately changes the slot status to "Reserved" and prompts a simple contact form (Name and Phone Number) if the user is not logged in.
- **No Online Payments**: All payments are handled offline at the venue ("Pay at the Field").

### 4.3 Basic Owner Slot Manager (Owner View)
- A minimal portal where authenticated Field Owners can toggle specific hours on Saturday as "Available" or "Unavailable".
- Once a slot is reserved by an organizer, it is automatically hidden from the public Organizer View.

---

## 5. Out of Scope for V1

| Feature / Architecture Element | Reason for Exclusion |
| :--- | :--- |
| **Online Payments & Deposits** | Adds massive integration complexity, payment gateways, and compliance overhead. Paid at the venue for V1. |
| **Map View & Advanced Filtering** | A chronological/location-labeled list solves the problem faster with significantly less frontend effort. |
| **In-app Chat & Communications** | Unnecessary if information on the listing is accurate. Phone numbers will be shared post-reservation if needed. |
| **Recurrent Bookings / Multi-day Search** | Strictly focused on the immediate pain point: the upcoming Saturday pickup game rush. |

---

## 6. Success Criteria
- **Time to Book**: Reduce the average time an organizer spends finding and securing a field from 25 minutes (via phone calls) to under 2 minutes on the platform.
- **Liquidity**: Achieve a 70% fill rate of all Saturday slots listed by participating field owners within the first 4 weeks of launch.
- **Platform Abandonment**: Keep the reservation funnel drop-off below 15% by maintaining a dead-simple one-tap flow.
