# PRD — two thousand

**Pitch description:** Singapore in Colour  
**Narrative:** Layers of the Singapore River  
**Document status:** Draft for founder approval  
**Product owner:** Founder  
**Build owner:** To be assigned  
**Target release:** Hackathon demonstration  
**Platform decision:** Android-first native app, delivered as an installable APK  
**Scope:** Three curated Singapore-history experiences only  
**Source-of-truth rule:** This PRD defines the intended product. The linked primary-source records define historical claims. No archival image, model, audio, or text is reusable until its licence or written permission is confirmed.

## AI review prompt

Copy the prompt below into the GPT or coding agent that will review this project:

> You are reviewing the **two thousand** hackathon mobile-app project. Read this entire PRD, then inspect the current repository and its actual implementation before making recommendations. Treat the PRD as the intended product and the current code as evidence of what has or has not been built.
>
> Determine:
>
> 1. What is strictly necessary to deliver the three-story Android hackathon experience.
> 2. What is already implemented, partially implemented, missing or inconsistent with the PRD.
> 3. Which technical decisions can be made safely from available evidence.
> 4. Which decisions genuinely require clarification from the founder or build owner.
> 5. The smallest practical execution order, prioritising a reliable APK and live demonstration over architectural ambition.
> 6. Whether the proposed QR distribution flow and prepared-frame 3D-style viewers are feasible in the repository's chosen framework.
> 7. Which historical copy, visual assets, licences, credits or reconstruction disclosures are still missing.
>
> Separate **confirmed facts**, **reasonable inferences**, **assumptions** and **open questions**. Flag contradictions between the PRD and code. Do not invent requirements, historical claims, permissions, deadlines or completed work. Do not recommend Unity, AR, a backend or real-time 3D unless repository evidence shows that the simpler PRD approach is inadequate.
>
> Begin with a concise verdict. Then provide: (a) current-state assessment, (b) minimum required scope, (c) gaps and risks, (d) ordered next actions, and (e) only the clarification questions whose answers would materially change implementation. Do not write code, modify files, install dependencies, commit, push, publish or deploy unless the user explicitly authorises that specific action.

### Hackathon deliverables

1. Installable Android APK.
2. Visual-first pitch deck for a live founder presentation, produced after the app path works.
3. QR-led download page through which individuals can obtain the current approved APK.

## 1. Product verdict

Build a mobile discovery experience in which someone samples a colour from their immediate surroundings and is invited into one of three verified Singapore stories.

The colour is a **curated lens**, not evidence that the scanned surface is historically connected to the story. This distinction is essential: the app should create curiosity without inventing provenance.

## 2. Problem

Singapore’s history is present in rich archives, collections and heritage trails, but much of it is difficult to encounter in the ordinary moments when residents and travellers move through the city. Existing discovery products principally begin with a search, a place or a prescribed trail.

**Opportunity:** use the phone camera to turn a familiar visual act—notice a colour—into a low-friction doorway to a short, sourced historical encounter.

## 3. Product promise

> Find a colour around you. Discover a layer of Singapore that it opens.

The app gives users a contained, tactile encounter with three different forms of historical material:

1. A reconstruction of a transformed heritage building.
2. A zoomable archival plan.
3. A rotatable historical object.

It does not promise to teach the whole Singapore story, diagnose a user’s identity, or prove that it strengthens roots. Completion and expressed interest are proxies for engagement, not proof of cultural impact.

### Objectives

1. Demonstrate that colour can provide a quick, memorable entry into verified Singapore history.
2. Give each of the three historical pieces an interaction suited to its material: building, document, or object.
3. Produce an offline-capable Android APK that a judge can install and complete without an account.

### Success measures

| Measure | MVP target | Evidence level |
| --- | --- | --- |
| End-to-end completion | A first-time user reaches one story from the scanner without guidance. | Founder or tester observation |
| Full collection | All three stories can be completed in under five minutes. | Timed device check |
| Colour recovery | Unsupported lighting or an uncertain match leads to the manual palette, never a false certainty. | Device scenario check |
| Historical trust | Every story exposes its source and any reconstruction or uncertainty label. | Content audit |
| Offline reliability | The three stories work in airplane mode after installation. | Physical-device check |

These measures validate the demonstration. They do not establish learning, belonging, identity reinforcement, or long-term engagement.

### Assumptions to validate

