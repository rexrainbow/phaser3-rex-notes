# Grid Recipes

## Orthogonal Board

```js
const grid = this.rexBoard.add.quadGrid({
  x: 64,
  y: 64,
  cellWidth: 48,
  cellHeight: 48,
  type: 'orthogonal',
  dir: '4dir'
});

const board = this.rexBoard.add.board({
  grid,
  width: 10,
  height: 8
});
```

## Isometric Board

```js
const grid = this.rexBoard.add.quadGrid({
  x: 400,
  y: 80,
  cellWidth: 64,
  cellHeight: 32,
  type: 'isometric',
  dir: '8dir'
});

const board = this.rexBoard.add.board({
  grid,
  width: 8,
  height: 8
});
```

## Hex Board

```js
const grid = this.rexBoard.add.hexagonGrid({
  x: 120,
  y: 120,
  size: 28,
  staggeraxis: 'y',
  staggerindex: 'odd'
});

const board = this.rexBoard.add.board({
  grid,
  width: 9,
  height: 9
});
```

## Pointer To Tile

```js
board.setInteractive();

board.on('tiledown', (pointer, tileXY) => {
  if (!board.contains(tileXY.x, tileXY.y)) {
    return;
  }

  const world = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
  marker.setPosition(world.x, world.y);
});
```

These recipes are reduced for skill reference from common RexBoard grid patterns. They do not require the `examples/` directory.
