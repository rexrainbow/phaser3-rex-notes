# RexCustomShapes (Source Traced README)

This document describes how to use `CustomShapes` by tracing source files:

- `plugins/gameobjects/shape/customshapes/CustomShapes.js`
- `plugins/gameobjects/shape/customshapes/ShapesUpdateMethods.js`
- `plugins/gameobjects/shape/shapes/BaseShapes.js`

It is intended for practical use and code generation.

## 1. Core API

### A) Add via factory

```js
const customShapes = scene.add.rexCustomShapes(x, y, width, height, {
  type,     // optional, default: 'rexCustomShapes'
  create,   // object | array | function
  update    // function
});
```

### B) Add via config object

```js
const customShapes = scene.add.rexCustomShapes({
  x, y, width, height,
  type, create, update
});
```

### C) Use class directly

```js
import CustomShapes from 'phaser3-rex-plugins/plugins/customshapes.js';

const customShapes = new CustomShapes(scene, x, y, width, height, config);
scene.add.existing(customShapes);
```

Or:

```js
const customShapes = new CustomShapes(scene, {
  x, y, width, height, type, create, update
});
scene.add.existing(customShapes);
```

## 2. Config Fields

- `x`, `y`: object position. Default `0, 0`.
- `width`, `height`: object size. Default `2, 2`.
- `type`: custom game object type string. Default `'rexCustomShapes'`.
- `create`: shape creation spec. Supported formats are in section 3.
- `update`: callback executed when this object refreshes shape geometry/style.

If `update` is omitted, a default callback clears style on all shapes each refresh:

```js
shape.lineStyle().fillStyle();
```

## 3. `create` Supported Formats

`create` supports 3 formats.

### A) Plain object

```js
create: {
  line: 4,                    // create 4 unnamed lines
  lines: ['border', 'fill'],  // create named lines
  circle: 'dot'               // create one named circle
}
```

`shapeType` keys supported at runtime:

- `arc`
- `circle`
- `curve`
- `ellipse`
- `line`
- `lines`
- `rectangle`
- `roundRectangle`
- `triangle`

Value types:

- `number`: create N unnamed shapes.
- `string`: create 1 named shape.
- `string[]`: create named shapes.

### B) Array

```js
create: [
  { type: 'line', name: 'l0' },
  { type: 'line', name: 'l1' },
  { type: 'lines', name: 'path' }
]
```

### C) Callback

```js
create: function () {
  const box = this.createShape('rectangle', 'box');
  const check = this.createShape('lines', 'check');
  this.addShape(box).addShape(check);
}
```

Inside callback, `this` is the `CustomShapes` instance.

## 4. `update` Callback Context

Inside `update: function () { ... }`, `this` is the `CustomShapes` instance.

Useful properties:

- `this.width`, `this.height`
- `this.centerX`, `this.centerY` (read-only getters)
- `this.isSizeChanged`
- `this.fillColor`, `this.fillAlpha`
- `this.lineWidth`, `this.strokeColor`, `this.strokeAlpha`

Shape access:

- `this.getShapes()`
- `this.getShape(name)`

Shape management:

- `this.createShape(type, name)`
- `this.addShape(shape)`
- `this.deleteShape(name)`
- `this.clear()`

Dirty/redraw:

- `this.setDirty()` / `this.setDirty(true)`
- `this.setUpdateShapesCallback(callback)`

## 5. Size, Style, Refresh

### Size

```js
customShapes.setSize(width, height);
customShapes.resize(width, height);
customShapes.width = width;
customShapes.height = height;
```

These operations mark object dirty and trigger rebuild on next render/update.

### Fill and stroke style

```js
customShapes.setFillStyle(color, alpha);
customShapes.setStrokeStyle(lineWidth, color, alpha);

customShapes.fillColor = color;
customShapes.fillAlpha = alpha;
customShapes.lineWidth = lineWidth;
customShapes.strokeColor = color;
customShapes.strokeAlpha = alpha;
```

These are object-level style values, commonly consumed in `update`.

### Force refresh

