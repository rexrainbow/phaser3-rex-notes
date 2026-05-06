---
name: rexui-interactions-and-effects
description: Use when building Phaser RexUI interactions, gesture behaviors, anchors, fullscreen buttons, touch event blocking, drag/click/tap/press/swipe/pan/pinch/rotate handling, or UI effects such as flip, shake, fade, easeMove, skew, and perspective via this.rexUI.add.* or this.rexUI.*.
---

# RexUI Interactions And Effects

Use this skill when RexUI UI objects need input behavior, gesture recognition, screen anchoring, event isolation, or small visual effects.

## Use This First

| Need | Prefer |
| --- | --- |
| Button-like click on one object | `this.rexUI.add.click(gameObject, config)` |
| Close a popup by clicking outside it | `this.rexUI.add.clickOutside(panel, config)` |
| Tap, double-tap, long press, swipe, pan | `tap`, `press`, `swipe`, `pan` |
| Two-finger scale or rotate | `pinch` and `rotate` |
| Make an object draggable | `this.rexUI.add.drag(gameObject, config)` or `this.rexUI.requestDrag(gameObject)` |
| Stop gameplay input under a UI overlay | `this.rexUI.add.touchEventStop(gameObject, config)` |
| Keep a panel aligned to viewport resize | `anchor` config or `this.rexUI.add.anchor(gameObject, config)` |
| Toggle fullscreen from an image/button | `this.rexUI.add.fullscreenButton(gameObject, config)` |
| Animate opacity or position | `this.rexUI.fadeIn`, `fadeOutDestroy`, `easeMoveTo`, `easeMoveFrom` |
| Card flip, impact feedback, temporary skew/perspective | `flip`, `shake`, `skew`, `perspective`, `perspectiveCard` |

## Core Rules

- Behaviors attach to existing game objects; create and lay out the target first.
- Most behavior factories are under `this.rexUI.add.*`, but fade, easeMove, requestDrag, and `isInTouching` are methods on `this.rexUI` itself.
- Use npm import paths such as `phaser4-rex-plugins/templates/ui/ui-plugin.js` in generated app code. Source paths in these notes point to this repository only.
- For layout objects, call `.layout()` before anchoring, hit testing, clickOutside, flip, skew, perspective, or animation that depends on final bounds.
- For pointer-heavy scenes, add extra pointers with `this.input.addPointer(count)`. Pinch and rotate need at least 2 pointers.
- Avoid attaching competing gestures to the same object without a clear priority. Scrollable components already use pointer gestures internally.
- Store behavior instances when they must be enabled, disabled, reused, or cancelled later.

## Factory And Helper Boundaries

Use `this.rexUI.add.*`:

```js
const click = this.rexUI.add.click(button, { mode: 'pointerup' });
const drag = this.rexUI.add.drag(panel, { axis: 'both' });
const stop = this.rexUI.add.touchEventStop(panel, { stopAllLevels: true });
```

Use `this.rexUI.*`:

```js
this.rexUI.fadeIn(panel, 200);
this.rexUI.fadeOutDestroy(panel, 200, true);
this.rexUI.easeMoveTo(panel, 300, '+=0', '-=80', 'Cubic');
this.rexUI.requestDrag(panel);
```

Many RexUI layout/widget objects inherit `BaseSizer` convenience methods for the common click, click-outside, touching, and bounds-check cases:

```js
panel.onClick((click, gameObject, pointer) => submit());
panel.onClickOutside(() => closePanel());
panel.onTouching((inTouch, gameObject, pointer) => stepValue(1), undefined, { cooldown: 120 });
panel.disableClick();
panel.isPointerInBounds();
```

Use these methods when the target is already a RexUI sizer/widget and the handler is local to that object. Use explicit `this.rexUI.add.click`, `clickOutside`, or `inTouching` behavior objects when code needs to store the behavior instance, attach to a plain Phaser game object, or share/reconfigure the behavior independently.

Gotcha: `fullscreenButton` is registered as `this.rexUI.add.fullscreenButton(...)`. Do not use the capitalized type name as the factory call.

Gotcha: in the RexUI factory source, `pinch` and `rotate` are scene-level gesture recognizers. Prefer `this.rexUI.add.pinch(config)` and `this.rexUI.add.rotate(config)`, then apply the returned gesture values to the object you want to transform.

## References

- For gesture selection, events, and reduced input recipes, read [references/gesture-behaviors.md](references/gesture-behaviors.md).
- For fade, easeMove, flip, shake, skew, and perspective recipes, read [references/effect-recipes.md](references/effect-recipes.md).
- For responsive anchoring, fullscreen buttons, touch event blocking, and layer/input notes, read [references/anchor-fullscreen.md](references/anchor-fullscreen.md).

## Source Map

- `templates/ui/ui-plugin.js`: RexUI factory registration and helper methods.
- `templates/ui/ui-plugin.d.ts`: public factory names and helper method names.
- `templates/ui/basesizer/BaseSizer.d.ts`: inherited click, click-outside, touching, pointer bounds, and child-target convenience methods.
- `templates/ui/click`, `clickoutside`, `tap`, `press`, `swipe`, `pan`, `pinch`, `rotate`, `drag`, `intouching`: input behavior wrappers.
- `templates/ui/anchor`, `fullscreenbutton`, `toucheventstop`, `layermanager`: viewport, fullscreen, event isolation, and layer helpers.
- `templates/ui/flip`, `shake`, `skew`, `perspective`, `perspectivecard`, `fade`, `easemove`: visual effects and motion helpers.
