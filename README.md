# Arman Mohebali — Chess-Board Portfolio

A truly single-screen, scroll-free portfolio: the **entire site is a 3D chessboard**.

The 8 files of the board map to the 8 sections of the resume. The 8 ranks of each file are the items of that section. You move your gold knight onto any glowing square to read that line of the story.

```
        A          B          C          D          E          F          G          H
   Header+Contact  About      Skills     Experience Projects   Education  Publications Languages
8  ┌─────────┐  ┌─────────┐  …                                                            ┐
7  │  ♚      │  │  ♔      │
6  │  bio    │  │  bio    │
5
4
3
2
1  └─────────┘                                                                            ┘
```

---

## ⚠️ Local fonts you need to add

`public/fonts/`:

```
Vazirmatn-Regular.woff2          (Persian body)    ← you have it
Vazirmatn-Bold.woff2             (Persian display) ← you have it
Inter-Regular.ttf                (Latin body)
Inter-Medium.ttf                 (Latin body)
CormorantGaramond-Medium.ttf     (Latin display)
CormorantGaramond-Bold.ttf       (Latin display)
```

Source (both Latin families are free on Google Fonts):
- <https://fonts.google.com/specimen/Inter> → Download family → use `static/Inter-Regular.ttf` + `static/Inter-Medium.ttf`
- <https://fonts.google.com/specimen/Cormorant+Garamond> → Download family → use `CormorantGaramond-Medium.ttf` + `CormorantGaramond-Bold.ttf`

If files are missing, the page falls back to system fonts — nothing breaks.

No remote CDN dependencies anywhere in the project (no Google Fonts loader, no HDRI from drei). 100% offline once installed.

---

## Stack

- **Next.js 14** + React 18 + TypeScript
- **React Three Fiber** + Three.js + Drei
- **Framer Motion** for the cell-panel transitions
- **Tailwind CSS** (custom gold / onyx / ivory palette)
- All fonts loaded via local `@font-face`

---

## Run

```bash
cd C:\Users\arman\Desktop\arman_mohebali
npm install
npm run dev
```

http://localhost:3000

---

## How the experience works

- **Boot** → camera tilts down to the gold-framed chessboard; the player **knight** glides to cell **A8** (the welcome line).
- **Look around** → drag to orbit the board, scroll wheel to zoom in/out.
- **Filled squares glow** (small gold ring). Empty squares stay dim.
- **Click any glowing square** → knight jumps there with an arc animation, the floating glass panel updates with the content of that cell.
- **Click a column label** (top of board) → knight jumps to that section's first filled item.
- **Arrow keys** → step one square at a time. **Enter / Space** → next filled square.
- **Prev / Next** in the panel → walk through all filled cells in board order.
- **EN ⇄ FA pill** (top-right) → bilingual instant swap, with RTL mirroring of HUD.

---

## Sections (one column each)

| File | Section | Highlights |
|---|---|---|
| **A** ♚ | Header + Contact | name · location · email · website · LinkedIn · GitHub · Telegram · WhatsApp |
| **B** ♔ | About Me | bio · focus · stacks (Python / Flutter / WP) · growing into DS / ML / LLMs |
| **C** ♘ | Skills | WordPress · Figma · Python+Dart · Flutter+HTML · Linux+Git · SEO · n8n+Docker · GH+Claude+Postman |
| **D** ♕ | Experience | tadnaco (current) · championsshop1 · pixlweb — with stack/impact/portfolio splits |
| **E** ♖ | Projects | Nootika Reminder — full breakdown across 8 cells |
| **F** ♗ | Education + Certs | Shamsipour · grade · PCAP · Forage · Faradars |
| **G** ♙ | Publications | 3 CIVILICA papers + themes |
| **H** ♟ | Languages | Persian · English — level cells + growth goal |

Cells with no content for that rank are simply empty squares (no glow, panel shows "Empty square"). You can fill them later in `data/cells.ts`.

---

## Folder layout

```
arman_mohebali/
├── app/
│   ├── layout.tsx              # Root + body lock (no scroll)
│   ├── page.tsx                # The whole site: state + Scene + HUD + Panel
│   └── globals.css             # @font-face (TTF latin + woff2 Persian) + theme
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx           # R3F canvas, lights, orbit/zoom
│   │   ├── ChessBoard.tsx      # 64 interactive squares + gold frame + indicators
│   │   └── PlayerKnight.tsx    # Animated gold knight (arc-jump to target cell)
│   └── ui/
│       ├── BoardHud.tsx        # Top brand + column tabs + rank labels + hint
│       ├── CellPanel.tsx       # Floating glass panel with current cell content
│       └── LanguageSwitcher.tsx
├── data/
│   └── cells.ts                # ⭐ Content map: 8 columns × 8 cells, bilingual
├── public/
│   └── fonts/                  # ⬅ drop your .ttf / .woff2 files here
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Customising

Edit `data/cells.ts`:

```ts
{
  eyebrow: t("Cert · F4", "گواهی · F۴"),
  title: t("PCAP — Python Programming", "PCAP — برنامه‌نویسی پایتون"),
  subtitle: t("Everest IT Academy", "آکادمی Everest IT"),
  icon: "🐍",
}
```

- Add new items by replacing `null` slots with a cell object.
- Reorder by moving objects within the `cells` array (index 0 = rank 8 back row, index 7 = rank 1 front row).
- Rename a section by editing `label` on the column.

That's the whole content surface. The 3D world reacts automatically: indicators appear on filled squares, column tabs reflect the new label, the knight can land there.
