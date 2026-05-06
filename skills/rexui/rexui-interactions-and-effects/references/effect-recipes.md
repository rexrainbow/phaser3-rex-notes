# Effect Recipes

These recipes cover small RexUI visual effects and movement helpers. Prefer them for UI feedback, not for full scene transitions.

## Fade

`fadeIn` and `fadeOutDestroy` are `this.rexUI` helper methods, not factories.

```js
panel.setAlpha(0);
this.rexUI.fadeIn(panel, 180, { start: 0, end: 1 });

this.rexUI.fadeOutDestroy(panel, 180, true);
```

The third argument of `fadeOutDestroy` controls destroy mode. Use `true` when closing disposable popups; use `false` when hiding a reusable panel.

## Ease Move

```js
this.rexUI.easeMoveFrom(panel, 240, undefined, '+=60', 'Cubic');
this.rexUI.easeMoveTo(panel, 240, panel.x, panel.y - 60, 'Cubic');
```

`endX`, `endY`, `startX`, and `startY` accept numbers, relative strings like `'+=80'` and `'-=80'`, or `undefined` to keep that axis unchanged.

For reusable show/hide motion, keep layout position separate from animation offset:

```js
panel.layout();
const homeX = panel.x;
const homeY = panel.y;

this.rexUI.easeMoveFrom(panel, 220, homeX, homeY + 80, 'Back');
this.rexUI.easeMoveTo(panel, 220, homeX, homeY + 80, 'Back', true);
```

The optional destroy flag on `easeMoveTo` / `easeMoveFrom` destroys the object when the move completes.

## Flip

```js
const card = this.rexUI.add.label({
  width: 300,
  height: 180,
  background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 16, 0x2d4059),
  text: this.add.text(0, 0, 'Front'),
  space: { left: 16, right: 16, top: 16, bottom: 16 }
}).layout();

const flip = this.rexUI.add.flip(card, {
  face: 'front',
  duration: 300,
  front(gameObject) {
    gameObject.getElement('text').setText('Front');
  },
  back(gameObject) {
    gameObject.getElement('text').setText('Back');
  }
});

this.rexUI.add.click(card).on('click', () => {
  flip.flip();
});
```

Call `.layout()` before creating `flip` so the card's size is stable.

## Shake

```js
this.rexUI.add.shake(button, {
  duration: 220,
  magnitude: 8
}).shake();
```

Many RexUI objects may also expose `.shake()` after the behavior is installed. Keep the returned behavior if you need to stop or reuse it explicitly.

## Skew

`skew` snapshots a RexUI container into a mesh-like temporary representation. Enter before tweening and exit when complete.

```js
const panel = this.rexUI.add.label(config).layout();
const skew = this.rexUI.add.skew(panel, { useParentBounds: true });

skew.enter();
this.tweens.add({
  targets: skew,
  skewXDeg: -18,
  skewYDeg: -6,
  duration: 180,
  yoyo: true,
  onComplete: () => skew.exit()
});
```

Use this for short feedback effects. For long-lived skewed artwork, prefer mesh/image-specific Rex plugins instead of skewing a full UI container.

## Perspective And Perspective Card

```js
const panel = this.rexUI.add.label(config).layout();
const perspective = this.rexUI.add.perspective(panel, {
  useParentBounds: true
});

perspective.enter();
this.tweens.add({
  targets: perspective,
  angleY: 25,
  duration: 250,
  yoyo: true,
  onComplete: () => perspective.exit()
});
```

Use `perspectiveCard` when the UI is structurally a two-sided card. Use `flip` when you only need a logical front/back switch without managing a mesh-like perspective object.

## Effect Gotchas

- Effects that snapshot or transform layout containers should run after `.layout()`.
- Fade/easeMove helpers return behavior instances. Reuse that instance if repeated calls should interrupt or continue the same animation.
- Destroy-on-complete helpers also destroy child objects owned by the RexUI container.
- Skew and perspective are heavier than alpha/position tweens; reserve them for high-value feedback.
