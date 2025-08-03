# Layout

The `layout()` method recalculates the size of a sizer and arranges all of its children.
It simply delegates to `runLayout()` with no arguments so the sizer acts as the top-most
parent.

## Process overview

1. **Early exit** – `runLayout()` returns immediately when `ignoreLayout` is set
   (hidden or not marked as dirty).
2. **Pre-layout** – if this call is from the top parent, `preLayout()` clears cached
   child sizes and propagates the call to child sizers.
3. **Determine wrapping** – the top parent (or a parent that sets `runChildrenWrapFlag`)
   checks `hasWidthWrap()` and `hasHeightWrap()` to know whether children require
   width/height wrapping.
4. **Resolve size**
   - `resolveWidth()` and `resolveHeight()` compare the sizer's measured
     `childrenWidth`/`childrenHeight` with its minimum size and any explicitly supplied
     width/height to produce final dimensions (F:templates/ui/basesizer/ResolveWidth.js)(F:templates/ui/basesizer/ResolveHeight.js)
   - If the sizer or its descendants may wrap, `resolveChildrenWidth/Height()` first
     gathers provisional child sizes and `runWidthWrap/HeightWrap()` lets them run a
     wrap pass. The resolvers then retry with the updated measurements, falling back to
     the alternate wrap routine once more before logging an error if a dimension cannot
     be determined.
5. **Resize self** – apply the computed width and height via `ResizeGameObject`.
6. **Layout children** – `layoutChildren()` (overridden by subclasses) positions normal
   children, then `layoutBackgrounds()` sizes and centers background children while
   respecting padding.
7. **Post-layout** – when `sizerEventsEnable` is true, emit a `postlayout` event and run
    the optional `postLayout()` callback.
8. **Finalize** – if this sizer is the top parent and has an anchor, update its position.

### Resolving size in different objects

- **Sizer** – Measures children according to orientation. In horizontal mode it sums
  child widths (plus spacing) and uses the maximum height; vertical mode does the
  opposite, accounting for padding, proportions and `fitRatio` settings (F:templates/ui/sizer/GetChildrenWidth.js)(F:templates/ui/sizer/GetChildrenHeight.js)
- **GridSizer** – Scans each column and row to find the largest child, summing those
  maxima with configured gaps to obtain the minimum grid size (F:templates/ui/gridsizer/GetChildrenWidth.js)(F:templates/ui/gridsizer/GetChildrenHeight.js)
- **FixWidthSizer** – Uses the fixed dimension and a wrap routine to build lines of
  children; the resulting `wrapResult` supplies the width and height for resolution
  calls (F:templates/ui/fixwidthsizer/RunWidthWrap.js)(F:templates/ui/fixwidthsizer/GetChildrenWidth.js)(F:templates/ui/fixwidthsizer/GetChildrenHeight.js)
- **OverlapSizer** – Resolves to the maximum width and height among its children because
  they share the same origin and overlap (F:templates/ui/overlapsizer/GetChildrenWidth.js)(F:templates/ui/overlapsizer/GetChildrenHeight.js)
- **General game object** – Non-sizer children don't implement their own resolver; the
  parent simply reads their display size or explicit `minWidth`/`minHeight` when
  calculating `childrenWidth`/`childrenHeight` (F:templates/ui/basesizer/GetChildWidth.js)(F:templates/ui/basesizer/GetChildHeight.js)

After `layout()` completes, the sizer and all descendants have their sizes and positions
resolved.