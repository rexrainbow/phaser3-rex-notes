# Board Events

Call `setInteractive` before relying on board input:

```js
board.setInteractive({
  enable: true,
  useTouchZone: true
});
```

## Pointer Events

Board event callback types include tile-level and game-object-level variants. Source files under `plugins/board/board/input/*.js` are the safest reference for exact emitted event names.

Common event names follow the RexBoard event families:

```js
board.on('tiledown', (pointer, tileXY) => {});
board.on('tileup', (pointer, tileXY) => {});
board.on('tilemove', (pointer, tileXY) => {});
board.on('tileover', (pointer, tileXY) => {});
board.on('tileout', (pointer, tileXY) => {});
```

Game-object callbacks receive a Phaser game object:

```js
board.on('gameobjectdown', (pointer, gameObject) => {});
board.on('gameobjectup', (pointer, gameObject) => {});
board.on('gameobjectmove', (pointer, gameObject) => {});
board.on('gameobjectover', (pointer, gameObject) => {});
board.on('gameobjectout', (pointer, gameObject) => {});
```

Chess game objects also emit board-prefixed events:

```js
chess.on('board.pointerdown', (pointer) => {});
chess.on('board.pointerup', (pointer) => {});
chess.on('board.pointermove', (pointer) => {});
chess.on('board.pointerover', (pointer) => {});
chess.on('board.pointerout', (pointer) => {});
```

## Gesture Events

Gesture callback families include tap, press, and swipe:

```js
board.on('tiletap', (tap, tileXY) => {});
board.on('tile2tap', (tap, tileXY) => {});
board.on('tilepressstart', (press, tileXY) => {});
board.on('tilepressend', (press, tileXY) => {});
board.on('tileswipe', (swipe, tileXY) => {});
```

Game-object gesture events:

```js
board.on('gameobjecttap', (tap, gameObject) => {});
board.on('gameobject2tap', (tap, gameObject) => {});
board.on('gameobjectpressstart', (press, gameObject) => {});
board.on('gameobjectpressend', (press, gameObject) => {});
board.on('gameobjectswipe', (swipe, gameObject) => {});
```

Chess game object gesture events:

```js
chess.on('board.tap', (tap) => {});
chess.on('board.2tap', (tap) => {});
chess.on('board.pressstart', (press) => {});
chess.on('board.pressend', (press) => {});
chess.on('board.swipe', (swipe) => {});
```

## Touch Zone

```js
const zone = board.getTouchZone();
```

Use `useTouchZone: true` when the board itself needs a broad input target even where no chess game object is present.
