## Introduction

Set properties of game objects, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Call

```javascript
Phaser.Actions.Call(gameobjects, callback, context);
```

### Any property

```javascript
Phaser.Actions.PropertyValueSet(gameobjects, key, value, step, index, direction);
```

- gameobjects : The array of game objects to be updated by this action.
- key : The property to be updated.
- value : The amount to be added to the property.
- step : This is added to the `value` amount, multiplied by the iteration counter.
- index : An optional offset to start searching from within the items array.
- direction :
    - `1` : from beginning to end.
    - `-1`: from end to beginning.

```javascript
Phaser.Actions.PropertyValueInc(gameobjects, key, value, step, index, direction);
```

```javascript
Phaser.Actions.SmootherStep(gameobjects, key, min, max, inc));
Phaser.Actions.SmoothStep(gameobjects, key, min, max, inc));
Phaser.Actions.Spread(gameobjects, key, min, max, inc));
```

### Position

```javascript
Phaser.Actions.SetX(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncX(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetY(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncY(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetXY(gameobjects, x, y, stepX, stepY, index, direction);
```

```javascript
Phaser.Actions.IncXY(gameobjects, x, y, stepX, stepY, index, direction);
```

### Position on shape

#### Grid align

```javascript
Phaser.Actions.GridAlign(gameobjects, {
    width: -1,
    height: -1,
    cellWidth: 1,
    cellHeight: 1,
    position: Phaser.Display.Align.TOP_LEFT,
    x: 0,
    y: 0
});
```

#### Line

```javascript
Phaser.Actions.PlaceOnLine(gameobjects, line); // line: Phaser.Geom.Line
```

```javascript
Phaser.Actions.RandomLine(gameobjects, line); // line: Phaser.Geom.Line
```

#### Circle

```javascript
Phaser.Actions.PlaceOnCircle(gameobjects, circle, startAngle, endAngle); // circle: Phaser.Geom.Circle
```

```javascript
Phaser.Actions.RandomCircle(gameobjects, circle); // circle: Phaser.Geom.Circle
```

#### Ellipse

```javascript
Phaser.Actions.PlaceOnEllipse(gameobjects, ellipse, startAngle, endAngle); // ellipse: Phaser.Geom.Ellipse
```

#### Triangle

```javascript
Phaser.Actions.PlaceOnTriangle(gameobjects, triangle, stepRate); // triangle: Phaser.Geom.Triangle
```

```javascript
Phaser.Actions.RandomTriangle(gameobjects, triangle); // triangle: Phaser.Geom.Triangle
```

#### Rectangle

```javascript
Phaser.Actions.PlaceOnRectangle(gameobjects, rect, shift; // rect: Phaser.Geom.Rectangle
```

```javascript
Phaser.Actions.RandomRectangle(gameobjects, rect); // rect: Phaser.Geom.Rectangle
```

```javascript
Phaser.Actions.WrapInRectangle(gameobjects, rect, padding); // rect: Phaser.Geom.Rectangle
```

### Angle

```javascript
Phaser.Actions.Angle(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.Rotate(gameobjects, value, step, index, direction);
```

### Visible

```javascript
Phaser.Actions.SetVisible(gameobjects, value, index, direction);
```

```javascript
Phaser.Actions.ToggleVisible(gameobjects);
```

### Alpha

```javascript
Phaser.Actions.SetAlpha(gameobjects, value, step, index, direction);
```


### Tint

```javascript
Phaser.Actions.setTint(gameobjects, value);
//Phaser.Actions.setTint(gameobjects, topLeft, topRight, bottomLeft, bottomRight);
```

### Origin

```javascript
Phaser.Actions.SetOrigin(gameobjects, originX, originY, stepX, stepY, index, direction);
```

### Scale

```javascript
Phaser.Actions.ScaleX(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleY(gameobjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleXY(gameobjects, x, y, stepX, stepY, index, direction);
```

### Depth

```javascript
Phaser.Actions.SetDepth(gameobjects, value, step, index, direction);
```

### Play animation

```javascript
Phaser.Actions.PlayAnimation(gameobjects, key, startFrame);
```

### Shuffle

```javascript
Phaser.Actions.Shuffle(gameobjects);
```



