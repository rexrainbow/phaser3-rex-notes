## Introduction

Circle shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var circle = new Phaser.Geom.Circle(x, y, radius);
```

#### Clone shape

```javascript
var circle1 = Phaser.Geom.Circle.Clone(circle0);
```

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    // graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    graphics.fillCircleShape(circle);
    ```
- Stroke shape
    ```javascript
    // graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
    graphics.strokeCircleShape(circle);
    ```

!!! note
    Negative radius will be treated as positive radius. i.e. `Math.abs(radius)`

### Set properties

- All properties
    ```javascript
    circle.setTo(x, y, radius);
    ```
    or
    ```javascript
    Phaser.Geom.Circle.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    circle.setPosition(x, y);
    ```
    or
    ```javascript
    circle.x = 0;
    circle.y = 0;
    ```
    or
    ```javascript
    circle.left = 0;       // circle.x
    circle.top = 0;        // circle.y
    // circle.right = 0;   // circle.x
    // circle.bottom = 0;  // circle.y
    ```
    or
    ```javascript
    Phaser.Geom.Circle.Offset(circle, dx, dy); // circle.x += dx, circle.y += dy
    ```
    or
    ```javascript
    Phaser.Geom.Circle.OffsetPoint(circle, point); // circle.x += point.x, circle.y += point.y
    ```
- Radius
    ```javascript
    circle.radius = radius;
    ```
    or
    ```javascript
    circle.diameter = diameter;  // diameter = 2 * radius
    ```

### Get properties

- Position
    ```javascript
    var x = circle.x;
    var y = circle.y;
    var top = circle.top;
    var left = circle.left;
    var right = circle.right;
    var bottom = circle.bottom;
    ```
- Radius
    ```javascript
    var radius = circle.radius;
    // var diameter = circle.diameter;
    ```
- Bound
    ```javascript
    var bound = Phaser.Geom.Circle.GetBounds(circle);
    // var bound = Phaser.Geom.Circle.GetBounds(circle, bound);  // push bound
    ```
    - `bound` : A Rectangle shape object
- Area
    ```javascript
    var area = Phaser.Geom.Circle.Area(circle);
    ```
- Circumference
    ```javascript
    var circumference = Phaser.Geom.Circle.Circumference(circle);
    ```
- Type:
    ```javascript
    var type = circle.type; // 0
    ```

### Point(s) & shape

- Get point at shape's edge
    ```javascript
    var point = circle.getPoint(t);  // t : 0 ~ 1 (angle/360)
    // var point = circle.getPoint(t, point);  // modify point
    ```
    or
    ```javascript
    var point = Phaser.Geom.Circle.CircumferencePoint(circle, angle);  // angle in degrees
    // var point = Phaser.Geom.Circle.CircumferencePoint(circle, angle, point);  // modify point
    ```
- Get a random point inside shape
    ```javascript
    var point = circle.getRandomPoint();
    // var point = circle.getRandomPoint(point);  // modify point
    ```
- Get points around shape's edge
    ```javascript
    var points = circle.getPoints(quantity);
    // var points = circle.getPoints(quantity, null, points);  // push points
    ```
    or calculate quantity from steps
    ```javascript
    var points = circle.getPoints(false, step);
    // var points = circle.getPoints(false, step, points);  // push points
    ```
    - `points` : an array of point
- Point is inside shape
    ```javascript
    var isInside = circle.contains(x, y);
    ```
    or
    ```javascript
    var isInside = Phaser.Geom.Circle.ContainsPoint(circle, point);
    ```
- Rectangle is inside shape
    ```javascript
    var isInside = Phaser.Geom.Circle.ContainsRect(circle, rect);  // rect : 4 points
    ```

### Empty

- Set empty
    ```javascript
    circle.setEmpty();     // circle.radius = 0
    ```
- Is empty
    ```javascript
    var isEmpty = circle.isEmpty();   // circle.radius <= 0
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Circle.Equals(circle0, circle1);
```

Position and radius are equal.

### Intersection

#### Circle to [circle](geom-circle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.CircleToCircle(circleA, circleB);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetCircleToCircle(circleA, circleB);
    // var out = Phaser.Geom.Intersects.GetCircleToCircle(circleA, circleB, out);
    ```

#### Circle to [rectangle](geom-rectangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.CircleToRectangle(circle, rect);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetCircleToRectangle(circle, rect);
    // var out = Phaser.Geom.Intersects.GetCircleToRectangle(circle, rect, out);
    ```

#### Circle to [triangle](geom-triangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToCircle(triangle, circle);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetTriangleToCircle(triangle, circle);
    // var out = Phaser.Geom.Intersects.GetTriangleToCircle(triangle, circle, out);
    ```
    
#### Circle to [line](geom-line.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.LineToCircle(line, circle);
    // var result = Phaser.Geom.Intersects.LineToCircle(line, circle, nearest);
    ```
    - `nearest` : Nearest point on line.
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetLineToCircle(line, circle);
    // var out = Phaser.Geom.Intersects.GetLineToCircle(line, circle, out);
    ```