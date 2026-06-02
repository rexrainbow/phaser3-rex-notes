# Plugin Setup

## Scene Plugin Style

Use `board-plugin.js` when code should access factories through `this.rexBoard`.

```js
import Phaser from 'phaser';
import BoardPlugin from 'phaser4-rex-plugins/plugins/board-plugin.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: DemoScene,
  plugins: {
    scene: [
      {
        key: 'rexBoard',
        plugin: BoardPlugin,
        mapping: 'rexBoard'
      }
    ]
  }
};
```

Inside a scene:

```js
const grid = this.rexBoard.add.quadGrid({
  x: 80,
  y: 80,
  cellWidth: 64,
  cellHeight: 64,
  type: 'orthogonal',
  dir: '4dir'
});

const board = this.rexBoard.add.board({
  grid,
  width: 8,
  height: 8
});
```

## Direct Import Style

Use `board-components.js` when code imports constructors and helpers directly.

```js
import {
  Board,
  QuadGrid,
  HexagonGrid,
  MoveTo,
  PathFinder
} from 'phaser4-rex-plugins/plugins/board-components.js';

const grid = new QuadGrid({
  x: 80,
  y: 80,
  cellWidth: 64,
  cellHeight: 64,
  type: 'orthogonal',
  dir: '4dir'
});

const board = new Board(scene, {
  grid,
  width: 8,
  height: 8
});
```

## Minimal Board Pattern

```js
const grid = this.rexBoard.add.hexagonGrid({
  x: 120,
  y: 120,
  size: 32,
  staggeraxis: 'y',
  staggerindex: 'odd'
});

const board = this.rexBoard.add.board({
  grid,
  width: 7,
  height: 7,
  wrap: false,
  infinity: false
});

const chess = this.add.circle(0, 0, 18, 0x66ccff);
board.addChess(chess, 3, 3, 0, true);
```

This recipe is reduced for skill reference from common RexBoard setup patterns. It does not require the `examples/` directory.
