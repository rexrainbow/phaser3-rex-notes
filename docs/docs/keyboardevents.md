## Introduction

Built-in keyboard events of phaser.

- Author: Richard Davey

## Usage

### Quick start

- Is key-down/is key-up
    ```javascript
    var keyObj = scene.input.keyboard.addKey('W');  // Get key object
    var isDown = keyObj.isDown;
    var isUp = keyObj.isUp;
    ```
- Key is down after a duration
    ```javascript
    var keyObj = scene.input.keyboard.addKey('W');  // Get key object
    var isDown = scene.input.keyboard.checkDown(keyObj, duration);
    ```
- On key-down/on key-up
    ```javascript
    var keyObj = scene.input.keyboard.addKey('W');  // Get key object
    keyObj.on('down', function(event) { /* ... */ });
    keyObj.on('up', function(event) { /* ... */ });
    ```
    or
    ```javascript
    scene.input.keyboard.on('keydown-' + 'W', function (event) { /* ... */ });
    scene.input.keyboard.on('keyup-' + 'W', function (event) { /* ... */ });
    ```
- Any key-down/any key-up
    ```javascript
    scene.input.keyboard.on('keydown', function (event) { /* ... */ });
    scene.input.keyboard.on('keyup', function (event) { /* ... */ });
    ```
    - `event` : [KeyboardEvent](https://www.w3schools.com/jsref/obj_keyboardevent.asp)
        - `event.code` : 'Key' + 'W'

### Key object

- Get key object
    ```javascript
    var keyObj = scene.input.keyboard.addKey('W');  // see `Key map` section
    // var keyObj = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    ```
- Get key objects
    ```javascript
    var keys = scene.input.keyboard.addKeys('W,S,A,D');  // keys.W, keys.S, keys.A, keys.D
    ```
    or
    ```javascript
    var keys = scene.input.keyboard.addKeys({
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
    });  // keys.up, keys.down, keys.left, keys.right
    ```
- Remove key object
    ```javascript
    scene.input.keyboard.removeKey('W');
    // scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
    ```
- Key-down/key-up state
    ```javascript
    var isDown = keyObj.isDown;
    var isUp = keyObj.isUp;
    ```
- Duration of key-down
    ```javascript
    var duration = keyObj.getDuration(); // ms
    ```
- Enable/disable
    ```javascript
    keyObj.enabled = enabled; // Set false to disable key event
    ```

### Key object of cursorkeys

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

### Order of key-down/key-up events

1. Key-down/key-up events of key object
    ```javascript
    var keyObj = scene.input.keyboard.addKey('W');  // Get key object
    keyObj.on('down', function(event) { /* ... */ });
    keyObj.on('up', function(event) { /* ... */ });
    ```
    - `event.stopImmediatePropagation()` : Stop any further listeners from being invoked in the current Scene.
    - `event.stopPropagation()` : Stop it reaching any other Scene.
1. On key-down/on key-up
    ```javascript
    scene.input.keyboard.on('keydown-' + 'W', function (event) { /* ... */ });
    scene.input.keyboard.on('keyup-' + 'W', function (event) { /* ... */ });
    ```
    - `event.stopImmediatePropagation()` : Stop any further listeners from being invoked in the current Scene.
    - `event.stopPropagation()` : Stop it reaching any other Scene.    
1. Any key-down/on key-up
    ```javascript
    scene.input.keyboard.on('keydown', function (eventName, event) { /* ... */ });
    scene.input.keyboard.on('keyup', function (eventName, event) { /* ... */ });
    ```
    - `event.stopImmediatePropagation()` : Stop any further listeners from being invoked in the current Scene.
    - `event.stopPropagation()` : Stop it reaching any other Scene.

### Destroy key object

```javascript
keyObj.destroy();
```

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
- `SEMICOLON_FIREFOX`, `COLON`, `COMMA_FIREFOX_WINDOWS`, `COMMA_FIREFOX`, `BRACKET_RIGHT_FIREFOX`, `BRACKET_LEFT_FIREFOX`