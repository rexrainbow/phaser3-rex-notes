# FieldOfView Config

Factory:

```js
const fov = this.rexBoard.add.fieldOfView(gameObject, config);
```

Constructor:

```js
const fov = new FieldOfView(gameObject, config);
const detachedFov = new FieldOfView(config);
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `face` | Facing direction or angle |
| `cone` | Cone size or angle |
| `coneMode` | `0`, `1`, `'direction'`, or `'angle'` |
| `occupiedTest` | Consider occupied tiles in pre-test |
| `blockerTest` | Consider blockers in pre-test |
| `preTestCallback` | Callback before visibility test |
| `preTestCallbackScope` | Scope for pre-test callback |
| `costCallback` | Visibility cost/block callback |
| `costCallbackScope` | Scope for cost callback |
| `cost` | Fixed cost per tile |
| `perspective` | Perspective visibility behavior |
| `debug` | Debug graphics and colors |

## Methods

```js
fov.setFace(directionOrAngle);
fov.setPreTestFunction(callback, scope);
fov.setCostFunction(1);
fov.setCostFunction(callback, scope);

const visibleTiles = fov.findFOV(8);
const visibleFromTile = fov.findFOV(8, { x: 2, y: 3 });
const canSee = fov.isInLOS(targetChess, 8);
const visibleTargets = fov.LOS(targets, 8, originTileXY);
```

## Cost Callback

```js
const fov = this.rexBoard.add.fieldOfView(piece, {
  blockerTest: true,
  costCallback(curTile, fov, visibleTiles) {
    if (blocksSight(curTile.x, curTile.y)) {
      return fov.BLOCKER;
    }
    return 1;
  }
});
```

`FieldOfView.BLOCKER` is `null`; `FieldOfView.INFINITY` is `undefined`.
