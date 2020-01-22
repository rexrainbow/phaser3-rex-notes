## Introduction

[Hexagon shape](https://www.redblobgames.com/grids/hexagons/) and methods, extends from [Polygon geometry object](geom-polygon.md).

- Author: Rex
- Geometry object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/hexagon)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhexagonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhexagonplugin.min.js', true);
    ```
- Add hexagon geometry object
    ```javascript
    var hexagon = scene.plugins.get('rexhexagonplugin').add(x, y, size, orientationType);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HexagonPlugin from 'phaser3-rex-plugins/plugins/hexagon-plugin.js';
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
- Add hexagon geometry object
    ```javascript
    var hexagon = scene.plugins.get('rexHexagon').add(x, y, size, orientationType);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Hexagon from 'phaser3-rex-plugins/plugins/hexagon.js';
    ```
- Add hexagon geometry object
    ```javascript
    var hexagon = new Hexagon(x, y, size, orientationType);
    ```

### Create shape

```javascript
var hexagon = scene.plugins.get('rexHexagon').add(x, y, size, orientationType);
```
or
```javascript
var hexagon = scene.plugins.get('rexHexagon').add({
    x: 0,
    y: 0,
    size: 20,
    orientationType: 0     // 0|'flat'|'vertical'|1|'pointy'|'horizontal'
});
```
or
```javascript
var hexagon = new Phaser.Geom.rexHexagon(x, y, size, orientationType);
```

- `x` : Center X.
- `y` : Center Y.
- `size` : Distance between center to each corner.
- `orientationType` : See [here](https://www.redblobgames.com/grids/hexagons/#basics)
    - `0`, `'flat'`, or `'y'`
    - `1`, `'pointy'` or ,`'x'`

### Draw on [graphics](graphics.md)

See [Polygon shape](geom-polygon.md#draw-on-graphics).

### Set properties

- All properties
    ```javascript
    hexagon.setTo(x, y, size, orientationType);
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
- Orientation type
    ```javascript
    hexagon.setType(orientationType);
    ```
    or
    ```javascript
    hexagon.orientationType = orientationType;
    ```
    - `orientationType` : See [here](https://www.redblobgames.com/grids/hexagons/#basics)
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
