# 🚍 SahiYatra (सही यात्रा)
> **One App for the Whole Trip** — Multi-Modal Transit Grid (Auto + Bus + Train) with Upfront Locked Fares & Zero Surge Pricing.

---

## 🌟 Architecture & Key Features

### 1. Multi-Modal Route Assembly Engine (Leg 1 ➔ Leg 2 ➔ Leg 3)
- Connects fragmented journeys into a single unified ticket:
  - **First-Mile**: Doorstep Auto Rickshaw to Departure Hub (e.g., Ashok Chowk ➔ Solapur Old ST Stand)
  - **Intercity Main Leg**: MSRTC Ordinary (Lal Pari), Shivshahi AC, or Shivneri AC Sleeper (via NH65 / Indapur Bypass)
  - **Last-Mile**: Connecting Auto held on arrival at destination stand (e.g., Swargate Bay #2 ➔ Hinjawadi IT Park)
- **3 Plan Comparison Cards**:
  - **Cheapest**: ₹420 (Auto + Ordinary ST Bus + Auto, 5h 40m)
  - **Fastest**: ₹610 (Priority Auto + Shivshahi AC Bus + Pre-assigned Auto, 4h 30m)
  - **Comfort**: ₹780 (Green EV Auto + Shivneri AC Sleeper + Doorstep Auto, 4h 50m)
- **Guaranteed Upfront Locked Price** with zero surge pricing guarantee.

---

### 2. Unified Checkout & Transparent Fare Policy
- **Leg-by-Leg Cost Breakdown**:
  1. First-mile Auto: ₹60 (Locked fare, Ride OTP: **4821**)
  2. MSRTC Bus: ₹330 (Platform #4 & seat reservation #14A, 30m buffer)
  3. Last-mile Auto: ₹80 (Held on arrival at Bay #2)
- **Total Combined Cost**: ₹470 all-inclusive (zero hidden fees).
- **Transparent Policy Banner**:
  > **No surge pricing. Late fee: ₹50 only if cancelled within 1 hour of departure.**
- **Unified QR Pass**: Digital QR ticket with dual OTPs for conductors and auto stands.

---

### 3. Active In-Transit Dashboard & Execution
- **Auto Leg Card**:
  - Vehicle: **MH 13 AB 1234** (Bajaj RE Auto)
  - Driver: **Ramesh Jadhav (4.7★, 1,240 trips)**
  - Locked Fare: ₹60 | OTP: **4821**
  - **Prominent Emergency SOS Button** with 5-second countdown & Maharashtra Police Dial 112 dispatch.
- **Driver Dispatch Card**:
  - **Bilingual Destination Card in Marathi**:
    > **"गंतव्य स्थान: सोलापूर जुना एस.टी. स्टँड, प्लॅटफॉर्म क्रमांक ४"**
  - High-visibility card designed for grassroots auto drivers.
  - **Audio Speech Announcement**: Click "ऐकवा (Speak)" to speak the destination aloud in Marathi via Web Speech API!
- **Dynamic Delay Buffer Simulator**:
  - Simulates dynamic traffic alerts:
    > *"+15 min delay detected due to Hadapsar traffic — intelligent buffer activated, next auto held at destination for you in 5 min at Swargate Bay 2."*
  - Interactive delay buttons: `+0m (On-Time)`, `+15m Delay`, `+35m Delay`.
- **Encrypted Shareable Family Tracking Link**:
  - One-click copy link & WhatsApp share (`https://sahiyatra.app/track/TRIP-MH-84920`).

---

### 4. Curated Highway Dhaba Pre-Order
- **Scheduled Highway Stop**: Hotel Jagdamba Highway Dhaba (Indapur Bypass, 2:30 PM, 25 min halt).
- **Hygiene Rating**: 4.5★ Audited (FSSAI Certified, sanitized washrooms).
- **Express Transit Menu**:
  - Special Maharashtrian Veg Thali (₹90)
  - Kanda Poha with Sev & Nimbu (₹30)
  - Special Masala Chai in Kulhad (₹10)
  - Mineral Water Chilled 1L (₹20)
  - Puneri Kat Misal Pav (₹50)
- **Instant Token Confirmation**: `#DH-142` for seat delivery or express counter collection.

---

### 5. Festival Surge Analytics & Teen Safety Guard
- **Diwali Week Surge Bar Chart**:
  - Real-time visualization tracking unserved searches & waitlists (Mon–Fri).
  - 1-Click **"Deploy 4 Standby Buses"** action that updates capacity metrics live.
- **Teen Safe Ride Mode (Ages 16–18)**:
  - Parent Verification Badge (`Santosh Kulkarni, Verified ✓`).
  - Boarding PIN (`7302`) required before departure.
  - Emergency Highway Police Points along NH65 (Indapur Police Chowki, Tembhurni Trauma Care).

---

### 6. Auto Driver Partner Terminal
- Dedicated module for auto drivers to accept/decline pre-paid rides.
- Guaranteed full fare with **zero commission cut**.
- Stand Help-Point fast-track pass.

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch (Instant Zero-Install)
Double-click or right-click [index.html](file:///e:/CODE(C++,C,PY)/bootcam/SahiYatra/index.html) and select **"Open with Chrome"** or **"Open with Edge"**.
The app is fully self-contained with React, Tailwind CSS, and interactive state!

### Option 2: Full-Stack Node.js REST API Server
Open PowerShell or Command Prompt and run:
```bash
node server/index.js
```
Then visit:
```
http://localhost:5000
```

### REST API Endpoints:
- `GET /api/hubs` - Hubs and quick route pills
- `POST /api/search` - Route assembly engine (3 plan cards)
- `POST /api/bookings` - Unified checkout & digital pass generation
- `GET /api/journey/:id` - Active in-transit dashboard data
- `POST /api/journey/delay-sim` - Dynamic delay buffer recalculation
- `POST /api/journey/sos` - Maharashtra Police 112 SOS dispatch
- `GET /api/dhaba/menu` & `POST /api/dhaba/order` - Highway food pre-ordering
- `GET /api/festival-demand` & `POST /api/festival-demand/deploy-standby` - Surge analytics
- `GET /api/driver/queue` & `POST /api/driver/respond` - Driver prepaid dispatch
