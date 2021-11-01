## Introduction

[Rectangle shape covered full window](shape-fullwindowrectangle.md), and [block all touch events](toucheventstop.md).

- Author: Rex
- Game object

## Live demos

- [Cover](https://codepen.io/rexrainbow/pen/NWvNwwZ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/cover)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcoverplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcoverplugin.min.js', true);
    ```
- Add cover object
    ```javascript
    var cover = scene.add.rexCover(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CoverPlugin from 'phaser3-rex-plugins/plugins/cover-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCoverPlugin',
                plugin: CoverPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add cover object
    ```javascript
    var cover = scene.add.rexCover(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Cover from 'phaser3-rex-plugins/plugins/cover.js';
    ```
- Add cover object
    ```javascript    
    var cover = new Cover(scene, config);
    scene.add.existing(cover);
    ```

### Create cover object

```javascript
var cover = scene.add.rexCover({
    // color: 0x0,
    // alpha: 0.8
});
```

- `color` : Color of cover.
- `alpha` : Alpha value of cover.

### Custom class

- Define class
    ```javascript
    class MyCover extends RexPlugins.GameObjects.Cover {
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
    var cover = new MyCover(scene, config);
    ```

### Color

- Tint
    - Get
        ```javascript
        var tint = cover.tint;
        ```
    - Set
        ```javascript
        cover.tint = tint;
        ```
- Alpha
    - Get
        ```javascript
        var alpha = cover.alpha;
        ```
    - Set
        ```javascript
        cover.alpha = alpha;
        ```
- Fill color
    - Get
        ```javascript
        var color = cover.fillColor;
        var alpha = cover.fillAlpha;
        ```
    - Set
        ```javascript
        cover.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        cover.setFillStyle();
        ```

### Other properties

See [game object](gameobject.md)
