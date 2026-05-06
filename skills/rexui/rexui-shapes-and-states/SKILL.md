---
name: rexui-shapes-and-states
description: "Use this skill when building RexUI visual skins, shape backgrounds, roundRectangle, ninePatch, ninePatch2, QuadShape, triangle, customShapes, imageBox, lazyLoadImageBox, circleMaskImage, alphaMaskImage, statesImage, statesText, statesBitmapText, statesRoundRectangle, statesNinePatch, statesNineSlice, statesBarRectangle, circularProgress, lineProgress, roundRectangleProgress, customProgress, aioSpinner, canvas, chart, cover, fullWindowRectangle, or fullWindowZone. Triggers on: RexUI skin, RexUI state, RexUI shape, statesImage, statesRoundRectangle, roundRectangle, ninePatch, progress, imageBox."
---

# RexUI Shapes And States

Use this skill for RexUI visual building blocks: backgrounds, scalable image skins, state-aware button skins, image containers, progress displays, and canvas/chart wrappers.

## Use This First

Choose the visual component:

| Need | Use |
|---|---|
| Common rounded background for labels/dialogs/panels | `roundRectangle` |
| Canvas-backed rounded background | `roundRectangleCanvas` |
| Scalable textured background | `ninePatch` or `ninePatch2` |
| Triangle toggle arrow | `triangle` |
| Custom vector drawing | `customShapes` |
| State-aware image icon | `statesImage` |
| State-aware text | `statesText` or `statesBitmapText` |
| State-aware rounded background | `statesRoundRectangle` |
| State-aware scalable textured background | `statesNinePatch` or `statesNineSlice` |
| State-aware progress/bar background | `statesBarRectangle` |
| Image fitted into a UI box | `imageBox` or `lazyLoadImageBox` |
| Circular or alpha-masked image | `circleMaskImage` or `alphaMaskImage` |
| Circular progress ring | `circularProgress` |
| Linear progress bar | `lineProgress` |
| Rounded rectangle progress | `roundRectangleProgress`; verify gotcha first |
| Custom progress drawing | `customProgress` |
| Loading spinner | `aioSpinner` |
| Canvas object or Chart.js wrapper | `canvas` or `chart` |
| Full-screen overlay/input layer | `cover`, `fullWindowRectangle`, `fullWindowZone` |

For layout placement, use `rexui-layout-sizers`. For button events that drive state changes, use `rexui-basic-widgets`.

## Required Setup

This skill assumes RexUI is available as `this.rexUI`. If not, use `rexui-setup-and-factory`.

## References

Read these only when needed:

- `references/shape-catalog.md`: component chooser, factory signatures, source files, and factory-name gotchas.
- `references/skin-states.md`: active/hover/disable state style fields and button-state wiring.
- `references/progress-recipes.md`: progress bars, spinners, custom progress, and image wrappers.

## Core Rules

- Prefer `roundRectangle` for simple generated UI skins; use `ninePatch` when the visual must come from a texture.
- Use state-aware objects only for visual state; drive `setActiveState()`, `setHoverState()`, and `setDisableState()` from button/list/dialog events.
- Do not store selection only in the visual state object. Keep state in the owning button/list model and apply it to the skin.
- Call `.layout()` after placing shape/state objects inside RexUI sizers, labels, buttons, dialogs, or panels.
- Create opaque backgrounds before content when manually composing objects that share Phaser display-list depth.
- Use `value`, `setValue()`, or `easeValueTo()` for progress components; values are normalized from `0` to `1` unless mapped with min/max arguments.
- Use package imports only in full setup examples; local `templates/ui/...` paths are source-map paths.

## Source File Map

- `templates/ui/roundrectangle/RoundRectangle.d.ts`
- `templates/ui/roundrectanglecanvas/RoundRectangleCanvas.d.ts`
- `templates/ui/ninepatch/NinePatch.d.ts`
- `templates/ui/ninepatch2/NinePatch.d.ts`
- `templates/ui/quadshape/QuadShape.d.ts`
- `templates/ui/triangle/Triangle.d.ts`
- `templates/ui/customshapes/CustomShapes.d.ts`
- `templates/ui/canvas/Canvas.d.ts`
- `templates/ui/imagebox/ImageBox.d.ts`
- `templates/ui/lazyloadimagebox/LazyLoadImageBox.d.ts`
- `templates/ui/circlemaskimage/CircleMaskImage.d.ts`
- `templates/ui/alphamaskimage/AlphaMaskImage.d.ts`
- `templates/ui/statesimage/StatesImage.d.ts`
- `templates/ui/statestext/StatesText.d.ts`
- `templates/ui/statesbitmaptext/StatesBitmapText.d.ts`
- `templates/ui/statesroundrectangle/StatesRoundRectangle.d.ts`
- `templates/ui/statesninepatch/StatesNinePatch.d.ts`
- `templates/ui/statesnineslice/StatesNineSlice.d.ts`
- `templates/ui/statesbarrectangle/StatesBarRectangle.d.ts`
- `templates/ui/circularprogress/CircularProgress.d.ts`
- `templates/ui/circularprogresscanvas/CircularProgressCanvas.d.ts`
- `templates/ui/lineprogress/LineProgress.d.ts`
- `templates/ui/lineprogresscanvas/LineProgressCanvas.d.ts`
- `templates/ui/roundrectangleprogress/RoundRectangleProgress.d.ts`
- `templates/ui/customprogress/CustomProgress.d.ts`
- `templates/ui/aiospinner/AIOSpinner.d.ts`
- `templates/ui/chart/Chart.d.ts`
- `templates/ui/cover/Cover.d.ts`
- `templates/ui/fullwindowrectangle/FullWindowRectangle.d.ts`
- `templates/ui/fullwindowzone/FullWindowZone.d.ts`

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose the correct component family.
- `rexui-layout-sizers`: place visual objects in layouts.
- `rexui-basic-widgets`: buttons, labels, tabs, and value controls.
- `rexui-scroll-lists-and-tables`: state skins inside reusable cells.
- `rexui-interactions-and-effects`: hover/click/gesture effects that drive visual states.
