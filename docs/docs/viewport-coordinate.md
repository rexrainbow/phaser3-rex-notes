## Introduction

Attach `vpx`, `vpy` properties to a game object, to set position according to proportion (`vpx`, `vpy`) of viewport, a [rectangle](geom-rectangle.md)).

- Author: Rex
- Method only

## Live demos

- [Resize](https://codepen.io/rexrainbow/pen/rNJwGOp)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/viewport-coordinate)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexviewportcoordinateplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexviewportcoordinateplugin.min.js', true);
    ```
- Attach `vpx`, `vpy` properties.
    ```javascript
    scene.plugins.get('rexviewportcoordinateplugin').add(gameObject, viewport, vpx, vpy);
    gameObject.vpx = 0.5;
    gameObject.vpy = 0.5;
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ViewportCoordinatePlugin from 'phaser3-rex-plugins/plugins/viewportcoordinate-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexViewportCoordinate',
                plugin: ViewportCoordinatePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Attach `vpx`, `vpy`, `vpxOffset`, `vpyOffset` properties.
    ```javascript
    scene.plugins.get('rexViewportCoordinate').add(gameObject, viewport, vpx, vpy);
    gameObject.vpx = 0.5;
    gameObject.vpy = 0.5;
    gameObject.vpxOffset = 0;
    gameObject.vpyOffset = 0;
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import AddViewportCoordinateProperties from 'phaser3-rex-plugins/plugins/viewportcoordinate.js';
    ```
- Attach `vpx`, `vpy`, `vpxOffset`, `vpyOffset` properties.
    ```javascript
    AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy);
    gameObject.vpx = 0.5;
    gameObject.vpy = 0.5;
    gameObject.vpxOffset = 0;
    gameObject.vpyOffset = 0;
    ```

### Attach properties

```javascript
scene.plugins.get('rexViewportCoordinate').add(gameObject, viewport, vpx, vpy, transformCallback);
```

- `vpx`, `vpy` : Proportion of viewport.
- `vpxOffset`, `vpyOffset` : Offset of position.
- `viewport` : Viewport in [rectangle](geom-rectangle.md)
- `transformCallback` : Transform callback.
    - `undefined` : Use default transform callback.
        ```javascript
        function(vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
            gameObject.x = viewport.x + (viewport.width * vpx) + vpxOffset;
            gameObject.y = viewport.y + (viewport.height * vpy) + vpyOffset;
        }
        ```

Changing 

- `gameObject.vpx`, `gameObject.vpy`, `gameObject.vpxOffset`, `gameObject.vpyOffset`
- `x`, `y`, `width`, `height` of viewport (a [rectangle](geom-rectangle.md))

Will change position (`x` , `y`) of game object.