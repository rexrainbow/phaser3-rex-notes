---
name: rexui-layout-sizers
description: "Use this skill when building RexUI layouts with sizer, gridSizer, fixWidthSizer, overlapSizer, nested sizers, RexUI layout(), child proportion, expand, align, padding, spacing, childrenMap, or layout debugging. Triggers on: RexUI layout, RexUI sizer, gridSizer, fixWidthSizer, overlapSizer, this.rexUI.add.sizer, layout(), proportion, expand, RexUI nested layout."
---

# RexUI Layout Sizers

Use this skill for RexUI layout composition. It covers the four primary layout factories and the shared `BaseSizer` behavior used by most RexUI widgets.

## Use This First

Pick the layout factory before writing component config:

| Need | Use |
|---|---|
| A horizontal or vertical row/column | `sizer` |
| Known rows and columns | `gridSizer` |
| Children that wrap by width | `fixWidthSizer` |
| Children stacked in the same rectangle | `overlapSizer` |

Default to `sizer` unless the user clearly needs a grid, wrapping flow, or overlay.

## Required Setup

This skill assumes RexUI is already available as `this.rexUI`. If not, use `rexui-setup-and-factory` first.

For npm-installed projects, the setup import is:

```js
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';
```

## References

Read these only when needed:

- `references/sizer-config.md`: config fields, add config, shared BaseSizer methods.
- `references/layout-recipes.md`: reduced recipes for the four primary layout factories.
- `references/layout-gotchas.md`: common mistakes and debugging checks.

## Core Rules

- Call `.layout()` after adding children or changing layout-relevant config.
- Children are Phaser game objects or RexUI game objects, not plain strings.
- Use `space` on the container for outer/item spacing.
- Use child `padding` for spacing around one child.
- Use child `proportion` to distribute remaining space in `sizer`.
- Use child `expand` when the child should fill its assigned layout area.
- Give important children `key` values so code can retrieve them with `getElement()`.
- Keep nested layouts explicit: create child sizers first, then add them to parent sizers.

## Source File Map

- `templates/ui/basesizer/BaseSizer.d.ts`: shared layout methods and child map methods.
- `templates/ui/sizer/Sizer.d.ts`: linear layout.
- `templates/ui/gridsizer/GridSizer.d.ts`: fixed grid layout.
- `templates/ui/fixwidthsizer/FixWidthSizer.d.ts`: wrapping flow layout.
- `templates/ui/overlapsizer/OverlapSizer.d.ts`: stacked/overlay layout.
- `templates/ui/<layout>/Factory.js`: exact factory signatures.

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose a component family.
- `rexui-basic-widgets`: labels, buttons, tabs, sliders.
- `rexui-dialogs-and-popups`: dialog layouts built from sizers.
- `rexui-scroll-lists-and-tables`: scrollable panels and grid tables.
