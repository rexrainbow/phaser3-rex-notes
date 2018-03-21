## Introduction

Built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add graphics object

```javascript
var graphics = scene.add.graphics();
// var graphics = scene.add.graphics(x, y);
```

### Set style

- Set line style and fill style

    ```javascript
    graphics.setDefaultStyles({
        lineStyle: {
            width: 1,
            color: 0xffffff,
            alpha: 1
        },
        fillStyle: {
            color: 0xffffff,
            alpha: 1
        }
    });
    ```

- Set line style

    ```javascript
    graphics.lineStyle(lineWidth, color, alpha)
    ```

- Set fill style

    ```javascript
    graphics.fillStyle(color, alpha)
    ```

### Drawing commands

#### Path

```javascript
graphics.beginPath();
graphics.closePath();
graphics.fillPath();
graphics.strokePath();
```

#### Circle

```javascript
graphics.fillCircleShape(circle); // circle: {x, y, radius}
graphics.fillCircle(x, y, radius);
graphics.strokeCircleShape(circle);  // circle: {x, y, radius}
graphics.fillCircle(x, y, radius);
```

#### Rectangle

```javascript
graphics.fillRectShape(rect); // rect: {x, y, width, height}
graphics.fillRect(x, y, width, height);
graphics.strokeRectShape(rect);  // rect: {x, y, width, height}
graphics.strokeRect(x, y, width, height);
```

#### Triangle

```javascript
graphics.fillTriangleShape(triangle); // triangle: {x1, y1, x2, y2, x3, y3}
graphics.fillTriangle(x1, y1, x2, y2, x3, y3);
graphics.strokeTriangleShape(triangle); // triangle: {x1, y1, x2, y2, x3, y3}
graphics.strokeTriangle(x1, y1, x2, y2, x3, y3);
```

#### Point

```javascript
graphics.fillPointShape(point, size); // point: {x, y}
graphics.fillPoint(x, y, size);
```

#### Line

```javascript
graphics.strokeLineShape(line); // point: {x1, y1, x2, y2}
graphics.lineBetween(x1, y1, x2, y2);
graphics.lineTo(x, y);
graphics.moveTo(x, y);
graphics.lineFxTo(x, y, width, rgb);
graphics.moveFxTo(x, y, width, rgb);
```
