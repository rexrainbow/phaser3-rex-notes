## Introduction

Fires 'clickoutside' event when pointer-down or pointer-up outside of game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Click outside](https://codepen.io/rexrainbow/pen/VwQLKzE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/click-outside)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexclickoutsideplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclickoutsideplugin.min.js', true);
    ```
- Add click-outside behavior
    ```javascript
    var clickOutside = scene.plugins.get('rexclickoutsideplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ClickOutsidePlugin from 'phaser3-rex-plugins/plugins/clickoutside-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexClickOutsiden',
                plugin: ClickOutsidePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add click-outside behavior
    ```javascript
    var clickOutside = scene.plugins.get('rexClickOutsiden').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ClickOutside from 'phaser3-rex-plugins/plugins/clickoutside.js';
    ```
- Add clickoutside behavior
    ```javascript
    var clickOutside = new ClickOutside(gameObject, config);
    ```

### Create instance

```javascript
var clickOutside = scene.plugins.get('rexClickOutside').add(gameObject, {
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

- Click-outside
    ```javascript
    clickOutside.on('clickoutside', function (clickoutside, gameObject, pointer) {
        // ...
    }, scope);
    ```
- Enable
    ```javascript
    clickOutside.on('enable', function (clickoutside, gameObject) {
        // ...
    }, scope);
    ```
- Disable
    ```javascript
    clickOutside.on('disable', function (clickoutside, gameObject) {
        // ...
    }, scope);
    ```

### Enable

- Get
    ```javascript
    var enabled = clickOutside.enable;  // enabled: true, or false
    ```
- Set
    ```javascript
    clickOutside.setEnable(enabled);  // enabled: true, or false
    // clickOutside.enable = enabled;
    ```
- Toggle
    ```javascript
    clickOutside.toggleEnable();
    ```

### Set mode

```javascript
clickOutside.setMode(mode);
```

- `mode` :
    - `'press'`, or `0` : Fire 'click' event when touch pressed.
    - `'release'`, or `1` : Fire 'click' event when touch released after pressed.

### Set click interval

```javascript
clickOutside.setClickInterval(interval);  // interval in ms
```