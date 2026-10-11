# Pasir Panjang Machine-Gun Pillbox v1 — integration handoff

An original, evidence-bounded interactive object study for the Green history story. It is deliberately a simplified browser-rendered model, not a photogrammetric scan, a measured replica, or a battle reconstruction.

## Files

- `pillbox-viewer.js` — canvas renderer, touch/mouse rotation, controls, discoveries and collection event.
- `pillbox-viewer.css` — responsive visual system.
- `pillbox-discoveries.json` — approved discovery content.
- `index.html` — standalone phone-sized review page.
- `assets/pillbox-style-study-v1.png` — visual-direction study only; do not treat as measured source imagery.

## Integration

Copy the JavaScript and CSS into the deployable folder, then include:

```html
<link rel="stylesheet" href="pillbox-viewer.css" />
<script src="pillbox-viewer.js"></script>
<div id="pillbox-host" class="hidden"></div>
```

Mount once when the Green story opens:

```js
const pillboxHost = document.getElementById("pillbox-host");
const pillbox = PasirPanjangPillbox.mount(pillboxHost);

pillboxHost.addEventListener("pillbox:collected", (event) => {
  markStoryCollected(event.detail.id);
});
```

The host app owns local storage and the overall reward. This component never sends data or writes collection state itself.

## Interaction contract

- Drag or explicit Rotate controls: inspect a bounded 180-degree view.
- Pinch/wheel and explicit Zoom controls: inspect from `0.78x` to `1.6x`.
- Reset returns to the default three-quarter view.
- Opening all three discoveries dispatches `pillbox:collected` once with `detail.id === "pasir-panjang-pillbox"`.
- All discovery copy is standard HTML outside the canvas, so the story remains legible without reading the model.

## Historical disclosure

Keep this statement visible under the component:

> An interpretive 3D study of the surviving Pasir Panjang Machine-Gun Pillbox. Its form and details are simplified for exploration; it is not a surveyed replica or a recreation of battle.

Official source: https://www.roots.gov.sg/places/places-landing/Places/historic-sites/pasir-panjang-machine-gun-pillbox
