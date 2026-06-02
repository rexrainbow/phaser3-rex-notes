# Tilemap Import

`CreateBoardFromTilemap` creates a RexBoard `Board` from a Phaser tilemap and optional layers.

Scene plugin helper:

```js
const board = this.rexBoard.createBoardFromTilemap(tilemap, layers);
```

Direct helper:

```js
const board = CreateBoardFromTilemap(tilemap, layers);
```

Signature:

```js
CreateBoardFromTilemap(tilemap, layers);
```

`layers` can be:

- A `Phaser.Tilemaps.TilemapLayer`.
- An array of tilemap layers.
- A layer name string.
- An array of layer name strings.
- Omitted, depending on the tilemap workflow.

After import:

```js
const bounds = board.getBoardBounds(true);
const allChess = board.getAllChess();
```

Gotchas:

- A tilemap-derived board is data/model creation, not a complete rendered scene.
- Preserve the tilemap's grid assumptions; do not replace the board grid unless you know how the tilemap was converted.
- If adding pieces after import, use the same `tileZ` convention as the imported layers.
