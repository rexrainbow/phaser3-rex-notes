# Rendered Piece Recipes

## Draw Tile Shapes

```js
board.forEachTileXY((tileXY) => {
  this.rexBoard.add.shape(
    board,
    tileXY.x,
    tileXY.y,
    1,
    0x2f3640,
    1,
    true
  );
});
```

## Add A Sprite Piece

```js
const piece = this.rexBoard.add.sprite(board, 4, 5, 0, 'units', 'knight', true);
piece.setDepth(10);
```

## Configure Before Board Registration

```js
const piece = this.rexBoard.add.image(board, 2, 2, 0, 'unit', undefined, false);
piece.setScale(0.75);
board.addChess(piece, 2, 2, 0, true);
```

## Use A Generated Tile Texture

```js
this.rexBoard.createTileTexture(board, 'board-tile', 0x20252b, 0x5c6b7a, 2, true);

board.forEachTileXY((tileXY) => {
  this.rexBoard.add.image(board, tileXY.x, tileXY.y, 1, 'board-tile', undefined, true);
});
```

These recipes are reduced for skill reference from common RexBoard rendered board patterns. They do not require the `examples/` directory.
