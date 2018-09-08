## Introduction

Rhombus shape and methods, extends from [Polygon shape](geom-rhombus.md).

- Author: Rex
- Geometry object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/rhombus-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexrhombusplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/rhombus)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexRhombus from './plugins/rhombus.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import RhombusPlugin from './plugins/rhombus-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRhombus',
            plugin: RhombusPlugin,
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
var rhombus = scene.plugins.get('rexRhombus').add(x, y, width, height);
```
or
```javascript
var rhombus = scene.plugins.get('rexRhombus').add({
    x: 0,
    y: 0,
    width: 40,
    height: 20
});
```
or
```javascript
var rhombus = new rexRhombus(x, y, width, height);
// var rhombus = new Phaser.Geom.rexRhombus(x, y, width, height);
```

- `x` : Top X.
- `y` : Left Y.

### Draw on [graphics](graphics.md)

See [Polygon shape](geom-polygon.md#draw-on-graphics).

### Set properties

- All properties
    ```javascript
    rhombus.setTo(x, y, width, height);
    ```
- Position
    ```javascript
    rhombus.setPosition(x, y);
    ```
    or
    ```javascript
    rhombus.x = 0;
    rhombus.y = 0;
    ```
    or
    ```javascript
    rhombus.left = 0;       // rhombus.x
    rhombus.top = 0;        // rhombus.y
    rhombus.right = 0;      // rhombus.x
    rhombus.bottom = 0;     // rhombus.y
    ```
- Size
    ```javascript
    rhombus.setSize(width, height);
    ```
    or
    ```javascript
    rhombus.width = width;
    rhombus.height = height;
    ```

### Get properties

See [Polygon shape](geom-polygon.md#get-properties).

- Position
    - Center
        ```javascript
        var centerX = rhombus.centerX;
        var centerY = rhombus.centerY;
        ```
    - Bound
        ```javascript
        var top = rhombus.top;
        var left = rhombus.left;
        var right = rhombus.right;
        var bottom = rhombus.bottom;
        ```
- Width
    ```javascript
    var width = rhombus.width;
    ```
- Height
    ```javascript
    var width = rhombus.height;
    ```
- Lines around rhombus
    ```javascript
    var edge01 = rhombus.getLineA();
    var edge12 = rhombus.getLineB();
    var edge23 = rhombus.getLineC();
    var edge34 = rhombus.getLineD();
    ```
    or
    ```javascript
    var edge = rhombus.getEdge(edgeIdx);
    // var out = rhombus.getEdge(edgeIdx, out);
    ```

### Point(s) & shape

See [Polygon shape](geom-polygon.md#points-shape).
