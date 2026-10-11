# Jackson Plan v1 — Integration handoff

This is an original explanatory schematic for the Jackson Plan experience. It does **not** reproduce the National Archives image. The historical source is NAS accession `SP002981`; the digital image may not be bundled without permission.

## Files

- `jackson-plan.svg` — original 2.5D document visual.
- `jackson-plan.css` — component styles.
- `jackson-plan.js` — pan, pinch zoom, controls, hotspots and completion event.
- `jackson-plan-hotspots.json` — approved content data.
- `index.html` — standalone review and integration reference.

## Integration into `huestory-3d/index.html`

1. Copy the SVG, CSS and JavaScript files into the deployable folder.
2. Add `<link rel="stylesheet" href="jackson-plan.css">` in the document head and `<script src="jackson-plan.js"></script>` before the closing body tag.
3. Keep Mega's existing `story` screen and replace only the Jackson rendering branch with a dedicated host:

```html
<div id="jackson-plan-host" class="hidden"></div>
```

4. When Jackson Plan opens, show the host and mount once:

```js
const jackson = JacksonPlan.mount(document.getElementById('jackson-plan-host'), {
  svgUrl: 'jackson-plan.svg'
});
```

5. Listen for completion. The app—not the component—owns persistent collection state:

```js
document.getElementById('jackson-plan-host').addEventListener('jacksonplan:collected', (event) => {
  markStoryCollected(event.detail.id);
});
```

`markStoryCollected` should write the completed story ID to local storage, calculate the total from the published `STORIES` array, update the collection counter, and unlock the reward only when every published story is complete.

## Interaction contract

- One-finger drag: pan.
- Pinch or wheel: zoom from `0.8x` to `3x`.
- Explicit buttons: zoom in, zoom out, reset.
- A discovery becomes collected after its hotspot is opened.
- The component dispatches `jacksonplan:collected` only after all three discoveries are opened.
- Reduced-motion users retain the same controls; only transitions are removed.
