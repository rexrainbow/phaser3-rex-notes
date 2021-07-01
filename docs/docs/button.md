## Introduction

Fires 'click' event when touch releasd after pressed.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/button)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
    ```
- Add button behavior
    ```javascript
    var button = scene.plugins.get('rexbuttonplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ButtonPlugin from 'phaser3-rex-plugins/plugins/button-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexButtonn',
                plugin: ButtonPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add button behavior
    ```javascript
    var button = scene.plugins.get('rexButtonn').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Button from 'phaser3-rex-plugins/plugins/button.js';
    ```
- Add button behavior
    ```javascript
    var button = new Button(gameObject, config);
    ```

### Create instance

```javascript
var button = scene.plugins.get('rexButton').add(gameObject, {
    // enable: true,
    // mode: 1,            // 0|'press'|1|'release'
    // clickInterval: 100  // ms
});
```

- `enable` : Clickable.
- `mode` :
    - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
    - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
- `clickInterval` : Interval between 2 'click' events, in ms.

### Events

- Click
    ```javascript
    button.on('click', function (button, gameObject, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- Enable
    ```javascript
    button.on('enable', function (button, gameObject) {
        // ...
    }, scope);
    ```
- Disable
    ```javascript
    button.on('disable', function (button, gameObject) {
        // ...
    }, scope);
    ```

### Enable

- Get
    ```javascript
    var enabled = button.enable;  // enabled: true, or false
    ```
- Set
    ```javascript
    button.setEnable(enabled);  // enabled: true, or false
    // button.enable = enabled;
    ```
- Toggle
    ```javascript
    button.toggleEnable();
    ```

### Set mode

```javascript
button.setMode(mode);
```

- `mode` :
    - `'press'`, or `0` : Fire 'click' event when touch pressed.
    - `'release'`, or `1` : Fire 'click' event when touch released after pressed.

### Set click interval

```javascript
button.setClickInterval(interval);  // interval in ms
```