```js
customShapes.setDirty();
customShapes.updateData();  // immediately rebuild shape data now
```

## 6. `worldToLocalXY`

Convert world position to this object's local coordinates:

```js
const localXY = customShapes.worldToLocalXY(worldX, worldY);
// -> { x, y }
```

With camera and output object:

```js
const out = customShapes.worldToLocalXY(worldX, worldY, camera, outObj);
```

With reusable internal temp object:

```js
const out = customShapes.worldToLocalXY(worldX, worldY, true);
```

This is useful when building dynamic paths (for example, speech bubble pointer).

## 7. Common Shape API

All shape instances support:

- `shape.fillStyle(color?, alpha?)`
- `shape.lineStyle(lineWidth?, color?, alpha?)`
- `shape.setVisible(visible?)`
- `shape.visible`
- `shape.name`
- `shape.setData(key, value)` or `shape.setData(object)`
- `shape.getData(key, defaultValue?)`
- `shape.incData(key, inc, defaultValue?)`
- `shape.mulData(key, mul, defaultValue?)`
- `shape.clearData()`

Style clearing:

- `fillStyle()` with no args clears fill.
- `lineStyle()` with no args clears stroke.

## 8. Shape Specific API Quick Reference

### Line

- `setP0(x, y)`
- `setP1(x, y)`

### Lines

- Path build: `start()`, `startAt(x,y)`, `lineTo(x,y,relative?)`, `verticalLineTo(x,relative?)`, `horizontalLineTo(y,relative?)`
- Curves: `arc(...)`, `ellipticalArc(...)`, `quadraticBezierTo(...)`, `cubicBezierTo(...)`, `catmullRomTo(...)`
- End path: `close()`, `end()`
- Path segment: `copyPathFrom(...)`, `appendPathFrom(...)`, `setDisplayPathSegment(...)`
- Transform: `rotateAround(cx, cy, angleDeg)`, `offset(x, y)`
- Hit area helper: `toPolygon()`

### Arc / Circle / Ellipse

- `setCenterPosition(x, y)`
- `setRadius(rx, ry?)`
- `setAngle(startDeg, endDeg, anticlockwise?)` (Arc)
- `setPie(pie?)` (Arc)

### Rectangle / RoundRectangle

- `setTopLeftPosition(x, y)`
- `setCenterPosition(x, y)`
- `setSize(width, height)`
- `setRadius(radius)` (RoundRectangle)

### Triangle

- `setP0(x, y)`
- `setP1(x, y)`
- `setP2(x, y)`

### Curve

- `setCurve(phaserCurve)`
- `setIterations(n)`

## 9. Minimal Example

```js
const checkbox = scene.add.rexCustomShapes({
  create: [
    { name: 'box', type: 'rectangle' },
    { name: 'check', type: 'lines' }
  ],
  update: function () {
    const r = Math.min(this.centerX, this.centerY);
    const x = this.centerX - r;
    const y = this.centerY - r;
    const w = r * 2;
    const step = w / 4;

    if (this.isSizeChanged) {
      this.getShape('box')
        .setTopLeftPosition(x + 2, y + 2)
        .setSize(w - 4, w - 4);

      this.getShape('check')
        .startAt(x + step, y + step * 2)
        .lineTo(x + step * 2, y + step * 3)
        .lineTo(x + step * 3, y + step)
        .end();
    }

    this.getShape('box')
      .fillStyle(this.fillColor, 1)
      .lineStyle(2, this.fillColor, 1);

    this.getShape('check')
      .lineStyle(3, 0xffffff, 1);
  }
});
```

## 10. Implementation Rules For Stable Results

1. Use `create` only to allocate shapes and names.
2. Put per-frame geometry/style logic inside `update`.
3. In `update`, explicitly apply or clear styles to avoid stale state.
4. Rebuild expensive path geometry only when `this.isSizeChanged` is `true`.
5. Call `setDirty()` when external state changes and you need a refresh.
6. Use `worldToLocalXY` when mixing pointer/world coords with local shape drawing.
