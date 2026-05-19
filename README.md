# Arman Mohebali — Premium 3D Chess Portfolio

A bilingual (English / Persian) personal resume website built around a 3D chess concept: a fully interactive marble & gold chessboard renders in the hero, where each piece represents a section of the resume.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **React Three Fiber** + Three.js + Drei (3D scene)
- **Framer Motion** (premium animations)
- **Tailwind CSS** (utility-first styling with custom gold/onyx theme)
- **next/font** for Cormorant Garamond + Inter + JetBrains Mono + Vazirmatn

## Sections

1. **Hero** — Cinematic 3D chess scene with clickable pieces
2. **About** — Bio + profile stats + contact card
3. **Skills** — Three categories represented by chess pieces
4. **Experience** — Vertical timeline with company highlights
5. **Projects** — Project cards with live status
6. **Education + Certifications** — Degree + cert list
7. **Publications + Seminars** — Academic papers
8. **Languages** — Pawn-bar proficiency indicator
9. **Contact** — All channels + animated CTA

## Running locally

```bash
cd C:\Users\arman\Desktop\arman_mohebali
npm install
npm run dev
```

Visit http://localhost:3000

## Building for production

```bash
npm run build
npm run start
```

## Folder layout

```
arman_mohebali/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single-page composition + locale state
│   └── globals.css         # Premium theme tokens + utilities
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx       # R3F canvas + lighting + camera
│   │   ├── ChessBoard.tsx  # 8x8 squares + gold frame
│   │   └── ChessPiece.tsx  # Lathe-geometry pieces (king/queen/etc.)
│   ├── sections/           # One file per resume section
│   └── ui/
│       ├── LanguageSwitcher.tsx
│       ├── Navigation.tsx  # Side rail with chess glyphs
│       └── SectionHeading.tsx
├── data/
│   ├── resume.ts           # All resume content (bilingual)
│   └── i18n.ts             # UI strings
└── tailwind.config.ts      # Custom gold/onyx/ivory palette
```

## Design system

- **Palette**: Onyx (`#0a0a0a`), Gold (`#d4af37`), Ivory (`#f5f1e8`)
- **Typography**: Display (Cormorant Garamond) for headings, Inter for body, Vazirmatn for Persian, JetBrains Mono for code/labels
- **Motion**: All sections fade-and-rise on enter; pieces float and rotate; gold shimmer on hero title
- **Glass panels**: backdrop-blur + saturate + 1px gold-tinted border

## Notes

- Chess pieces are procedurally generated with `LatheGeometry` profiles — no external 3D models required.
- The 3D scene is dynamically imported with SSR disabled (Three.js needs the window).
- Direction (`dir="rtl"`) switches automatically with locale; layout & timeline mirror.
