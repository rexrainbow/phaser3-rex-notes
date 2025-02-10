## Introduction

Quad shape, offsets can be given on four vertices, and additional points can be added on the four sides.

- Author: Rex
- Game object

## Live demos

- [Ease vertices](https://codepen.io/rexrainbow/pen/xxNEraV)
- [Ease side-points](https://codepen.io/rexrainbow/pen/WNBGOgY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/quadshape)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexquadshapeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadshapeplugin.min.js', true);
    ```
- Add shape object
    ```javascript
    var quad = scene.add.rexQuadShape(x, y, width, height, fillColor, fillAlpha);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import QuadShapePlugin from 'phaser3-rex-plugins/plugins/quadshape-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexQuadShapePlugin',
                plugin: QuadShapePlugin,
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
    var quad = scene.add.rexQuadShape(x, y, width, height, fillColor, fillAlpha);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import QuadShape from 'phaser3-rex-plugins/plugins/quadshape.js';
    ```
- Add shape object
    ```javascript    
    var quad = new QuadShape(scene, x, y, width, height, fillColor, fillAlpha);
    scene.add.existing(quad);
    ```

### Create shape object

```javascript
var quad = scene.add.rexQuadShape(x, y, width, height, fillColor, fillAlpha);
```

or

```javascript
var quad = scene.add.rexQuadShape({
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    color: undefined,
    alpha: undefined,

    strokeColor: undefined,
    strokeAlpha: undefined,
    strokeWidth: 2,

    tlx: 0,
    tly: 0,
    trx: 0,
    try: 0,
    blx: 0,
    bly: 0,
    brx: 0,
    bry: 0,

    leftSidePoints: [
        // {t, x, y, key},
        // {t, x, y, key},
        // ...
    ],
    rightSidePoints: [
        // {t, x, y, key},
        // {t, x, y, key},
        // ...
    ],
    topSidePoints: [
        // {t, x, y, key},
        // {t, x, y, key},
        // ...
    ],
    bottomSidePoints: [
        // {t, x, y, key},
        // {t, x, y, key},
        // ...
    ],
});
```

- `width`, `height` : Size of quadangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `tlx`, `tly` : Offset of top-left vertex.
- `trx`, `try` : Offset of top-right vertex.
- `blx`, `bly` : Offset of bottom-left vertex.
- `brx`, `bry` : Offset of bottom-right vertex.
- `leftSidePoints`, `rightSidePoints`, `topSidePoints`, `bottomSidePoints` : A list of points, additional points on left-side/right-side/top-side/bottom-side. 
    ```javascript
    {
        t, x, y, key
    }
    ```
    - `t` : Position in percent of edge.
    - `x`, `y` : Offset of this point on edge.
    - `key` : 
        - `undefined` : Ignore this feature. Default value.
        - A string: Inject `key+'Ｘ'`, `key+'Y'`, `key+'T'` properties into this quad shape game object.

### Custom class

- Define class
    ```javascript
    class MyQuadShape extends RexPlugins.GameObjects.QuadShape {
        constructor(scene, x, y, width, height, fillColor, fillAlpha) {
            super(scene, x, y, width, height, fillColor, fillAlpha);
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
    var quad = new MyQuadShape(scene, x, y, width, height, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = quad.fillColor;
        var alpha = quad.fillAlpha;
        ```
    - Set
        ```javascript
        quad.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        quad.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var color = quad.strokeColor;
        ```
    - Set
        ```javascript
        quad.setStrokeStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        quad.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `quad.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = quad.alpha;
    ```
- Set
    ```javascript
    quad.setAlpha(alpha);
    // quad.alpha = alpha;
    ```

### Size

- Get
    ```javascript
    var width = quad.width;
    var height = quad.height;
    ```
- Set
    ```javascript
    quad.setSize(width, height);
    ```
    or
    ```javascript
    quad.width = width;
    quad.height = height;
    ```

### Display size

- Get
    ```javascript
    var width = quad.displayWidth;
    var height = quad.displayHeight;
    ```
- Set
    ```javascript
    quad.setDisplaySize(width, height);
    ```
    or
    ```javascript
    quad.displayWidth = width;
    quad.displayHeight = height;
    ```

### Position of vertices

- Top-left vertex
    - Get
       ```javascript
       var x = quad.tlx;
       var y = quad.tly;
       ```
    - Set
        ```javascript
        quad.setTLPosition(x, y);
        ```
        or
        ```javascript
        quad.tlx = x;
        quad.tly = y;
        ```
- Top-right vertex
    - Get
       ```javascript
       var x = quad.trx;
       var y = quad.try;
       ```
    - Set
        ```javascript
        quad.setTRPosition(x, y);
        ```
        or
        ```javascript
        quad.trx = x;
        quad.try = y;
        ```
- Bottom-left vertex
    - Get
       ```javascript
       var x = quad.blx;
       var y = quad.bly;
       ```
    - Set
        ```javascript
        quad.setBLPosition(x, y);
        ```
        or
        ```javascript
        quad.blx = x;
        quad.bly = y;
        ```
- Bottom-right vertex
    - Get
       ```javascript
       var x = quad.brx;
       var y = quad.bry;
       ```
    - Set
        ```javascript
        quad.setBRPosition(x, y);
        ```
        or
        ```javascript
        quad.brx = x;
        quad.bry = y;
        ```

### Position of side points

- Top side
    ```javascript
    quad.insertTopSidePoint(t, x, y);
    // quad.insertTopSidePoint(t, x, y, key);
    // quad.insertTopSidePoint({t, x, y, key});
    ```
    - `t` : Position in percent of edge.
    - `x`, `y` : Offset of this point on edge.
    - `key` : 
            - `undefined` : Ignore this feature. Default value.
            - A string: Inject `key+'Ｘ'`, `key+'Y'`, `key+'T'` properties into this quad shape game object.
- Right side
    ```javascript
    quad.insertRightSidePoint(t, x, y);
    // quad.insertRightSidePoint(t, x, y, key);
    // quad.insertRightSidePoint({t, x, y, key});
    ```
    - `t` : Position in percent of edge.
    - `x`, `y` : Offset of this point on edge.
    - `key` : 
            - `undefined` : Ignore this feature. Default value.
            - A string: Inject `key+'Ｘ'`, `key+'Y'`, `key+'T'` properties into this quad shape game object.
- Bottom side
    ```javascript
    quad.insertBottomSidePoint(t, x, y);
    // quad.insertBottomSidePoint(t, x, y, key);
    // quad.insertBottomSidePoint({t, x, y, key});
    ```
    - `t` : Position in percent of edge.
    - `x`, `y` : Offset of this point on edge.
    - `key` : 
            - `undefined` : Ignore this feature. Default value.
            - A string: Inject `key+'Ｘ'`, `key+'Y'`, `key+'T'` properties into this quad shape game object.
- Left side
    ```javascript
    quad.insertLeftSidePoint(t, x, y);
    // quad.insertLeftSidePoint(t, x, y, key);
    // quad.insertLeftSidePoint({t, x, y, key});
    ```
    - `t` : Position in percent of edge.
    - `x`, `y` : Offset of this point on edge.
    - `key` : 
            - `undefined` : Ignore this feature. Default value.
            - A string: Inject `key+'Ｘ'`, `key+'Y'`, `key+'T'` properties into this quad shape game object.

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = quad.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
