## Introduction

[Hexagon shape](https://www.redblobgames.com/grids/hexagons/) and methods, extends from [Polygon shape](geom-hexagon.md).

- Author: Rex
- Geometry object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/hexagon-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexhexagonplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/hexagon)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexHexagon from './plugins/hexagon.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import HexagonPlugin from './plugins/hexagon-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexHexagon',
            plugin: HexagonPlugin,
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
var hexagon = scene.plugins.get('rexHexagon').add(x, y, size, type);
```
or
```javascript
var hexagon = scene.plugins.get('rexHexagon').add({
    x: 0,
    y: 0,
    size: 20,
    type: 0     // 0|'flat'|'vertical'|1|'pointy'|'horizontal'
});
```
or
```javascript
var hexagon = new rexHexagon(x, y, size, type);
// var hexagon = new Phaser.Geom.rexHexagon(x, y, size, type);
```

- `x` : Center X.
- `y` : Center Y.
- `size` : Distance between center to each corner.
- `type` : See [here](https://www.redblobgames.com/grids/hexagons/#basics)
    - `0`, `'flat'`, or `'y'`
    - `1`, `'pointy'` or ,`'x'`

### Draw on [graphics](graphics.md)

See [Polygon shape](geom-polygon.md#draw-on-graphics).

### Set properties

- All properties
    ```javascript
    hexagon.setTo(x, y, size, type);
    ```
- Position
    ```javascript
    hexagon.setPosition(x, y);
    ```
    or
    ```javascript
    hexagon.x = 0;
    hexagon.y = 0;
    ```
    or
    ```javascript
    hexagon.centerX = 0;  // equal to hexagon.x
    hexagon.centerY = 0;  // equal to hexagon.y
    ```    
    or
    ```javascript
    hexagon.left = 0;       // hexagon.x
    hexagon.top = 0;        // hexagon.y
    hexagon.right = 0;      // hexagon.x
    hexagon.bottom = 0;     // hexagon.y
    ```
- Size
    ```javascript
    hexagon.setSize(size);
    ```
    or
    ```javascript
    hexagon.size = size;
    ```
- Type
    ```javascript
    hexagon.setType(type);
    ```
    or
    ```javascript
    hexagon.type = type;
    ```
    - `type` : See [here](https://www.redblobgames.com/grids/hexagons/#basics)
        - `0`, `'flat'`, or `'y'`
        - `1`, `'pointy'` or ,`'x'` 

### Get properties

See [Polygon shape](geom-polygon.md#get-properties).

- Position
    - Center
        ```javascript
        var centerX = hexagon.centerX;
        var centerY = hexagon.centerY;
        ```
        or
        ```javascript
        var centerX = hexagon.x;
        var centerY = hexagon.y;
        ```
    - Bound
        ```javascript
        var top = hexagon.top;
        var left = hexagon.left;
        var right = hexagon.right;
        var bottom = hexagon.bottom;
        ```
- Width
    ```javascript
    var width = hexagon.width;
    ```
- Height
    ```javascript
    var width = hexagon.height;
    ```
- Lines around hexagon
    ```javascript
    var edge01 = hexagon.getLineA();
    var edge12 = hexagon.getLineB();
    var edge23 = hexagon.getLineC();
    var edge34 = hexagon.getLineD();
    var edge45 = hexagon.getLineE();
    var edge50 = hexagon.getLineF();
    // var out = hexagon.getLineF(out);
    ```
    or
    ```javascript
    var edge = hexagon.getEdge(edgeIdx);
    // var out = hexagon.getEdge(edgeIdx, out);
    ```

### Point(s) & shape

See [Polygon shape](geom-polygon.md#points-shape).
