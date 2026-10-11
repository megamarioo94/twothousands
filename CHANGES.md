# Changes

This is the live, short-lived implementation queue for the app. It is not a backlog, design rationale or changelog.

## How to use this document

1. Add only a change that is ready for someone to build. Give it a clear outcome and acceptance check.
2. The implementer updates the app, tests the affected flow, then marks the request **done** in their pull request or commit.
3. After the requester has verified it, remove the completed request and its notes from this file. Keep this document clean for the next request.
4. If a request needs a decision, write the question here rather than guessing. Do not begin it until the decision is resolved.
5. Long-term rules belong in `PRD.md` or `DESIGN_SYSTEM.md`, not here.

## Open changes

## Implementation order

1. Add the visual tokens below to the app’s global stylesheet.
2. Replace the wordmark and browser/share name with `two thousand`.
3. Apply the shared shell classes to home and story screens without changing their existing route or interaction logic.
4. Test at a phone viewport: home, scan/select colour, each story, back/reset.
5. Commit with the relevant C-number, ask for requester verification, then remove the completed C-number from this document.

## Copy/paste visual foundation

Add this once to the global stylesheet. If the app already has token names, map those existing names to these values instead of maintaining two palettes.

```css
:root {
  --paper: #f6f6f3;
  --ink: #141414;
  --muted: #676760;
  --rule: #bcbcb4;
  --acid: #d5ed60;
  --lens-white: #f6f6f3;
  --lens-beige: #c7a476;
  --lens-black: #141414;
  font-family: Arial, Helvetica, sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
}

.app-shell {
  width: min(100%, 560px);
  min-height: 100dvh;
  margin: 0 auto;
  padding: 20px;
  background: var(--paper);
}

.app-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
}

.wordmark {
  color: var(--ink);
  font: 900 24px/1 Arial, Helvetica, sans-serif;
  letter-spacing: -0.055em;
  text-decoration: none;
}

.eyebrow {
  color: var(--muted);
  font: 700 11px/1.2 Arial, Helvetica, sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.display-title {
  margin: 24px 0 12px;
  color: var(--ink);
  font: 800 clamp(42px, 11vw, 48px)/0.96 Arial, Helvetica, sans-serif;
  letter-spacing: -0.07em;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 0;
  font: 800 16px/1 Arial, Helvetica, sans-serif;
  text-decoration: none;
}

.primary-action {
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
}

.secondary-action {
  border: 1px solid var(--ink);
  background: transparent;
  color: var(--ink);
}

.is-active,
.progress-mark { background: var(--acid); }

.lens-white { background: var(--lens-white); border: 1px solid var(--ink); }
.lens-beige { background: var(--lens-beige); }
.lens-black { background: var(--lens-black); color: var(--paper); }
```

**Current implementation target:** `huestory-3d/index.html`. It is a single-file HTML/CSS/JavaScript prototype. The class names in the block above are a reference; use the direct replacements below for this version.

### C-001 — Make `two thousand` the app wordmark

**Outcome**

Replace the public-facing `HUEstory` wordmark in the app header/home screen with the lowercase wordmark **two thousand**. Keep the descriptor **Singapore through colour** where it helps explain the product.

**Visual rules**

- Use the app’s existing system sans stack: `Arial, Helvetica, sans-serif`.
- Use bold near-black type (`#141414`), no custom illustrated logo, icon or decorative typeface.
- Preserve the current quiet editorial layout and square-corner visual system.
- Acid lime (`#D5ED60`) may remain a small interface accent but is not part of the wordmark.

**Copy/paste markup**

Use the equivalent component syntax for the app’s framework:

```html
<header class="app-header">
  <a class="wordmark" href="/" aria-label="two thousand home">two thousand</a>
  <span class="eyebrow">SG / 2026</span>
</header>
```

Set the browser title and share metadata to:

```html
<title>two thousand — Singapore through colour</title>
<meta name="description" content="Discover Singapore's lost and transformed history through colour." />
```

**Direct replacements in `huestory-3d/index.html`**

```html
<!-- Replace the current title element -->
<title>two thousand — Singapore through colour</title>

<!-- Replace the current header brand button -->
<button class="brand" onclick="go('home')" aria-label="two thousand home">two thousand</button>

<!-- Replace the current footer -->
<div class="footer">TWO THOUSAND © 2026 / COMMON GROUND MAKEATHON</div>

<!-- Replace the current About heading -->
<h2>About two thousand.</h2>
```

Then replace the existing `.brand` CSS with this. It deliberately removes the lime punctuation treatment from the logo while preserving the existing header layout.

