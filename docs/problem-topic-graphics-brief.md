# Problem section — topic graphics brief (Figma)

**Page:** `/for-you#problem`  
**Frame name:** `Problem / Topic illustrations`  
**Purpose:** Eight carousel topics + three fixed “pillar” icons. Show **inconvenience and confusion**, not product features.

---

## Brand style (match existing assets)

Reference files in `public/images/`:

- `document-organisation-folder.png`
- `estate-visualisation.png`
- `guided-care-plan.png`
- `grief-awareness.png`

| Token | Use |
|--------|-----|
| Primary yellow | `#FFC12D` / `#FFD761` (warm fills) |
| Accent blue | `#3AB0FF` (secondary shapes) |
| Pale blue | `#B1E1FF` (tertiary) |
| Deep yellow | `#E8A820` (shadows / second tabs) |

- **Style:** Flat, rounded (“bubbly”) corners, no gradients, no outlines unless 2px soft separator
- **Background:** Transparent PNG (art sits on `var(--card)` / `var(--bg-2)` in UI)
- **Stroke:** Hand-drawn softness OK (like `guided-care-plan.png`), but keep shapes simple
- **Mood:** Stuck, fragmented, unclear — **not** solved, not celebratory

---

## Export spec

### A. Topic illustrations (×8) — carousel + right panel hero

| Setting | Value |
|---------|--------|
| **Canvas** | 240 × 240 px |
| **Safe area** | 200 × 200 px centred (20 px padding) |
| **Format** | PNG-24, transparent |
| **Display size (web)** | 96–104 px inside 120–128 px card |
| **@2x export** | 480 × 480 px optional; site uses 112 logical px |

**Filename pattern (required):**

```
public/images/problem-topic-{id}.png
```

| `id` | Headline slot word | Accordion title |
|------|-------------------|-----------------|
| `estate` | estate | Estate |
| `probate` | probate | Probate |
| `inheritance` | inheritance | Inheritance |
| `will` | will | The will |
| `funeral` | funeral | Funeral planning |
| `benefits` | benefits | Benefits |
| `government` | paperwork | Government paperwork |
| `accounts` | accounts | Closing accounts |

### B. Pillar illustrations (×3) — fixed row under topic (already live)

| File | Label |
|------|--------|
| `estate-visualisation.png` | Where to begin |
| `document-organisation-folder.png` | The paperwork |
| `guided-care-plan.png` | While you grieve |

Pillar display: **72–80 px** inside 88 px tall tile. Optional refresh later as `problem-pillar-{slug}.png` — not required for v1.

---

## Figma frame layout (one page)

```
┌─────────────────────────────────────────────────────────────┐
│  Problem topics @2x (480)          Problem topics @1x (240) │
│  [estate][probate][inheritance][will]                        │
│  [funeral][benefits][government][accounts]                   │
│                                                              │
│  ─── Spec strip ───                                          │
│  Safe 200×200 · PNG transparent · No text in art               │
└─────────────────────────────────────────────────────────────┘
```

Duplicate each icon as a **component** named `problem-topic/{id}` for handoff.

---

## Topic briefs (concept + alt text)

Copy **alt text** exactly into Figma description field; it is wired in `src/lib/content.ts`.

### 1. Estate — `problem-topic-estate.png`

**Inconvenience:** Property, assets, and who handles what have no clear map while grieving.

**Concept:** Pie chart with **gap** or missing slice; or house + key + piggy bank with **broken dotted lines** between them.

**Alt:** `Estate split into pieces with no clear map`

**Avoid:** Mansion/luxury; solved “complete” pie.

---

### 2. Probate — `problem-topic-probate.png`

**Inconvenience:** Forms, thresholds, legal steps opaque when you want one straight answer.

**Concept:** Stack of 2–3 forms; top form has empty box + **?**; or checkbox **maze** (3 turns, dead end).

**Alt:** `Probate forms and legal steps that feel unclear`

**Avoid:** Gavels, courtrooms, scales of justice (too heavy).

---

