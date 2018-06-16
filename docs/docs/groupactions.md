## Introduction

Set properties of game objects, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Call

```javascript
Phaser.Actions.Call(gameObjects, callback, context);
```

### Any property

```javascript
Phaser.Actions.PropertyValueSet(gameObjects, key, value, step, index, direction);
```

- gameObjects : The array of game objects to be updated by this action.
- key : The property to be updated.
- value : The amount to be added to the property.
- step : This is added to the `value` amount, multiplied by the iteration counter.
- index : An optional offset to start searching from within the items array.
- direction :
    - `1` : from beginning to end.
    - `-1`: from end to beginning.

```javascript
Phaser.Actions.PropertyValueInc(gameObjects, key, value, step, index, direction);
```

```javascript
Phaser.Actions.SmootherStep(gameObjects, key, min, max, inc));
```

```javascript
Phaser.Actions.SmoothStep(gameObjects, key, min, max, inc));
```

```javascript
Phaser.Actions.Spread(gameObjects, key, min, max, inc));
```

### Position

```javascript
Phaser.Actions.SetX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetXY(gameObjects, x, y, stepX, stepY, index, direction);
```

```javascript
Phaser.Actions.IncXY(gameObjects, x, y, stepX, stepY, index, direction);
```

### Shift position

Set the position of first game object to (x, y), others to the position of previous game object.

```javascript
Phaser.Actions.ShiftPosition(gameObjects, x, y, direction, output);
```

### Position on shape

#### Grid align

```javascript
Phaser.Actions.GridAlign(gameObjects, {
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
var line = new Phaser.Geom.Line(x1, y1, x2, y2);
```

```javascript
Phaser.Actions.PlaceOnLine(gameObjects, line);
```

```javascript
Phaser.Actions.RandomLine(gameObjects, line);
```

#### Circle

```javascript
var circle = new Phaser.Geom.Circle(x, y, radius);
```

```javascript
Phaser.Actions.PlaceOnCircle(gameObjects, circle, startAngle, endAngle);
```

```javascript
Phaser.Actions.RandomCircle(gameObjects, circle);
```

#### Ellipse

```javascript
var ellipse = new Phaser.Geom.Ellipse(x, y, width, height);
```

```javascript
Phaser.Actions.PlaceOnEllipse(gameObjects, ellipse, startAngle, endAngle);
```

#### Triangle

```javascript
var triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
```

```javascript
Phaser.Actions.PlaceOnTriangle(gameObjects, triangle, stepRate);
```

```javascript
Phaser.Actions.RandomTriangle(gameObjects, triangle);
```

#### Rectangle

```javascript
var rect = new Phaser.Geom.Rectangle(x, y, width, height);
```

```javascript
Phaser.Actions.PlaceOnRectangle(gameObjects, rect, shift;
```

```javascript
Phaser.Actions.RandomRectangle(gameObjects, rect);
```

```javascript
Phaser.Actions.WrapInRectangle(gameObjects, rect, padding);
```

### Angle

```javascript
Phaser.Actions.Angle(gameObjects, value, step, index, direction);
// value: angle in radians
```

```javascript
Phaser.Actions.Rotate(gameObjects, value, step, index, direction);
// value: angle in degree
```

```javascript
Phaser.Actions.RotateAround(gameObjects, point, angle);
// point: {x, y}, angle: angle in radians
```

```javascript
Phaser.Actions.RotateAroundDistance(gameObjects, point, angle, distance);
// point: {x, y}, angle: angle in radians
```

### Visible

```javascript
Phaser.Actions.SetVisible(gameObjects, value, index, direction);
```

```javascript
Phaser.Actions.ToggleVisible(gameObjects);
```

### Alpha

```javascript
Phaser.Actions.SetAlpha(gameObjects, value, step, index, direction);
```

### Tint

```javascript
Phaser.Actions.setTint(gameObjects, value);
//Phaser.Actions.setTint(gameObjects, topLeft, topRight, bottomLeft, bottomRight);
```

### Origin

```javascript
Phaser.Actions.SetOrigin(gameObjects, originX, originY, stepX, stepY, index, direction);
```

### Scale

```javascript
Phaser.Actions.ScaleX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleXY(gameObjects, x, y, stepX, stepY, index, direction);
```

### Depth

```javascript
Phaser.Actions.SetDepth(gameObjects, value, step, index, direction);
```

### Hit area

```javascript
Phaser.Actions.SetHitArea(gameObjects, hitArea, hitAreaCallback);
```

### Blend mode

```javascript
Phaser.Actions.SetHitArea(gameObjects, value, index, direction);
```

Blend mode :

- Phaser.BlendModes.SKIP_CHECK
- Phaser.BlendModes.NORMAL
- Phaser.BlendModes.ADD
- Phaser.BlendModes.MULTIPLY
- Phaser.BlendModes.SCREEN
- Phaser.BlendModes.OVERLAY
- Phaser.BlendModes.DARKEN
- Phaser.BlendModes.LIGHTEN
- Phaser.BlendModes.COLOR_DODGE
- Phaser.BlendModes.COLOR_BURN
- Phaser.BlendModes.HARD_LIGHT
- Phaser.BlendModes.SOFT_LIGHT
- Phaser.BlendModes.DIFFERENCE
- Phaser.BlendModes.EXCLUSION
- Phaser.BlendModes.HUE
- Phaser.BlendModes.SATURATION
- Phaser.BlendModes.COLOR
- Phaser.BlendModes.LUMINOSITY

### Play animation

```javascript
Phaser.Actions.PlayAnimation(gameObjects, key, startFrame);
```

### Shuffle

```javascript
Phaser.Actions.Shuffle(gameObjects);
```