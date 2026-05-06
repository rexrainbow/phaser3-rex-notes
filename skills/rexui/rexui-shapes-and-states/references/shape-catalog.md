# Shape Catalog

Use this file to choose a RexUI visual object and verify factory names.

## Basic Shapes

| Need | Factory | Notes |
|---|---|---|
| Rounded rectangle background | `roundRectangle(config)` or positional | Most common UI background. Supports fill, stroke, corner radius, dash pattern. |
| Canvas rounded rectangle | `roundRectangleCanvas(...)` | Canvas-backed alternative. |
| Triangle arrow | `triangle(config)` | Useful for folders, trees, dropdown arrows. |
| Custom vector shapes | `customShapes(config)` | Create named shapes and update them in an update callback. |
| Canvas game object | `canvas(...)` | Use when custom pixel/canvas drawing is needed. |

## Scalable Image Skins

| Need | Factory | Notes |
|---|---|---|
| RenderTexture nine-patch | `ninePatch(config)` | Scalable textured background from a 3x3 or custom split texture. |
| Alternate nine-patch | `ninePatch2(config)` | Alternate implementation; verify behavior against source before replacing `ninePatch`. |
| State-aware nine-patch | `statesNinePatch(config)` | Active/hover/disable texture states. |
| State-aware nine-slice | `statesNineSlice(config)` | Nine-slice style state object. |

Nine-patch config commonly uses:

```js
this.rexUI.add.ninePatch({
  key: 'panel',
  columns: [12, undefined, 12],
  rows: [12, undefined, 12],
  stretchMode: {
    edge: 'repeat',
    internal: 'scale'
  }
});
```

Use `undefined` in `columns` or `rows` for stretchable cells.

## Image Wrappers

| Need | Factory | Notes |
|---|---|---|
| Fitted image inside a box | `imageBox(x, y, key, frame, config)` | Resizes image to fit a given box. |
| Lazy image loading | `lazyLoadImageBox(...)` | Use when texture should load on demand. |
| Circular/ellipse/rounded mask | `circleMaskImage(x, y, key, frame, config)` | Config can be `'circle'`, `'ellipse'`, `'roundRectangle'`, or object. |
| Alpha mask image | `alphaMaskImage(x, y, key, frame, config)` | Use alpha texture or mask config. |

## State-Aware Skins

| Need | Factory | Notes |
|---|---|---|
| State-aware image | `statesImage(config)` | Switch texture/frame/scale on active/hover/disable. |
| State-aware text | `statesText(config)` | Switch text style fields. |
| State-aware bitmap text | `statesBitmapText(config)` | Bitmap text variant. |
| State-aware rounded rectangle | `statesRoundRectangle(config)` | Switch fill, stroke, radius. |
| State-aware bar/progress | `statesBarRectangle(config)` | Progress-like bar with state style fields. |

All state-aware skin objects use:

```js
skin.setActiveState(true);
skin.setHoverState(true);
skin.setDisableState(true);
```

## Progress And Loading

| Need | Factory | Notes |
|---|---|---|
| Circular progress | `circularProgress(config)` | Ring-style progress. |
| Canvas circular progress | `circularProgressCanvas(...)` | Canvas-backed circular progress. |
| Linear progress | `lineProgress(config)` | Track + bar progress. |
| Canvas linear progress | `lineProgressCanvas(...)`; verify gotcha | Factory registration appears wrong in source. |
| Rounded rectangle progress | `roundRectangleProgress(...)`; verify gotcha | Factory registration typo in source. |
| Custom progress drawing | `customProgress(config)` | Named shapes and update callback. |
| Loading spinner | `aioSpinner(config)` | Common animated loading indicator. |

## Full-Screen Helpers And Charts

| Need | Factory | Notes |
|---|---|---|
| Full-screen cover | `cover(config)` | Opaque/semi-transparent cover object. |
| Full-window rectangle | `fullWindowRectangle(config)` | Rectangle that follows the window. |
| Full-window input zone | `fullWindowZone(config)` | Input zone covering the window. |
| Chart wrapper | `chart(x, y, width, height, chartJsConfig)` | Canvas wrapper around Chart.js. |

## Factory Name Gotchas

Verify these against source before generating code:

- `transitionImage` and `transitionImagePack` folders exist, but they are commented out in `ui-plugin.js` and `ui-plugin.d.ts`.

If a user specifically asks for one of these gotcha factories, inspect both `templates/ui/ui-plugin.js`, `templates/ui/ui-plugin.d.ts`, and the component `Factory.js` before generating runnable code.

## Depth Gotcha

When manually composing opaque backgrounds and content, Phaser draws by display-list order. If content is created first and an opaque background is created later, the background can cover the content. Prefer creating background objects first or use the parent/container depth methods to move content above the background.
