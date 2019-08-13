## Introduction

Rectangle shape and methods, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Create shape

```javascript
var rect = new Phaser.Geom.Rectangle(x, y, width, height);
```

or create from 4 points

```javascript
var rect = Phaser.Geom.Rectangle.FromPoints(points);
// var rect = Phaser.Geom.Rectangle.FromPoints(points, rect);  // push rect
```

- `points` : an array with 4 points. `[x, y]`, or `{x:0, y:0}`

#### Clone shape

```javascript
var rect1 = Phaser.Geom.Rectangle.Clone(rect0);
```

### Draw on [graphics](graphics.md)

- Fill shape
    ```javascript
    // graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    graphics.fillRectShape(rect);
    ```
- Stroke shape
    ```javascript
    // graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
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
    or
    ```javascript
    Phaser.Geom.Rectangle.CenterOn(rect, x, y);  // rect.x = x - (rect.width / 2), rect.y = y - (rect.height / 2)
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
    - Scale
        ```javascript
        Phaser.Geom.Rectangle.Scale(rect, x, y); // rect.width *= x, rect.height *= y;
        // Phaser.Geom.Rectangle.Scale(rect, x);   // y = x
        ```
    - Extend size to include points
        ```javascript
        Phaser.Geom.Rectangle.MergePoints(rect, points);
        ```
        - `points` : an array of points. `[x, y]`, or `{x:0, y:0}`
    - Extend size to include another rectangle
        ```javascript
        Phaser.Geom.Rectangle.MergeRect(target, source);
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
    var perimeter = Phaser.Geom.Rectangle.Perimeter(rect);  // 2 * (rect.width + rect.height)
    ```
- Aspect ratio
    ```javascript
    var aspectRatio = Phaser.Geom.Rectangle.GetAspectRatio(rect);  // rect.width / rect.height
    ```
- Lines around rectangle
    ```javascript
    var topLine = rect.getLineA();  // top line of this rectangle
    var rightLine = rect.getLineB();  // right line of this rectangle
    var bottomLine = rect.getLineC();  // bottom line of this rectangle
    var leftLine = rect.getLineD();  // left line of this rectangle
    // var out = rect.getLineA(out);  // top line of this rectangle
    ```
- Type:
    ```javascript
    var type = rect.type; // 5
    ```

### Point(s) & shape

- Get point at shape's edge
    ```javascript
    var point = rect.getPoint(t);  // t : 0 ~ 1 (0= top-left, 0.5= bottom-right, 1= top-left)
    // var point = rect.getPoint(t, point);  // modify point
    ```
    or
    ```javascript
    var point = Phaser.Geom.Rectangle.PerimeterPoint(rect, angle);  // angle in degrees
    // var point = Phaser.Geom.Rectangle.PerimeterPoint(rect, angle, point);  // push point
    ```
- Get points around shape's edge
    ```javascript
    var points = rect.getPoints(quantity);
    // var points = rect.getPoints(quantity, null, points);  // push points
    ```
    or calculate quantity from steps
    ```javascript
    var points = rect.getPoints(false, step);
    // var points = rect.getPoints(false, step, points);  // push points
    ```
    - `step` : width of each step, in pixels. `quantity = Perimeter(rectangle) / step;`
    - `points` : an array of point
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
- Rectangle is inside shape
    ```javascript
    var isInside = Phaser.Geom.Rectangle.ContainsRect(rectA, rectB);  // rectB is inside rectA
    ```

### Rectangles

- Is overlapping
    ```javascript
    var isOverlapping = Phaser.Geom.Rectangle.Overlaps(rectA, rectB);
    ```
- Get intersection rectangle
    ```javascript
    var rect = Phaser.Geom.Rectangle.Intersection(rectA, rectB);
    var rect = Phaser.Geom.Rectangle.Intersection(rectA, rectB, rect);  // push rect
    ```
- Get union rectangle
    ```javascript
    var rect = Phaser.Geom.Rectangle.Union(rectA, rectB);
    var rect = Phaser.Geom.Rectangle.Union(rectA, rectB, rect);  // push rect
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

- Position, width, and height are the same
    ```javascript
    var isEqual = Phaser.Geom.Rectangle.Equals(rect0, rect1);
    ```
- Width and height are the same
    ```javascript
    var isEqual = Phaser.Geom.Rectangle.SameDimensions(rect0, rect1);
    ```

### Intersection

#### Rectangle to [circle](geom-circle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.CircleToRectangle(circle, rect);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetCircleToRectangle(circle, rect);
    // var out = Phaser.Geom.Intersects.GetCircleToRectangle(circle, rect, out);
    ```

#### Rectangle to [rectangle](geom-rectangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetRectangleToRectangle(rectA, rectB);
    // var out = Phaser.Geom.Intersects.GetRectangleToRectangle(rectA, rectB, out);
    ```
    
#### Rectangle to [triangle](geom-triangle.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.RectangleToTriangle(rect, triangle);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetRectangleToTriangle(rect, triangle);
    // var out = Phaser.Geom.Intersects.GetRectangleToTriangle(rect, triangle, out);
    ```

#### Rectangle to [line](geom-line.md)

- Is intersection
    ```javascript
    var result = Phaser.Geom.Intersects.LineToRectangle(line, rect);
    ```
- Get intersection points
    ```javascript
    var result = Phaser.Geom.Intersects.GetLineToRectangle(line, rect);
    // var out = Phaser.Geom.Intersects.GetLineToRectangle(line, rect, out);
    ```