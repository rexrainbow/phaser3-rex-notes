## Introduction

Drawing on webgl or canvas, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add graphics object

```javascript
var graphics = scene.add.graphics();
// var graphics = scene.add.graphics({x, y});
```

### Drawing commands

#### Set style

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
    graphics.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
    ```

- Set fill style

    ```javascript
    graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
    ```

#### Clear

```javascript
graphics.clear();
```

#### Path

```javascript
graphics.beginPath();
graphics.closePath();
graphics.fillPath();
graphics.strokePath();
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
graphics.lineFxTo(x, y, width, rgb);  // gradient width and color
graphics.moveFxTo(x, y, width, rgb);  // gradient width and color
```

- `graphics.lineFxTo` is equal to `graphics.lineTo` in CANVAS render mode
- `graphics.moveFxTo` is equal to `graphics.moveTo` in CANVAS render mode

#### Lines

```javascript
graphics.strokePoints(points, autoClose, endIndex);  // points: [{x, y}, ...]
graphics.fillPoints(points, autoClose, endIndex);  // points: [{x, y}, ...]
```

#### Circle

```javascript
graphics.fillCircleShape(circle); // circle: {x, y, radius}
graphics.fillCircle(x, y, radius);
graphics.strokeCircleShape(circle);  // circle: {x, y, radius}
graphics.strokeCircle(x, y, radius);
graphics.arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

Draw or fill circle shape by points.

#### Ellipse

```javascript
graphics.strokeEllipseShape(ellipse, smoothness);   // ellipse: Phaser.Geom.Ellipse
graphics.strokeEllipse(x, y, width, height, smoothness);
graphics.fillEllipseShape(ellipse, smoothness);    // ellipse: Phaser.Geom.Ellipse
graphics.fillEllipse(x, y, width, height, smoothness);
```

Draw or fill ellipse shape by points.

#### Transfer

```javascript
graphics.save();
graphics.restore();
graphics.translate(x, y);
graphics.scale(x, y);
graphics.rotate(radians);
```

### Generate texture

```javascript
graphics.generateTexture(key, width, height);  // key: texture key
```