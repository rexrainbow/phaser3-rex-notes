## Introduction

Set size and position based on visible window.

!!! note
    Visible window will be changed when scale mode is *ENVELOP*, *WIDTH_CONTROLS_HEIGHT*, or *HEIGHT_CONTROLS_WIDTH*.

- Author: Rex
- Behavior of game object

## Live demos

- [Anchor](https://codepen.io/rexrainbow/pen/oVxWVB)
- [Resize](https://codepen.io/rexrainbow/pen/ZEyRVov)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/anchor)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexanchorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexanchorplugin.min.js', true);
    ```
- Add anchor behavior
    ```javascript
    var anchor = scene.plugins.get('rexanchorplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AnchorPlugin from 'phaser3-rex-plugins/plugins/anchor-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexAnchor',
                plugin: AnchorPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add anchor behavior
    ```javascript
    var anchor = scene.plugins.get('rexAnchor').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Anchor from 'phaser3-rex-plugins/plugins/anchor.js';
    ```
- Add anchor behavior
    ```javascript
    var anchor = new Anchor(gameObject, config);
    ```

### Create instance

```javascript
var anchor = scene.plugins.get('rexAnchor').add(gameObject, {
    // left: '0%+0',
    // right: '0%+0',
    // centerX: '0%+0',
    // x: '0%+0',

    // top: '0%+0',
    // bottom: '0%+0',
    // centerY: '0%+0',
    // y: '0%+0',

    // width: '100%+0',
    // height: '100%+0',
    // onResizeCallback: function(width, height, gameObject, anchor) {},
    // onResizeCallbackScope: undefined,

    // onUpdateViewportCallback: function(viewport, gameObject, anchor) {},
    // onUpdateViewportCallbackScope: undefined,
});
```

- `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`.

For example, anchor game object's left bound to viewport's left+10, centerY to viewport's center

```javascript
{
    left: 'left+10',
    centerY: 'center'
}
```

- `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
    - Padding : `'+n'`, or `'-n'`.
- `onResizeCallback`, `onResizeCallbackScope` : Callback of resizing game object
    ```javascript
    function(width, height, gameObject, anchor) {
        // gameObject.setSize(width, height);
        // gameObject.setDisplaySize(width, height);
        // ...
    }
    ```

- `onUpdateViewportCallback`, `onUpdateViewportCallback` : Callback invoked when viewport changed (anchor)
    ```javascript
    fucntion(viewport, gameObject, anchor) {
        // Can change properties of viewport here
        // var centerX = viewport.centerX,
        //     centerY = viewport.centerY;
        // viewport.width *= 0.8;
        // viewport.height *= 0.9;
        // viewport.centerX = centerX;
        // viewport.centerY = centerY;
    }
    ```
    - `viewport`： A [rectangle object](geom-rectangle.md)

### Reset config

```javascript
anchor.resetFromJSON({
    // left: '0%+0',
    // right: '0%+0',
    // centerX: '0%+0',
    // x: '0%+0',

    // top: '0%+0',
    // bottom: '0%+0',
    // centerY: '0%+0',
    // y: '0%+0',

    // width: '100%+0',
    // height: '100%+0',    

    // onUpdateViewportCallback: function(viewport, gameObject, anchor) {}
    // onUpdateViewportCallbackScope: undefined,
})
```

- `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: 0~100
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`
- `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
    - Padding : `'+n'`, or `'-n'`.
- `onResizeCallback`, `onResizeCallbackScope` : Callback of resizing game object
    ```javascript
    function(width, height, gameObject, anchor) {
        // gameObject.setSize(width, height);
        // gameObject.setDisplaySize(width, height);
        // ...
    }
    ```

### Set OnUpdateViewport callback

```javascript
anchor.setUpdateViewportCallback(callback, scope);
```

- `callback` : 
    ```javascript
    fucntion(viewport, gameObject, anchor) {
        // Can change properties of viewport here
        // var centerX = viewport.centerX,
        //     centerY = viewport.centerY;
        // viewport.width *= 0.8;
        // viewport.height *= 0.9;
        // viewport.centerX = centerX;
        // viewport.centerY = centerY;
    }
    ```
    - `viewport`： A [rectangle object](geom-rectangle.md)

### Manual anchor

```javascript
anchor.anchor();
```