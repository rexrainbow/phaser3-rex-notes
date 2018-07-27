## Introduction

Rectangle shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var rect = new Phaser.Geom.Rectangle(x, y, width, height);
```
or clone from another shape
```javascript
var rect1 = Phaser.Geom.Rectangle.Clone(rect0);
```

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    graphics.fillRectShape(rect);
    ```
- Stroke shape
    ```javascript
    graphics.strokeRectShape(rect);
    ```

!!! note
    `x` with positive/negative width is left/right bound  
    `y` with positive/negative height is top/bottom bound

### Set properties

- All properties
    ```javascript
    rect.setTo(x, y, width, height);
    ```
    or
    ```javascript
    Phaser.Geom.Rectangle.CopyFrom(source, dest);
    ```
- Position
    ```javascript
    rect.setPosition(x, y);
    ```
    or
    ```javascript
    rect.x = 0;
    rect.y = 0;
    ```
    or
    ```javascript
    rect.left = 0;       // rect.x, rect.width
    rect.top = 0;        // rect.y, rect.height
    // rect.right = 0;   // rect.x, rect.width
    // rect.bottom = 0;  // rect.y, rect.height
    rect.centerX = 0;    // rect.x
    rect.centerY = 0;    // rect.y
    ```
    or
    ```javascript
    Phaser.Geom.Rectangle.Offset(rect, dx, dy); // rect.x += dx, rect.y += dy
    ```
    or
    ```javascript
    Phaser.Geom.Rectangle.OffsetPoint(rect, point); // rect.x += point.x, rect.y += point.y
    ```
- Size
    ```javascript
    rect.setSize(width, height);
    // rect.setSize(width);   // height = width
    ```
    or
    ```javascript
    rect.width = 0;
    rect.height = 0;
    ```
- Inflate
    ```javascript
    Phaser.Geom.Rectangle.Inflate(rect, x, y);
    ```
    1. change size to `width += x*2, height += y*2`
    1. center on previous position
- Fits the target rectangle into the source rectangle
    ```javascript
    Phaser.Geom.Rectangle.FitInside(target, source);
    ```
    Preserves aspect ratio, scales and centers the target rectangle to the source rectangle
- Fits the target rectangle around the source rectangle
    ```javascript
    Phaser.Geom.Rectangle.FitOutside(target, source);
    ```
    Preserves aspect ratio, scales and centers the target rectangle to the source rectangle
- Ceil
    ```javascript
    Phaser.Geom.Rectangle.Ceil(rect);  // ceil x, y
    ```
    ```javascript
    Phaser.Geom.Rectangle.CeilAll(rect);  // ceil x, y, width, height
    ```
- Floor
    ```javascript
    Phaser.Geom.Rectangle.Floor(rect);  // floor x, y
    ```
    ```javascript
    Phaser.Geom.Rectangle.FloorAll(rect);  // floor x, y, width, height
    ```

### Get properties

- Position
    ```javascript
    var x = rect.x;
    var y = rect.y;
    ```
    - Bound
        ```javascript
        var top = rect.top;
        var left = rect.left;
        var right = rect.right;
        var bottom = rect.bottom;
        ```
        or
        ```javascript
        var points = Phaser.Geom.Rectangle.Decompose(rect);
        // var points = Phaser.Geom.Rectangle.Decompose(rect, points); // push result points
        ```
        - `points` : top-left, top-right, bottom-right, bottom-left
    - Center
        ```javascript
        var centerX = rect.centerX;
        var centerY = rect.centerY;
        ```
        or
        ```javascript
        var point = Phaser.Geom.Rectangle.GetCenter(rect);
        // var point = Phaser.Geom.Rectangle.GetCenter(rect, point);
        ```
- Size
    ```javascript
    var width = rect.width;
    var height = rect.height;
    ```
    or
    ```javascript
    var point = Phaser.Geom.Rectangle.GetSize(rect); // {x: rect.width, y: rect.height}
    ```
- Area
    ```javascript
    var area = Phaser.Geom.Rectangle.Area(rect);
    ```
- Perimeter
    ```javascript
    var circumference = Phaser.Geom.Rectangle.Perimeter(rect);  // 2 * (rect.width + rect.height)
    ```

### Point(s) & shape

- Point is inside shape
    ```javascript
    var isInside = rect.contains(x, y);
    ```
    or
    ```javascript
    var isInside = Phaser.Geom.Rectangle.ContainsPoint(rect, point);
    ```
- Get a random point inside shape
    ```javascript
    var point = rect.getRandomPoint();
    // var point = rect.getRandomPoint(point);  // modify point
    ```
- Get a random point outside shape
    ```javascript
    var point = Phaser.Geom.Rectangle.RandomOutside(outer, inner);
    // var point = Phaser.Geom.Rectangle.RandomOutside(outer, inner, point); // modify point
    ```
- Get point at shape's edge
    ```javascript
    var point = rect.getPoint(t);  // t : 0 ~ 1 (0= top-left, 0.5= bottom-right, 1= top-left)
    // var point = rect.getPoint(t, point);  // modify point
    ```
    or
    ```javascript
    var point =Phaser.Geom.Rectangle.PerimeterPoint(rect, angle);  // angle in degrees
    // var point = Phaser.Geom.Rectangle.PerimeterPoint(rect, angle, point);  // modify point
    ```
- Get points around shape's edge
    ```javascript
    var points = rect.getPoints(quantity);
    // var points = rect.getPoints(quantity, null, points);  // modify points
    ```
    or calculate quantity from steps
    ```javascript
    var points = rect.getPoints(null, stepRate);
    // var points = rect.getPoints(null, stepRate, points);  // modify points
    ```
    - `points` : an array of point
- Rectangle is inside shape
    ```javascript
    var isInside = Phaser.Geom.Rectangle.ContainsRect(rectA, rectB);  // rectB is inside rectA
    ```

### Empty

- Set empty
    ```javascript
    rect.setEmpty();     // rect.x = 0, rect.y = 0, rect.width = 0, rect.height = 0
    ```
- Is empty
    ```javascript
    var isEmpty = rect.isEmpty();   // rect.radius <= 0;
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Rectangle.Equals(rect0, rect1);
```

Position and size are equal.