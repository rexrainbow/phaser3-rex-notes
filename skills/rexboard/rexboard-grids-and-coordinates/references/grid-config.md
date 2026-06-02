# Grid Config

## Quad Grid

Factory and constructor:

```js
const grid = this.rexBoard.add.quadGrid(config);
// or
const grid = new QuadGrid(config);
```

Config fields from `Quad.IConfig`:

| Field | Type | Meaning |
| --- | --- | --- |
| `x` | number | Origin world x |
| `y` | number | Origin world y |
| `cellWidth` | number | Tile width |
| `cellHeight` | number | Tile height |
| `type` | `0`, `1`, `'orthogonal'`, `'isometric'` | Quad projection |
| `dir` | `4`, `8`, `'4dir'`, `'8dir'` | Neighbor direction mode |

Common configs:

```js
const orthogonal4 = this.rexBoard.add.quadGrid({
  x: 64,
  y: 64,
  cellWidth: 64,
  cellHeight: 64,
  type: 'orthogonal',
  dir: '4dir'
});

const isometric8 = this.rexBoard.add.quadGrid({
  x: 400,
  y: 80,
  cellWidth: 64,
  cellHeight: 32,
  type: 'isometric',
  dir: '8dir'
});
```

## Hexagon Grid

Factory and constructor:

```js
const grid = this.rexBoard.add.hexagonGrid(config);
// or
const grid = new HexagonGrid(config);
```

Config fields from `Hexagon.IConfig`:

| Field | Type | Meaning |
| --- | --- | --- |
| `x` | number | Origin world x |
| `y` | number | Origin world y |
| `size` | number | Cell radius |
| `cellWidth` | number | Explicit cell width |
| `cellHeight` | number | Explicit cell height |
| `staggeraxis` | `0`, `1`, `'y'`, `'x'` | Stagger axis |
| `staggerindex` | `0`, `1`, `'even'`, `'odd'` | Which rows/columns are offset |

Common config:

```js
const hex = this.rexBoard.add.hexagonGrid({
  x: 120,
  y: 120,
  size: 32,
  staggeraxis: 'y',
  staggerindex: 'odd'
});
```

## Board Embedding

`Board.IConfig` can take a grid instance:

```js
const board = this.rexBoard.add.board({
  grid,
  width: 10,
  height: 10,
  wrap: false,
  infinity: false
});
```

It can also take an embedded grid config with `gridType`:

```js
const board = this.rexBoard.add.board({
  grid: {
    gridType: 'quadGrid',
    x: 64,
    y: 64,
    cellWidth: 64,
    cellHeight: 64,
    type: 'orthogonal',
    dir: '4dir'
  },
  width: 8,
  height: 8
});
```
