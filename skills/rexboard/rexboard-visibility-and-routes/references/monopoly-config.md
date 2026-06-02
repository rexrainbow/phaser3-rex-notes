# Monopoly Config

Factory:

```js
const route = this.rexBoard.add.monopoly(gameObject, config);
```

Constructor:

```js
const route = new Monopoly(gameObject, config);
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `face` | Current facing direction |
| `pathTileZ` | Tile layer used for route/path checks |
| `cost` | Fixed route cost |
| `costCallback` | Custom route callback |
| `costCallbackScope` | Scope for callback |

## Methods

```js
route.setFace(direction);
route.setCostFunction(1);
route.setCostFunction(callback, scope);

const path = route.getPath(12);
```

## Cost Callback

```js
const route = this.rexBoard.add.monopoly(piece, {
  face: 0,
  pathTileZ: 0,
  costCallback(curTile, preTile, monopoly) {
    if (curTile && isBlocked(curTile.x, curTile.y)) {
      return monopoly.BLOCKER;
    }
    if (curTile && shouldStop(curTile.x, curTile.y)) {
      return monopoly.STOP;
    }
    return 1;
  }
});
```

`Monopoly.STOP` is `-1`; `Monopoly.BLOCKER` is `null`.