| Assumption | Consequence if wrong | Validation |
| --- | --- | --- |
| Hackathon judges can install a sideloaded Android APK. | A browser or video fallback may be needed. | Confirm with event rules before packaging. |
| An Android-only demonstration is acceptable. | Cross-platform development becomes necessary. | Confirm before implementation Batch 1. |
| Three broad colour families remain recognisable under ordinary lighting. | Scanner may feel unreliable. | Test thresholds on the intended demo phone in indoor and outdoor light. |
| Original or licensed visual assets can be prepared in time. | The interactive stories cannot ship safely. | Complete the asset-and-copy register before UI integration. |
| The venue permits external downloads and Android sideloading. | The QR journey may fail during judging. | Test on venue Wi-Fi and mobile data; retain a prepared demo phone and offline APK transfer fallback. |

## 4. Users and jobs

| User | Job to be done | Product response |
| --- | --- | --- |
| Singaporean resident | “Help me notice a part of Singapore’s past in a fresh, low-effort way.” | A familiar colour becomes a brief historical encounter. |
| Traveller | “Give me one meaningful Singapore story without committing to a full tour.” | A self-contained, sourced experience that needs no local knowledge. |

The first demo does not personalise by nationality, ethnicity, age, or assumed heritage. The same experience is available to everyone.

### Prioritised user stories

| ID | Priority | User story | Acceptance condition |
| --- | --- | --- | --- |
| US-01 | P0 | As a user, I can grant camera access and sample a colour inside a visible target area. | A scan returns White, Beige / brown, Black, or No confident match. |
| US-02 | P0 | As a user, I can choose a story manually if camera access or matching fails. | All three stories remain reachable without camera permission. |
| US-03 | P0 | As a user, I can explore the Majestic Theatre as a rotatable reconstruction of its opera-house era. | Drag, zoom, reset, labels, then-versus-now context and reconstruction disclosure work. |
| US-04 | P0 | As a user, I can inspect the Jackson Plan closely. | Pinch zoom, pan, reset, three annotations and source credit work. |
| US-05 | P0 | As a user, I can inspect the Singapore Stone from every prepared angle. | Drag, zoom, reset, three hotspots and uncertainty note work. |
| US-06 | P0 | As a user, I can see why the colour opened the story without being told that the scanned surface has a historical connection. | The result screen labels the match as a curated colour lens. |
| US-07 | P1 | As a user, I can see which stories I have already opened during this session. | Session-only progress indicators update and reset when the app process resets. |
| US-08 | P1 | As a user, I can open the official source for a story. | The external source opens when a connection and browser are available. |
| US-09 | P0 | As an audience member, I can scan a presentation QR code and reach the approved app download. | The QR opens a mobile landing page showing the current APK, version and installation instructions. |

## 5. MVP user flow

1. User opens the app and sees: **“What colour catches your eye?”**
2. They frame a scene in the camera view and tap **Scan colour**.
3. The app extracts a dominant colour and presents the closest of three story swatches.
4. User sees a clear disclosure: **“This is a colour connection, not a claim about this place.”**
5. They enter the associated story and interact with its material.
6. They may return to the palette to discover the remaining two stories.

### Screen inventory

| Screen | Purpose | Required states |
| --- | --- | --- |
| Welcome | Explain the experience and privacy boundary. | First use, returning session |
| Camera permission | Ask for camera access only when the user starts scanning. | Not requested, granted, denied, permanently denied |
| Colour scanner | Frame the centre sampling area and trigger one scan. | Ready, sampling, result, error |
| Colour result | Show the sampled colour, matched lens, confidence language and story entry. | White, Beige / brown, Black, No confident match |
| Manual palette | Preserve full access without the camera. | Three labelled choices |
| Story shell | Hold shared title, time, introduction, disclosure, source and navigation. | Loaded locally, external source unavailable |
| Majestic Theatre viewer | Present the white architectural reconstruction. | Rotate, zoom, hotspot, reset, reduced-motion fallback |
| Jackson Plan viewer | Present the beige / brown document experience. | Pan, zoom, annotation, reset |
| Singapore Stone viewer | Present the black object experience. | Rotate, zoom, hotspot, reset, reduced-motion fallback |
| About and sources | Explain the colour lens, source policy and privacy boundary. | Offline content, external links |

### Failure and recovery

