## Introduction

Gamepad's state of buttons, or axis.

- Author: Richard Davey

## Usage

### Get gamepad

- Get all currently connected Gamepads.
    ```javascript
    var gamepads = scene.input.gamepad.getAll();
    ```
- Get gamepad by index
    ```javascript
    var gamepad = scene.input.gamepad.getPad(0);
    // var gamepad = scene.input.gamepad.getPad(index);
    ```
- Get gamepad when button-down.
    ```javascript
    scene.input.gamepad.once('down', function (gamepad, button, value) {
    }
    ```
    - `gamepad` : A reference to the Gamepad on which the button was released. See [Properties of gamepad](gamepad.md#properties-of-gamepad)
    - `button` : A reference to the Button which was released.
    - `value` : The value of the button at the time it was released. Between 0 and 1. Some Gamepads have pressure-sensitive buttons.

### Events

- Button down
    ```javascript
    scene.input.gamepad.on('down', function (gamepad, button, value) {
    }
    ```
    or
    ```javascript
    gamepad.on('down', function(buttonIndex, value, button) {
    })
    ```
- Button up
    ```javascript
    scene.input.gamepad.on('up', function (gamepad, button, value) {
    }
    ```
    or
    ```javascript
    gamepad.on('up', function(buttonIndex, value, button) {
    })
    ```
- Gamepad connected
    ```javascript
    scene.input.gamepad.on('connected', function (gamepad, event) {
    }
    ```
- Gamepad disconnected
    ```javascript
    scene.input.gamepad.on('disconnected', function (gamepad, event) {
    }
    ```

### Gamepad

#### Buttons

- Cursor buttons
    ```javascript
    var isLeftDown = gamepad.left;
    var isRightftDown = gamepad.right;
    var isUpDown = gamepad.up;
    var isDownDown = gamepad.down;
    ```
- Right buttons cluster
    ```javascript
    var isADown = gamepad.A;  // Dual Shock controller: X button
    var isYDown = gamepad.Y;  // Dual Shock controller: Triangle button
    var isXDown = gamepad.X;  // Dual Shock controller: Square button.
    var isBDown = gamepad.B;  // Dual Shock controller: Circle button
    ```
- Shoulder buttons
    ```javascript
    var isL1Down = gamepad.L1; // XBox controller: LB button
    var isL2Down = gamepad.L2; // XBox controller: LT button
    var isR1Down = gamepad.R1; // XBox controller: RB button
    var isR2Down = gamepad.R2; // XBox controller: RT button
    ```

#### Axis sticks

- Left sticks, right sticks
    ```javascript
    var leftStick = gamepad.leftStick;
    var rightStick = gamepad.rightStick;
    ```
    - `leftStick`, `rightStick` : Read only [vector2](vector2.md).
        - Angle : `leftStick.angle()`
        - Length : `leftStick.length()`
        - x, y : `leftStick.x` , `leftStick.y`

#### Properties

- `gamepad.index` : An integer that is unique for each Gamepad currently connected to the system.
    This can be used to distinguish multiple controllers. 
    Note that disconnecting a device and then connecting a new device may reuse the previous index.
- `gamepad.id` : A string containing some information about the controller.
- `gamepad.buttons` : An array of Gamepad Button objects, corresponding to the different buttons available on the Gamepad.
- `gamepad.axes` : An array of Gamepad Axis objects, corresponding to the different axes available on the Gamepad, if any.
