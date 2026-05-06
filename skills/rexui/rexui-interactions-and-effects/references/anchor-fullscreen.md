# Anchor, Fullscreen, And Event Boundaries

Use this reference when a RexUI element must stay attached to the viewport, toggle fullscreen, block pointer propagation, or sit above gameplay.

## Anchor In Component Config

Many RexUI layout objects accept an `anchor` config directly.

```js
const toolbar = this.rexUI.add.fixWidthSizer({
  anchor: {
    left: 'left+12',
    top: 'top+12',
    width: '40%'
  },
  space: {
    left: 8,
    right: 8,
    top: 8,
    bottom: 8,
    item: 6,
    line: 6
  }
});

toolbar.layout();
```

Anchor expressions use viewport keywords and optional offsets:

| Field | Examples |
| --- | --- |
| `left`, `right`, `centerX`, `x` | `'left+12'`, `'right-20'`, `'center'`, `'50%'` |
| `top`, `bottom`, `centerY`, `y` | `'top+12'`, `'bottom-16'`, `'center'`, `'50%'` |
| `width`, `height` | `'30%'`, `'100%-40'` |
| `aspectRatio` | `true`, `0.75`, `16 / 9` |

Use `aspectRatio` when one dimension is computed from the viewport and the other should remain proportional.

## Anchor Existing Object

```js
const panel = this.rexUI.add.scrollablePanel(config).layout();

const anchor = this.rexUI.add.anchor(panel, {
  centerX: 'center',
  centerY: 'center',
  width: '60%',
  aspectRatio: 1.4,
  onResizeCallback(width, height, gameObject) {
    gameObject.setMinSize(width, height).layout();
  }
});

anchor.anchor();
```

When anchoring a RexUI sizer-like object, resize callbacks should usually call `setMinSize(...)` or equivalent before `.layout()`.

## Fullscreen Button

```js
const icon = this.add.image(760, 40, 'fullscreen-enter');

this.rexUI.add.fullscreenButton(icon, {
  mode: 'pointerup',
  onEnter: 'fullscreen-leave',
  onLeave: 'fullscreen-enter'
});
```

`onEnter` and `onLeave` can be texture keys, `{ key, frame }` objects, or callbacks receiving the target game object.

Gotcha: the factory is `fullscreenButton`, not `FullscreenButton`.

## Stop Pointer Events Under UI

```js
const modalPanel = this.rexUI.add.dialog(config).layout();

this.rexUI.add.touchEventStop(modalPanel, {
  hitAreaMode: 'default',
  stopAllLevels: true
});
```

Use this on modal panels, menus, and floating HUDs over gameplay input. If the target does not cover the full desired blocking area, add a `cover` or `fullWindowRectangle` behind it and attach `touchEventStop` to that surface.

```js
const cover = this.rexUI.add.cover({
  color: 0x000000,
  alpha: 0.45
});

this.rexUI.add.touchEventStop(cover, {
  hitAreaMode: 'fullWindow',
  stopAllLevels: true
});
```

## Layer Manager

```js
const layers = this.rexUI.add.layerManager();

layers.addToLayer('modal', cover);
layers.addToLayer('modal', modalPanel);
```

Use `layerManager` when UI depth must be managed as named groups rather than scattered numeric `setDepth()` calls. Keep modal covers and their panels in the same layer.

## Boundary Gotchas

- Phaser draws by display-list order and depth. If an opaque cover or background is created after content and sits above it, the content can be hidden.
- Call `.layout()` before enabling hit testing on sizer-like UI. Otherwise the hit area may reflect stale or zero bounds.
- `touchEventStop` blocks event propagation; it does not replace component-level callbacks such as button clicks.
- Fullscreen behavior depends on browser permissions and user gesture rules. Trigger it from a pointer/click interaction, not from delayed code.
