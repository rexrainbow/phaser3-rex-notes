# RexSpinner Custom (Source Traced README)

This document describes how to use `scene.rexSpinner.add.custom(...)` without reading internal source code.
It is written for practical use by developers and code generation tools.

## 1. Core API

```js
scene.rexSpinner.add.custom({
  x, y, width, height,
  color, duration, ease, delay, repeatDelay, value, start, type,
  create,   // object | array | function
  update    // function
});
```

- `x`, `y`: object position. Default `0, 0`.
- `width`, `height`: object size. Default `64, 64`.
- `color`: default color. Default `0xffffff`.
- `duration`: one cycle duration in ms. Default `1000`.
- `ease`: tween ease. Default `'Linear'`.
- `delay`: start delay in ms. Default `0`.
- `repeatDelay`: delay between cycles in ms. Default `0`.
- `value`: initial progress, clamped to `0..1`. Default `0`.
- `start`: auto start after creation. Default `true`.
- `type`: custom game object type. Default `'rexSpinnerCustom'`.

## 2. `create` Supported Formats

`create` supports 3 formats.

### A) Plain Object

```js
create: {
  line: 4,
  lines: ['border', 'fill'],
  circle: 'dot'
}
```

### B) Array

```js
create: [
  { type: 'line', name: 'l0' },
  { type: 'line', name: 'l1' },
  { type: 'lines', name: 'border' }
]
```

### C) Callback

```js
create: function () {
  const a = this.createShape('line', 'l0');
  const b = this.createShape('line', 'l1');
  this.addShape(a).addShape(b);
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

Inside `update: function () { ... }`, `this` is the custom spinner instance.

Geometry and progress:

- `this.width`
- `this.height`
- `this.centerX` (normally `this.width / 2`)
- `this.centerY` (normally `this.height / 2`)
- `this.radius` (`Math.min(centerX, centerY)`)
- `this.color`
- `this.value` (`0..1`)

Shape management:

- `this.getShapes()`
- `this.getShape(name)`
- `this.createShape(type, name)`
- `this.addShape(shape)`

Spinner data storage:

- `this.setData(key, value)` or `this.setData(object)`
- `this.getData(key, defaultValue?)`
- `this.incData(key, inc, defaultValue?)`
- `this.mulData(key, mul, defaultValue?)`
- `this.clearData()`

Notes:

- `this.getData(key, defaultValue?)` returns `defaultValue` when the key does not exist.
- If `update` is omitted, default behavior clears style every frame by calling `lineStyle()` and `fillStyle()` on all shapes.

## 4. Common Shape API

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

## 5. Shape Specific API Quick Reference

### Line

- `setP0(x, y)`
- `setP1(x, y)`

### Lines

- Path build: `start()`, `startAt(x,y)`, `lineTo(x,y,relative?)`, `verticalLineTo(x,relative?)`, `horizontalLineTo(y,relative?)`
- Curves: `arc(...)`, `ellipticalArc(...)`, `quadraticBezierTo(...)`, `cubicBezierTo(...)`, `catmullRomTo(...)`
- End path: `close()`, `end()`
- Path segment: `copyPathFrom(...)`, `appendPathFrom(...)`, `setDisplayPathSegment(...)`
- Transform: `rotateAround(cx, cy, angleDeg)`, `offset(x, y)`

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

## 6. Non Custom Phaser Methods You Can Still Use

A custom spinner is also a Phaser game object, so common game object methods are available.
Example: `spinner.getBounds()` is valid and is often used for debug drawing.

This document focuses on custom spinner specific behavior, so Phaser core API is not listed in full here.

## 7. Implementation Rules For Code Generation

1. In `create`, only create and name shapes. Do not put per frame geometry or styling logic there.
2. In `update`, set geometry and styles every frame.
3. Explicitly set or clear `fillStyle` and `lineStyle` every frame to avoid stale style state.
4. Do not assume built in `this.prevValue`. Store your own state with `this.setData(...)` or `shape.setData(...)`.
5. Avoid creating large temporary arrays or objects each frame.
6. Derive geometry from `centerX`, `centerY`, `radius`, `width`, and `height` for automatic scaling.

## 8. Known Behavior And Caveats

1. Runtime supports `curve` and `roundRectangle`.
2. `arc`, `ellipticalArc`, `setAngle`, and `rotateAround` use degrees, not radians.
3. Current `resume()` behavior may not resume in some builds. Workaround: call `start()` again or control `value` manually.
4. If `create` is omitted, the spinner starts with zero shapes.

## 9. Reusable Template

```js
function AddOrbitDotsSpinner(scene, x, y, width, height, options = {}) {
  const {
    count = 12,
    duration = 1000,
    color = 0xffffff,
    start = true
  } = options;

  return scene.rexSpinner.add.custom({
    x, y, width, height, duration, color, start,
    create: { circle: Array.from({ length: count }, (_, i) => `dot${i}`) },
    update: function () {
      const cx = this.centerX;
      const cy = this.centerY;
      const R = this.radius;
      const t = this.value;
      const ringR = R * 0.75;
      const dotR = R * 0.12;

      for (let i = 0; i < count; i++) {
        const phase = (i / count + t) % 1;
        const rad = (i * 360 / count) * (Math.PI / 180);
        const x = cx + ringR * Math.cos(rad);
        const y = cy + ringR * Math.sin(rad);
        const alpha = Phaser.Math.Linear(0.2, 1, 1 - phase);

        this.getShape(`dot${i}`)
          .setCenterPosition(x, y)
          .setRadius(dotR, dotR)
          .fillStyle(this.color, alpha)
          .lineStyle();
      }
    }
  });
}
```

## 10. Minimal Scene

```js
import Phaser from 'phaser';
import SpinnerPlugin from 'phaser3-rex-plugins/templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
  constructor() { super('demo'); }
  create() {
    const spinner = AddOrbitDotsSpinner(this, 400, 300, 120, 120, {
      count: 10,
      duration: 900,
      color: 0x4dabf7
    });

    this.add.graphics({ lineStyle: { width: 2, color: 0xff0000, alpha: 1 } })
      .strokeRectShape(spinner.getBounds());
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: Demo,
  plugins: {
    scene: [{ key: 'rexSpinner', plugin: SpinnerPlugin, mapping: 'rexSpinner' }]
  }
});
```

For stable long term generation quality, put Section 7 and Section 8 into your system prompt rules.
