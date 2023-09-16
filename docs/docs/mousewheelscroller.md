## Introduction

Emit scroll event when mouse-wheeling.

- Author: Rex
- Member of scene

## Live demos

- [Scroller](https://codepen.io/rexrainbow/pen/abWELpb)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/mouse-wheel-scroller)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexmousewheelscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmousewheelscrollerplugin.min.js', true);
    ```
- Add mouse-wheeling-to-cursor-key object
    ```javascript
    var scroller = scene.plugins.get('rexmousewheelscrollerplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import MouseWheelScrollerPlugin from 'phaser3-rex-plugins/plugins/mousewheelscroller-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexMouseWheelScroller',
                plugin: MouseWheelScrollerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add mouse-wheeling-to-cursor-key object
    ```javascript
    var scroller = scene.plugins.get('rexMouseWheelScroller').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import MouseWheelScroller from 'phaser3-rex-plugins/plugins/mousewheelscroller.js';
    ```
- Add mouse-wheeling-to-cursor-key object
    ```javascript
    var scroller = new MouseWheelScroller(gameObject, config);
    ```

### Create instance

```javascript
var scroller = scene.plugins.get('rexMouseWheelScroller').add(gameObject, {
    // focus: true,
    // speed: 0.1,
    // enable: true,
});
```

- `focus` : Fire `'scroll'` event when mouse-wheeling --
    - `true` : Cursor is over game object. Default behavior.
    - `false` : Without checking if cursor is over game object or not.
- `speed` : Scrolling speed. Default value is `0.1`.
- `enable` : Set `true` to enable 'scroll' event.

### Event

- Scroll
    ```javascript
    scroller.on('scroll', function(inc, gameObject, scroller) {

    }, scope)
    ```
    - `inc` : Scroll value, 
        - Positive value : Mouse-wheeling down
        - Negative value : Mouse-wheeling up

### Speed

- Set
   ```javascript
   scroller.setSpeed(speed);
   // scroller.speed = speed;
   ```
- Get
    ```javascript
    var speed = scroller.speed;
    ```

### Enable

- Set
   ```javascript
   scroller.setEnable(enable);
   // scroller.enable = enable;
   ```
- Get
    ```javascript
    var enable = scroller.enable;
    ```