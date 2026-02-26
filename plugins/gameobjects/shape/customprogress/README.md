# RexCustomProgress (Source Traced README)

This document describes how to use `CustomProgress` by tracing source files:

- `plugins/gameobjects/shape/customprogress/CustomProgress.js`
- `plugins/utils/progressbase/ProgressBase.js`
- `plugins/utils/progressvalue/ProgressValueMethods.js`
- `plugins/utils/ease/EaseValueMethods.js`

It is written for practical use by developers and code generation tools.

## 1. Core API

```js
scene.add.rexCustomProgress({
  x, y, width, height,
  type,                // default: 'rexCustomProgress'
  create,              // object | array | function
  update,              // function
  value,               // 0..1, default: 0
  easeValue: {
    duration,          // default: 0
    ease               // default: 'Linear'
  },
  valuechangeCallback, // optional
  valuechangeCallbackScope,
  eventEmitter         // optional, default: this object
});
```

Factory form is also supported:

```js
scene.add.rexCustomProgress(x, y, width, height, config);
```

Class form:

```js
import CustomProgress from 'phaser3-rex-plugins/plugins/customprogress.js';

const progress = new CustomProgress(scene, x, y, width, height, config);
scene.add.existing(progress);
```

## 2. `create` Supported Formats

`create` supports 3 formats.

### A) Plain Object

```js
create: {
  line: 4,
  lines: ['track', 'bar'],
  circle: 'thumb'
}
```

### B) Array

```js
create: [
  { type: 'arc', name: 'track' },
  { type: 'arc', name: 'bar' },
  { type: 'circle', name: 'thumb' }
]
```

### C) Callback

```js
create: function () {
  const track = this.createShape('arc', 'track');
  const bar = this.createShape('arc', 'bar');
  this.addShape(track).addShape(bar);
}
```

Supported shape types at runtime:

- `arc`
- `circle`
- `curve`
- `ellipse`
- `line`
- `lines`
- `rectangle`
- `roundRectangle`
- `triangle`

## 3. `this` Inside `update`

Inside `update: function () { ... }`, `this` is the custom progress instance.

Geometry and progress:

- `this.width`
- `this.height`
- `this.centerX` (`this.width / 2`)
- `this.centerY` (`this.height / 2`)
- `this.radius` (`Math.min(centerX, centerY)`)
- `this.value` (`0..1`)
- `this.isSizeChanged`

Object style values:

- `this.fillColor`, `this.fillAlpha`
- `this.lineWidth`, `this.strokeColor`, `this.strokeAlpha`

Shape management:

- `this.getShapes()`
- `this.getShape(name)`
- `this.createShape(type, name)`
- `this.addShape(shape)`
- `this.deleteShape(name)`
- `this.clear()`

Coordinate conversion:

- `this.worldToLocalXY(worldX, worldY, camera?, out?)`

If `update` is omitted, default behavior clears style every refresh by calling `lineStyle()` and `fillStyle()` on all shapes.

## 4. Progress Value API

- `this.value` property is clamped to `0..1`.
- `setValue(value, min?, max?)`
- `addValue(inc, min?, max?)`
- `getValue(min?, max?)`

Examples:

```js
progress.setValue(0.75);        // 0..1
progress.setValue(75, 0, 100);  // range mapping -> 0.75

progress.addValue(0.1);
progress.addValue(10, 0, 100);

const v01 = progress.getValue();        // 0..1
const v100 = progress.getValue(0, 100); // mapped range
```

## 5. Easing Value API

- `setEaseValueDuration(durationMs)`
- `setEaseValueFunction(easeName)`
- `easeValueTo(value, min?, max?)`
- `stopEaseValue()`

Runtime also supports:

- `easeValueRepeat(from, to, repeat = -1, repeatDelay = 0)`

Defaults from config:

- `easeValue.duration = 0`
- `easeValue.ease = 'Linear'`

## 6. Value Change Event

Listen via event:

```js
progress.on('valuechange', function (newValue, oldValue, emitterOrProgress) {
  // ...
});
```

Or in config:

```js
valuechangeCallback: function (newValue, oldValue, emitterOrProgress) {},
valuechangeCallbackScope: scope
```

Notes:

- Without custom `eventEmitter`, events are emitted on the progress object itself.
- With custom `eventEmitter`, event source and 3rd callback argument become that emitter.

## 7. Common Shape API

All shapes support:

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

## 9. Reusable Template

```js
function AddArcProgress(scene, x, y, width, height, options = {}) {
  const {
    value = 0,
    color = 0x4dabf7,
    trackColor = 0x2f2f2f,
    duration = 800
  } = options;

  const progress = scene.add.rexCustomProgress({
    x, y, width, height, value,
    easeValue: { duration, ease: 'Cubic' },
    create: [
      { type: 'arc', name: 'track' },
      { type: 'arc', name: 'bar' }
    ],
    update: function () {
      const cx = this.centerX;
      const cy = this.centerY;
      const r = this.radius * 0.85;
      const start = -90;
      const end = start + 360 * this.value;

      this.getShape('track')
        .lineStyle(8, trackColor, 1)
        .setCenterPosition(cx, cy)
        .setRadius(r)
        .setAngle(0, 360);

      this.getShape('bar')
        .lineStyle(8, color, 1)
        .setCenterPosition(cx, cy)
        .setRadius(r)
        .setAngle(start, end);
    }
  });

  return progress;
}
```

## 10. Implementation Rules For Code Generation

1. In `create`, only create and name shapes.
2. In `update`, apply geometry and style based on `this.value`.
3. Explicitly set or clear `fillStyle` and `lineStyle` each refresh to avoid stale style state.
4. Use `this.isSizeChanged` to rebuild expensive static path data only when size changes.
5. Prefer `setValue/addValue/easeValueTo` over writing unrelated temporary state.
6. Remember `value` is always clamped to `0..1`.

## 11. Known Behavior And Caveats

1. If `create` is omitted, the object starts with zero shapes.
2. If `update` is omitted, refresh will clear all shape styles.
3. `easeValueRepeat(...)` exists at runtime, but may be missing from some `.d.ts` declarations.
4. If you pass a custom `eventEmitter`, the value-change callback third argument is that emitter, not always the progress object.
