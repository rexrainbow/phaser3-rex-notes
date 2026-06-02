# Chess Recipes

## Add A Rendered Piece

```js
const piece = this.add.circle(0, 0, 18, 0xffcc66);
board.addChess(piece, 2, 3, 0, true);
```

## Add A Plain Data Piece

```js
const piece = { type: 'pawn', owner: 1 };
board.addChess(piece, 2, 3, 0, false);
```

## Move If Empty

```js
function tryMove(board, chess, toTileX, toTileY, tileZ = 0) {
  if (!board.contains(toTileX, toTileY, tileZ)) {
    return false;
  }

  if (!board.isEmptyTileXYZ(toTileX, toTileY, tileZ)) {
    return false;
  }

  board.moveChess(chess, toTileX, toTileY, tileZ, true);
  return true;
}
```

## Swap Two Pieces

```js
board.swapChess(chessA, chessB, true);
```

## Remove By Tile

```js
const chess = board.tileXYZToChess(tileX, tileY, tileZ);
if (chess) {
  board.removeChess(null, tileX, tileY, tileZ, true);
}
```

## Iterate Board Tiles

```js
board.forEachTileXY((tileXY) => {
  const piece = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
  if (piece) {
    // Handle piece.
  }
});
```

These recipes are reduced for skill reference from common RexBoard chess placement patterns. They do not require the `examples/` directory.
