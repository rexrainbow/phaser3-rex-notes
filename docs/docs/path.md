## Introduction

Path in curves, built-in object of phaser.

- Author: Richard Davey

## Usage

### Add path object

```javascript
var path = scene.add.path();
// var path = scene.add.path(x, y);  // curve start from (x, y)
```

or

```javascript
var path = new Phaser.Curves.Path();
// var path = new Phaser.Curves.Path(x, y);  // curve start from (x, y)
```

#### Add path object with curves

[Curves in JSON](path.md#curves-to-json)

```javascript
var path = scene.add.path(json);
```
or
```javascript
var path = new Phaser.Curves.Path(json);
```

### Add curve

#### Add line

1. Create line object
    ```javascript
    var curve = new Phaser.Curves.Line(p0, p1); // p0, p1: {x, y}
    ```
    or
    ```javascript
    var curve = new Phaser.Curves.Line([x0, y0, x1, y1]);
    ```
1. Add to path
    ```javascript
    path.add(curve);
    ```

Add line started from previous end point to next point

```javascript
path.lineTo(endX, endY);
```
or
```javascript
path.lineTo(point);  // point : Phaser.Math.Vector2
```

#### Add circle/ellipse/arc

1. Create circle/ellipse/arc object
    - Circle
        ```javascript
        var curve = new Phaser.Curves.Ellipse(x, y, radius);
        ```
    - Ellipse
        ```javascript
        var curve = new Phaser.Curves.Ellipse(x, y, xRadius, yRadius);
        ```
    - Arc
        ```javascript
        var curve = new Phaser.Curves.Ellipse(x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation);
        ```
1. Add to path
    ```javascript
    path.add(curve);
    ```

Add circle/ellipse/arc started from previous end point to next point

- Circle
    ```javascript
    path.circleTo(radius);
    ```
- Ellipse
    ```javascript
    path.ellipseTo(xRadius, yRadius);
    ```
- Arc
    ```javascript
    path.ellipseTo(xRadius, yRadius, startAngle, endAngle, clockwise, rotation);
    ```

#### Add spline

1. Create spline object
    ```javascript
    var points = [
        p0,            // {x, y}, or [x, y]
        p1,            // {x, y}, or [x, y]
        // ...
    ];
    var curve = new Phaser.Curves.Spline(points);
    ```
    or
    ```javascript
    var points = [
        x0, y0,
        x1, y1,
        // ...
    ];
    var curve = new Phaser.Curves.Spline(points);
    ```
1. Add to path
    ```javascript
    path.add(curve);
    ```

Add spline started from previous end point to next point

```javascript
var points = [
    p0,            // {x, y}, or [x, y]
    p1,            // {x, y}, or [x, y]
    // ...
];
path.splineTo(points);
```
or
```javascript
var points = [
    x0, y0,
    x1, y1,
    // ...
];
path.splineTo(points);
```

##### Append point

```javascript
var point = curve.addPoint(x, y);
```

#### Add quadratic bezier curve

1. Create quadratic bezier curve object
    ```javascript
    var curve = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint, endPoint); // point: {x, y}
    ```
    or
    ```javascript
    var points = [
        x0, y0,     // start point
        x1, y1,     // control point
        x2, y2      // end point
    ];
    var curve = new Phaser.Curves.QuadraticBezier(points);
    ```
1. Add to path
    ```javascript
    path.add(curve);
    ```

Add quadratic bezier curve started from previous end point to next point

```javascript
path.quadraticBezierTo(endX, endY, controlX, controlY);
```
or
```javascript
path.quadraticBezierTo(endPoint, controlPoint);  // point : Phaser.Math.Vector2
```

#### Add cubic bezier curve

1. Create quadratic bezier curve object
    ```javascript
    var curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint); // point: {x, y}
    ```
    or
    ```javascript
    var points = [
        x0, y0,     // start point
        x1, y1,     // control point1
        x2, y2,     // control point2
        x3, y3      // end point
    ];
    var curve = new Phaser.Curves.CubicBezier(points);
    ```
1. Add to path
    ```javascript
    path.add(curve);
    ```

Add cubic bezier curve started from previous end point to next point

```javascript
path.cubicBezierTo(endX, endY, control1X, control1Y, control2X, control2Y);
```
or
```javascript
path.cubicBezierTo(endPoint, controlPoint1, controlPoint2);  // point : Phaser.Math.Vector2
```

#### Move to point

```javascript
path.moveTo(x, y);
```

#### Add curves from [JSON](path.md#curves-to-json)

```javascript
path.fromJSON(json);
```

### Get curves

```javascript
var curves = path.curves;
```

### Draw on [graphics](graphics.md)

```javascript
path.draw(graphics);
```

### Point

- Get point
    ```javascript
    var out = path.getPoint(t);  // t: 0 ~ 1
    // var out = path.getPoint(t, out);  // modify out
    ```
    or
    ```javascript
    var out = curve.getPoint(t);  // t: 0 ~ 1
    // var out = curve.getPoint(t, out);  // modify out
    ```
    Distance of path from start point to target point (out) might not linear with t.
- Get random point
    ```javascript
    var out = path.getRandomPoint();
    // var out = path.getRandomPoint(out);  // modify out
    ```
    or
    ```javascript
    var out = curve.getRandomPoint();
    // var out = curve.getRandomPoint(out);  // modify out
    ```    
- Get n points
    ```javascript
    var points = path.getPoints(n);
    ```
    or
    ```javascript
    var points = curve.getPoints(n);
    ```    
- Get n points equally spaced out along the curve
    ```javascript
    var points = path.getSpacedPoints(n);
    ```
    or
    ```javascript
    var points = curve.getSpacedPoints(n);
    ```
- Get points spaced out n distance pixels apart    
    ```javascript
    var points = curve.getDistancePoints(n)
    ```
    The smaller the distance, the larger the array will be.  
    Path object does **NOT** support this feature yet.
- Get start point
    ```javascript
    var out = path.getStartPoint();
    // var out = path.getStartPoint(out);  // modify out
    ```
    or
    ```javascript
    var out = curve.getStartPoint();
    // var out = curve.getStartPoint(out);  // modify out
    ```    
- Get end point
    ```javascript
    var out = path.getEndPoint();
    // var out = path.getEndPoint(out);  // modify out
    ```
    or
    ```javascript
    var out = curve.getEndPoint();
    // var out = curve.getEndPoint(out);  // modify out
    ```
- Get t (0~1) from distance
    ```javascript
    var t = curve.getTFromDistance(d);
    ```
    Path object does **NOT** support this feature yet.
- Get tangent
    ```javascript
    var out = curve.getTangent(t);  // t: 0~1
    // var out = curve.getTangent(t, out);  // modify out
    ```
    Path object does **NOT** support this feature yet.

### Length of path

```javascript
var l = path.getLength();
```
or
```javascript
var l = curve.getLength();
```

#### Update length

```javascript
path.updateArcLengths();
```
or
```javascript
curve.updateArcLengths();
```

Length of path/curve will be cached.

### Curves to JSON

```javascript
var json = path.toJSON();
```
or
```javascript
var json = curve.toJSON();
```

### Bounds

Get bounds

```javascript
var out = path.getBounds();    // accuracy = 16
// var out = path.getBounds(out);
// var out = path.getBounds(out, accuracy);
```
or
```javascript
var out = curve.getBounds();    // accuracy = 16
// var out = curve.getBounds(out);
// var out = curve.getBounds(out, accuracy);
```

- `out` : A [rectangle object](geom-rectangle.md)
