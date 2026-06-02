# Movement Recipes

## Move One Step Toward Pointer Tile

```js
const moveTo = this.rexBoard.add.moveTo(piece, {
  speed: 8,
  occupiedTest: true,
  blockerTest: true
});

board.setInteractive();
board.on('tiledown', (pointer, tileXY) => {
  if (!moveTo.isRunning) {
    moveTo.moveCloser(tileXY);
  }
});
```

`isRunning` is used by RexBoard's own movement implementation. If TypeScript public types are strict in the target project, prefer the project's existing running-state wrapper or listen for `complete` to sequence moves.

## Follow A Path

```js
const pathFinder = this.rexBoard.add.pathFinder(piece, {
  pathMode: 'A*',
  occupiedTest: true,
  blockerTest: true
});

const moveTo = this.rexBoard.add.moveTo(piece, {
  speed: 8,
  occupiedTest: true,
  blockerTest: true
});

const path = pathFinder.findPath({ x: 7, y: 4 }, 20, true);
let index = 0;

moveTo.on('complete', () => {
  index += 1;
  const next = path[index];
  if (next) {
    moveTo.moveTo(next.x, next.y);
  }
});

if (path[0]) {
  moveTo.moveTo(path[0].x, path[0].y);
}
```

## Find Reachable Tiles

```js
const area = pathFinder.findArea(6);
const reachableTileXY = area.map((node) => ({ x: node.x, y: node.y }));
```

These recipes are reduced for skill reference from common RexBoard movement and pathfinding patterns. They do not require the `examples/` directory.
