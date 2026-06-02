# Hexagon Map

`HexagonMap` exposes coordinate generation helpers.

Scene plugin:

```js
const tiles = this.rexBoard.hexagonMap.hexagon(board, radius);
const tri = this.rexBoard.hexagonMap.triangle(board, type, height);
const para = this.rexBoard.hexagonMap.parallelogram(board, type, width, height);
```

Direct import:

```js
const tiles = HexagonMap.hexagon(board, radius);
```

## Helpers

```js
HexagonMap.hexagon(board, radius, out);
HexagonMap.triangle(board, type, height, out);
HexagonMap.parallelogram(board, type, width, height, out);
```

Types:

- `triangle` type: `0 | 1`
- `parallelogram` type: `0 | 1 | 2`

All helpers return `TileXYType[]`.

## Applying Coordinates

```js
const tileXYArray = this.rexBoard.hexagonMap.hexagon(board, 3);
board.fit(tileXYArray);

tileXYArray.forEach((tileXY) => {
  this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 1, 0x445566, 1, true);
});
```

Use `board.fit(tileXYArray)` when generated coordinates should define board extents.