```css
.brand {
  color: var(--ink);
  font: 900 24px/1 Arial, Helvetica, sans-serif;
  letter-spacing: -0.055em;
  border: 0;
  background: none;
  padding: 0;
}
```

Remove the unused `.brand i` rule after the header has no `<i>` element.

**Acceptance check**

- The first visible product name is `two thousand` on the home screen and story screens.
- `HUEstory` does not appear as a competing product name in the interface, browser title or share metadata.
- The app still builds and the home-to-story flow works on a phone viewport.

**Reference**: `DESIGN_SYSTEM.md` — Brand architecture and typography.

### C-002 — Align the app shell to the shared design system

**Outcome**

Apply the v1.0 shared design language to the home screen and story-screen shell. This is a UI treatment pass, not a redesign of the information architecture or the history interactions.

**Requirements**

- Use `#F6F6F3` for the paper canvas, `#141414` for primary text/actions, `#676760` for secondary text, `#BCBCB4` for rules, and `#D5ED60` only for small active/navigation signals.
- Use `Arial, Helvetica, sans-serif`; strong 800–900 headlines; uppercase metadata at 10–12 px with tracking.
- Keep square corners, thin rules and calm spacing. Do not add gradients, sepia, gold, rounded cards or new decorative fonts.
- Preserve the three lens associations: white/Majestic, beige/Jackson Plan and black/Singapore Stone.
- Ensure white-lens panels retain a visible ink or border edge against the paper background.

**Direct token replacement in `huestory-3d/index.html`**

Replace its current root declaration with this expanded version. The existing `--bg`, `--ink`, `--muted`, `--border` and `--acid` names remain unchanged, so this does not require a JavaScript rewrite.

```css
:root {
  --bg: #f6f6f3;
  --ink: #141414;
  --muted: #676760;
  --border: #bcbcb4;
  --acid: #d5ed60;
  --lens-white: #f6f6f3;
  --lens-beige: #c7a476;
  --lens-black: #141414;
}
```

For both existing palette blocks, replace the beige inline style:

```html
<!-- Before -->
<span class="paint" style="background:#b49b7c"></span>

<!-- After -->
<span class="paint" style="background:var(--lens-beige)"></span>
```

Do not change the routing, camera classification, story data, viewer JavaScript or source links in C-002.

**Acceptance check**

- Home and all three story shells use the stated tokens and type hierarchy.
- Acid lime reads as an interface signal rather than a story/lens colour.
- The existing navigation and story content continue to work at a phone viewport.

**Reference**: `DESIGN_SYSTEM.md` — Colour system, typography and layout rules.

### C-003 — Integrate Jackson Plan and the local collection reward

**Outcome**

Replace the current generic Jackson canvas branch with the verified original 2.5D Jackson Plan component. Connect its three discoveries to a persistent local collection counter and the all-stories reward view.

**Source package**

Use `prototype/jackson-plan-v1/` as supplied:

- `jackson-plan.svg`
- `jackson-plan.css`
- `jackson-plan.js`
- `jackson-plan-hotspots.json`
- `README.md`

Do not substitute the NAS map image or trace it. The component is an original explanatory schematic because NAS permits viewing while requiring permission for use/reproduction of its digital image.

**Integration requirements**

- Copy the package into the direct Netlify deployment folder and load its CSS/JS from `huestory-3d/index.html`.
- In the Jackson story branch, mount `JacksonPlan` instead of calling the generic canvas renderer.
- Listen for `jacksonplan:collected`, then call an app-owned `markStoryCollected("jackson-plan")` function.
- Keep the existing Jackson source URL, accession reference and the component disclosure visible.
- Store a set of collected story IDs in `localStorage`; calculate the denominator from `STORIES.length`.
- Unlock the local Singapore Through Colour poster only when every currently published story ID is collected. Include a reset-collection control.
- Revise the privacy text: collection progress is stored locally on the device; no camera image, location or data is uploaded.

**Acceptance check**

- Jackson supports one-finger pan, pinch zoom, wheel zoom, explicit zoom controls and reset on the mobile viewport.
- Its three discoveries each reveal the approved copy; after the third, one `jacksonplan:collected` event fires.
- The app counter survives refresh on the same device, but no data is sent to a server.
- The reward view appears only after every published story is collected and reset clears it.
- The direct Netlify deployment still works offline after the service worker cache is populated.

**Reference**: `docs/history/JACKSON_PLAN_CONTENT_BRIEF.md` and `prototype/jackson-plan-v1/README.md`.

<!-- Remove a completed request in full after it is implemented and requester-verified. Add new ready-to-build changes above this line. -->
