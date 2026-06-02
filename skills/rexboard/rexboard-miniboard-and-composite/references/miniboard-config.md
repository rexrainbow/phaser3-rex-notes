# MiniBoard Config

Factory:

```js
const miniBoard = this.rexBoard.add.miniBoard(x, y, config);
```

Constructor:

```js
const miniBoard = new MiniBoard(scene, x, y, config);
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `grid` | Quad or hex grid for local mini-board coordinates |
| `draggable` | Enable drag behavior |
| `face` | Facing direction |
| `putTestCallback` | Per-chess placement test on main board |
| `putTestCallbackScpe` | Callback scope; keep spelling as in current type definition |

## Core Methods

```js
miniBoard.addChess(chess, tileX, tileY, tileZ);
miniBoard.removeChess(chess, null, null, null, false);
miniBoard.removeAllChess(false);
miniBoard.getAllChess();
```

Placement:

```js
miniBoard.canPutOnMainBoard(mainBoard, tileX, tileY);
miniBoard.putOnMainBoard(mainBoard, tileX, tileY, true);
miniBoard.pullOutFromMainBoard();
miniBoard.putBack();
miniBoard.isOverlapping(mainBoard);
miniBoard.alignToMainBoard(mainBoard, tileX, tileY);
```

Transform:

```js
miniBoard.setFace(direction);
miniBoard.canRotate(1);
miniBoard.rotate(1);
miniBoard.canRotateTo(direction);
miniBoard.rotateTo(direction);
miniBoard.canMirror('x');
miniBoard.mirror('x');
```

Interaction:

```js
miniBoard.setInteractive(true);
miniBoard.setDragEnable(true);
```
