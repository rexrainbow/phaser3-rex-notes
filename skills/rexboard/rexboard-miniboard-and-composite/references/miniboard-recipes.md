# MiniBoard Recipes

## Create A Two-Tile Piece

```js
const miniBoard = this.rexBoard.add.miniBoard(0, 0, {
  grid,
  draggable: true
});

const a = this.add.image(0, 0, 'block');
const b = this.add.image(0, 0, 'block');

miniBoard.addChess(a, 0, 0, 0);
miniBoard.addChess(b, 1, 0, 0);
```

## Place On Main Board

```js
if (miniBoard.canPutOnMainBoard(mainBoard, 4, 5)) {
  miniBoard.putOnMainBoard(mainBoard, 4, 5, true);
}
```

## Drag Drop With Put Back

```js
miniBoard.setInteractive(true).setDragEnable(true);

miniBoard.on('dragstart', () => {
  miniBoard.pullOutFromMainBoard();
});

miniBoard.on('dragend', () => {
  const tileXY = mainBoard.worldXYToTileXY(miniBoard.x, miniBoard.y, true);
  if (miniBoard.canPutOnMainBoard(mainBoard, tileXY.x, tileXY.y)) {
    miniBoard.putOnMainBoard(mainBoard, tileXY.x, tileXY.y, true);
  } else {
    miniBoard.putBack();
  }
});
```

These recipes are reduced for skill reference from common RexBoard MiniBoard patterns. They do not require the `examples/` directory.
