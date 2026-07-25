# CanchaYa ⚽️

CanchaYa is a frictionless, simplified platform designed specifically for local weekend pickup soccer organizers and field owners. It targets the massive headache of coordination friction and field hunting by replacing endless manual phone calls with a unified Saturday booking feed.

---

## 📌 The Problem
Weekend pickup soccer organizers waste **20 to 30 minutes every week** manually calling 4 to 5 different facilities just to find an open field slot that fits their group's schedule. This fragmented, tedious process introduces unnecessary coordination friction and stress before the match even begins.

## 🎯 The Solution
CanchaYa is the "embarrassing" MVP designed to solve exactly one problem: **finding and booking a Saturday afternoon field slot under 2 minutes.**
No complex map views, no advanced filters, no mandatory online payments. Just open the feed, find a slot, and tap to reserve.

---

## 🚀 Key Features (MVP V1)

### 1. Unified Saturday Availability Feed (Organizer View)
* A single, scrollable list view displaying available slots specifically for the upcoming Saturday.
* Clear cards showing Field Name, Neighborhood, Surface Type, Price per Hour, and Time Slot.
* Focused user flow with no search bar, filters, or maps to distract or slow down the user.

### 2. One-Tap Reservation
* Prominent **"Reserve Slot"** button.
* Instantly changes slot status to "Reserved".
* Prompts a simple contact form (Name & Phone Number) if offline or guest.
* **Offline Payments**: "Pay at the Field" to avoid checkout friction and keep V1 simple.

### 3. Basic Owner Slot Manager (Owner View)
* A minimal dashboard for authenticated Field Owners.
* Toggle specific hours on Saturday as "Available" or "Unavailable".
* Automatically hides reserved slots from the public Organizer View.

---

## 🚫 Out of Scope for V1
To launch fast and prove market demand, the following are strictly excluded:
* **Online Payments & Deposits** (Paid at the venue)
* **Map View & Advanced Filtering** (Chronological listing is sufficient)
* **In-app Chat & Communications** (Direct phone contact post-reservation)
* **Recurrent Bookings / Multi-day Search** (Strictly focused on Saturday games)

---

## 📊 Success Criteria
* ⏱ **Time to Book:** Reduce booking time from 25 minutes (calls) to under 2 minutes.
* 💧 **Liquidity:** Achieve a 70% fill rate of listed slots within the first 4 weeks.
* 📉 **Drop-off:** Keep booking funnel abandonment below 15%.

---

## 📂 Project Structure
```text
.
├── PRD.pdf             # Original Product Requirement Document PDF
├── PRD.md              # Markdown version of the PRD for easy editing
└── README.md           # This project overview and guide
```

---

## 🛠 Tech Stack Recommendations (Proposed V2/Implementation)
* **Frontend:** React / Next.js with TailwindCSS for a mobile-first responsive layout.
* **Backend:** Node.js (Express) or Next.js API Routes.
* **Database:** PostgreSQL or Supabase for instant relational data (Fields, Slots, Reservations, Users).
* **Authentication:** Supabase Auth or Clerk for swift Field Owner login.
