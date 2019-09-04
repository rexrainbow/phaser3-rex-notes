## Introduction

Place objects randomly inside an area without overlapping.

- Author: Rex
- Methods

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/randomplace-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexrandomplaceplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/randomplace)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexRandomPlace from './plugins/randomplace.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import RandomPlacePlugin from './plugins/randomplace-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRandomPlace',
            plugin: RandomPlacePlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Random place

```javascript
scene.plugins.get('rexRandomPlace').randomPlace(items, {
    radius: radius,

    getPositionCallback: undefined,
    area: areaGeomObject,
});
```

- `items` : An array of items. Each item can be
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
    - A [circle](geom-circle.md) : `new new Phaser.Geom.Circle(x, y, radius)`
    - A [rectangle](geom-rectangle.md) : `new new Phaser.Geom.Rectangle(x, y, width, height)`
    - A [triangle](geom-triangle.md) : `new new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3)`
    - An [ellipse](geom-ellipse.md) : `new new Phaser.Geom.Ellipse(x, y, width, height)`
    - `undefined` : A rectangle (0, 0, gameWidth, gameHeight)