## Introduction

Built-in keyboard events of phaser.

- Author: Richard Davey

## Usage

### Any key down/up events

```javascript
scene.input.keyboard.on('keydown', function (event) { /* ... */});
scene.input.keyboard.on('keyup', function (event) { /* ... */});
```

### Specific key down/up events

```javascript
scene.input.keyboard.on('keydown_' + 'A', function (event) { /* ... */});
scene.input.keyboard.on('keyup_' + 'A', function (event) { /* ... */});
```

### Get state of key

1. Get state object of a key
    ```javascript
    var WKey = scene.input.keyboard.addKey('W');  // see `Key map` section
    // var WKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    ```
    - Get state object of keys
        ```javascript
        var keys = scene.input.keyboard.addKey('W,S,A,D'); // comma-separated string
        ```
1. Get key state
    ```javascript
    var isDown = WKey.isDown;
    var isUp = WKey.isUp;
    ```
    - Key is down after a duration.
        ```javascript
        var isDown = scene.input.keyboard.checkDown(WKey, duration);
        ```

### Get state of cursorkeys

1. Get key state object
    ```javascript
    var cursorKeys = scene.input.keyboard.createCursorKeys();
    ```
1. Get key state
    ```javascript
    var isUpDown = cursorKeys.up.isDown;
    var isDownDown = cursorKeys.down.isDown;
    var isLeftDown = cursorKeys.left.isDown;
    var isRightDown = cursorKeys.right.isDown;
    var isSpaceDown = cursorKeys.space.isDown;
    var isShiftDown = cursorKeys.shift.isDown;
    ```

### Remove key state

```javascript
scene.input.keyboard.removeKey('W');
// scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
```

Removed key state won't be updated.

### Key map

- `A` ~ `Z`
- `F1` ~ `F12`
- `BACKSPACE`
- `TAB`
- `ENTER`
- `SHIFT`
- `CTRL`. `ALT`
- `PAUSE`
- `CAPS_LOCK`
- `ESC`
- `SPACE`
- `PAGE_UP`, `PAGE_DOWN`
- `END`, `HOME`
- `LEFT`, `UP`, `RIGHT`,`DOWN`
- `PRINT_SCREEN`
- `INSERT`, `DELETE`
- `ZERO`, `ONE`, `TWO`, `THREE`, `FOUR`, `FIVE`, `SIX`, `SEVEN`, `EIGHT`, `NINE`
- `NUMPAD_ZERO`, `NUMPAD_ONE`, `NUMPAD_TWO`, `NUMPAD_THREE`, `NUMPAD_FOUR`, `NUMPAD_FIVE`, `NUMPAD_SIX`, `NUMPAD_SEVEN`, `NUMPAD_EIGHT`, `NUMPAD_NINE`
- `OPEN_BRACKET`, `CLOSED_BRACKET`