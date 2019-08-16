## Introduction

Polygon shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var polygon = new Phaser.Geom.Polygon(points);
```

- `points` : 
    - An array of number : `[x0, y0, x1, y1, ...]`
    - An array of points : `[{x:x0, y:y0}, {x:x1, y:y1}, ...]`
    - A string : `'x0 y0 x1 y1 ...'`

#### Clone shape

```javascript
var polygon1 = Phaser.Geom.Polygon.Clone(polygon0);
```

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    // graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    graphics.fillPoints(polygon.points, true);
    ```
- Stroke shape
    ```javascript
    // graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
    graphics.strokePoints(polygon.points, true);
    ```

### Set properties

```javascript
polygon.setTo(points);
// points = [x0, y0, x1, y1, x2, y2, ...] , or [{x,y}, {x,y}, {x,y}, ...]
```

### Get properties

- Points
    ```javascript
    var points = polygon.points;    // array of points {x,y}
    ```
- Area
    ```javascript
    var area = polygon.area;
    ```
- Number array
    ```javascript
    var out = Phaser.Geom.Polygon.GetNumberArray(polygon);
    // var out = Phaser.Geom.Polygon.GetNumberArray(polygon, out);  // modify out
    ```
    - `arr` : [x0, y0, x1, y1, x2, y2, ...]
- AABB (A minimum rectangle to cover this polygon)
    ```javascript
    var out = Phaser.Geom.Polygon.GetAABB(polygon);
    // var out = Phaser.Geom.Polygon.GetAABB(polygon, out);
    ```
    - `out` : A [rectangle object](geom-rectangle.md)
- Type:
    ```javascript
    var type = polygon.type; // 4
    ```

### Point(s) & shape

- Point is inside shape
    ```javascript
    var isInside = polygon.contains(x, y);
    ```
    or
    ```javascript
    var isInside = Phaser.Geom.Polygon.ContainsPoint(polygon, point);
    ```
- Reverse the order of points
    ```javascript
    var polygon = Phaser.Geom.Polygon.Reverse(polygon);
    ```
- Smooth : Takes a Polygon object and applies Chaikin's smoothing algorithm on its points.
    ```javascript
    Phaser.Geom.Polygon.Smooth(polygon)
    ```