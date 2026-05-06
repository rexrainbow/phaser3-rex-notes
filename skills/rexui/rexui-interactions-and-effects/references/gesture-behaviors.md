# Gesture Behaviors

Use these behaviors for object-level input and pointer gestures. These snippets are reduced from the RexUI and behavior examples, then rewritten to depend on RexUI source APIs rather than `examples/`.

## Behavior Chooser

| Factory | Target | Main events/properties | Use for |
| --- | --- | --- | --- |
| `click(gameObject, config)` | Game object | `click`, `down`, `up`, `over`, `out` | Button-like activation |
| `clickOutside(gameObject, config)` | Game object | `clickoutside` | Close menus, popups, dialogs |
| `tap(gameObject?, config)` | Game object or scene | `tap`, `1tap`, `2tap`, `tapping`, `tappingstart` | Single/double tap |
| `press(gameObject?, config)` | Game object or scene | `pressstart`, `pressend` | Long press |
| `swipe(gameObject?, config)` | Game object or scene | `swipe`, `left`, `right`, `up`, `down` | Directional gesture |
| `pan(gameObject?, config)` | Game object or scene | `panstart`, `pan`, `panend`, `dx`, `dy` | Drag-like movement |
| `pinch(config)` | Scene-level recognizer | `pinchstart`, `pinch`, `pinchend`, `scaleFactor` | Two-finger zoom |
| `rotate(config)` | Scene-level recognizer | `rotatestart`, `rotate`, `rotateend`, `rotation` | Two-finger rotation |
| `drag(gameObject, config)` | Game object | Phaser `drag*` events on target | Move an object with optional axis lock |
| `inTouching(gameObject, config)` | Game object | `touchstart`, `intouch`, `touchend` | Repeated action while held |

## BaseSizer Convenience Methods

Most RexUI layout containers and many composed widgets inherit `BaseSizer` methods that wrap the same click, click-outside, and touching behavior families. Prefer these when the target is already a RexUI object and the handler belongs to that object.

| Need | Method family |
| --- | --- |
| Simple click on the object | `onClick`, `offClick`, `enableClick`, `disableClick`, `getClickController` |
| Click outside a popup/panel | `onClickOutside`, `offClickOutside`, `enableClickOutside`, `disableClickOutside`, `getClickOutsideController` |
| Repeated touch/hold behavior | `onTouching`, `offTouching`, `onTouchingEnd`, `offTouchingEnd`, `enableTouching`, `disableTouching` |
| Bounds check | `isPointerInBounds` |

```js
const panel = this.rexUI.add.dialog(config).layout();

panel
  .onClick((click, gameObject, pointer) => {
    submit();
  }, undefined, { mode: 'pointerup' })
  .onClickOutside((clickOutside, gameObject, pointer) => {
    this.rexUI.fadeOutDestroy(panel, 120, true);
  })
  .onTouching((inTouch, gameObject, pointer) => {
    stepValue(1);
  }, undefined, { cooldown: 120 });
```

The overloads can target the sizer itself or a child game object:

```js
const okButton = panel.getElement('actions')[0];

panel.onClick(okButton, () => {
  submit();
});

panel.disableClick(okButton);

if (panel.isPointerInBounds('content')) {
  highlightPanel();
}
```

Use explicit behavior factories when the target is a plain Phaser game object, when the code must keep the returned behavior instance, or when behavior configuration is shared across multiple objects.

## Click

```js
const click = this.rexUI.add.click(button, {
  mode: 'pointerup',
  clickInterval: 100,
  threshold: 10
});

click.on('click', (click, gameObject, pointer, event) => {
  submit(gameObject);
});
```

`mode: 'pointerup'` is usually safer for UI buttons because it allows a small press/release interaction. Use `pointerdown` only for immediate actions.

## Click Outside

```js
const panel = this.rexUI.add.dialog(config).layout();

this.rexUI.add.clickOutside(panel, {
  mode: 'pointerup',
  threshold: 10
}).on('clickoutside', () => {
  this.rexUI.fadeOutDestroy(panel, 120, true);
});
```

Use `clickOutside` for popup dismissal instead of manual scene pointer math. It already tests the target bounds and pointer mode.

## Tap And Press

```js
this.rexUI.add.tap(card, {
  taps: 2,
  tapInterval: 250,
  threshold: 10
}).on('tap', (tap, gameObject, pointer) => {
  gameObject.toggleData('selected');
});

this.rexUI.add.press(card, {
  time: 600,
  threshold: 12
}).on('pressstart', (press, gameObject, pointer) => {
  openContextMenu(gameObject, pointer.worldX, pointer.worldY);
});
```

Use `tap` for quick touch intent; use `press` when the hold duration is part of the command.

## Swipe

```js
this.rexUI.add.swipe(listPanel, {
  dir: 'left&right',
  threshold: 20,
  velocityThreshold: 1000
}).on('swipe', (swipe) => {
  if (swipe.left) {
    showNextPage();
  } else if (swipe.right) {
    showPreviousPage();
  }
});
```

Use `dir: '4dir'` when vertical direction matters, and `dir: '8dir'` only when diagonal gestures are meaningful.

## Pan

```js
this.rexUI.add.pan(card, { threshold: 5 })
  .on('pan', (pan) => {
    pan.gameObject.x += pan.dx;
    pan.gameObject.y += pan.dy;
  });
```

Use `pan` when you want gesture deltas. Use `drag` when you want Phaser drag lifecycle and an optional axis lock.

## Pinch And Rotate

```js
this.input.addPointer(2);

const preview = this.rexUI.add.label(config).layout();

this.rexUI.add.pinch({ threshold: 8 })
  .on('pinch', (pinch) => {
    preview.scaleX *= pinch.scaleFactor;
    preview.scaleY *= pinch.scaleFactor;
  });

this.rexUI.add.rotate({ threshold: 8 })
  .on('rotate', (rotate) => {
    preview.rotation += rotate.rotation;
  });
```

RexUI's `pinch` and `rotate` factories are scene-level in the current source. Do not pass the target object as the first argument in RexUI code; apply the returned scale or rotation to your own object.

## Drag

```js
const drag = this.rexUI.add.drag(panel, {
  axis: 'both'
});

panel.on('dragend', () => {
  panel.layout?.();
});
```

Axis values include `'both'`, `'horizontal'`, `'h'`, `'vertical'`, and `'v'`.

To start dragging immediately after creating an object under the pointer:

```js
const icon = this.add.image(pointer.x, pointer.y, 'item');
this.rexUI.add.drag(icon);
this.rexUI.requestDrag(icon);
```

## InTouching

```js
this.rexUI.add.inTouching(repeatButton, {
  cooldown: 120
}).on('intouch', () => {
  stepValue(1);
});
```

Use `inTouching` for repeat buttons and hold-to-fire controls. Use `this.rexUI.isInTouching(gameObject, pointer)` only for one-off bounds tests.

## Input Gotchas

- Scene-level `tap`, `press`, `swipe`, and `pan` can be created by omitting the target object; object-level use is usually better for UI.
- Phaser input hit areas need real bounds. For text, sizers, and custom objects, call `.layout()` or set a hit area before attaching input behavior.
- When UI sits on top of gameplay, add `touchEventStop` to the UI surface or the underlying scene may still receive pointer events.
- Scrollable panels, sliders, and draggable children can compete for the same drag gesture. Decide whether scrolling or child dragging owns the pointer for that region.