- If camera permission is denied, show the three swatches as a tappable palette; no history is withheld.
- If a frame has no confident match, offer the palette rather than claiming a match.
- The app does not save camera frames, sampled colours, identity, precise location, or browsing history.

## 6. The three stories

| Colour lens | Historical anchor | Experience | Required factual boundary |
| --- | --- | --- | --- |
| **White** | **The Majestic Theatre** — commissioned/built in 1927 by Eu Tong Sen as a Cantonese opera house; some sources describe completion as 1928. It was later used as a cinema and converted into a shopping mall in 2003. | A touch-rotatable, white architectural line-drawing reconstruction of its opera-house era. Tap hotspots to examine its tiled facade, Cantonese-opera figures and dragon motifs, then reveal how its use changed over time. | Mark it **“visual reconstruction based on historical reference”**. The building survives, so describe it as transformed or repurposed—not destroyed. White is the experience’s visual lens, not a claim about its historical colour. Never present the reconstruction as a surveyed 3D replica or claim exact dimensions without source evidence. |
| **Beige / brown** | **Plan of the Town of Singapore / Jackson Plan** — the 1828 lithograph derived from Lt Philip Jackson’s 1822 plan. | A high-resolution plan viewer with pinch-to-zoom and three bounded annotations: the Singapore River, planned districts, and the contrast between plan and later city. | Display the archive credit, accession information and a source link. Beige / brown connects to the plan’s paper-and-ink materiality; it does not validate a scanned surface’s relation to the document. Do not imply that the plan’s proposed layout was wholly executed. |
| **Black** | **Singapore Stone** — surviving inscribed sandstone fragment dated broadly to the 10th–14th centuries. | A touch-driven 360° object view against a dark field; hotspots identify the inscription, the former river-mouth location, and the undeciphered-script uncertainty. | Separate the Badang tradition from documented physical history. Black is the experience’s visual lens, not a claim about the stone’s historical colour. State that scholars differ on the date/language and the inscription remains undeciphered. |

### Historical-source anchors

