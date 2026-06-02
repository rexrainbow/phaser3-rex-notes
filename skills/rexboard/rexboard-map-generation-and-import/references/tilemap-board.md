# Tilemap Board

`CreateBoardFromTilemap` creates a RexBoard board from a Phaser tilemap.

Scene plugin:

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

Accepted `layers`:

- `Phaser.Tilemaps.TilemapLayer`
- `Phaser.Tilemaps.TilemapLayer[]`
- `string`
- `string[]`

Workflow:

```js
const tilemap = this.make.tilemap({ key: 'level' });
const ground = tilemap.createLayer('ground', tileset, 0, 0);
const board = this.rexBoard.createBoardFromTilemap(tilemap, ground);

const bounds = board.getBoardBounds(true);
```

Gotchas:

- The imported board reflects tilemap data; confirm layer selection before using occupancy or blockers.
- Do not assume imported tilemap layers match your desired gameplay `tileZ` convention without checking.
- If a visual layer already exists in the tilemap, do not duplicate rendered RexBoard tiles unless needed for interaction or highlighting.
