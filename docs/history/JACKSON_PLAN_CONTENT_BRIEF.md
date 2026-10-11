# Jackson Plan - V1 Content and Interaction Brief

## Historical idea

The 1828 Jackson Plan is a proposal for an ordered Singapore Town, not a record of a city that was built exactly as drawn.

## Approved component

Build an original 2.5D document schematic. It must be pan-and-zoom first; shallow depth is used only to make discovery layers tactile. It is not a free-rotating 3D object and it is not an archival-image substitute.

## Evidence boundary

- **Source:** National Archives of Singapore, *Plan of the Town of Singapore by Lieut Jackson*, 1828, accession `SP002981`.
- **Supported facts:** the map includes the Singapore River, named planned districts and land divisions; the National Archives says the proposed plan was not actually executed as shown.
- **Rights:** viewing is permitted, but use/reproduction of the National Archives digital image requires permission.
- **Asset decision:** bundle the original schematic only. Do not include, trace or present a digital crop of the archival map without permission.

## Discoveries

| ID | Label | Historical claim | Visual action |
| --- | --- | --- | --- |
| `river` | Singapore River | The river is a named feature in the plan and anchors its commercial/civic geography. | Highlight the river path. |
| `districts` | Planned districts | The plan names communities and functional divisions including Chinese, Chuliah, Bugis and European areas. | Raise shallow district layers. |
| `reality` | Plan versus city | The proposal was not executed exactly as shown. | Overlay a broken/dashed proposed-order frame. |

## Interaction contract

- One finger: pan.
- Pinch or mouse wheel: zoom between 0.8x and 3x.
- Explicit controls: zoom out, reset and zoom in.
- Selecting a discovery reveals its annotation and marks it collected.
- When all three discoveries have been opened, the component emits `jacksonplan:collected` with `id: "jackson-plan"`.
- Reduced-motion preference removes only visual transitions; all controls remain available.

## Required disclosure

> Interactive schematic based on the 1828 Jackson Plan. It is not an archival map reproduction. The National Archives record states that its proposed plan was not executed exactly as shown.

