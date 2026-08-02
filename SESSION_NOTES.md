# Project Session Notes & Feature Overview

## Overview
This document summarizes the recent updates, architectural changes, context providers, and UI/UX enhancements made to the **TCG Marketplace** web application. Refer to this document in future sessions for context on state management and component structures.

---

## 1. Authentication & User Profile Context

### Key Files:
- [types.ts](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/types.ts)
- [UserContext.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/context/UserContext.tsx)
- [main.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/main.tsx)
- [Header.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/components/Header.tsx)
- [Login.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Login.tsx)
- [Account.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Account.tsx)

### Details:
- **`UserProfile` Interface**: Defined in `src/types.ts` to match the account API payload structure (`id`, `username`, `email`, `displayName`, `bio`, `sellerRating`, `totalSales`, `totalPurchases`, `verifiedSeller`, `createdAt`, location parameters).
- **`UserContext`**: Created `UserContext.tsx` providing `user` state, `setUser(profile)`, and `clearUser()`. Registered in `main.tsx` provider tree.
- **Dynamic Header Button**: Updated [Header.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/components/Header.tsx) to check authentication state. Displays **"Account"** (navigating to `/account`) when logged in, or **"Sign In"** (navigating to `/login`) when logged out.
- **Account Page Integration**: [Account.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Account.tsx) reads user profile info (`displayName`, `email`, initials avatar) and calls `clearUser()` alongside `logout()` upon user sign out.

---

## 2. Sign In Page Updates ([Login.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Login.tsx))

- **Show/Hide Password Toggle**: Added eye icon toggle button (`Eye` / `EyeOff` from `lucide-react`) allowing users to reveal or mask their password text.
- **"Stay signed in" Checkbox**: Added option on the sign in form to persist user session preference.

---

## 3. Secondary Header Navigation ([Header.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/components/Header.tsx))

- **Dynamic Horizontal Scroll Tracking**: Added `canScrollLeft` and `canScrollRight` state calculations to detect if additional category links exist outside the current viewport.
- **Chevron Pointer Cursors & Hover States**: Chevrons now display `cursor-pointer`, full opacity, and hover highlights (`hover:text-white`) whenever scrollable items are available in that direction. Automatically dims (`opacity-30`) and switches to `cursor-default` when scrolled to the start or end.

---

## 4. Calendar & Events Features

### Key Files:
- [EventCalendar.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/components/EventCalendar.tsx)
- [EventCard.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/components/EventCard.tsx)
- [Events.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Events.tsx)

### Details:
- **Interactive Calendar Pointer**: Added explicit `cursor-pointer` to active calendar days and event days.
- **Interactive Event Cards**: Added `cursor-pointer` on hover for all event cards in the event listing grid.

---

## 5. Sell Card Page Enhancements ([Sell.tsx](file:///c:/Users/parke/OneDrive/Documents/Projects/Modern%20TCG%20Webapp/TCG-Website/src/pages/Sell.tsx))

- **Form State & Required Validation**: Added state management for `cardName`, `game`, `condition`, `price`, `quantity`, `areaCode`, and `openToShipping`.
- **Submit Button Disabling**: Required fields (**Card Name**, **Game**, **Condition**, and **Price**) marked with red asterisks (`*`). The **"List Card for Sale"** button is disabled until all required inputs are populated validly.
- **Location & Shipping Options**:
  - Added **"Seller Area Code / Zip Code"** input field.
  - Added **"Open to shipping"** checkbox, positioned directly above the **Upload Photos** component.

---

## Technical Notes & API Endpoints

- **Token Endpoint**: `http://localhost:8081/realms/cards/protocol/openid-connect/token`
- **Account Me Endpoint**: `http://localhost:8082/api/accounts/me`
- **Dev Server Command**: `npm run dev`
