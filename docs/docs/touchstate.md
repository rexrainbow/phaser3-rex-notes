## Introduction

Store current touch input properties.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/touchstate)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextouchstateplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextouchstateplugin.min.js', true);
    ```
- Add touch-state behavior
    ```javascript
    var touchState = scene.plugins.get('rextouchstateplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TouchStatePlugin from 'phaser3-rex-plugins/plugins/touchstate-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTouchState',
                plugin: TouchStatePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add touch-state behavior
    ```javascript
    var touchState = scene.plugins.get('rexTouchState').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TouchState from 'phaser3-rex-plugins/plugins/touchstate.js';
    ```
- Add touch-state behavior
    ```javascript
    var touchState = new TouchState(gameObject, config);
    ```

### Create instance

```javascript
var touchState = scene.plugins.get('rexTouchState').add(gameObject, {
    // enable: true,
});
```

- `enable` : Can touch.

### Properties

- Is pointer down, is pointer up
    ```javascript
    var isDown = touchState.isDown;
    var isUp = touchState.isUp;
    ```
- Is in touching
    ```javascript
    var isInTouching = touchState.isInTouching;
    ```
- Drag speed
    ```javascript
    var speed = touchState.speed;
    var speedX =  touchState.speedX;
    var speedY =  touchState.speedY;
    ```
    ```javascript
    var dx = touchState.dx;
    var dy = touchState.dy;
    var dt = touchState.dt;    
    ``` 

### Events

- Touch start (pointer down)
    ```javascript
    touchState.on('touchstart', function (touchState, gameObject, pointer, localX, localY, event) {
        // ...
    }, scope);
    ```
- Touch end (pointer up)
    ```javascript
    touchState.on('touchend', function (touchState, gameObject, pointer) {
        // ...
    }, scope);
    ```
- Touch move (pointer move)
    ```javascript
    touchState.on('touchmove', function (touchState, gameObject, pointer, localX, localY, event) {
        // ...
    }, scope);
    ```

### Enable

- Get
    ```javascript
    var enabled = touchState.enable;  // enabled: true, or false
    ```
- Set
    ```javascript
    touchState.setEnable(enabled);  // enabled: true, or false
    // touchState.enable = enabled;
    ```
- Toggle
    ```javascript
    touchState.toggleEnable();
    ```
