# ScrollablePanel Config

Use `scrollablePanel` when the scrollable content is one composed game object, usually a `sizer`, `gridSizer`, or `fixWidthSizer`.

## Minimal Shape

```js
const background = this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 });

const content = this.rexUI.add.fixWidthSizer({
  space: { left: 4, right: 4, top: 4, bottom: 4, item: 8, line: 8 }
});

items.forEach((item) => {
  content.add(this.rexUI.add.label({
    background: this.rexUI.add.roundRectangle({ radius: 6, color: 0x333333 }),
    text: this.add.text(0, 0, item.name),
    space: { left: 10, right: 10, top: 6, bottom: 6 }
  }));
});

const panel = this.rexUI.add.scrollablePanel({
  x: 400,
  y: 300,
  width: 360,
  height: 260,
  scrollMode: 'vertical',

  background,

  panel: {
    child: content,
    mask: { padding: 1 }
  },

  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff }),
    hideUnscrollableSlider: true,
    adaptThumbSize: true
  },

  scroller: {
    slidingDeceleration: 5000,
    backDeceleration: 2000
  },

  mouseWheelScroller: {
    focus: true,
    speed: 0.1
  },

  space: {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
    panel: { top: 8, bottom: 8 },
    sliderY: 8
  }
}).layout();
```

## Panel Child

`panel.child` is a single game object. For multiple rows or chips, create a container first:

- `sizer`: row or column list.
- `gridSizer`: fixed row/column grid.
- `fixWidthSizer`: wrapping tags, chips, inventory-like flow.
- `overlapSizer`: stacked or overlaid content.

After mutating the child:

```js
const content = panel.getElement('panel');
content.clear(true);
content.add(newChild, { expand: true });
panel.layout();
```

## Depth Gotcha

If the panel background is created after `panel.child`, Phaser's display list order can put the background above the content. The symptom is that the `scrollablePanel` exists, but the content appears missing because it is drawn under an opaque background.

Prefer creating the panel background before creating the content:

```js
const background = this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 });
const content = this.rexUI.add.fixWidthSizer();

const panel = this.rexUI.add.scrollablePanel({
  background,
  panel: { child: content }
}).layout();
```

If content must be created first, move it above the background after creating the panel:

```js
const panel = this.rexUI.add.scrollablePanel({
  background: this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 }),
  panel: { child: content }
}).layout();

panel.bringChildToTop(content);
```

## Scroll Config

Shared `Scrollable` fields:

| Field | Use |
|---|---|
| `scrollMode` | `'vertical'`, `'horizontal'`, or `'xy'`. Numeric aliases are `0`, `1`, `2`. |
| `slider`, `sliderX`, `sliderY` | Track/thumb UI and drag/click behavior. |
| `scroller`, `scrollerX`, `scrollerY` | Drag-to-scroll behavior. |
| `mouseWheelScroller` | Wheel scrolling. Use `focus: true` for pointer-over-only wheel input. |
| `snapStep`, `snapStepX`, `snapStepY` | Quantized scroll steps. |
| `clampChildOY`, `clampChildOX` | Clamp child offset inside bounds. |
| `header`, `footer` | Optional fixed objects outside the scrollable panel child. |

Slider fields:

| Field | Use |
|---|---|
| `track` | Slider track object or roundRectangle config. |
| `thumb` | Draggable thumb object or roundRectangle config. |
| `input` | `'drag'`, `'pan'`, `'click'`, or `'none'`. |
| `hideUnscrollableSlider` | Hide slider when content fits. |
| `disableUnscrollableDrag` | Disable drag when content fits. |
| `adaptThumbSize` | Size thumb based on visible/content ratio. |
| `minThumbSize` | Lower bound for adaptive thumb. |
| `buttons` | Optional top/bottom/left/right scroll buttons and `step`. |

## Scrolling Methods

`scrollablePanel` inherits normalized scroll methods:

```js
panel.scrollToTop();
panel.scrollToBottom();
panel.setT(0.5, true);
panel.addT(0.1, true);
panel.scrollToLeft();
panel.scrollToRight();
panel.setS(0.5, true);
```

It also provides `scrollToChild(child, align, duration, ease)`:

```js
const target = panel.getByName('item-20', true);
panel.scrollToChild(target, 'center', 300, 'Cubic');
```

## TextArea

Use `textArea` for scrollable text instead of putting a text object in `scrollablePanel`:

```js
const textArea = this.rexUI.add.textArea({
  width: 360,
  height: 220,
  text: this.rexUI.add.BBCodeText(0, 0, '', { fontSize: 18 }),
  content,
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  space: { text: 10 }
}).layout();

textArea.appendText('\nMore text');
textArea.scrollToLine(textArea.linesCount - 1, 200, 'Cubic');
```

Use `rexui-text-and-input` for rich text, input, and text playback details.

## Standalone ScrollBar

Use `scrollBar` when a separate normalized value should drive another object:

```js
const bar = this.rexUI.add.scrollBar({
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x222222 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  valuechangeCallback(value) {
    target.setT(value, true);
  }
}).layout();
```

`scrollBar.value` is normalized from `0` to `1`. Use `getValue(min, max)` or `setValue(value, min, max)` to map another range.