### 3. Inheritance — `problem-topic-inheritance.png`

**Inconvenience:** Who gets what, when — unclear until you’re deep in admin.

**Concept:** Envelope or gift with **?**; or **forked path** (now / later) with longer faded branch; dotted family tree.

**Alt:** `Inheritance with uncertain who gets what and when`

**Avoid:** Fighting hands, money bags, coins.

---

### 4. Will — `problem-topic-will.png`

**Inconvenience:** Find it, read it, understand it without a solicitor on call.

**Concept:** Document with **folded corner** + magnifying glass on blurred lines; or sealed envelope + key.

**Alt:** `A will that is hard to find and understand`

**Avoid:** Scroll with wax seal drama; readable legal text.

---

### 5. Funeral — `problem-topic-funeral.png`

**Inconvenience:** Urgent emotional choices; prices hard to compare calmly.

**Concept:** **Three price tags** on identical rounded shapes; or calendar with **today** circled and crowded dates; misaligned heart + checklist.

**Alt:** `Funeral choices and costs that are hard to compare`

**Avoid:** Hearse, veil, religious symbols unless brand chooses explicitly.

---

### 6. Benefits — `problem-topic-benefits.png`

**Inconvenience:** Entitlements you didn’t know existed; buried in gov sites; letters arrive late.

**Concept:** Envelope + **late clock**; folder with hidden tab **?**; generic browser window with too many links, one **?**

**Alt:** `Benefits and entitlements that are easy to miss`

**Avoid:** DWP/ HMRC logos, real scheme names.

---

### 7. Government paperwork — `problem-topic-government.png`

**Inconvenience:** Registers, notifications, departments don’t talk; deadlines move.

**Concept:** **Three misaligned stamps** on one form; paper chain with one wrong-colour link; calendar with **crossed-out and rewritten** dates.

**Alt:** `Government departments and deadlines that do not align`

**Note:** Different from pillar “folder” — this is **multi-agency** chaos.

---

### 8. Closing accounts — `problem-topic-accounts.png`

**Inconvenience:** Bank, utilities, subscriptions — each different process, proof, hold music.

**Concept:** Row of **4 generic app tiles** (bank, bolt, wifi, card) each with different tiny badge; or **headphones + wavy lines** (hold music); one key, many keyholes.

**Alt:** `Many accounts each with a different closing process`

**Avoid:** Real bank logos.

---

## UI placement (for alignment)

```
┌──────────────────────────────────────┐
│  ┌────────┐  Title                     │
│  │ TOPIC  │  Body copy…                │
│  │ 120px  │                            │
│  └────────┘                            │
│  [pillar] [pillar] [pillar]  72–80px   │
│  ● We're here to help                  │
└──────────────────────────────────────┘
```

- Topic card: **120×120** (md **128×128**), border `var(--border-subtle)`, bg `var(--card)`
- Topic art: **96×96** (md **104×104**) `object-contain` centred

---

## Handoff checklist

- [ ] 8 PNGs exported to `public/images/problem-topic-*.png`
- [ ] Transparent background, no embedded text
- [ ] Visually consistent weight (line thickness, corner radius) across set
- [ ] Alt text matches table above
- [ ] Optional: drop `@2x` files as `problem-topic-estate@2x.png` (not wired yet; 1x is enough)

**After export:** Replace placeholder files (currently copies of nearest brand icons) and hard-refresh `/for-you#problem`.

---

## Placeholder mapping (until final art)

| File | Temporary source |
|------|------------------|
| `problem-topic-estate.png` | `estate-visualisation.png` |
| `problem-topic-probate.png` | `guided-care-plan.png` |
| `problem-topic-inheritance.png` | `estate-visualisation.png` |
| `problem-topic-will.png` | `document-organisation-folder.png` |
| `problem-topic-funeral.png` | `grief-awareness.png` |
| `problem-topic-benefits.png` | `document-organisation-folder.png` |
| `problem-topic-government.png` | `share-documents.png` |
| `problem-topic-accounts.png` | `share-documents.png` |
