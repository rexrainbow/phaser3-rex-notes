## Introduction

Polygon shape and methods, built-in methods of phaser.

- Author: Phaser Team

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
- Translate : Shift points.
    ```javascript
    Phaser.Geom.Polygon.Translate(polygon, x, y);
    ```
- Reverse the order of points.
    ```javascript
    var polygon = Phaser.Geom.Polygon.Reverse(polygon);
    ```
- Smooth : Takes a Polygon object and applies Chaikin's smoothing algorithm on its points.
    ```javascript
    Phaser.Geom.Polygon.Smooth(polygon)
    ```
- Simplify : Simplifies the points by running them through a combination of 
  Douglas-Peucker and Radial Distance algorithms. Simplification dramatically 
  reduces the number of points in a polygon while retaining its shape, giving 
  a huge performance boost when processing it and also reducing visual noise.
    ```javascript
    var polygon = Phaser.Geom.Polygon.Simplify(polygon);
    // var polygon = Phaser.Geom.Polygon.Simplify(polygon, tolerance, highestQuality);
    ```

#### Vector to polygon

- Get closest point of intersection between a vector and an array of polygons
    ```javascript
    var result = Phaser.Geom.Intersects.GetLineToPolygon(line, polygons);
    // var out = Phaser.Geom.Intersects.GetLineToPolygon(line, polygons, isRay, out);
    ```
    - `line` : Vector of [line](geom-line.md) object
    - `polygons` : A single polygon, or array of polygons
    - `isRay` : Is `line` a ray or a line segment?
    - `out` :
        - `out.x`, `out.y` : Intersection point
        - `out.z` : Closest intersection distance
        - `out.w` : Index of the polygon
- Projects rays out from the given point to each line segment of the polygons.
    ```javascript
    var out = Phaser.Geom.Intersects.GetRaysFromPointToPolygon(x, y, polygons);
    ```
    - `x`, `y` : The point to project the rays from.
    - `polygons` : A single polygon, or array of polygons
    - `out` : An array containing all intersections
        - `out[i].x`, `out[i].y` : Intersection point
        - `out[i].z` : Angle of intersection
        - `out[i].w` : Index of the polygon

