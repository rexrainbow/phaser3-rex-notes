## Introduction

Point shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var point = new Phaser.Geom.Point(x, y);
```

#### Clone shape

```javascript
var point1 = Phaser.Geom.Point.Clone(point0);
```

### Draw on [graphics](graphics.md)

```javascript
// graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
graphics.fillPointShape(point, size);
```

### Set properties

- All properties
    ```javascript
    point.setTo(x, y);
    ```
    or
    ```javascript
    Phaser.Geom.Point.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    point.x = 0;
    point.y = 0;
    ```
- Round
    - Ceil : Apply `Math.ceil()` to each coordinate of the given Point
        ```javascript
        var point = Phaser.Geom.Point.Ceil(point)
        ```
    - Floor : Apply `Math.floor()` to each coordinate of the given Point.
        ```javascript
        var point = Phaser.Geom.Point.Floor(point)
        ```

### Symmetry

- Invert : x = y, y = x
    ```javascript
    var point = Phaser.Geom.Point.Invert(point);
    ```
- Negative : x = -x, y = -y
    ```javascript
    var out = Phaser.Geom.Point.Negative(point);
    // var out = Phaser.Geom.Point.Negative(point, out);  // modify out
    ```

### Get properties

- Position
    ```javascript
    var x = point.x;
    var y = point.y;
    ```
- Type:
    ```javascript
    var type = point.type; // 3
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Point.Equals(point0, point1);
```

x, y are equal.

### Points

- Centroid : center-point over some points
    ```javascript
    var out = Phaser.Geom.Point.GetCentroid(points);
    // var out = Phaser.Geom.Point.GetCentroid(points, out);  // modify out
    ```
- Calculates the Axis Aligned Bounding Box (or aabb) from an array of points ([rectangle](geom-rectangle.md))
    ```javascript
    var rect = Phaser.Geom.Point.GetRectangleFromPoints(points);
    // var rect = Phaser.Geom.Point.GetRectangleFromPoints(points, rect);  // modify rect
    ```
- Interpolate
    ```javascript
    var out = Phaser.Geom.Point.Interpolate(pointA, pointB, t);  // out : point
    // var out = Phaser.Geom.Point.Interpolate(pointA, pointB, t, out);  // modify out
    ```

### Intersection

- Point to [line](geom-line.md)
    ```javascript
    var result = Phaser.Geom.Intersects.PointToLine(point, line);
    // var result = Phaser.Geom.Intersects.PointToLine(point, line, lineThickness);
    ```
    ```javascript
    var result = Phaser.Geom.Intersects.PointToLineSegment(point, line);
    ```

### Point as Vector

Vector starting at (0,0)

- Magnitude : sqrt( (x * x) + (y * y) )
    ```javascript
    var magnitude = Phaser.Geom.Point.GetMagnitude(point);
    ```
    or
    ```javascript
    var magnitudeSq = Phaser.Geom.Point.GetMagnitudeSq(point);
    ```
- Project
    ```javascript
    var out = Phaser.Geom.Point.Project(from, to);
    // var out = Phaser.Geom.Point.Project(from, to, out);  // modify out
    ```
    or
    ```javascript
    var out = Phaser.Geom.Point.ProjectUnit(from, to);  // vector `from` and `to` are unit vector (length = 1)
    // var out = Phaser.Geom.Point.ProjectUnit(from, to, out);  // modify out
    ```