```markdown
# Design System Strategy: Ultra-Dark Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Stoic Monolith."** 

This system moves beyond the typical "dark mode" (which often relies on muddy greys) to embrace a true, high-contrast, ultra-black aesthetic. It draws inspiration from premium editorial journals and brutalist architecture—prioritizing raw structural clarity, immense negative space, and a sense of "digital silence." By utilizing #000000 as a foundational base, we create a void that allows monochromatic 3D organic renders to feel like physical sculptures emerging from the dark.

The layout intentionally breaks the standard mobile grid. We use **aggressive asymmetry**, where headers might be tucked into corners or vertically aligned, and large-scale typography creates a rhythmic, pacing effect that mimics the intentionality of a self-improvement journey.

---

## 2. Colors & Surface Logic
The palette is a disciplined study in monochromatic depth.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Structural separation must be achieved through **Tonal Transitions**. 
- Use `surface-container-low` (#1B1B1B) to distinguish a footer from a `surface` (#131313) body.
- Let the void define the boundary. High-end design is about what you leave out.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of materials. 
1. **Base Layer:** `surface-container-lowest` (#0E0E0E) or `surface` (#131313).
2. **Component Layer:** `surface-container` (#1F1F1F) for cards.
3. **Elevated Layer:** `surface-bright` (#393939) for active states or floating modals.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat," use **Glassmorphism** for navigation and floating action elements. Apply a `surface` color at 70% opacity with a 20px backdrop-blur. 
**Signature Texture:** Main call-to-actions (CTAs) should utilize a subtle linear gradient from `primary` (#FFFFFF) to `primary-container` (#D4D4D4) at a 45-degree angle to give white elements a metallic, premium sheen.

---

## 3. Typography
We utilize a pairing of **Plus Jakarta Sans** for expressive displays and **Inter** for functional reading.

*   **Display (Plus Jakarta Sans - Bold):** Used for "Momentum" metrics and major section headers. The goal is "Oversized Authority." Large tracking (e.g., -2%) on `display-lg` creates a tight, cinematic look.
*   **Headline & Title (Plus Jakarta Sans - Medium/Bold):** Provides the narrative structure. High contrast between `headline-lg` (White) and `label-sm` (Deep Grey #888888) is essential.
*   **Body (Inter - Regular):** Set with generous line-height (1.6) to ensure the ultra-dark background doesn't cause eye strain.
*   **Labels (Inter - Bold):** All-caps for secondary metadata to reinforce the "Brutalist" aesthetic.

---

## 4. Elevation & Depth
Depth in this system is a result of light simulation, not drop-shadow presets.

*   **The Layering Principle:** Instead of shadows, use `surface-container-high` (#2A2A2A) nested inside `surface-container-lowest` (#0E0E0E). The contrast in hex values creates a "natural lift."
*   **Ambient Shadows:** If an element must float (like a modal), use a shadow with a blur of 40px, 0px offset, and 8% opacity of `on-surface` (#E2E2E2). This mimics a soft glow rather than a heavy shadow.
*   **The "Ghost Border":** For Brutalist cards where definition is required, use `outline-variant` (#474747) at 20% opacity. It should be felt, not seen.
*   **3D Momentum Visuals:** Monochromatic spheres and waves should be placed behind text layers but above the background, using `surface_tint` (#C6C6C7) to catch "virtual light."

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#FFFFFF) background, `on-primary` (#1A1C1C) text. Roundedness: `full`.
*   **Secondary:** `surface-container-highest` (#353535) background with a "Ghost Border."
*   **Interaction:** On press, the button should scale to 96% rather than changing color.

### Cards & Lists
*   **The "No Divider" Rule:** Never use lines to separate list items. Use `spacing-8` (2rem) of vertical white space or a subtle shift to `surface-container-low` for every second item.
*   **Brutalist Cards:** Large, bold titles with `spacing-4` (1rem) padding. Use `rounded-xl` (0.75rem) for a modern yet sturdy feel.

### Input Fields
*   Background: `surface-container-lowest` (#0E0E0E).
*   Border: Bottom-only "Ghost Border" that transforms into a 2px `primary` (#FFFFFF) line on focus.

### Navigation
*   **Bottom Bar:** Use the Glassmorphism rule (70% opacity + blur). Icons are minimalist 24px strokes. The active state is indicated by a shift from `on-surface-variant` (#C6C6C6) to `primary` (#FFFFFF), with no background "pill" container.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the Void:** Use `spacing-20` (5rem) between major sections. Let the black background breathe.
*   **Use Intentional Asymmetry:** Align progress text to the left and 3D renders to the right, slightly bleeding off the screen edge.
*   **Layering:** Place `on-surface-variant` text on `surface-container` backgrounds to maintain high accessibility.

### Don't:
*   **Avoid "Pure" Grey Borders:** Never use #888888 for a border; it is an accent color for text only.
*   **No Standard Shadows:** Avoid the Material Design "floating" shadow. It breaks the Monolith aesthetic.
*   **No Dividers:** If the UI feels cluttered, add space, don't add lines.
*   **Avoid Colors:** Aside from the `error` (#FFB4AB) tokens, keep the UI strictly monochromatic to let the "Momentum" 3D renders be the only source of visual complexity.```