- [The Majestic, National Heritage Board / Roots](https://www.roots.gov.sg/places/places-landing/Places/surveyed-sites/Copy-of-The-Majestic)
- [Plan of the Town of Singapore by Lieut Jackson, 1828, National Archives of Singapore](https://www.nas.gov.sg/archivesonline/maps_building_plans/record-details/f9926418-115c-11e3-83d5-0050568939ad)
- [Singapore Stone, National Museum of Singapore / Roots](https://www.roots.gov.sg/stories-landing/stories/the-singapore-story-through-60-objects/networks-through-time/singapore-stone/story)

## 7. Functional requirements

The requirement keywords **must**, **should**, and **may** correspond to P0, P1, and P2 priority. P0 requirements define the hackathon release.

### 7.1 Colour discovery

- Request camera permission with a plain-language explanation.
- On-device, extract a representative colour from a user-selected tap point or central sampling area.
- Match the sampled colour to **White**, **Beige / brown**, or **Black** using a documented threshold.
- Always expose the manual three-swatch picker.
- Return exactly one story per colour lens in the MVP.
- Do not store the frame or transmit it to a server.
- Sample only after the user taps the scan control; continuous recording is unnecessary.
- Show **No confident match** when the sample sits outside the documented thresholds.
- Treat the centre target area as the source of the sample so the user can predict what the app is reading.

### 7.2 Story shell

- Show a title, date/period, 50–90-word factual introduction, source attribution, and a distinction between documented evidence and interpretive reconstruction.
- Provide a visible **Back to colours** control.
- Allow the user to open the cited source in their browser.
- Work from bundled demo content after initial load; network loss must not break the three core experiences.

### 7.3 Interaction formats

**Majestic Theatre**

- Render a lightweight, stylised reconstruction of the 1927 opera-house era using a prepared 24-frame, 180-degree facade orbit; real-time 3D is not required for the hackathon build.
- Support horizontal one-finger drag to rotate, two-finger pinch to zoom, reset view, and three labelled hotspots.
- Map a full-width drag to travel from the far-left to far-right documented view. Do not wrap from the last frame to the first because this is an evidence-bounded facade orbit, not a claimed complete reconstruction.
- Use hotspots for the tiled facade, Cantonese-opera figures and dragon motifs; the story copy must also explain the later cinema and shopping-mall uses.
- Include a static image fallback for low-capability devices.

**Jackson Plan**

- Support pinch-to-zoom, pan, reset, and three tappable annotations.
- Maintain legible attribution at every zoom level.
- Use a cleared asset, an original illustrative recreation, or an approved low-resolution reference only.

**Singapore Stone**

- Support a 360°-style spin presentation from a prepared frame sequence, zoom, reset, and three hotspots.
- This is a mock object-viewer, not a VR or museum-grade photogrammetric claim.
- Use a team-created model or an asset explicitly licensed for this use.

## 8. Content and trust requirements

- Every story must name its source institution and include a link.
- Factual copy must be reviewed against the cited primary/official source before demo.
- Historical uncertainty must remain visible, especially for the Singapore Stone.
- Community memories, if ever added, must be labelled separately from archive-backed material. They are out of scope for this MVP.
- The app must not imply that colonial-era spatial planning was neutral or that historical communities were homogeneous.
- Do not reuse National Heritage Board or National Archives content merely because it is publicly visible. Obtain permission or use original/licensed replacements.

## 9. Non-goals

- More than three stories, precincts, or colour lenses.
- Continuous AR anchoring, geofencing, route planning, or a generic AI history chatbot.
- User accounts, social sharing, user-generated content, analytics profiles, or location history.
- A claim that the app improves identity, belonging, learning outcomes, tourism revenue, or heritage preservation.
- Museum-quality reconstruction, conservation documentation, or an exhaustive archive catalogue.

## 10. Data, privacy and state

| Data | Owner | Persistence | Reason |
| --- | --- | --- | --- |
| Live camera frame | Device only | None | Colour extraction; discarded immediately. |
| Selected colour/story | App session | Optional local-only session state | Preserve the current encounter and completion state. |
| Story content and assets | Bundled app package | Versioned with build | Reliable hackathon demo. |

No account, cloud database, GPS coordinate, uploaded image, microphone recording, or behavioural profile is required.

### Content model

Each bundled story record must contain:

- Stable story ID and colour lens.
- Title, date or period, concise introduction and three detail labels.
- Interaction type and local asset references.
- Source institution, source URL and credit line.
- Rights status and asset owner.
- Reconstruction, legend or historical-uncertainty disclosure where applicable.

## 11. Accessibility and experience requirements

- The app cannot require colour vision alone: each colour lens has a name, icon and text label.
- All interactions have labelled controls and an equivalent button-based fallback.
- Support reduced motion; 3D motion must stop when the user stops interacting.
- Text remains readable at system font scaling.
- The camera permission denial path is fully usable.

## 12. Hackathon success criteria

### Product acceptance

- A user can complete all three stories in under five minutes without an account.
- A user who denies camera access can still reach every story.
- Each story visibly uses a different interaction format: architectural reconstruction, document zoom, object spin.
- Each story shows a source and any required reconstruction/uncertainty label.
- No raw camera frame leaves the device or is saved.
- The APK installs on the designated physical Android phone and launches without a development server.
- The presentation QR code resolves on at least two unrelated phones and leads to the same approved APK version.
- The QR download page identifies the app as Android-only and explains that installation occurs outside Google Play.

### Demo proof levels

| Check | Evidence required | Does not establish |
| --- | --- | --- |
| Direct build check | App launches and all three content views render. | Camera reliability on all devices. |
| Device check | Camera scan, manual palette, zoom, rotate and reset tested on one approved phone. | Broad device compatibility. |
| Founder manual check | Founder completes the three-story flow and confirms the narrative is clear. | Long-term engagement or cultural impact. |

## 13. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Colour matching feels arbitrary. | Explain it as a curated lens, offer a manual palette, and make every reveal visually satisfying. |
| The app feels like a generic gallery. | Make the scan-to-colour transition immediate; use three materially different interaction modes. |
| Reconstruction overstates certainty. | Label reconstructions and retain source/uncertainty notes. |
| Rights block authentic assets. | Use original low-poly/line-art models and original schematic document recreations for the demo, with clear source citations. |
| Scope expands into a nationwide platform. | Freeze at three stories and local bundled content. |

## 14. Dependencies and decisions

### Confirmed product decisions

1. Android is the hackathon target; iOS is out of scope.
2. The deliverable is an installable APK, with an Android App Bundle deferred unless Play Store submission becomes necessary.
3. The app contains three local stories and requires no backend.
4. Majestic Theatre uses a prepared 24-frame, 180-degree facade orbit; Singapore Stone uses a prepared 36-frame complete object rotation. Neither requires a real-time 3D engine. This is the locked hackathon approach unless device testing proves it inadequate.
5. Colour matching runs on-device and always has a manual fallback.
6. The pitch deck uses minimal language: each slide should contain no more than one principal phrase of three to five words, excluding essential labels, citations and installation instructions.
7. The QR code points to a stable HTTPS landing page rather than directly to a version-specific APK file.

### Dependencies

- One Android phone representing the actual demo environment.
- Android development toolchain and a reproducible Gradle build.
- Cleared or original assets for all three experiences.
- Final reviewed copy and source credits.
- Confirmation that sideloaded APKs are allowed at the hackathon.
- A stable HTTPS download page and file host for the approved APK.
- A generated QR code tested from the projected deck and from a printed backup.

### Open questions

| Question | Owner | Decision deadline |
| --- | --- | --- |
| What is the hackathon submission deadline and judging rubric? | Founder | Before scope freeze |
| Which physical Android phone will be used for the final demonstration? | Founder | Before camera threshold tuning |
| Will judges install the APK or watch the team’s prepared phone? | Founder | Before packaging |
| Do we have permission to reproduce any archival source image directly? | Content owner | Before asset integration |
| Where will the APK landing page and file be hosted? | Founder / build owner | Before QR generation |

## 15. Visual pitch deck requirements

### Purpose

Support a live presentation rather than act as a document the audience must read. The founder supplies the explanation; each slide provides one visual idea.

### Writing and composition

- Use one principal phrase of **three to five words** per slide.
- Prefer full-bleed visuals, single compositions and direct demonstrations over text panels.
- Avoid paragraphs, feature grids and duplicated speaker narration.
- Keep necessary source credits readable but visually secondary.
- Use the app’s white, beige / brown and black visual system consistently.
- Show the actual product interaction once a working build exists; concept renders must be labelled before then.

### Recommended narrative

| Slide | Principal phrase | Primary visual purpose |
| --- | --- | --- |
| 1 | **Singapore hides in colour** | Camera view finding one of the three colours. |
| 2 | **History becomes invisible** | Contemporary Singapore layered over a vanished or transformed site. |
| 3 | **Scan what surrounds you** | The scan interaction in one clear sequence. |
| 4 | **Three colours. Three layers.** | White, beige / brown and black with the three historical pieces. |
| 5 | **Reveal what changed** | Majestic Theatre opera-house reconstruction and present-day transformation. |
| 6 | **Read the city closely** | Jackson Plan pinch-and-zoom experience. |
| 7 | **Turn history in hand** | Singapore Stone 360°-style object interaction. |
| 8 | **Made for curious people** | Resident and traveller shown using the same app. |
| 9 | **Try two thousand now** | Large QR code, Android-only label and short installation cue. |

The final slide count may be reduced if the hackathon imposes a shorter presentation time. Every retained slide must perform a distinct narrative job.

## 16. QR download requirements

### Journey

1. Audience member scans the QR code.
2. A lightweight HTTPS landing page opens in the phone browser.
3. The page states **Android only**, the app version, APK size and publication date.
4. The user taps **Download APK**.
5. The page provides concise Android sideload instructions and a safety explanation.
6. After installation, the app opens without an account or development server.

### Trust and security

- The QR destination must use HTTPS and a domain or hosting provider the team controls.
- The landing page must link only to the approved build and display its SHA-256 checksum.
- Replace the hosted file atomically; never leave multiple unlabeled builds available.
- Keep signing keys and passwords outside the repository and hosted files.
- Do not use a public URL shortener that obscures ownership or may expire unexpectedly.
- Test the projected QR from the back of the intended room and provide a printed backup.
- The landing page must not collect email addresses, identity, location or unnecessary analytics.

### Failure recovery

- Keep the app installed on the presentation phone so the pitch never depends on venue connectivity.
- Keep the approved APK locally available for USB or nearby-device transfer where event rules permit.
- If sideloading is prohibited, the QR page should switch to a product demonstration page rather than presenting a broken download.

### Build-owner implementation contract

- The QR code is a distribution entry point, not an in-app scanner feature.
- Encode the stable HTTPS landing-page URL, not the APK URL, so a new approved build can be published without replacing the QR in the pitch deck.
- Generate the QR as SVG for the deck and PNG for compatibility; use high error correction and preserve the required quiet zone.
- The landing page owns the current version label, APK size, publication date, SHA-256 checksum, installation instructions and download link.
- Test the final exported slide—not only the raw QR image—on at least two unrelated Android phones, from both screen and print.

## 17. 3D-style viewer implementation contract

### Hackathon decision

Use prepared turntable image sequences for both rotational experiences. Do not add Unity, an AR framework, WebGL, a game engine or a real-time 3D runtime solely for these two viewers.

### Asset contract

- Majestic Theatre: 24 transparent WebP frames showing a 180-degree facade orbit of one consistent reconstruction. The orbit must remain within historically supportable views and must not imply that undocumented rear geometry is verified.
- Singapore Stone: 36 transparent WebP frames showing a complete horizontal rotation of one consistent object model.
- Every sequence must use identical canvas dimensions, camera position, lighting and object scale across frames.
- Provide one poster image per experience for initial loading and static fallback.
- Retain the editable source scene with each rendered asset package (for Majestic Theatre, the versioned `.blend` file and render script) so historical corrections can be made without rebuilding the work from scratch.
- Keep hotspots in a separate data structure containing an ID, label, short copy and one or more frame ranges; do not burn labels into the images.
- Bundle the approved demo assets inside the APK so the experience remains functional offline.

### Interaction and performance

- Horizontal drag advances or reverses frames. The Singapore Stone wraps continuously; the Majestic Theatre stops at the two documented ends of its facade orbit.
- Pinch changes the rendered image scale within defined minimum and maximum bounds; it does not generate new camera angles.
- Reset restores frame zero, default zoom and closed hotspots.
- Preload the poster and nearby frames first, then the remaining sequence; show no blank canvas while loading.
- Respect reduced-motion settings by defaulting to the poster image with explicit step controls.
- If the prepared sequence cannot hold a smooth frame rate on the demonstration phone, reduce image dimensions or frame count before considering a different rendering engine.

## 18. History-component production criteria

### Source and reconstruction rules

- Historical evidence must be registered before asset production begins. Each reference requires a source, date or estimated period, rights status and a note describing what it supports.
- Classify every reconstructed feature as **documented**, **reasonably inferred**, **unknown**, or **excluded**.
- Do not model an undocumented feature merely to complete a camera angle. Limit the camera instead.
- AI-generated geometry or imagery may support concept exploration, but it is not historical evidence and must be corrected against approved references before release.
- All final historical copy, credits and reconstruction disclosures require founder approval before integration.
- The founder-approved Majestic visual-direction study is the aesthetic target for the final 3D component: white simplified massing, dark contouring, restrained shadow and selectively expressive opera/dragon facade motifs. It remains interpretive and must never be presented as a measured survey or substitute for evidence.

### Majestic Theatre production batches

1. **Evidence register:** collect front, angled and current references; record rights and evidentiary limits.
2. **Reconstruction brief:** lock the 1927 opera-house period, facade scope, three hotspots, camera arc and explicit unknowns.
3. **Browser review harness:** create a static, local-first HTML/CSS/JavaScript prototype with placeholder frames for drag, zoom, reset, hotspot and timeline review. This is an approval environment, not a second product or production web app.
4. **Blockout:** render the rough building mass into the review harness using five views: far left, left, front, right and far right.
5. **Architectural detail:** add only story-relevant, evidenced facade details after the blockout is approved.
6. **Drawing style:** validate matte-white surfaces, black contour lines and light beige shadow in the review harness using 8–12 test frames.
7. **Interaction proof:** test drag, zoom, reset and hotspot stability in the browser on the demonstration phone before producing all 24 frames.
8. **Narrative and founder approval:** integrate the opera-house, cinema and repurposed-building timeline, clearly separate factual and interpretive material, and obtain founder approval of the complete browser prototype.
9. **Final handoff:** deliver frames, poster, fallback, hotspot data, story copy, credits and reconstruction notes as one versioned asset package for mobile integration.

Each batch requires its stated evidence or device check before the next batch begins. New founder-approved history-development criteria must be incorporated into this PRD so the current document remains the shared product authority.

## 19. First action for execution

Confirm the event’s APK distribution rules, presentation duration and venue connectivity. Then create an asset-and-copy register for the three stories: source URL, exact approved copy, rights status, visual asset owner, reconstruction disclaimer, and build-ready colour swatch. Do this before UI implementation.
