# Tile Textures

`CreateTileTexture` creates a texture based on a board tile shape.

Scene plugin helper:

```js
this.rexBoard.createTileTexture(
  board,
  'tile',
  0x2b2f36,
  0xffffff,
  2,
  true,
  'round'
);
```

Direct helper:

```js
CreateTileTexture(board, 'tile', 0x2b2f36, 0xffffff, 2, true, 'round');
```

Signature:

```js
CreateTileTexture(board, key, fillStyle, strokeStyle, lineWidth, overlapGrid, lineJoin);
```

Notes:

- `fillStyle` and `strokeStyle` may be number or string, depending on Phaser graphics style usage.
- `overlapGrid` is optional; use it when neighboring tile strokes need to overlap cleanly.
- `lineJoin` supports `'round'`, `'bevel'`, and `'miter'`.
- The helper creates a texture key. Create images/sprites separately to display it.

Example:

```js
this.rexBoard.createTileTexture(board, 'hex-tile', 0x334455, 0x88aaff, 2, true);

board.forEachTileXY((tileXY) => {
  this.rexBoard.add.image(board, tileXY.x, tileXY.y, 1, 'hex-tile', undefined, true);
});
```
