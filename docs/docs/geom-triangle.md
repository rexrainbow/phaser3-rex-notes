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
var triangle = Phaser.Geom.Triangle.BuildEquilateral(x1, y1, length);
```

#### Right triangle

```javascript
var triangle = Phaser.Geom.Triangle.BuildRight(x1, y1, width, height);
```

#### [Polygon](geom-polygon.md) to triangles

```javascript
var out = Phaser.Geom.Triangle.BuildFromPolygon(data);
// var out = Phaser.Geom.Triangle.BuildFromPolygon(data, holes, scaleX, scaleY);
// out = Phaser.Geom.Triangle.BuildFromPolygon(data, holes, scaleX, scaleY, out);
```

- `data` : A flat array of vertice coordinates like `[x0,y0, x1,y1, x2,y2, ...]`
- `out` : Array of triangles

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    // graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    graphics.fillTriangleShape(triangle);
    ```
- Stroke shape
    ```javascript
    // graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
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
- Rotate
    - Rotate around center (incenter)
        ```javascript
        var triangle = Phaser.Geom.Triangle.Rotate(triangle, angle);
        ```
        - `angle` : Radian
    - Rotate around point
        ```javascript
        var triangle = Phaser.Geom.Triangle.RotateAroundPoint(triangle, point, angle);
        ```
        - `point` : `{x, y}`
        - `angle` : Radian
    - Rotate around (x,y)
        ```javascript
        var triangle = Phaser.Geom.Triangle.RotateAroundXY(triangle, x, y, angle);
        ```
        - `angle` : Radian    

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
    or
    ```javascript
    var out = Phaser.Geom.Triangle.Decompose(triangle);  // out: [{x1,y1}, {x2,y2}, {x3,y3}]
    // var out = Phaser.Geom.Triangle.Decompose(triangle, out);
    ```
- Perimeter
    ```javascript
    var perimeter = Phaser.Geom.Triangle.Perimeter(triangle);
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
- Centroid
    ```javascript
    var out = Phaser.Geom.Triangle.Centroid(triangle);  // out: {x,y}
    ```
- Incenter
    ```javascript
    var out = Phaser.Geom.Triangle.InCenter(triangle);  // out: {x,y}
    // var out = Phaser.Geom.Triangle.InCenter(triangle, out);
    ```
- Circumcenter
    ```javascript
    var out = Phaser.Geom.Triangle.CircumCenter(triangle);  // out: {x,y}
    // var out = Phaser.Geom.Triangle.CircumCenter(triangle, out);
    ```
- Circumcircle
    ```javascript
    var out = Phaser.Geom.Triangle.CircumCircle(triangle);  // out: a circle object
    // var out = Phaser.Geom.Triangle.CircumCircle(triangle, out);
    ```
- Type:
    ```javascript
    var type = triangle.type; // 6
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
    - Points inside shape
        ```javascript
        var out = Phaser.Geom.Triangle.ContainsArray(triangle, points, returnFirst);
        // var out = Phaser.Geom.Triangle.ContainsArray(triangle, points, returnFirst, out);
        ```
        - `out` : Points inside triangle
        - `returnFirst` : True to get fist matched point

### Equal

```javascript
var isEqual = Phaser.Geom.Triangle.Equals(triangle0, triangle1);
```

Position and radius are equal.

### Intersection

#### Triangle to [circle](geom-circle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToCircle(triangle, circle);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetTriangleToCircle(triangle, circle);
    // var out = Phaser.Geom.Intersects.GetTriangleToCircle(triangle, circle, out);
    ```

#### Triangle to [rectangle](geom-rectangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.RectangleToTriangle(rect, triangle);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetRectangleToTriangle(rect, triangle);
    // var out = Phaser.Geom.Intersects.GetRectangleToTriangle(rect, triangle, out);
    ```

#### Triangle to [triangle](geom-triangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToTriangle(triangleA, triangleB);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetTriangleToTriangle(triangleA, triangleB);
    // var out = Phaser.Geom.Intersects.GetTriangleToTriangle(triangleA, triangleB, out);
    ```

#### Triangle to [line](geom-line.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToLine(triangle, line);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetTriangleToLine(triangle, line);
    // var out = Phaser.Geom.Intersects.GetTriangleToLine(triangle, line, out);
    ```
