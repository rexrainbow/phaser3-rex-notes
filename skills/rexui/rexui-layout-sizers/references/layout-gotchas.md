# RexUI Layout Gotchas

## Always Layout After Composition

Most layout containers do not position children correctly until `.layout()` runs.

Call `.layout()` after:

- Creating the sizer and adding children.
- Adding or removing children.
- Changing child `proportion`, `expand`, `padding`, or alignment.
- Changing text/content size in a way that affects layout.
- Resizing or re-anchoring a panel.

## Children Are Game Objects

Sizer children must be Phaser/RexUI game objects.

Do this:

```js
sizer.add(this.add.text(0, 0, 'OK'));
```

Not this:

```js
sizer.add('OK');
```

## Choose The Right Spacing Level

- Container `space.left/right/top/bottom`: padding inside the whole sizer.
- Container `space.item`: spacing between `sizer` children.
- Container `space.column/row`: spacing between `gridSizer` cells.
- Container `space.line`: spacing between `fixWidthSizer` wrapped lines.
- Child `padding`: spacing around one child.

## Proportion vs Expand

`proportion` decides how much remaining space a child receives in a `sizer`.

`expand` decides whether the child fills the assigned area.

Common pattern:

```js
sizer.add(label, { proportion: 0 });
sizer.add(content, { proportion: 1, expand: true });
```

## Width Matters For FixWidthSizer

`fixWidthSizer` needs a meaningful `width` to wrap predictably. Without a width, wrapping may not match the intended UI.

## GridSizer Is Not A General Row

Use `sizer` for one row or one column. Use `gridSizer` when cells are addressed by row/column or when a table-like layout is required.

## OverlapSizer Is For Shared Bounds

Use `overlapSizer` when children occupy the same rectangle. Do not use a linear `sizer` with manual coordinates for badges, overlays, or centered labels on graphics.

## Use Keys For Important Children

Give important children a `key` so future code can retrieve them.

```js
panel.add(title, { key: 'title' });
panel.getElement('title');
```

Use `getElement(name, true)` for recursive lookup through nested sizers.

## Debug With drawBounds

During development:

```js
panel.layout().drawBounds(this.add.graphics(), 0xff0000);
```

Remove debug bounds from production examples unless the user asks for layout debugging.

## Source/Type Mismatch Reminder

For exact factory signatures, inspect:

- `templates/ui/<layout>/Factory.js`
- `templates/ui/<layout>/<Class>.d.ts`

Use package import paths only in user-facing full setup examples. Local `templates/ui/...` paths are source-map paths for this repository.
