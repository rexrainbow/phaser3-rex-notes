# Board Config

## Factory And Constructor

Scene plugin:

```js
const board = this.rexBoard.add.board({
  grid,
  width: 8,
  height: 8,
  wrap: false,
  infinity: false
});
```

Direct import:

```js
const board = new Board(scene, {
  grid,
  width: 8,
  height: 8
});
```

## Config Fields

| Field | Type | Meaning |
| --- | --- | --- |
| `grid` | grid instance or embedded grid config | Coordinate converter used by the board |
| `width` | number | Board width in tiles |
| `height` | number | Board height in tiles |
| `wrap` | boolean | Wrap around board edges |
| `infinity` | boolean | Allow infinite board behavior |

## Embedded Grid Config

```js
const board = this.rexBoard.add.board({
  grid: {
    gridType: 'hexagonGrid',
    x: 120,
    y: 120,
    size: 32,
    staggeraxis: 'y',
    staggerindex: 'odd'
  },
  width: 7,
  height: 7
});
```

Use `gridType: 'quadGrid'` or `gridType: 'hexagonGrid'` when embedding a grid config.

## Runtime Settings

```js
board.setGrid(grid);
board.setBoardWidth(10);
board.setBoardHeight(10);
board.setWrapMode(true);
board.setInfinityMode(false);
```

Use `board.width`, `board.height`, `board.wrapMode`, and `board.infinityMode` to inspect current state.
