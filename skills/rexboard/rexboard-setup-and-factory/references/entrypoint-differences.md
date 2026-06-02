# Entrypoint Differences

## `board-components.js`

Exports constructors and helpers:

```js
import {
  Board,
  HexagonGrid,
  QuadGrid,
  ChessData,
  Shape,
  Image,
  Sprite,
  Match,
  MoveTo,
  PathFinder,
  FieldOfView,
  Monopoly,
  MiniBoard,
  HexagonMap,
  CreateTileTexture,
  CreateBoardFromTilemap
} from './plugins/board-components.js';
```

For npm-installed projects, use:

```js
import {
  Board,
  HexagonGrid,
  QuadGrid,
  ChessData,
  Shape,
  Image,
  Sprite,
  Match,
  MoveTo,
  PathFinder,
  FieldOfView,
  Monopoly,
  MiniBoard,
  HexagonMap,
  CreateTileTexture,
  CreateBoardFromTilemap
} from 'phaser4-rex-plugins/plugins/board-components.js';
```

Use constructors directly:

```js
const grid = new QuadGrid({ cellWidth: 64, cellHeight: 64 });
const board = new Board(scene, { grid, width: 8, height: 8 });
```

## `board-plugin.js`

Installs a Phaser scene plugin. After registration, the scene gets:

```js
this.rexBoard.add.board(...)
this.rexBoard.add.quadGrid(...)
this.rexBoard.add.hexagonGrid(...)
this.rexBoard.add.shape(...)
this.rexBoard.add.image(...)
this.rexBoard.add.sprite(...)
this.rexBoard.add.moveTo(...)
this.rexBoard.add.pathFinder(...)
this.rexBoard.add.match(...)
this.rexBoard.add.fieldOfView(...)
this.rexBoard.add.monopoly(...)
this.rexBoard.add.miniBoard(...)
this.rexBoard.hexagonMap
this.rexBoard.createTileTexture
this.rexBoard.createBoardFromTilemap
```

For npm-installed projects, import the plugin with:

```js
import BoardPlugin from 'phaser4-rex-plugins/plugins/board-plugin.js';
```

## Conversion Rules

- Convert `new Board(scene, config)` to `this.rexBoard.add.board(config)` only inside a scene that has the mapped plugin.
- Convert `new QuadGrid(config)` to `this.rexBoard.add.quadGrid(config)`.
- Convert `new HexagonGrid(config)` to `this.rexBoard.add.hexagonGrid(config)`.
- Keep helper calls as helpers: `CreateTileTexture(board, ...)` maps to `this.rexBoard.createTileTexture(board, ...)`.
- Preserve board config and grid config exactly unless the target entry style requires a different constructor parameter.
