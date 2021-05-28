## Introduction

Place objects randomly inside an area without overlapping.

- Author: Rex
- Methods

## Live demos

- [Random place](https://codepen.io/rexrainbow/pen/gOYXPrQ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/randomplace)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexrandomplaceplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexrandomplaceplugin.min.js', true);
    ```
- Random place objects
    ```javascript
    scene.plugins.get('rexrandomplaceplugin').randomPlace(gameObjects, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RandomPlacePlugin from 'phaser3-rex-plugins/plugins/randomplace-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRandomPlace',
                plugin: RandomPlacePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Random place objects
    ```javascript
    scene.plugins.get('rexRandomPlace').randomPlace(gameObjects, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RandomPlace from 'phaser3-rex-plugins/plugins/randomplace.js';
    ```
- Random place objects
    ```javascript
    RandomPlace(gameObjects, config);
    ```

### Random place

```javascript
scene.plugins.get('rexRandomPlace').randomPlace(gameObjects, {
    radius: radius,

    getPositionCallback: undefined,
    area: areaGeomObject,
});
```

- `gameObjects` : An array of gameObjects. Each item can be
    - A game objects.
    - A plain object contains
        ```javascript
        {
            gameObject: gameObject,
            radius: radius,
        }
        ```
        - `radius` : Collision radius of this game object.
- `radius` : Default collision radius of each game object.
- `getPositionCallback` : A callback to get a random position.
    - `undefined` : Use `area.getRandomPoint(out)` as callback.
    - A function object :
        ```javascript
        function(out) {
            out.x = 0;
            out.y = 0;
        }
        ```
- `area` : A geom object, which has `getRandomPoint` method.
    - A [circle](geom-circle.md) : `new Phaser.Geom.Circle(x, y, radius)`
    - A [rectangle](geom-rectangle.md) : `new Phaser.Geom.Rectangle(x, y, width, height)`
    - A [triangle](geom-triangle.md) : `new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3)`
    - An [ellipse](geom-ellipse.md) : `new Phaser.Geom.Ellipse(x, y, width, height)`
    - `undefined` : A rectangle (0, 0, gameWidth, gameHeight)
