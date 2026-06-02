# Main Board Vs Mini Board

## Main Board

The main board represents the world or puzzle grid:

```js
const mainBoard = this.rexBoard.add.board({
  grid: mainGrid,
  width: 10,
  height: 10
});
```

It owns global tile coordinates and occupancy.

## Mini Board

A mini-board represents a local group:

```js
const miniBoard = this.rexBoard.add.miniBoard(0, 0, {
  grid: mainGrid,
  draggable: true
});
```

It owns local tile coordinates for its child chess objects:

```js
miniBoard.addChess(blockA, 0, 0, 0);
miniBoard.addChess(blockB, 1, 0, 0);
```

## Placement

When placed:

```js
miniBoard.putOnMainBoard(mainBoard, 4, 5, true);
```

The mini-board's local coordinates are mapped onto the main board relative to the target tile. Main-board occupancy and put tests decide whether placement is allowed.

## Gotchas

- Do not manually add every child to the main board if `putOnMainBoard` is responsible for transfer.
- Keep the mini-board grid compatible with the main board grid unless implementing a deliberate conversion.
- `tileX` and `tileY` on the mini-board after placement refer to its main-board placement origin.
- Drag/drop workflows usually call `pullOutFromMainBoard()` on drag start and either `putOnMainBoard(...)` or `putBack()` on drop.
