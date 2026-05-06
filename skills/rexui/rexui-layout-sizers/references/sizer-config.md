# RexUI Sizer Config Reference

Use this as a compact public API guide. Prefer `.d.ts` files for exact signatures.

## Factory Chooser

| Factory | Signature style | Use |
|---|---|---|
| `this.rexUI.add.sizer(...)` | config or positional | Linear row/column layout. |
| `this.rexUI.add.gridSizer(...)` | config or positional | Fixed rows and columns. |
| `this.rexUI.add.fixWidthSizer(...)` | config or positional | Flow layout that wraps children into lines. |
| `this.rexUI.add.overlapSizer(...)` | config or positional | Stack/overlay children in the same rectangle. |

## Shared BaseSizer Config

These fields are inherited by the primary sizers:

| Field | Use |
|---|---|
| `space.left/right/top/bottom` | Outer spacing inside the sizer. |
| `anchor` | Anchor to viewport or parent bounds. |
| `origin`, `originX`, `originY` | Origin setup. |
| `name` | Debug/name metadata. |
| `enableLayer` | Enable layer support for children. |
| `draggable` | Make the sizer draggable or define a drag sensor. |
| `sizerEvents` | Emit sizer events. |

Common BaseSizer methods:

| Method | Use |
|---|---|
| `addBackground(gameObject, padding?)` | Add background behind content. |
| `layout()` | Recompute size and child positions. |
| `drawBounds(graphics, colorOrConfig)` | Debug layout bounds. |
| `setMinSize(width, height)` | Set minimum layout size. |
| `addChildrenMap(key, gameObject)` | Register a child by key. |
| `getElement(name, recursive?)` | Retrieve mapped/named child. |
| `removeChildrenMap(keyOrObject)` | Remove child map entry. |
| `setAnchor(config)` | Anchor sizer to viewport/scene bounds. |
| `setDraggable(...)` | Enable dragging. |
| `setChildrenInteractive(config)` | Make children interactive as a group. |
| `bindSceneResizeEvent(callback, scope?)` | Re-layout on scene resize. |

## Sizer

Use for rows, columns, toolbars, form rows, and nested panels.

Common config:

| Field | Use |
|---|---|
| `x`, `y`, `width`, `height` | Initial bounds. |
| `orientation` | `0`, `1`, `'x'`, `'y'`, `'horizontal'`, `'vertical'`, etc. |
| `rtl` | Right-to-left layout. |
| `space.item` | Space between children. |

Child add config:

| Field | Use |
|---|---|
| `proportion` | Share remaining space. `0` or omitted means natural size. |
| `align` | Align child inside its assigned area. |
| `padding` | Padding around the child. |
| `expand` | Fill assigned width/height. |
| `key` | Register child for `getElement()`. |
| `index` | Insert at index. |
| `minWidth`, `minHeight` | Child minimum size. |
| `fitRatio` | Fit child by ratio. |
| `offsetX`, `offsetY` | Local layout offset. |
| `offsetOriginX`, `offsetOriginY` | Origin offset. |

Useful methods:

- `add(gameObject, config)`
- `addMultiple(gameObjects, config)`
- `addSpace(proportion?)`
- `insertSpace(index?, proportion?)`
- `remove(gameObject, destroyChild?)`
- `clear(destroyChild?)`
- `setChildProportion(gameObject, proportion)`
- `setChildExpand(gameObject, expand)`
- `setChildrenAlignMode(mode)`
- `sortChildren(...)`

## GridSizer

Use when cells are known by row/column.

Common config:

| Field | Use |
|---|---|
| `column`, `row` | Grid dimensions. |
| `columnProportions`, `rowProportions` | Column/row size weights. |
| `space.column`, `space.row` | Column/row spacing. |
| `space.indentLeftOdd/Even`, `space.indentTopOdd/Even` | Staggered/indented grids. |
| `createCellContainerCallback` | Create cell containers automatically. |

Child add config:

| Field | Use |
|---|---|
| `column`, `row` | Target cell. `row: true` can auto-place. |
| `align` | Align child inside cell. |
| `padding` | Cell padding. |
| `expand` | Boolean or `{ width, height }`. |
| `key` | Register child. |
| `offsetX`, `offsetY` | Local offset. |

## FixWidthSizer

Use for chip lists, tag lists, responsive button groups, and variable-length item flows.

Common config:

| Field | Use |
|---|---|
| `width` | Required in practice for wrapping behavior. |
| `space.item` | Horizontal item spacing. |
| `space.line` | Spacing between wrapped lines. |
| `align` | `'left'`, `'right'`, `'center'`, `'justify'`, variants. |
| `rtl` | Right-to-left flow. |
| `space.indentLeftOdd/Even`, `space.indentTopOdd/Even` | Indented lines. |

Child add config:

| Field | Use |
|---|---|
| `padding` | Padding around child. |
| `key` | Register child. |
| `index` | Insert index. |
| `offsetX`, `offsetY` | Local offset. |

## OverlapSizer

Use for background/content overlays, badges, centered labels on graphics, and progress overlays.

Common config:

| Field | Use |
|---|---|
| `x`, `y`, `width`, `height` | Stacking bounds. |
| `space.left/right/top/bottom` | Inner padding. |

Child add config:

| Field | Use |
|---|---|
| `key` | Register child by name. |
| `align` | Position child in the overlap bounds. |
| `padding` | Padding around child. |
| `expand` | Boolean, number, or `{ width, height }`. |
| `minWidth`, `minHeight` | Minimum child size. |
| `offsetX`, `offsetY` | Local offset. |
| `aspectRatio` | Preserve aspect ratio. |
