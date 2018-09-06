## Introduction

Diamond shape and methods, extends from [Polygon shape](geom-diamond.md).

- Author: Rex
- Geometry object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/diamond-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexdiamondplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/diamond)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexDiamond from './plugins/diamond.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import DiamondPlugin from './plugins/diamond-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexDiamond',
            plugin: DiamondPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create shape

```javascript
var diamond = scene.plugins.get('rexDiamond').add(x, y, width, height);
```
or
```javascript
var diamond = scene.plugins.get('rexDiamond').add({
    x: 0,
    y: 0,
    width: 40,
    height: 20
});
```
or
```javascript
var diamond = new rexDiamond(x, y, width, height);
// var diamond = new Phaser.Geom.rexDiamond(x, y, width, height);
```

- `x` : Top X.
- `y` : Left Y.

### Draw on [graphics](graphics.md)

See [Polygon shape](geom-diamond.md#draw-on-graphics).

### Set properties

- All properties
    ```javascript
    diamond.setTo(x, y, width, height);
    ```
- Position
    ```javascript
    diamond.setPosition(x, y);
    ```
    or
    ```javascript
    diamond.x = 0;
    diamond.y = 0;
    ```
    or
    ```javascript
    diamond.left = 0;       // diamond.x
    diamond.top = 0;        // diamond.y
    diamond.right = 0;      // diamond.x
    diamond.bottom = 0;     // diamond.y
    ```
- Size
    ```javascript
    diamond.setSize(width, height);
    ```
    or
    ```javascript
    diamond.width = width;
    diamond.height = height;
    ```

### Get properties

See [Polygon shape](geom-diamond.md#get-properties).

- Position
    - Center
        ```javascript
        var centerX = diamond.centerX;
        var centerY = diamond.centerY;
        ```
    - Bound
        ```javascript
        var top = diamond.top;
        var left = diamond.left;
        var right = diamond.right;
        var bottom = diamond.bottom;
        ```
- Width
    ```javascript
    var width = diamond.width;
    ```
- Height
    ```javascript
    var width = diamond.height;
    ```
- Lines around diamond
    ```javascript
    var edge01 = diamond.getLineA();
    var edge12 = diamond.getLineB();
    var edge23 = diamond.getLineC();
    var edge34 = diamond.getLineD();
    ```
    or
    ```javascript
    var edge = diamond.getEdge(edgeIdx);
    // var out = diamond.getEdge(edgeIdx, out);
    ```

### Point(s) & shape

See [Polygon shape](geom-diamond.md#points-shape).
