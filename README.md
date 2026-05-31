# Arman Mohebali — Portfolio

A bilingual (EN / FA) portfolio with **two complementary modes**:

| Route | Mode | What it is |
|---|---|---|
| `/` | **Resume** | Classic scroll-driven portfolio with a 3D chess hero + 8 detailed sections |
| `/board` | **Interactive chessboard** | Single-screen 3D experience — every column = one resume section, every square = one item. Move the knight to read. |

The Hero section on `/` has a **"Care to play on the board?"** CTA that flips the visitor into the interactive `/board` mode. From `/board`, a small **Resume** link in the corner returns to the long-scroll page.

---

## ⚠️ Local fonts you need to add

`public/fonts/`:

```
Vazirmatn-Regular.woff2          (Persian body)         ← you have it
Vazirmatn-Bold.woff2             (Persian display)      ← you have it
Inter-Regular.ttf                (Latin body)
Inter-Medium.ttf                 (Latin body)
CormorantGaramond-Medium.ttf     (Latin display)
CormorantGaramond-Bold.ttf       (Latin display)
```

Sources (free, TTF):
- <https://fonts.google.com/specimen/Inter> → "Download family" → use `static/Inter-Regular.ttf` + `static/Inter-Medium.ttf`
- <https://fonts.google.com/specimen/Cormorant+Garamond> → "Download family" → use the matching weights

If files are missing, the page falls back to system fonts — nothing breaks.

No remote CDN dependencies anywhere (no Google Fonts loader, no HDRI from drei). Fully offline once installed.

---

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **React Three Fiber** + Three.js + Drei (3D scene)
- **Framer Motion** for premium animations
- **Tailwind CSS** with custom gold / onyx / ivory palette
- All fonts loaded via local `@font-face`

---

## Run

```bash
cd C:\Users\arman\Desktop\arman_mohebali
npm install
npm run dev
```

Open <http://localhost:3000> for the resume. Click the **"Care to play on the board?"** button (or visit `/board` directly) for the interactive mode.

---

## Folder layout

```
arman_mohebali/
├── app/
│   ├── layout.tsx                # Root layout + metadata
│   ├── page.tsx                  # /  → Resume (Hero + 8 sections)
│   ├── globals.css               # @font-face + theme tokens
│   └── board/
│       └── page.tsx              # /board → Interactive chessboard
│
├── components/
│   ├── 3d/
│   │   ├── HeroScene.tsx         # Decorative scene used by the resume Hero
│   │   ├── ChessBoardDecorative.tsx  # Static 8×8 board (no props)
│   │   ├── ChessPiece.tsx        # Procedural pieces (Lathe geometry)
│   │   ├── Scene.tsx             # Interactive scene for /board
│   │   ├── ChessBoard.tsx        # 64 clickable squares + indicators
│   │   └── PlayerKnight.tsx      # Player's gold knight (arc-jump animation)
│   │
│   ├── sections/                 # Long-scroll resume sections
│   │   ├── Hero.tsx              # ⭐ Hero with 3D scene + CTA → /board
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Publications.tsx
│   │   ├── Languages.tsx
│   │   └── Contact.tsx
│   │
│   └── ui/
│       ├── LanguageSwitcher.tsx  # EN/FA pill (top-right on / and /board)
│       ├── Navigation.tsx        # Side rail with chess glyphs (on /)
│       ├── SectionHeading.tsx    # Reusable ornate heading (on /)
│       ├── BoardHud.tsx          # Column tabs + rank labels (on /board)
│       └── CellPanel.tsx         # Floating cell-content panel (on /board)
│
├── data/
│   ├── resume.ts                 # Bilingual resume content (used by /)
│   ├── i18n.ts                   # UI strings (used by /)
│   └── cells.ts                  # 8×8 cell content map (used by /board)
│
├── public/
│   └── fonts/                    # ⬅ drop your font files here
│
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## The two modes side by side

### `/` — Resume mode (scroll)

1. **Hero** — 3D chessboard with floating pieces, your name + title, and the **CTA button** that says *"Care to play on the board?"* (or *"بیا روی صفحه شطرنج بازی کنیم"* in Persian).
2. **About** — bio + 4 stat cards + contact card
3. **Skills** — 3 categories, each marked by a chess piece glyph
4. **Experience** — vertical timeline with all 3 roles
5. **Projects** — project cards (Nootika Reminder)
6. **Education + Certifications**
7. **Publications + Seminars** — 3 CIVILICA papers
8. **Languages** — pawn-bar proficiency
9. **Contact** — 6 channels + email CTA + footer

### `/board` — Interactive mode (single screen)

- Full-viewport 3D chessboard, no scroll.
- 8 files = 8 sections; 8 ranks of each file = items of that section.
- Filled squares glow gold. Click any → your knight arc-jumps there, the glass panel updates with that item's content.
- Top tabs let you jump to a column (= section).
- Arrow keys / Enter / Prev / Next walk through filled cells.
- A small "Resume" link in the top corner returns to `/`.

---

## Customising content

- **Resume sections** → edit `data/resume.ts` + UI strings in `data/i18n.ts`.
- **Interactive board** → edit `data/cells.ts` (one file with all 8 columns × 8 cells, bilingual).

Both data files are independent; you can update them separately.
