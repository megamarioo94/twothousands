# HUEstory — Common Ground Makeathon (QR-first web prototype)

## Publish and get the working QR
1. Open https://app.netlify.com/drop and drag the `huestory-qr-ready` folder (or upload its ZIP if supported by the hosting interface).
2. Wait until the host gives you an actual HTTPS URL, e.g. `https://YOUR-SITE.netlify.app/`. Test it on your intended phone.
3. Run `python3 make_qr.py 'https://YOUR-ACTUAL-SITE.netlify.app/'` on any computer with `qrcode` Python package installed (`pip install qrcode[pil]`). This creates a printable QR PNG and SVG.
4. Print or project the generated QR. Do NOT use a guessed domain or QR pointing at Netlify Drop: it will not open the app.

## Scope
- Three lenses: WHITE → Majestic Theatre; BEIGE/BROWN → Jackson Plan; BLACK → Singapore Stone.
- Camera centre sample, manual palette for unsupported colours/camera failures.
- Story shells with three annotations, references and session-only progress.
- Offline-compatible web app after first successful visit/caching. Test airplane mode after page load; opening a source URL still requires connection.
- Viewer artwork is explicitly an original schematic placeholder, NOT a licensed archival image, accurate 3D reconstruction or actual 360 viewer.
- The QR links to the mobile web app, **not an Android APK**. APK packaging and offline Android-install testing remain separate deliverables.

## Historical assets
- Jackson Plan National Archives accession SP002981. Archive page explicitly states use/reproduction requires permission. Do not bundle a photo of the archive image without permission.
- Majestic source: https://www.roots.gov.sg/places/places-landing/Places/surveyed-sites/Copy-of-The-Majestic
- Jackson Plan: https://www.nas.gov.sg/archivesonline/maps_building_plans/record-details/f9926418-115c-11e3-83d5-0050568939ad
- Singapore Stone: https://www.roots.gov.sg/stories-landing/stories/the-singapore-story-through-60-objects/networks-through-time/singapore-stone/story

## Local test
`python3 -m http.server 8000` from this directory then visit `http://localhost:8000` on the computer. Phone camera generally needs the deployed HTTPS URL.

## TODO after QR works
1. Validate scanner thresholds under event lighting.
2. Obtain licensed/original archival images and reconstruction assets.
3. Replace visual placeholders with actual drag/zoom/rotate viewers.
4. If an APK is required, package and sign via Android toolchain, test installation and airplane mode on a real Android device, then update the QR destination to an approved APK landing page.

## V4 — Interactive conceptual 3D
All three story viewers now use locally rendered 3D-style geometry, with pointer/touch drag, pinch zoom, mouse-wheel zoom and reset. The architectural model and Singapore Stone are **conceptual** meshes rather than authentic historical scans. The Jackson Plan is a **schematic** document rendered in 3D perspective, not a reproduction of the licensed lithograph. This version uses no external 3D library or network asset, preserving lightweight offline viewing after caching.

To replace the prototypes with verified reconstruction or archival imagery, obtain source assets and permissions, then implement high-fidelity modelling.
