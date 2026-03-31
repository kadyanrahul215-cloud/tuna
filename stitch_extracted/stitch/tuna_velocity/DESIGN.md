# Design System Strategy: The Architectural Intelligence

## 1. Overview & Creative North Star
**The Creative North Star: "The Precision Architect"**

For TUNA Business Solutions, we are moving away from the cluttered, "boxed-in" feel of traditional B2B dashboards. This design system is built on the principle of **The Precision Architect**. It treats data not as a series of chores, but as a high-end editorial experience. 

The aesthetic identity is defined by "Organic Precision"—where the mathematical rigidity of B2B operations meets the fluidity of a premium lifestyle brand. We achieve this through **intentional asymmetry**, massive typographic scales that command authority, and a rejection of the "grid-line" crutch. The goal is to make the platform feel like a bespoke workspace rather than a generic utility.

---

## 2. Color & Surface Philosophy
The palette is rooted in a deep, authoritative `primary` blue, supported by a sophisticated neutral foundation that breathes.

### The "No-Line" Rule
**Borders are a design failure.** In this system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts or tonal transitions.
- Use `surface-container-low` for secondary sections sitting on a `surface` background.
- Use `surface-container-lowest` to elevate a card above a `surface-container` section.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "frosted glass" or "fine paper." 
- **Tier 0 (Foundation):** `surface` (#f9f9f7)
- **Tier 1 (Sub-sections):** `surface-container` (#eeeeec)
- **Tier 2 (Interactive Elements):** `surface-container-highest` (#e2e3e1)
- **Layering Logic:** To highlight a specific data set, nest a `surface-container-lowest` (#ffffff) card inside a `surface-container-high` (#e8e8e6) wrapper. This creates a soft "lift" that guides the eye without visual noise.

### The "Glass & Gradient" Rule
To inject "soul" into the B2B experience, use Glassmorphism for floating navigation and modal overlays.
- **Glass Effect:** Apply `surface` at 70% opacity with a `24px` backdrop-blur.
- **Signature Gradients:** For Hero CTAs and high-level KPI cards, use a linear gradient from `primary` (#003fb1) to `primary_container` (#1a56db) at a 135-degree angle. This adds depth and professional polish that flat color lacks.

---

## 3. Typography: Editorial Authority
We pair the high-performance legibility of **Manrope** (Body) with the structural elegance of **Plus Jakarta Sans** (Display/Headlines).

| Level | Token | Font | Size | Weight | Character |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | 700 | Extra-bold, tight tracking (-0.02em) |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | 600 | Authoritative, clean |
| **Title** | `title-lg` | Manrope | 1.375rem | 600 | High readability for data headers |
| **Body** | `body-lg` | Manrope | 1rem | 400 | Relaxed line height (1.6) |
| **Label** | `label-md` | Manrope | 0.75rem | 500 | All-caps for metadata |

**Editorial Note:** Use `display-lg` sparingly for empty states or dashboard greetings to break the "data-heavy" monotony with a moment of high-end brand personality.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." We use light and tone to define space.

- **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface-container-lowest` card on a `surface-container-low` background creates a natural, soft lift.
- **Ambient Shadows:** When a float is required (e.g., a dropdown), use the `on-surface` color at 4% opacity with a `40px` blur. It should feel like a soft glow of light, not a dark shadow.
- **The "Ghost Border":** If accessibility requires a stroke (e.g., in high-contrast scenarios), use `outline-variant` at 15% opacity. Never use a 100% opaque border.
- **Interactivity:** On hover, instead of a shadow, shift the container color one tier higher (e.g., `surface-container` moves to `surface-container-high`).

---

## 5. Components
All components follow the defined `Roundedness Scale`: `DEFAULT (1rem)` for cards and `full (9999px)` for interaction points.

### Buttons & Search
- **Primary:** `primary` background, `on-primary` text. Radius: `full`.
- **Secondary:** `secondary_container` background. Radius: `full`.
- **Search Bar:** Must use the `full` radius with a `surface-container-highest` background. No border.

### Inputs & Fields
- **Styling:** Use `surface-container-low` as the input fill. 
- **Focus State:** A 2px "Ghost Border" using `primary` at 30% opacity.
- **Validation:** Errors use `error` (#ba1a1a) text but the background should remain neutral to avoid "alarming" the user unnecessarily.

### Cards & Data Lists
- **The "No-Divider" Rule:** Forbid 1px dividers between list items. Use `spacing-6` (1.5rem) of vertical white space or subtle alternating background shifts (`surface` vs `surface-container-low`).
- **Radius:** All cards must strictly use `DEFAULT` (1rem / 16px).

### Custom Component: The "Insight Float"
For TUNA's data-driven nature, create "Insight Floats"—small, semi-transparent `surface-variant` chips that overlay charts to provide context without obscuring data.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `display-lg` typography to create "asymmetric anchors" in your layout.
- **Do** lean heavily on white space (`spacing-12` and above) to separate major modules.
- **Do** ensure a smooth dark mode transition by mapping `surface` to the dark background (#0f0f0e) while maintaining the same tonal hierarchy logic.

### Don’t:
- **Don’t** use a black (#000000) shadow. Always tint shadows with the `primary` or `on-surface` hue.
- **Don’t** use "Card-in-Card" layouts with borders. Use a `surface-container` shift to show nesting.
- **Don’t** use a border-radius less than `1rem` for any container. We want a soft, approachable professional feel.