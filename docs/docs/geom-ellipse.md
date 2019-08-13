## Introduction

Ellipse shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var ellipse = new Phaser.Geom.Ellipse(x, y, width, height);
```

#### Clone shape

```javascript
var ellipse1 = Phaser.Geom.Ellipse.Clone(ellipse0);
```

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    // graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    graphics.fillEllipseShape(ellipse);
    ```
- Stroke shape
    ```javascript
    // graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
    graphics.strokeEllipseShape(ellipse);
    ```

!!! note
    Negative width, height will be treated as positive width, height. i.e. `Math.abs(width)`, `Math.abs(height)`

### Set properties

- All properties
    ```javascript
    ellipse.setTo(x, y, width, height);
    ```
    or
    ```javascript
    Phaser.Geom.Ellipse.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    ellipse.setPosition(x, y);
    ```
    or
    ```javascript
    ellipse.x = 0;
    ellipse.y = 0;
    ```
    or
    ```javascript
    ellipse.left = 0;       // ellipse.x
    ellipse.top = 0;        // ellipse.y
    // ellipse.right = 0;   // ellipse.x
    // ellipse.bottom = 0;  // ellipse.y
    ```
    or
    ```javascript
    Phaser.Geom.Ellipse.Offset(ellipse, dx, dy); // ellipse.x += dx, ellipse.y += dy
    ```
    or
    ```javascript
    Phaser.Geom.Ellipse.OffsetPoint(ellipse, point); // ellipse.x += point.x, ellipse.y += point.y
    ```
- Width, height
    ```javascript
    ellipse.width = width;
    ellipse.height = height;
    ```

### Get properties

- Position
    ```javascript
    var x = ellipse.x;
    var y = ellipse.y;
    var top = ellipse.top;
    var left = ellipse.left;
    var right = ellipse.right;
    var bottom = ellipse.bottom;
    ```
- Width, height
    ```javascript
    var width = ellipse.width;
    var height = ellipse.height;
    ```
- Bound
    ```javascript
    var bound = Phaser.Geom.Ellipse.GetBounds(ellipse);
    // var bound = Phaser.Geom.Ellipse.GetBounds(ellipse, bound);  // push bound
    ```
    - `bound` : A Rectangle shape object
- Area
    ```javascript
    var area = Phaser.Geom.Ellipse.Area(ellipse);
    ```
- Circumference
    ```javascript
    var circumference = Phaser.Geom.Ellipse.Circumference(ellipse);
    ```
- Type:
    ```javascript
    var type = ellipse.type; // 1
    ```

### Point(s) & shape

- Get point at shape's edge
    ```javascript
    var point = ellipse.getPoint(t);  // t : 0 ~ 1 (angle/360)
    // var point = ellipse.getPoint(t, point);  // modify point
    ```
    or
    ```javascript
    var point = Phaser.Geom.Ellipse.CircumferencePoint(ellipse, angle);  // angle in degrees
    // var point = Phaser.Geom.Ellipse.CircumferencePoint(ellipse, angle, point);  // modify point
    ```
- Get a random point inside shape
    ```javascript
    var point = ellipse.getRandomPoint();
    // var point = ellipse.getRandomPoint(point);  // modify point
    ```
- Get points around shape's edge
    ```javascript
    var points = ellipse.getPoints(quantity);
    // var points = ellipse.getPoints(quantity, null, points);  // push points
    ```
    or calculate quantity from steps
    ```javascript
    var points = ellipse.getPoints(false, step);
    // var points = ellipse.getPoints(false, step, points);  // push points
    ```
    - `points` : an array of point
- Point is inside shape
    ```javascript
    var isInside = ellipse.contains(x, y);
    ```
    or
    ```javascript
    var isInside = Phaser.Geom.Ellipse.ContainsPoint(ellipse, point);
    ```
- Rectangle is inside shape
    ```javascript
    var isInside = Phaser.Geom.Ellipse.ContainsRect(ellipse, rect);  // rect : 4 points
    ```

### Empty

- Set empty
    ```javascript
    ellipse.setEmpty();     // ellipse.width = 0, ellipse.height = 0
    ```
- Is empty
    ```javascript
    var isEmpty = ellipse.isEmpty();   // ellipse.width <= 0 || ellipse.height <= 0
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Ellipse.Equals(ellipse0, ellipse1);
```

Position and width, height are equal.