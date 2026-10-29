# 7th International Yogini Awards & Conference 2027 — Landing Page

A complete, visually stunning, responsive, production-ready landing page for the **7th International Yogini Awards & Conference 2027**, organized by **Bharatiya Yogini Sangh (Indian Yogini Association)** in association with **ACT (Aspire | Connect | Transform)**.

- **Dates:** 30–31 January 2027
- **Venue:** Shri Krishna Pranami Mangal Dham, Bermiok Namphing, South Sikkim, India
- **Reference Website:** [https://yoginiindia.com/](https://yoginiindia.com/)
- **Tech Stack:** Pure Vanilla HTML5, CSS3, JavaScript (ES6+), Google Apps Script Backend (Private Google Sheets Integration)

---

## 🌟 Key Features

1. **Design Direction & Spiritual Aesthetics:**
   - Palette: Deep Royal Maroon (`#8C003D`), Rich Burgundy (`#A20D4F`), Forest Green (`#063F32`), Antique Gold (`#D9A62E`), Warm Ivory (`#FFF9ED`).
   - Typography: Elegant serif headings (*Playfair Display*, *Cormorant Garamond*), modern sans-serif body (*Plus Jakarta Sans*), and graceful cursive script (*Alex Brush*).
   - Traditional Indian ornamental borders, lotus dividers, and Himalayan motifs.

2. **Sticky Navigation Bar:**
   - Sticky navbar with transparent-to-solid transition on scroll.
   - Official Bharatiya Yogini Sangh and ACT logos.
   - Smooth-scrolling navigation links with active section highlighting.
   - Prominent gold-and-maroon CTA button linking directly to the registration portal.
   - Animated mobile hamburger menu and full-height navigation drawer.

3. **Cinematic Hero Section:**
   - Himalayan panoramic mountain background with layered dark gradient overlay.
   - Dynamic canvas-based floating golden stardust particles system.
   - Dynamic live countdown timer ticking down to 30 January 2027 (Asia/Kolkata timezone).
   - Dual CTAs: *Nominate a Yogini* and *Explore the Awards*.

4. **About the Awards:**
   - Editorial two-column layout highlighting women's leadership and the Sanskrit motto *शान्तिमूलं जगत्सर्वम्* ("Peace is the root of all existence").
   - Four feature pillars: Women's Empowerment, Yoga & Spiritual Wisdom, Global Collaboration, and Holistic Wellness.

5. **3D Interactive Golden Trophy Showcase:**
   - Centered interactive 3D sculpture of the golden Yogini award.
   - Perspective 3D tilt tracking cursor and touch movements.
   - Gentle floating animation with radiant golden aura and sparkling particles.

6. **Official Award Categories:**
   - Complete details for all 5 official categories from Bharatiya Yogini Sangh:
     1. **Shivani Award** — *Lifetime Achievement in Yoga* (Age 60+)
     2. **Gargi Award** — *Special Research & Scholarship* (5–10+ publications)
     3. **Yogini Award** — *Long-Time Practitioner* (10–15+ years experience)
     4. **Gonika Award** — *Institutional Yogini* (Yoga Center / Studio Leaders)
     5. **Maitrayi Award** — *Yoga Well-Wishers & Advocates*
   - *"Apply for this Award"* CTA on every card which auto-scrolls and preselects the chosen category in the application wizard.

7. **Official Event Gallery:**
   - High-resolution photographs from the official YoginiIndia archive (`yoginiindia.com`).
   - Asymmetric editorial grid with hover zoom and caption overlays.
   - Interactive Lightbox with keyboard navigation (Esc, Left/Right arrow) and touch swipe gestures.

8. **Complete 2-Day Conference Schedule:**
   - Interactive tab switcher between Day 1 (30 Jan) and Day 2 (31 Jan).
   - Comprehensive timeline covering lamp lighting, 5 panel discussions, research presentations, cultural evening, sightseeing, and grand awards gala.
   - How to Reach guide (Bagdogra Airport, NJP Railway Station, road routes) and proposed international delegations (Singapore, South Korea, USA, Vietnam, UAE, Nepal, etc.).

9. **Distinguished Guests & Honoured Dignitaries:**
   - Elegant guest cards featuring invited Union Ministers, NCW Chairperson, Sikkim icon Padma Shri Bhaichung Bhutia, cultural patrons, and legislative representatives.

10. **Sikkim Sightseeing Experience:**
    - Destination feature cards for Ravangla Monastery, Temi Tea Garden, Tendong Hill, and Namchi Char Dham.

11. **Multi-Step Yogini Nomination Form:**
    - 4-step wizard:
      - **Step 1:** Personal Information (Name, Email, Phone, Age, City, State, Country)
      - **Step 2:** Professional & Yogic Background (Role, Experience, Institution, Bio, Achievements, Impact)
      - **Step 3:** Award Nomination (Category, Level, Reason, Portfolio Link)
      - **Step 4:** Review Summary & Consent (Full interactive summary, edit links, privacy consent)
    - Full client-side validation, error messages, and unique Application ID generator (`YOGINI-2027-XXXXXX`).
    - Duplicate submission prevention and printable application slip.

12. **Private Google Sheets Backend Integration:**
    - Secure Google Apps Script backend (`js/google-apps-script.js`).
    - Formula injection sanitization (escapes `=`, `+`, `-`, `@`).
    - Automatic timestamping and restricted organizer access.
    - Offline fallback to `localStorage` when webhook is not yet configured.

---

## 📁 Project Structure

```
├── index.html                   # Main semantic HTML5 landing page
├── css/
│   └── style.css               # Tailored modern CSS design system
├── js/
│   ├── app.js                  # Frontend controllers, validation & animations
│   └── google-apps-script.js   # Backend Google Apps Script code for organizers
├── assets/
│   ├── images/                 # Official logos, venue photos, trophy & destinations
│   ├── gallery/                # Authentic YoginiIndia event gallery photos
│   └── posters/                # Reference poster files
├── server.js                    # Built-in lightweight local web server
└── README.md                    # Documentation & setup guide
```

---

## 🚀 How to Run Locally

1. Open a terminal in this directory.
2. Start the lightweight Node.js server:
   ```bash
   node server.js
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8080/
   ```

*(Alternatively, you can open `index.html` directly in any modern browser!)*

---

## 🔒 Private Google Sheets Setup (Organizer Guide)

1. Create a new Google Sheet named **"7th International Yogini Awards 2027 Nominations"**.
2. Keep sharing settings strictly **Restricted** (private to authorized organizers).
3. In **Extensions > Apps Script**, paste the contents of [`js/google-apps-script.js`](js/google-apps-script.js).
4. Click **Deploy > New deployment**, select **Web app**, set execute as **Me**, and access to **Anyone**.
5. Copy the generated Web App URL.
6. In `js/app.js` (or in `<head>` of `index.html`), set:
   ```javascript
   window.YOGINI_CONFIG = {
     googleSheetWebhookUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   };
   ```
7. All submitted applications will now be securely piped directly into your private Google Sheet in real time!
