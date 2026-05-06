# GridTable Config

Use `gridTable` for large repeated data sets, especially when only visible cells should exist.

## Minimal Shape

```js
const table = this.rexUI.add.gridTable({
  x: 400,
  y: 300,
  width: 360,
  height: 420,
  scrollMode: 'vertical',

  table: {
    cellHeight: 64,
    columns: 1,
    mask: { padding: 2 },
    reuseCellContainer: true,
    interactive: true
  },

  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },

  mouseWheelScroller: {
    focus: true,
    speed: 0.1
  },

  space: {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
    table: 8
  },

  items,

  createCellContainerCallback(cell, cellContainer) {
    const scene = cell.scene;
    const item = cell.item;

    if (cellContainer === null) {
      cellContainer = scene.rexUI.add.label({
        width: cell.width,
        height: cell.height,
        background: scene.rexUI.add.roundRectangle({ radius: 6, color: 0x333333 }),
        text: scene.add.text(0, 0, ''),
        space: { left: 10, right: 10, top: 8, bottom: 8 }
      });
    }

    cellContainer.setMinSize(cell.width, cell.height);
    cellContainer.getElement('text').setText(item.name);
    return cellContainer;
  }
}).layout();
```

## Table Config

| Field | Use |
|---|---|
| `table.cellWidth` | Fixed cell width. Often used for horizontal or grid layouts. |
| `table.cellHeight` | Fixed cell height. Required for predictable vertical lists. |
| `table.columns` | Number of columns. Use `1` for a simple vertical list. |
| `table.mask` | Clips cells to the visible viewport. Usually `{ padding: 1 or 2 }`. |
| `table.interactive` | Enables pointer events for cells. |
| `table.click`, `tap`, `press`, `swipe`, `over` | Configure or disable cell interaction behaviors. |
| `table.reuseCellContainer` | Reuses visible cell containers. Use for large lists. |
| `table.enableLayer` | Use when cells need layer support under masks or depth-sensitive layouts. |

## Callback Rules

`createCellContainerCallback(cell, cellContainer, gridTable)` is both a creator and updater.

- `cell.item` is the current data object.
- `cell.items` is the backing item array.
- `cell.index` is the current item index.
- `cell.width` and `cell.height` are the current cell size.
- `cellContainer` is `null` on first creation, otherwise it is a reused old container.
- Reset every visual state that depends on the item, including text, fill/stroke, alpha, tint, visibility, selected state, and enabled state.

Avoid this with reused cells:

```js
if (cellContainer === null) {
  const item = cell.item;
  cellContainer = scene.rexUI.add.label({ text: scene.add.text(0, 0, item.name) });
}
```

Do this instead:

```js
if (cellContainer === null) {
  cellContainer = scene.rexUI.add.label({ text: scene.add.text(0, 0, '') });
}
cellContainer.getElement('text').setText(cell.item.name);
```

## Events

Common grid table events:

- `cell.down`
- `cell.up`
- `cell.over`
- `cell.out`
- `cell.click`
- `cell.pressstart`
- `cell.pressend`
- `cell.swipeleft`
- `cell.swiperight`
- `cell.swipeup`
- `cell.swipedown`

Event callback shape is typically:

```js
table.on('cell.click', (cellContainer, cellIndex, pointer, event) => {
  const item = table.items[cellIndex];
});
```

If a cell has named child elements, inspect hit targets with `cellContainer.isPointerInBounds(key)`:

```js
table.on('cell.click', (cellContainer, cellIndex) => {
  if (cellContainer.isPointerInBounds('action')) {
    useItem(table.items[cellIndex]);
  }
});
```

## Updating Data

Use these methods after data changes:

```js
table.setItems(nextItems).layout();
table.refresh();
table.updateVisibleCell(index);
```

Use `setItems()` when replacing the whole array. Use `refresh()` after mutating item fields. Use `updateVisibleCell(index)` for a small visible change.

## Scrolling

`gridTable` inherits normalized scroll methods from `Scrollable` and adds row helpers:

```js
table.scrollToRow(rowIndex, 300, 'Cubic');
table.scrollToNextRow(1, 150, 'Cubic');
table.scrollToTop();
table.scrollToBottom();
table.setT(0.5, true);
```

`t` is vertical normalized scroll position. `s` is horizontal normalized scroll position.

## Selection State

Store selection in external state keyed by item id or index, then re-apply it in the callback:

```js
const selectedIds = new Set();

createCellContainerCallback(cell, cellContainer) {
  // create once...
  const selected = selectedIds.has(cell.item.id);
  cellContainer.getElement('background').setStrokeStyle(2, selected ? 0xffff00 : 0x222222);
  return cellContainer;
}
```

Do not store selection only on the reused cell container.
