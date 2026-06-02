# PathFinder Config

Factory:

```js
const pathFinder = this.rexBoard.add.pathFinder(gameObject, config);
const pathFinderWithoutChess = this.rexBoard.add.pathFinder(config);
```

Constructor:

```js
const pathFinder = new PathFinder(gameObject, config);
const pathFinderWithoutChess = new PathFinder(config);
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `occupiedTest` | Treat occupied tiles as unavailable |
| `blockerTest` | Treat blocker tiles as unavailable |
| `cost` | Fixed cost per step |
| `costCallback` | Custom cost/blocker callback |
| `costCallbackScope` | Scope for callback |
| `cacheCost` | Cache computed path costs |
| `pathMode` | Path selection mode |
| `weight` | Weight value used by cost logic |
| `shuffleNeighbors` | Randomize neighbor order |

Path modes:

```js
'random'
'diagonal'
'straight'
'line'
'A*'
'A*-random'
'A*-line'
```

Numeric modes are also typed, but string modes are clearer in generated code.

## Cost Callback

```js
const pathFinder = this.rexBoard.add.pathFinder(piece, {
  occupiedTest: true,
  blockerTest: true,
  pathMode: 'A*',
  costCallback(curTile, preTile, pathFinder) {
    if (isWater(curTile.x, curTile.y)) {
      return 3;
    }
    if (isWall(curTile.x, curTile.y)) {
      return pathFinder.BLOCKER;
    }
    return 1;
  }
});
```

`PathFinder.BLOCKER` is `null`; `PathFinder.INFINITY` is `undefined`.

## Queries

```js
pathFinder.setChess(piece);
pathFinder.setCostFunction(1);
pathFinder.setPathMode('A*');

const area = pathFinder.findArea(6);
const path = pathFinder.findPath({ x: 7, y: 4 }, 12, true);
const cost = pathFinder.tileXYToCost(7, 4, true);
```

`findArea` returns reachable nodes with `{ x, y, pathCost, preNodes }`.
