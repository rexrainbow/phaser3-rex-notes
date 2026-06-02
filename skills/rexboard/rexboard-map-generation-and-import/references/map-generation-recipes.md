# Map Generation Recipes

## Hexagon-Shaped Board Coordinates

```js
const grid = this.rexBoard.add.hexagonGrid({
  x: 200,
  y: 120,
  size: 28,
  staggeraxis: 'y',
  staggerindex: 'odd'
});

const board = this.rexBoard.add.board({ grid, width: 1, height: 1 });
const tiles = this.rexBoard.hexagonMap.hexagon(board, 3);

board.fit(tiles);
tiles.forEach((tileXY) => {
  this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 1, 0x334455, 1, true);
});
```

## Triangle Hex Map

```js
const tiles = this.rexBoard.hexagonMap.triangle(board, 0, 5);
board.fit(tiles);
```

## Parallelogram Hex Map

```js
const tiles = this.rexBoard.hexagonMap.parallelogram(board, 1, 6, 4);
board.fit(tiles);
```

## Tilemap Import

```js
const tilemap = this.make.tilemap({ key: 'level' });
const board = this.rexBoard.createBoardFromTilemap(tilemap, ['ground', 'objects']);
```

These recipes are reduced for skill reference from common RexBoard map generation and tilemap patterns. They do not require the `examples/` directory.
