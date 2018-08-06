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

### Get properties

- Position
    ```javascript
    var x = point.x;
    var y = point.y;
    ```

### Equal

```javascript
var isEqual = Phaser.Geom.Point.Equals(point0, point1);
```

x, y are equal.

### Intersection

- Point to [line](geom-line.md)
    ```javascript
    var result = Phaser.Geom.Intersects.PointToLineSegment(point, line);
    //var result = Phaser.Geom.Intersects.PointToLine(point, line);
    ```