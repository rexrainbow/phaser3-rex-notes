## Introduction

Combo-keys events.

- Author: Richard Davey

## Usage

1. Create combo
    ```javascript
    var keyCombo = scene.input.keyboard.createCombo(keys, {
        // resetOnWrongKey: true,
        // maxKeyDelay: 0,
        // resetOnMatch: false,
        // deleteOnMatch: false,
    });
    ```
    - `keys` : Array of keyCodes
        - In strings. ex: `['up', 'up', 'down', 'down']`, or `['UP', 'UP', 'DOWN', 'DOWN']`
        - In [key map](keyboardevents.md#key-map). ex: `[Phaser.Input.Keyboard.KeyCodes.UP, ... ]`
        - In numbers. ex: `[38, 38, 40, 40]`
    - `resetOnWrongKey` : Set `true` to reset the combo when press the wrong key.
    - `maxKeyDelay` : The max delay in ms between each key press. Set `0` to disable this feature.
    - `resetOnMatch` : Set `true` to reset the combo when previously matched.
    - `deleteOnMatch` : Set `true` to delete this combo when matched.
1. Listen combo matching event
    ```javascript
    scene.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) { /* ... */ });
    ```
