# Vasudev Saras K M — Advanced Robotics & Automation Portfolio + Portfolio Studio

> **"Engineering Intelligence. Designing Motion."**  
> An expressive, interactive engineering studio portfolio and authenticated content management dashboard designed for **Vasudev Saras K M**, Robotics & Automation Engineering student at Saintgits College of Engineering.

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase%20PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github&logoColor=white)](https://thecrazydabi.github.io/Portfolio/)

---

## 1. Architectural Blueprint & Deployment Flow

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               PUBLIC CLIENT BROWSERS                                   │
│            URL: https://thecrazydabi.github.io/Portfolio/ (GitHub Pages)               │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                        Public Read (status = 'published')
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CONTENT LAYER & DUAL ENGINE                               │
│                                                                                        │
│   [Production Cloud Mode: Supabase]                 [Static / Offline Mode]           │
│   • PostgreSQL Database with Strict RLS             • Pre-compiled Seed Data in code  │
│   • Supabase Storage: 'portfolio-media'             • Local Browser State Backup      │
│   • Real Auth: JWT & Refresh Tokens (PKCE)          • JSON Snapshot Export / Import   │
└──────────────────────────────────────────▲─────────────────────────────────────────────┘
                                           │
                         Admin Auth & Full CRUD (Authenticated)
                                           │
┌──────────────────────────────────────────┴─────────────────────────────────────────────┐
│                           PORTFOLIO STUDIO (ADMIN DASHBOARD)                           │
│               Authenticated Personal Publishing Studio for Vasudev Saras K M           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Where Everything Lives

| Component | Host / Storage Location | Access Policy & Protection |
| :--- | :--- | :--- |
| **Public Portfolio** | GitHub Pages (`https://thecrazydabi.github.io/Portfolio/`) | Publicly viewable, fast static Jamstack delivery |
| **Portfolio Studio (Admin)** | Direct client-side authenticated route (same app or hosted URL) | Protected by Supabase Auth (or session key in local dev) |
| **Content Records** | Supabase Cloud PostgreSQL (Tables: `projects`, `certifications`, `experiments`, `skills`, `milestones`, `profile`, `site_settings`) | **Row-Level Security (RLS)**: Public anonymous role can **ONLY** `SELECT` records where `status = 'published'`. Drafts and archived records are strictly invisible. |
| **Media & PDFs** | Supabase Storage (`portfolio-media` bucket) | Public read for published assets; authenticated admin upload/delete with MIME & size validation |
| **Publishing Flow** | Studio Admin publishes record &rarr; Supabase immediately reflects live data &rarr; Public visitors see updates instantly | Offline builds can export JSON snapshots to commit into Git |

---

## 2. Brand Identity & Color Tokens

| Token | Hex Value | Application in System |
| :--- | :--- | :--- |
| **Deep Burgundy** | `#641F36` | Primary brand anchor, primary buttons, major structural joints |
| **Dark Wine** | `#451425` | High-contrast text, dark surface blocks, footer canvas |
| **Warm Cream** | `#F7F0E7` | Main drawing canvas, light surface cards, engineering blueprint paper |
| **Dusky Pink** | `#C28B9A` | Illustration accents, interactive highlights, joint pivot markers |
| **Soft Blush** | `#DFB9BF` | Secondary highlights, dimension annotation lines, subtle borders |
| **Muted Taupe** | `#826D72` | Supporting technical annotations, CAD tolerances, metadata |

---

## 3. Key Engineering Features

### 3.1 Signature Interactive CAD Robotic Arm Assembly
- Custom mathematical forward and inverse kinematics calculations in pure SVG & TypeScript.
- **Harmonic Idle Loop**: Smooth trigonometric breathing animation when resting.
- **Interactive Cursor Tracking**: Move cursor over the arm to dynamically manipulate shoulder, elbow, and wrist angles with real-time degree and Cartesian coordinate HUD readouts.
- **Engineering Tolerances**: GD&T Feature Control Frame (`⌖ Ø 0.05 | A | B | C`), dynamic dimension arcs, and blueprint title block.

### 3.2 Authentic Case Studies & Projects
- **MediArm**: 5-DOF Articulated Assistive Healthcare Manipulator with analytical inverse kinematics, ESP32 dual-core control, and WebSocket teleoperation.
- **V.E.D.A.**: Virtual Engine for Data & Analysis — Local-first CLI AI companion with verified truthful diagnostics and SQLite WAL persistence.
- **VYBE**: AI Travel Discovery & Marketplace with swipe-based exploration, Flask 3.1 serverless backend, and Supabase database.
- **Baja SAE 2027**: SolidWorks CAD synthesis of Ackermann steering geometry, suspension hardpoints, and CAN-bus telemetry.

### 3.3 Systems & Skills Architecture
- Interconnected cyber-physical topology diagram replacing arbitrary percentage bars with verified engineering domains:
  - Robotics & Automation
  - CAD & Mechanical Design
  - Embedded Systems & Microcontrollers
  - AI & Computer Vision
  - Cyber-Physical Security
  - Core Systems & Programming Tools

### 3.4 Portfolio Studio Administration Dashboard
- **Overview**: Real record metrics, draft vs. live status, quick actions.
- **Project Manager**: Full CRUD, draft/published/archived states, featured toggle, tag manager, technical architecture, challenges & solutions, repo & demo URLs, specifications, gallery media order.
- **Certification Manager**: Add/edit credentials, organization, date, verification link, certificate file upload/preview.
- **Experiment Manager**: Lab builds, electronics test notes, CAD prototypes, status tags.
- **Skills Manager**: Five engineering domains with tools and competency tiers.
- **Milestones Manager**: Academic history at Saintgits College of Engineering, competitions, leadership roles.
- **Media Library**: Upload images and PDFs (<15MB), categorize, search, copy URLs.
- **Profile & Links**: Edit bio, headline, contact email, GitHub, LinkedIn, verified resume attachment.
- **Site Settings**: Section visibility toggles, hero copy customization, SEO metadata, JSON backup/restore.

### 3.5 Interactive Chibi Companion (`Vasudev.Chibi`)
- **Visual Likeness**: Miniature animated version of Vasudev Saras K M with voluminous messy black hair with burgundy sheen, trimmed facial hair / chin goatee, rolled-sleeve cream shirt, and burgundy sneakers.
- **9 Dynamic Animated States**:
  - `idle`: Natural breathing and occasional blinking.
  - `greeting`: Waving hand welcoming visitors to the studio.
  - `coding`: Sitting with a glowing miniature terminal laptop actively typing code.
  - `engineering`: Inspecting a mini articulated robotic claw and blueprint card.
  - `thinking`: Hand on chin with a floating CAD idea indicator.
  - `explaining`: Gesturing forward toward relevant portfolio sections.
  - `happy`: Beaming smile celebrating interactive choices.
  - `sleeping`: Resting pose with floating animated "Zzz" bubbles after 45s of inactivity.
  - `celebrating`: Triumphant arms-up pose with celebratory confetti particles and an Easter egg badge.
- **Section-Aware Reactive Intelligence**: Automatically transitions expressions as the visitor scrolls through Hero, Projects, Skills, About, Milestones, and Contact.
- **Easter Egg**: Tapping the chibi 5 times unlocks the secret **"Robotics Overdrive"** protocol!
- **Accessibility & Controls**: Floating bottom-right placement, collapsible dock button, dismissible speech bubble, zero intrusive audio, fully operable via keyboard (`Enter` / `Space` / `Esc`).

---

## 4. Local Development Setup

### Prerequisites
- Node.js `v18+` or `v20+` (tested and verified on Node `v24.18.0`)
- npm `v9+` or `v10+`

### Installation

```bash
# 1. Clone repository
git clone https://github.com/thecrazydabi/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 5. Supabase Backend Setup (Optional Cloud Mode)

To enable live cloud database synchronization and storage:

1. Create a free account at [Supabase](https://supabase.com).
2. Create a new project named `portfolio-studio`.
3. Open the **SQL Editor** tab in your Supabase dashboard.
4. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the editor.
5. Click **Run**. This automatically creates:
   - All 8 tables with proper constraints and types.
   - Row-Level Security (RLS) policies protecting drafts and private data.
   - The `portfolio-media` storage bucket for images and PDFs.
6. Create an administrator user in **Authentication &rarr; Users** (e.g. `vasudevsaraskm@gmail.com`).
7. Create a file named `.env` in the root of your project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_BASE_PATH=/Portfolio/
```

*Note: If no `.env` is configured, Portfolio Studio automatically runs in **Local Dev Mode**, storing changes safely in local storage and providing a 1-click JSON snapshot export.*

---

## 6. GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

### Step-by-Step Instructions:

1. Push your code to your repository:
   ```bash
   git add .
   git commit -m "Deploy: Engineering portfolio and Portfolio Studio"
   git push origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings &rarr; Pages**.
   - Under **Build and deployment &rarr; Source**, select **GitHub Actions**.
3. Every push to `main` or `master` will automatically build the Vite application with base `/Portfolio/` and deploy to:
   **`https://thecrazydabi.github.io/Portfolio/`**

---

## 7. Build Verification & Test Results

```bash
npm run build
```

Build output:
```
dist/index.html                            2.78 kB │ gzip:  1.17 kB
dist/assets/index-AOoXdiMU.css            35.85 kB │ gzip:  6.92 kB
dist/assets/icons-vendor-Wnr10R3M.js      31.44 kB │ gzip:  8.10 kB
dist/assets/react-vendor-C4tR6XrB.js     134.67 kB │ gzip: 43.22 kB
dist/assets/index-CVjaQ51c.js            179.17 kB │ gzip: 37.93 kB
dist/assets/supabase-vendor-s3XNS0mn.js  227.08 kB │ gzip: 58.97 kB
✓ built in 12.51s with 0 errors
```

---

## 8. License & Attribution

Designed and engineered for **Vasudev Saras K M**.  
Built with mechanical precision and visual storytelling.  
Licensed under the [MIT License](LICENSE).
