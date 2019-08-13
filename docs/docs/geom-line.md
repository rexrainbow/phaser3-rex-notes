## Introduction

Line shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var line = new Phaser.Geom.Line(x1, y1, x2, y2);
```

#### Clone shape

```javascript
var line1 = Phaser.Geom.Line.Clone(line0);
```

### Draw on [graphics](graphics.md)

```javascript
// graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
graphics.strokeLineShape(line);
```

### Set properties

- All properties
    ```javascript
    line.setTo(x1, y1, x2, y2);
    ```
    or
    ```javascript
    Phaser.Geom.Line.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    line.x1 = 0;
    line.y1 = 0;
    line.x2 = 0;
    line.y2 = 0;
    ```
    or
    ```javascript
    line.left = 0;    // min(x1, x2)
    line.top = 0;     // min(y1, y2)
    line.right = 0;   // max(x1, x2)
    line.bottom = 0;  // max(y1, y2)
    ```
    - Offset start, end
        ```javascript
        var line = Phaser.Geom.Line.Offset(line, dx, dy); 
        // line.x1 += dx, line.y1 += dy, line.x2 += dx, line.y2 += dy
        ``` 
    - Set center position
        ```javascript
        var line = Phaser.Geom.Line.CenterOn(line, x, y);
        ```
- Start point, angle, length
    ```javascript
    var line = Phaser.Geom.Line.SetToAngle(line, x, y, angle, length);
    ```
    - `line` : The line to set
    - `x` , `y` : start point
    - `angle` : The angle of the line in **radians**
        ```javascript
        var rad = Phaser.Math.DegToRad(deg);
        ```
    - `length` :　The length of the line
- Rotate
    - Rotate around **midpoint**
        ```javascript
        var line = Phaser.Geom.Line.Rotate(line, angle)
        ```
        - `line` : The line to set
        - `angle` : The angle of the line in **radians**
            ```javascript
            var rad = Phaser.Math.DegToRad(deg);
            ```
    - Rotate around point
        ```javascript
        var line = Phaser.Geom.Line.RotateAroundPoint(line, point, angle);
        ```
        or
        ```javascript
        var line = Phaser.Geom.Line.RotateAroundXY(line, x, y, angle);
        ```
        - `line` : The line to set
        - `angle` : The angle of the line in **radians**
            ```javascript
            var rad = Phaser.Math.DegToRad(deg);
            ```
- Extend
    ```javascript
    var line = Phaser.Geom.Line.Extend(line, left, right);
    ```

### Get properties

- Position
    ```javascript
    var x1 = line.x1;
    var y1 = line.y1;
    var x2 = line.x2;
    var y2 = line.y2;
    var top = line.top;       // min(x1, x2)
    var left = line.left;     // min(y1, y2)
    var right = line.right;   // max(x1, x2)
    var bottom = line.bottom; // max(y1, y2)
    ```
    - Start point
       ```javascript
       var start = line.getPointA();  // start: {x, y}
       var start = line.getPointA(start);  // push start
       ```
    - End point
       ```javascript
       var end = line.getPointB();  // end: {x, y}
       var end = line.getPointB(end);  // push end
       ```
    - Middle point
        ```javascript
        var middle = Phaser.Geom.Line.GetMidPoint(line);  // middle: {x, y}
        // var middle = Phaser.Geom.Line.GetMidPoint(line, middle);
        ```
- Length
    ```javascript
    var length = Phaser.Geom.Line.Length(line);
    ```
    - Width : Abs(x1 - x2)
        ```javascript
        var width = Phaser.Geom.Line.Width(line);
        ```
    - Height : Abs(y1 - y2)
        ```javascript
        var width = Phaser.Geom.Line.Height(line);
        ```
- Slope
    - Slope : (y2 - y1) / (x2 - x1)
        ```javascript
        var slope = Phaser.Geom.Line.Slope(line);
        ```
    - Perpendicular slope : -((x2 - x1) / (y2 - y1))
        ```javascript
        var perpSlope = Phaser.Geom.Line.PerpSlope(line);
        ```
- Angle
    - Angle
        ```javascript
        var angle = Phaser.Geom.Line.Angle(line);
        ```
        - `angle` : The angle of the line in **radians**
            ```javascript
            var deg = Phaser.Math.RadToDeg(rad);  // deg : -180 ~ 180
            ```
    - Normal angle (angle - 90 degrees)
        - Normal angle
            ```javascript
            var normalAngle = Phaser.Geom.Line.NormalAngle(line);
            ```
        - Normal vector
            ```javascript
            var normal = Phaser.Geom.Line.GetNormal(line);  // normal: {x, y}
            // var normal = Phaser.Geom.Line.GetNormal(line, normal);  // push normal
            ```
            or
            ```javascript
            var normalX = Phaser.Geom.Line.NormalX(line);
            var normalY = Phaser.Geom.Line.NormalY(line);
            ```
    - Reflect angle
        ```javascript
        var reflectAngle = Phaser.Geom.Line.ReflectAngle(aimLine, reflectingLine);
        ```
- Type:
    ```javascript
    var type = line.type; // 2
    ```

### Point(s) & shape

- Get point at shape's edge
    ```javascript
    var point = line.getPoint(t);  // t : 0 ~ 1. 0=start, 0.5=middle, 1=end
    // var point = line.getPoint(t, point);  // modify point
    ```
- Get a random point inside shape
    ```javascript
    var point = line.getRandomPoint();
    // var point = line.getRandomPoint(point);  // modify point
    ```
- Get points around shape's edge
    ```javascript
    var points = line.getPoints(quantity);
    // var points = line.getPoints(quantity, null, points);  // push points
    ```
    or calculate quantity from steps
    ```javascript
    var points = line.getPoints(false, step);
    // var points = line.getPoints(false, step, points);  // push points
    ```
    - `points` : an array of point
- Get points using *Bresenham*'s line algorithm
    ```javascript
    var points = Phaser.Geom.Line.BresenhamPoints(line, step);
    // var points = Phaser.Geom.Line.BresenhamPoints(line, step, points);  // push points
    ```
- Get the nearest point on a line perpendicular to the given point.
    ```javascript
    var point = Phaser.Geom.Line.GetNearestPoint(line, pointIn);
    // var point = Phaser.Geom.Line.GetNearestPoint(line, pointIn, point);
    ```
- Get the shortest distance from a Line to the given Point.
    ```javascript
    var distance = Phaser.Geom.Line.GetShortestDistance(line, point);
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Line.Equals(line0, line1);
```

x1, y2, x2, y2 are equal.

### Intersection

#### Line to [circle](geom-circle.md)

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

### Line to [rectangle](geom-rectangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.LineToRectangle(line, rect);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetLineToRectangle(line, rect);
    // var out = Phaser.Geom.Intersects.GetLineToRectangle(line, rect, out);
    ```
    
#### Line to [triangle](geom-triangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.TriangleToLine(triangle, line);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetTriangleToLine(triangle, line);
    // var out = Phaser.Geom.Intersects.GetTriangleToLine(triangle, line, out);
    ```
    
#### Line to [line](geom-line.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.LineToLine(line1, line2);
    ```
    - `out` : intersected point
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.LineToLine(line1, line2, out);
    ```