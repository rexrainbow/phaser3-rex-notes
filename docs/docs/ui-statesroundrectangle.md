## Introduction

Using plain object to create [round rectangle game object](shape-roundrectangle.md), with active, hover, disable styles.

- Author: Rex
- Game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-statesroundrectangle)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add round-rectangle object
    ```javascript
    var rect = scene.rexUI.add.statesRoundRectangle(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add round-rectangle object
    ```javascript
    var rect = scene.rexUI.add.statesRoundRectangle(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { StatesRoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript
    var rect = new StatesRoundRectangle(scene, config);
    scene.add.existing(roundRectangle);
    ```

### Create shape object

```javascript
var rect = scene.rexUI.add.statesRoundRectangle({
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
   
    // color: 0xffffff,
    // alpha: 1,
    // strokeColor: 0xffffff,
    // strokeAlpha: 1,
    // strokeWidth: 2,
    // radius: 0,
    
    // Style override in active state
    // 'active.color': undefined,
    // 'active.alpha': undefined,
    // 'active.strokeColor': undefined,
    // 'active.strokeAlpha': undefined,
    // 'active.strokeWidth': undefined,
    // 'active.radius': undefined,
    // 'active.xxx': ...

    // Style override in hover state
    // 'hover.color': undefined,
    // 'hover.alpha': undefined,
    // 'hover.strokeColor': undefined,
    // 'hover.strokeAlpha': undefined,
    // 'hover.strokeWidth': undefined,
    // 'hover.radius': undefined,
    // 'hover.xxx': ...

    // Style override in disable state
    // 'disable.color': undefined,
    // 'disable.alpha': undefined,
    // 'disable.strokeColor': undefined,
    // 'disable.strokeAlpha': undefined,
    // 'disable.strokeWidth': undefined,
    // 'disable.radius': undefined,
    // 'disable.xxx': ...

});
```

- `width`, `height` : Size of rectangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `radius` : Radius of four corners.
    - `0`, or `undefined` : Disable round corner.
    - Number: 4 corners with the same radius.
    - JSON
        - 4 corners with the same radius X/Y
            ```javascript
            {
                x: radiusX,
                y: radiusY
            }
            ```
        - Eeach radius of corner
            ```javascript
            {
                tl: radius,
                tr: radius,
                bl: radius,
                br: radius
            }
            ```
            or
            ```javascript
            {
                tl: {x : radiusX, y: radiusY},
                tr: {x : radiusX, y: radiusY},
                bl: {x : radiusX, y: radiusY},
                br: {x : radiusX, y: radiusY},
            }
            ```
        - Radius and iteration
            ```javascript
            {
                radius: radius,
                iteration: 0
            }
            ```
            or
            ```javascript
            {
                radius: {x: radiusX, y: radiusY},
                iteration: 0
            }
            ```
            or
            ```javascript
            {
                radius: {
                    tl: {x : radiusX, y: radiusY},
                    tr: {x : radiusX, y: radiusY},
                    bl: {x : radiusX, y: radiusY},
                    br: {x : radiusX, y: radiusY},
                },
                iteration: 0
            }
            ```
            - `radius` : 
                - `0`  : No round corner
                - `> 0` : Convex round corner
                - `< 0` : Concave round corner
            - `iteration` : Number of interpolation points in each round corner. Default value is `4`.
                - `0` : Draw a straight line instead of arc.
- `'active.color'`, `'active.alpha'`, `'active.strokeColor'`, `'active.strokeAlpha'`, `'active.strokeWidth'`, `'active.radius'`, `'active.xxx'`, ... ect : Override these properties in [active state](ui-statesroundrectangle.md#active-state)
- `'hover.color'`, `'hover.alpha'`, `'hover.strokeColor'`, `'hover.strokeAlpha'`, `'hover.strokeWidth'`, `'hover.radius'`, `'hover.xxx'`, ... ect : Override these properties in [hover state](ui-statesroundrectangle.md#hover-state)
- `'disable.color'`, `'disable.alpha'`, `'disable.strokeColor'`, `'disable.strokeAlpha'`, `'disable.strokeWidth'`, `'disable.radius'`, `'disable.xxx'`, ... ect : Override these properties in [disable state](ui-statesroundrectangle.md#disable-state)

### Custom class

- Define class
    ```javascript
    class MyRoundRectangle extends RexPlugins.UI.StatesRoundRectangle {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var rect = new MyRoundRectangle(scene, config);
    ```

### Set state

#### Active state

- Enable active state
    ```javascript
    rect.setActiveState();
    // rect.setActiveState(true);
    ```
    - Override properties declared in config with prefix `'active.'` parameters.    
- Disable active state
    ```javascript
    rect.setActiveState(false);
    ```
    - Restore properties.

#### Hover state

- Enable active state
    ```javascript
    rect.setHoverState();
    // rect.setHoverState(true);
    ```
    - Override properties declared in config with prefix `'hover.'` parameters
- Disable active state
    ```javascript
    rect.setHoverState(false);
    ```
    - Restore properties.

#### Disable state

- Enable disable state
    ```javascript
    rect.setDisableState();
    // rect.setDisableState(true);
    ```
    - Override properties declared in config with prefix `'disable.'` parameters
- Disable active state
    ```javascript
    rect.setDisableState(false);
    ```
    - Restore properties.

### Other properties

See [Round rectangle](shape-roundrectangle.md), [game object](gameobject.md)
