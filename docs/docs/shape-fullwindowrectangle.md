## Introduction

Rectangle shape covered full window.

- Author: Rex
- Game object

## Live demos

- [Cover](https://codepen.io/rexrainbow/pen/MWvwrLM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/fullwindowrectangle)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfullwindowrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexfullwindowrectangleplugin.min.js', true);
    ```
- Add shape object
    ```javascript
    var rect = scene.add.rexFullWindowRectangle(fillColor, fillAlpha);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FullWindowRectanglePlugin from 'phaser3-rex-plugins/plugins/fullwindowrectangle-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFullWindowRectanglePlugin',
                plugin: FullWindowRectanglePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add shape object
    ```javascript
    var rect = scene.add.rexFullWindowRectangle(fillColor, fillAlpha);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import FullWindowRectangle from 'phaser3-rex-plugins/plugins/fullwindowrectangle.js';
    ```
- Add shape object
    ```javascript    
    var rect = new FullWindowRectangle(scene, fillColor, fillAlpha);
    scene.add.existing(rect);
    ```

### Create shape object

```javascript
var rect = scene.add.rexFullWindowRectangle(fillColor, fillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyFullWindowRectangle extends RexPlugins.GameObjects.FullWindowRectangle {
        constructor(scene, fillColor, fillAlpha) {
            super(scene, fillColor, fillAlpha);
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
    var rect = new MyFullWindowRectangle(scene, fillColor, fillAlpha);
    ```

### Color

- Tint
    - Get
        ```javascript
        var tint = rect.tint;
        ```
    - Set
        ```javascript
        rect.tint = tint;
        ```
- Alpha
    - Get
        ```javascript
        var alpha = rect.alpha;
        ```
    - Set
        ```javascript
        rect.alpha = alpha;
        ```
- Fill color
    - Get
        ```javascript
        var color = rect.fillColor;
        var alpha = rect.fillAlpha;
        ```
    - Set
        ```javascript
        rect.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        rect.setFillStyle();
        ```

### Other properties

See [game object](gameobject.md)
