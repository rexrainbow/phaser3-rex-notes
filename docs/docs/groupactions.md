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
```

```javascript
Phaser.Actions.SmoothStep(gameobjects, key, min, max, inc));
```

```javascript
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

### Shift position

Set the position of first game object to (x, y), others to the position of previous game object.

```javascript
Phaser.Actions.ShiftPosition(gameobjects, x, y, direction, output);
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
var line = new Phaser.Geom.Line(x1, y1, x2, y2);
```

```javascript
Phaser.Actions.PlaceOnLine(gameobjects, line);
```

```javascript
Phaser.Actions.RandomLine(gameobjects, line);
```

#### Circle

```javascript
var circle = new Phaser.Geom.Circle(x, y, radius);
```

```javascript
Phaser.Actions.PlaceOnCircle(gameobjects, circle, startAngle, endAngle);
```

```javascript
Phaser.Actions.RandomCircle(gameobjects, circle);
```

#### Ellipse

```javascript
var ellipse = new Phaser.Geom.Ellipse(x, y, width, height);
```

```javascript
Phaser.Actions.PlaceOnEllipse(gameobjects, ellipse, startAngle, endAngle);
```

#### Triangle

```javascript
var triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
```

```javascript
Phaser.Actions.PlaceOnTriangle(gameobjects, triangle, stepRate);
```

```javascript
Phaser.Actions.RandomTriangle(gameobjects, triangle);
```

#### Rectangle

```javascript
var rect = new Phaser.Geom.Rectangle(x, y, width, height);
```

```javascript
Phaser.Actions.PlaceOnRectangle(gameobjects, rect, shift;
```

```javascript
Phaser.Actions.RandomRectangle(gameobjects, rect);
```

```javascript
Phaser.Actions.WrapInRectangle(gameobjects, rect, padding);
```

### Angle

```javascript
Phaser.Actions.Angle(gameobjects, value, step, index, direction);
// value: angle in radians
```

```javascript
Phaser.Actions.Rotate(gameobjects, value, step, index, direction);
// value: angle in degree
```

```javascript
Phaser.Actions.RotateAround(gameobjects, point, angle);
// point: {x, y}, angle: angle in radians
```

```javascript
Phaser.Actions.RotateAroundDistance(gameobjects, point, angle, distance);
// point: {x, y}, angle: angle in radians
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

### Hit area

```javascript
Phaser.Actions.SetHitArea(gameobjects, hitArea, hitAreaCallback);
```

### Blend mode

```javascript
Phaser.Actions.SetHitArea(gameobjects, value, index, direction);
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
Phaser.Actions.PlayAnimation(gameobjects, key, startFrame);
```

### Shuffle

```javascript
Phaser.Actions.Shuffle(gameobjects);
```