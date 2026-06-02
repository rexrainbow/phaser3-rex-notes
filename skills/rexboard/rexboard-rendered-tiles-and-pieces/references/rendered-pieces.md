# Rendered Pieces

## Factories

Scene plugin:

```js
const shape = this.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard);
const image = this.rexBoard.add.image(board, tileX, tileY, tileZ, key, frame, addToBoard);
const sprite = this.rexBoard.add.sprite(board, tileX, tileY, tileZ, key, frame, addToBoard);
```

Direct constructors:

```js
const shape = new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard);
const image = new Image(board, tileX, tileY, tileZ, key, frame, addToBoard);
const sprite = new Sprite(board, tileX, tileY, tileZ, key, frame, addToBoard);
```

`board` can be a `Board` or `MiniBoard`.

## `addToBoard`

- `true`: register the object as chess at construction time.
- `false` or omitted when you want to configure the object first, then call `board.addChess(object, tileX, tileY, tileZ, true)` yourself.

## Object Types

| Type | Extends | Use |
| --- | --- | --- |
| `Shape` | `Phaser.GameObjects.Polygon` | Grid cells, placeholder pieces, generated board visuals |
| `Image` | `Phaser.GameObjects.Image` | Static textured pieces |
| `Sprite` | `Phaser.GameObjects.Sprite` | Animated or frame-based pieces |

Constructed objects expose `rexChess` after board registration.

## Plain Phaser Objects

Custom visuals are valid:

```js
const piece = this.add.container(0, 0, [body, label]);
board.addChess(piece, tileX, tileY, tileZ, true);
```

Use plain Phaser objects when the visual is a composite, text label, custom shader, or existing project component.
