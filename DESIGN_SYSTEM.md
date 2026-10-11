# two thousand — Design System v1.0

## Purpose and source of truth

This document gives the mobile build, history assets and pitch materials one visual language. It is based on the deployed HUEstory interface and the approved Majestic Theatre visual-direction study. Use it for new screens and assets; do not copy the styling of the standalone Majestic browser prototype, which is an interaction review harness and must be re-skinned before integration.

## Brand architecture — founder decision required

Two product names currently exist. They must not compete on the same screen or in the pitch.

| Role | Proposed use | Status |
| --- | --- | --- |
| **two thousand** | Primary hackathon product / pitch name. Set in lowercase. | Existing project name |
| **Singapore through colour** | Product descriptor and positioning line. | Approved live-app language |
| **HUEstory** | Current working app identity in Mega's deployed build. | Resolve before final demo |

**Recommendation:** present the product as **two thousand — Singapore through colour**. Keep **HUEstory** only if it becomes the chosen final product name across the app, QR landing page and pitch deck. Never introduce it as a second logo without that decision.

## Design idea

**Contemporary editorial archive.** The interface should feel like a sharply designed exhibition label: calm paper ground, assertive black type, thin rules and one electric signal colour. It is not a nostalgic scrapbook, a heritage-government portal or a skeuomorphic museum display.

The historical object is allowed to be intricate. The surrounding interface is deliberately restrained so a colour, a building and one clear thought can lead each screen.

## Colour system

Live-app base tokens are copied below. The three story colours identify a lens, not a claim about an object’s historical paint colour.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#F6F6F3` | Primary paper background / cards |
| `--ink` | `#141414` | Headlines, primary actions, rules |
| `--muted` | `#676760` | Secondary copy and metadata |
| `--border` | `#BCBCB4` | Hairline dividers, quiet controls |
| `--acid` | `#D5ED60` | Navigation cue, active state, question mark, progress signal |
| `--desktop-bg` | `#E9E9E5` | Surrounding desktop canvas only |
| `--white-lens` | `#F6F6F3` | Majestic Theatre / white lens |
| `--beige-lens` | `#C7A476` | Jackson Plan / beige lens |
| `--black-lens` | `#141414` | Singapore Stone / black lens |

Rules:

- Acid lime is a **system accent**, never a fourth story colour and never the dominant background of a history screen.
- White needs a visible ink or border edge against the paper background; never place a white card on white without separation.
- Use black fills for the primary action. Use paper fills and ink borders for secondary actions.
- Do not add gradients, gold, sepia washes or more brand colours in v1.0.

## Typography

Use the live-build system stack for the hackathon: `Arial, Helvetica, sans-serif`. This keeps the build reliable in an APK and preserves the bold editorial tone without a font-loading dependency.

| Role | Treatment |
| --- | --- |
| Display headline | 800 weight, tight negative tracking, large and compact line-height; sentence case |
| Screen/story title | 800–900 weight; never a decorative serif |
| Action label | 700–900 weight, compact; arrows and symbols may support but not replace the label |
| Metadata / eyebrow | 700 weight, 10–12 px, uppercase, `0.08em` tracking |
| Body / annotation | 400–500 weight, generous line-height; direct, plain-language copy |

Avoid more than two text sizes in a single story module before body copy. Do not use italic, script, faux archival type or serif typography for the product UI.

## Layout and component rules

- Mobile is the primary canvas. One story should be readable vertically with no horizontal page scrolling.
- Desktop may centre the mobile experience in a calm `--desktop-bg` surround; it must not become a separate desktop product.
- Use square corners (`0px` radius), thin grey rules and ample paper margin.
- Headers use the wordmark on the left and a compact context marker on the right (for example, `SG / 2026`).
- Story cards lead with: collection position, lens colour, date/place, headline, one-sentence premise, then the interactive object.
- Controls are explicit: label drag/pan/zoom, provide Reset, and maintain tap targets large enough for a phone.
- Make the current collection progress visible (for example, `1 / 3 explored`) without gamifying the historical content.

## History-object direction

### Majestic Theatre

Use the approved visual-direction study as the **aesthetic target** for the 3D component: a white, simplified architectural mass; strong dark contouring; pale, restrained shadow; and selectively expressive opera/dragon facade motifs. It is an interpretive architectural study, not a measured replica.

- Keep the model in a framed, paper-like stage with an explicit reconstruction disclosure.
- Preserve the 180-degree facade orbit. Do not show the undocumented rear, interiors or invented side detail.
- Hotspots must identify what is documented, inferred or interpretive. Decorative detail is earned by the evidence register, not added to make the model feel complete.
- The 24-frame output and editable `.blend` source remain the handoff contract.

### Documents and objects

- Documents: neutral canvas, two-finger zoom, edge-safe crop, no ornamental frame.
- Objects: black lens stage, 36-frame object orbit, light only where it helps material form, not as a cinematic effect.

## Motion and accessibility

- Use motion to explain an interaction: a short drag hint, one quiet frame transition, and no auto-spinning model.
- Respect reduced-motion preference: show the poster with step controls.
- Maintain readable ink-on-paper contrast and never communicate selection through colour alone.
- Every visual object has text alternatives, a reset state and a non-gesture control.

## Pitch-deck / QR application

- Pitch slides: `#F6F6F3` background, `#141414` display type, acid only as a small signal. Aim for 3–5 words and one graphic per slide.
- QR download card: black primary download area, generous quiet space around the QR, version and platform information in muted metadata.
- The QR artwork must not be acid-on-paper unless it still scans reliably; default to black QR on `#F6F6F3`.

## Implementation checklist

Before a screen or asset joins the build, confirm:

1. It uses only the token palette and typography above.
2. It has one primary action and clearly subordinate secondary controls.
3. Its story colour is one of white, beige or black; acid is purely a UI signal.
4. It remains legible at phone size and when reduced-motion is enabled.
5. It does not turn an interpretive reconstruction into a factual claim.

