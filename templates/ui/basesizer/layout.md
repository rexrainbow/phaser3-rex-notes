# Layout

Resize and place children.

## Steps

1. Skip layout if `ignoreLayout` is true
    - Hidden (`rexSizer.hidden`)
    - Not dirty (`dirty === false`)
1. If this is the topmost sizer (`parent` is undefined), call `preLayout()`
    - Clears `_childrenWidth` / `_childrenHeight` caches on this sizer and all visible child sizers
1. Decide whether to run wrap passes
    - If topmost, or `parent.runChildrenWrapFlag` is true, set
        - `runWidthWrap = hasWidthWrap()`
        - `runHeightWrap = hasHeightWrap()`
    - Otherwise both flags are `false`
1. Resolve size (`ResolveSize`)
    1. `ResolveWidth(self, newWidth, runWidthWrap)`
        - `resolveWidth(newWidth)` returns target width or `undefined`
        - If width is known and `runWidthWrap`, then
            - `resolveChildrenWidth(width)` resolves child sizer widths recursively
            - `runWidthWrap(width)` lets children adjust to the final width
    1. `ResolveHeight(self, newHeight, runHeightWrap)`
        - `resolveHeight(newHeight)` returns target height or `undefined`
        - If height is known and `runHeightWrap`, then
            - `resolveChildrenHeight(height)` resolves child sizer heights recursively
            - `runHeightWrap(height)` lets children adjust to the final height
    1. If width is still `undefined`, `ResolveWidth` runs once more with the same flags
    1. If both width and height are defined, `ResolveSize` returns `{ width, height }`
    1. Otherwise `ResolveSize` returns `false` and logs a console error
1. Resize this game object with `ResizeGameObject(this, width, height)`
1. If `sizerEventsEnable`, prepare `layoutedChildren` to collect layout results
1. Layout children with `layoutChildren()` (sizer-specific override)
1. Layout background children with `layoutBackgrounds()`
1. If `sizerEventsEnable`, emit `postlayout` and clear `layoutedChildren`
1. Call `postLayout(parent, width, height)` (sizer-specific override)
1. If topmost and anchored, update anchor position

## When layout cannot resolve correct size/position

- `ignoreLayout` is true, so the layout pass is skipped entirely.
- `ResolveSize` returns `false` because either width or height is `undefined`.
    - This happens when `resolveWidth()` or `resolveHeight()` returns `undefined`, which in turn happens when `childrenWidth` / `childrenHeight` is `undefined`.
    - Typical causes:
        - A sizer's `getChildrenWidth()` / `getChildrenHeight()` cannot compute sizes from its children (e.g. child sizes are still unknown or missing).
        - A child sizer returns `undefined` in its own `resolveWidth()` / `resolveHeight()`, so the parent's children sizes stay unresolved.
- Even when width/height are resolved, a warning can be logged if `minWidth` / `minHeight` or `childrenWidth` / `childrenHeight` exceed the target size (`layoutWarnEnable`).

