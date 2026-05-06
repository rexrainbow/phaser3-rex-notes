---
name: rexui-basic-widgets
description: "Use this skill when building basic RexUI widgets such as labels, buttons, gridButtons, fixWidthButtons, tabs, sliders, checkboxes, toggleSwitch, numberBar, knob, badgeLabel, titleLabel, simpleLabel, or settings panels. Triggers on: RexUI label, RexUI button, RexUI buttons, RexUI tabs, RexUI slider, RexUI checkbox, RexUI toggle, RexUI settings panel, RexUI knob, RexUI numberBar."
---

# RexUI Basic Widgets

Use this skill for common RexUI controls used in HUDs, settings panels, menus, and compact tool surfaces.

## Use This First

Choose the widget family:

| Need | Use |
|---|---|
| Background + icon + text + action | `label` |
| Button list | `buttons` |
| Button grid | `gridButtons` |
| Wrapping buttons | `fixWidthButtons` |
| Tab controls | `tabs` |
| Linear numeric input | `slider` |
| Circular numeric input | `knob` |
| Icon + slider + value text | `numberBar` |
| Binary option | `checkbox` or `toggleSwitch` |

For layout-only work, use `rexui-layout-sizers` first. For popups or modal flows, use `rexui-dialogs-and-popups`.

## Required Setup

This skill assumes RexUI is available as `this.rexUI`. If not, use `rexui-setup-and-factory`.

## References

Read these only when needed:

- `references/widget-catalog.md`: what each widget is for and where its public API lives.
- `references/basic-widget-recipes.md`: reduced recipes for labels, buttons, tabs, sliders, and choice controls.
- `references/events.md`: common button/value events and state handling.

## Core Rules

- Most widgets are RexUI sizers internally; call `.layout()` after creation.
- Build button visuals with `label` unless the user needs a custom game object.
- Use `buttonsType: 'radio'` for single selection and `buttonsType: 'checkboxes'` for multi-selection.
- Use `setValueCallback` to reflect selected state in button visuals.
- Use `valuechangeCallback` or `valuechange` events for `slider`, `knob`, and `numberBar`.
- Use package imports only in full setup examples; local `templates/ui/...` paths are source-map paths.

## Source File Map

- `templates/ui/label/Label.d.ts`
- `templates/ui/buttons/Buttons.d.ts`
- `templates/ui/gridbuttons/GridButtons.d.ts`
- `templates/ui/fixwidthbuttons/FixWidthButtons.d.ts`
- `templates/ui/tabs/Tabs.d.ts`
- `templates/ui/slider/Slider.d.ts`
- `templates/ui/numberbar/NumberBar.d.ts`
- `templates/ui/knob/Knob.d.ts`
- `templates/ui/checkbox/Checkbox.d.ts`
- `templates/ui/toggleswitch/ToggleSwitch.d.ts`
- `templates/ui/utils/buttongroup/Buttons.d.ts`

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose the right component family.
- `rexui-layout-sizers`: layout composition.
- `rexui-dialogs-and-popups`: modal and popup workflows.
- `rexui-shapes-and-states`: state-aware skins and visual primitives.
