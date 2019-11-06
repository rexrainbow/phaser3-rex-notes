## Introduction

Set properties of game objects, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Call function

```javascript
Phaser.Actions.Call(gameObjects, function(gameObject) {

}, scope);
```

### Set any property

```javascript
Phaser.Actions.PropertyValueSet(gameObjects, key, value, step, index, direction);
```

- `gameObjects` : An array of game objects.
- `key` : The property to be updated.
- `value` : The amount to be added to the property.
- `step` : This is added to the `value` amount, multiplied by the iteration counter.
- `index` : An optional offset to start searching from within the items array.
- `direction` :
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

- `width` : The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
- `height` : The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `position` : The alignment position.
    - `0`, or `Phaser.Display.Align.TOP_LEFT` 
    - `1`, or `Phaser.Display.Align.TOP_CENTER`
    - `2`, or `Phaser.Display.Align.TOP_RIGHT`
    - `3`, or `Phaser.Display.Align.LEFT_TOP`
    - `4`, or `Phaser.Display.Align.LEFT_CENTER`
    - `5`, or `Phaser.Display.Align.LEFT_BOTTOM`
    - `6`, or `Phaser.Display.Align.CENTER`
    - `7`, or `Phaser.Display.Align.RIGHT_TOP`
    - `8`, or `Phaser.Display.Align.RIGHT_CENTER`
    - `9`, or `Phaser.Display.Align.RIGHT_BOTTOM`
    - `10`, or `Phaser.Display.Align.BOTTOM_LEFT`
    - `11`, or `Phaser.Display.Align.BOTTOM_CENTER`
    - `12`, or `Phaser.Display.Align.BOTTOM_RIGHT`
- `x`, `y` : Position of first item.

#### Line

[Line](geom-line.md) :

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

[Circle](geom-circle.md) :

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

[Ellipse](geom-ellipse.md) :

```javascript
var ellipse = new Phaser.Geom.Ellipse(x, y, width, height);
```

```javascript
Phaser.Actions.PlaceOnEllipse(gameObjects, ellipse, startAngle, endAngle);
```

#### Triangle

[Triangle](geom-triangle.md) :

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

[Rectangle](geom-rectangle.md) :

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
Phaser.Actions.SetBlendMode(gameObjects, blendMode, index, direction);
```

- `blendMode` :
    - `Phaser.BlendModes.SKIP_CHECK`
    - `Phaser.BlendModes.NORMAL`
    - `Phaser.BlendModes.ADD`
    - `Phaser.BlendModes.MULTIPLY`
    - `Phaser.BlendModes.SCREEN`
    - `Phaser.BlendModes.OVERLAY`
    - `Phaser.BlendModes.DARKEN`
    - `Phaser.BlendModes.LIGHTEN`
    - `Phaser.BlendModes.COLOR_DODGE`
    - `Phaser.BlendModes.COLOR_BURN`
    - `Phaser.BlendModes.HARD_LIGHT`
    - `Phaser.BlendModes.SOFT_LIGHT`
    - `Phaser.BlendModes.DIFFERENCE`
    - `Phaser.BlendModes.EXCLUSION`
    - `Phaser.BlendModes.HUE`
    - `Phaser.BlendModes.SATURATION`
    - `Phaser.BlendModes.COLOR`
    - `Phaser.BlendModes.LUMINOSITY`

### Play animation

```javascript
Phaser.Actions.PlayAnimation(gameObjects, key, startFrame);
```

### Shuffle

```javascript
Phaser.Actions.Shuffle(gameObjects);
```