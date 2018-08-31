## Introduction

Triangle shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
```

#### Clone shape

```javascript
var triangle1 = Phaser.Geom.Triangle.Clone(triangle0);
```

#### Equilateral triangle

```javascript
var triangle = Phaser.Geom.Triangle.BuildEquilateral(x1, y1, length)
```

#### Right triangle

```javascript
var triangle = Phaser.Geom.Triangle.BuildRight(x1, y1, width, height);
```

#### [Polygon](geom-polygon.md) to triangles

```javascript
var out = Phaser.Geom.Triangle.BuildFromPolygon(data, holes, scaleX, scaleY);
// out = Phaser.Geom.Triangle.BuildFromPolygon(data, holes, scaleX, scaleY, out);
```

- `out` : Array of triangles

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    graphics.fillTriangleShape(triangle);
    ```
- Stroke shape
    ```javascript
    graphics.strokeTriangleShape(triangle);
    ```

### Set properties

- All properties
    ```javascript
    triangle.setTo(x1, y1, x2, y2, x3, y3);
    ```
    or
    ```javascript
    Phaser.Geom.Triangle.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    triangle.x1 = 0;
    triangle.y1 = 0;
    triangle.x2 = 0;
    triangle.y2 = 0;
    triangle.x3 = 0;
    triangle.y3 = 0;
    ```
    or
    ```javascript
    triangle.left = 0;       // triangle.x1, triangle.x2, triangle.x3
    triangle.top = 0;        // triangle.y1, triangle.y2, triangle.y3
    // triangle.right = 0;   // triangle.x1, triangle.x2, triangle.x3
    // triangle.bottom = 0;  // triangle.y1, triangle.y2, triangle.y3
    ```
    or
    ```javascript
    Phaser.Geom.Triangle.Offset(triangle, dx, dy); // triangle.x += dx, triangle.y += dy
    ```
    or
    ```javascript
    Phaser.Geom.Triangle.CenterOn(triangle, x, y);
    ```

### Get properties

- Position
    ```javascript
    var x1 = triangle.x1;
    var y1 = triangle.y1;
    var x2 = triangle.x2;
    var y2 = triangle.y2;
    var x3 = triangle.x3;
    var y3 = triangle.y3;
    var top = triangle.top;
    var left = triangle.left;
    var right = triangle.right;
    var bottom = triangle.bottom;
    ```
    - Centroid
        ```javascript
        var centroid = Phaser.Geom.Triangle.Centroid(triangle);
        ```
- Area
    ```javascript
    var area = Phaser.Geom.Triangle.Area(triangle);
    ```
- Lines around triangle
    ```javascript
    var line12 = rect.getLineA();     // line from (x1, y1) to (x2, y2)
    var line23 = rect.getLineB();     // line from (x2, y2) to (x3, y3)
    var line31 = rect.getLineC();     // line from (x3, y3) to (x1, y1)
    ```

### Point(s) & shape

- Get point at shape's edge
    ```javascript
    var point = triangle.getPoint(t);  // t : 0 ~ 1 (angle/360)
    // var point = triangle.getPoint(t, point);  // modify point
    ```
- Get a random point inside shape
    ```javascript
    var point = triangle.getRandomPoint();
    // var point = triangle.getRandomPoint(point);  // modify point
    ```
- Get points around shape's edge
    ```javascript
    var points = triangle.getPoints(quantity);
    // var points = triangle.getPoints(quantity, null, points);  // push points
    ```
    or calculate quantity from steps
    ```javascript
    var points = triangle.getPoints(false, step);
    // var points = triangle.getPoints(false, step, points);  // push points
    ```
    - `points` : an array of point
- Point is inside shape
    ```javascript
    var isInside = triangle.contains(x, y);
    ```
    or
    ```javascript
    var isInside = Phaser.Geom.Triangle.ContainsPoint(triangle, point);
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Triangle.Equals(triangle0, triangle1);
```

Position and radius are equal.

### Intersection

- Triangle to [circle](geom-circle.md)
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToCircle(triangle, circle);
    ```
- Triangle to [rectangle](geom-rectangle.md)
    ```javascript
    var result = Phaser.Geom.Intersects.RectangleToTriangle(rect, triangle);
    ```
- Triangle to [triangle](geom-triangle.md)
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToTriangle(triangleA, triangleB);
    ```
- Triangle to [line](geom-line.md)
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToLine(triangle, line);
    ```