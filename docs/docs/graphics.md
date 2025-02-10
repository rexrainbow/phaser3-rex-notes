## Introduction

Drawing on webgl or canvas, built-in game object of phaser.

- Author: Phaser Team

## Usage

### Add graphics object

```javascript
var graphics = scene.add.graphics();
```

or

```javascript
var graphics = scene.add.graphics({
    x: 0,
    y: 0,

    // lineStyle: {
    //     width: 1,
    //     color: 0xffffff,
    //     alpha: 1
    // },
    // fillStyle: {
    //     color: 0xffffff,
    //     alpha: 1
    // },

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyGraphics extends Phaser.GameObjects.Graphics {
        constructor(scene, options) {
            super(scene, options);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var graphics = new MyGraphics(scene, options);
    ```

### Drawing commands

#### Set style

- Set default line style and fill style
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
    - Fill color
        ```javascript
        graphics.fillStyle(color, alpha);   // color: 0xRRGGBB
        ```
    - Fill gradient color (WebGL only)
        ```javascript
        graphics.fillGradientStyle(topLeft, topRight, bottomLeft, bottomRight, alpha);  // alpha= 1
        // graphics.fillGradientStyle(topLeft, topRight, bottomLeft, bottomRight, alphaTopLeft, alphaTopRight, alphaBottomLeft, alphaBottomRight);
        ```
        - `topLeft` : The tint being applied to the top-left of the Game Object.
        - `topRight` : The tint being applied to the top-right of the Game Object.
        - `bottomLeft` : The tint being applied to the bottom-left of the Game Object.
        - `bottomRight` : The tint being applied to the bottom-right of the Game Object.
        - `alphaTopLeft` : The top left alpha value.
        - `alphaTopRight` : The top right alpha value.
        - `alphaBottomLeft` : The bottom left alpha value.
        - `alphaBottomRight` : The bottom right alpha value.

#### Clear

```javascript
graphics.clear();
```

#### Path

```javascript
graphics.beginPath();
graphics.closePath();
graphics.fillPath(); // = graphics.fill()
graphics.strokePath(); // = graphics.stroke()
```

#### Rectangle

```javascript
graphics.fillRectShape(rect); // rect: {x, y, width, height}
graphics.fillRect(x, y, width, height);
graphics.strokeRectShape(rect);  // rect: {x, y, width, height}
graphics.strokeRect(x, y, width, height);
```

#### Rounded rectangle

```javascript
graphics.fillRoundedRect(x, y, width, height, radius);
graphics.strokeRoundedRect(x, y, width, height, radius);
```

- `radius` : number or an object `{tl, tr, bl, br}`, 
    - Positive value : Convex corner.
    - Negative value : Concave corner.

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
graphics.strokeLineShape(line); // line: {x1, y1, x2, y2}
graphics.lineBetween(x1, y1, x2, y2);
graphics.lineTo(x, y);
graphics.moveTo(x, y);
```

#### Lines

```javascript
graphics.strokePoints(points, closeShape, closePath, endIndex);  // points: [{x, y}, ...]
graphics.fillPoints(points, closeShape, closePath, endIndex);  // points: [{x, y}, ...]
```

- `points` : Array of `{x, y}`
- `closeShape` : When `true`, the shape is closed by joining the last point to the first point.
- `closePath` : When `true`, the path is closed before being stroked.
- `endIndex` : The index of `points` to stop drawing at. Defaults to `points.length`.

#### Circle

```javascript
graphics.fillCircleShape(circle); // circle: {x, y, radius}
graphics.fillCircle(x, y, radius);
graphics.strokeCircleShape(circle);  // circle: {x, y, radius}
graphics.strokeCircle(x, y, radius);
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

#### Arc

```javascript
graphics.arc(x, y, radius, startAngle, endAngle, anticlockwise);
graphics.arc(x, y, radius, startAngle, endAngle, anticlockwise, overshoot);
```

Draw arc curve by points.

#### Pie-chart slice

```javascript
graphics.slice(x, y, radius, startAngle, endAngle, anticlockwise);
graphics.slice(x, y, radius, startAngle, endAngle, anticlockwise, overshoot);
```

Draw pie-chart slice shape by points.

Fill this shape

```javascript
graphics.fillPath();
```

##### Clear pattern

```javascript
graphics.setTexture();
```

#### Transfer

```javascript
graphics.save();
graphics.restore();
graphics.translateCanvas(x, y);
graphics.scaleCanvas(x, y);
graphics.rotateCanvas(radians);
```

### Generate texture

```javascript
graphics.generateTexture(key, width, height);  // key: texture key
```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = graphics.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
