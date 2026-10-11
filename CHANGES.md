# Changes

This is the live, short-lived implementation queue for the app. It is not a backlog, design rationale or changelog.

## How to use this document

1. Add only a change that is ready for someone to build. Give it a clear outcome and acceptance check.
2. The implementer updates the app, tests the affected flow, then marks the request **done** in their pull request or commit.
3. After the requester has verified it, remove the completed request and its notes from this file. Keep this document clean for the next request.
4. If a request needs a decision, write the question here rather than guessing. Do not begin it until the decision is resolved.
5. Long-term rules belong in `PRD.md` or `DESIGN_SYSTEM.md`, not here.

## Open changes

### C-001 — Make `two thousand` the app wordmark

**Outcome**

Replace the public-facing `HUEstory` wordmark in the app header/home screen with the lowercase wordmark **two thousand**. Keep the descriptor **Singapore through colour** where it helps explain the product.

**Visual rules**

- Use the app’s existing system sans stack: `Arial, Helvetica, sans-serif`.
- Use bold near-black type (`#141414`), no custom illustrated logo, icon or decorative typeface.
- Preserve the current quiet editorial layout and square-corner visual system.
- Acid lime (`#D5ED60`) may remain a small interface accent but is not part of the wordmark.

**Acceptance check**

- The first visible product name is `two thousand` on the home screen and story screens.
- `HUEstory` does not appear as a competing product name in the interface, browser title or share metadata.
- The app still builds and the home-to-story flow works on a phone viewport.

**Reference**: `DESIGN_SYSTEM.md` — Brand architecture and typography.

<!-- Remove C-001 in full after it is implemented and requester-verified. Add new ready-to-build changes below this line. -->
