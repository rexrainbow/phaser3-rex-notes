# Progress And Visual Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They do not require reading `examples/` at skill usage time.

## RoundRectangle Background

```js
const background = this.rexUI.add.roundRectangle({
  radius: 10,
  color: 0x222222,
  strokeColor: 0xffffff,
  strokeWidth: 2
});

const label = this.rexUI.add.label({
  background,
  text: this.add.text(0, 0, 'Play'),
  space: { left: 12, right: 12, top: 8, bottom: 8 }
}).layout();
```

Use `roundRectangle` for generated UI chrome before reaching for textured nine-patch assets.

## NinePatch Background

Derived from `examples/ui-ninepatch/3x3.js`, reduced for skill reference.

```js
const panelBackground = this.rexUI.add.ninePatch({
  key: 'panel',
  columns: [10, undefined, 10],
  rows: [10, undefined, 10],
  stretchMode: {
    edge: 'repeat',
    internal: 'scale'
  }
});

const panel = this.rexUI.add.label({
  x: 400,
  y: 300,
  width: 260,
  height: 160,
  background: panelBackground,
  text: this.add.text(0, 0, 'Hello'),
  space: { left: 20, right: 20, top: 20, bottom: 20 }
}).layout();
```

Use `undefined` in `columns`/`rows` for stretchable center sections.

## Circular Progress In OverlapSizer

Derived from `examples/ui-circularprogress/circularprogress.js`, reduced for skill reference.

```js
const ring = this.rexUI.add.circularProgress({
  radius: 120,
  trackColor: 0x260e04,
  barColor: 0x7b5e57,
  centerColor: 0x4e342e,
  value: 0.75,
  easeValue: {
    duration: 300,
    ease: 'Cubic'
  }
});

const label = this.rexUI.add.label({
  background: this.rexUI.add.roundRectangle({ radius: 20, color: 0x260e04 }),
  text: this.add.text(0, 0, '75%'),
  space: { left: 16, right: 16, top: 10, bottom: 10 }
});

const ui = this.rexUI.add.overlapSizer({
  x: 400,
  y: 300,
  width: 280,
  height: 280
})
  .add(ring, { key: 'ring', align: 'center', expand: true })
  .add(label, { key: 'label', align: 'center', expand: false })
  .layout();

ring.easeValueTo(1);
```

## Line Progress

```js
const bar = this.rexUI.add.lineProgress({
  x: 400,
  y: 300,
  width: 300,
  height: 32,
  trackColor: 0x260e04,
  trackStrokeColor: 0x7b5e57,
  trackStrokeThickness: 4,
  barColor: 0x4e342e,
  value: 0.5,
  easeValue: {
    duration: 300,
    ease: 'Cubic'
  }
});

bar.easeValueTo(0.85);
```

`lineProgress.value` is normalized from `0` to `1`. Use `setValue(value, min, max)` if the input range is different.

## Custom Progress

Derived from `examples/ui-customprogress/customprogress.js`, reduced for skill reference.

```js
const progress = this.rexUI.add.customProgress({
  create: [
    { name: 'track', type: 'arc' },
    { name: 'bar', type: 'arc' },
    { name: 'thumb', type: 'circle' }
  ],
  update() {
    const centerX = this.centerX;
    const centerY = this.centerY;
    const radius = this.radius * 0.9;
    const startAngle = 120;
    const endAngle = startAngle + 300 * this.value;
    const endRad = Phaser.Math.DegToRad(endAngle);

    this.getShape('track')
      .lineStyle(12, 0x333333)
      .setCenterPosition(centerX, centerY)
      .setRadius(radius)
      .setAngle(startAngle, 420);

    this.getShape('bar')
      .lineStyle(14, 0x4e79a7)
      .setCenterPosition(centerX, centerY)
      .setRadius(radius)
      .setAngle(startAngle, endAngle);

    this.getShape('thumb')
      .fillStyle(0xffffff)
      .setCenterPosition(centerX + Math.cos(endRad) * radius, centerY + Math.sin(endRad) * radius)
      .setRadius(8);
  },
  value: 0.25
});

progress.setValue(0.75);
```

Use `customProgress` when built-in progress shapes cannot express the desired indicator.

## AIO Spinner

```js
const spinner = this.rexUI.add.aioSpinner({
  x: 400,
  y: 300,
  width: 48,
  height: 48,
  color: 0xffffff,
  duration: 1000,
  animationMode: 'ball'
});

spinner.start();
```

Use `aioSpinner` for loading indicators inside labels, dialogs, and overlays.

## ImageBox

Derived from `examples/imagebox/imagebox.js`, reduced for skill reference.

```js
const imageBox = this.rexUI.add.imageBox(400, 300, 'portrait', undefined, {
  background: { color: 0x222222 },
  scaleUp: true
})
  .resize(220, 180);
```

Use `imageBox` when an image should fit into a fixed UI region without manually computing scale.

## Masked Images

```js
const avatar = this.rexUI.add.circleMaskImage(400, 300, 'avatar', undefined, {
  maskType: 'circle'
});

const alphaMasked = this.rexUI.add.alphaMaskImage(520, 300, 'portrait', undefined, {
  mask: {
    key: 'mask'
  }
});
```

Verify exact mask config fields against `templates/ui/circlemaskimage` and `templates/ui/alphamaskimage` when generating non-trivial masks.
