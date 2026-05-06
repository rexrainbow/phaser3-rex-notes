---
name: rexui-components-catalog
description: "Use this skill when choosing RexUI components, browsing the RexUI component catalog, answering which RexUI widget or UI element to use, or routing a RexUI request to the right specialized skill. Triggers on: RexUI components, RexUI catalog, which RexUI widget, RexUI UI elements, choose RexUI component, RexUI factory list."
---

# RexUI Components Catalog

Use this skill as the component selection index for RexUI. It should answer "Which RexUI component should I use?" and then route to the correct specialized RexUI skill for implementation details.

## Use This First

For any RexUI request:

1. Confirm the project has RexUI setup. If not, use `rexui-setup-and-factory`.
2. Identify the user's UI intent: layout, basic control, popup, list/table, text/input, skin/state, or interaction.
3. Read `references/component-catalog.md` to choose the component and related skill.
4. Use the specialized skill for config details and recipes.

## Routing

| User asks for | Route to |
|---|---|
| Plugin install, `this.rexUI`, factory names | `rexui-setup-and-factory` |
| Rows, columns, grids, wrapping, overlays, nested panels | `rexui-layout-sizers` |
| Labels, buttons, tabs, sliders, toggles, settings controls | `rexui-basic-widgets` |
| Dialogs, modals, menus, dropdowns, toasts | `rexui-dialogs-and-popups` |
| Scrollable panels, virtual lists, trees, pages, grid tables | `rexui-scroll-lists-and-tables` |
| Rich text, text boxes, editable input, file/color input | `rexui-text-and-input` |
| Shapes, backgrounds, states, skins, progress, image boxes | `rexui-shapes-and-states` |
| Click/tap/press/drag/swipe/pinch/anchor/fade/effects | `rexui-interactions-and-effects` |

## Reference

Read `references/component-catalog.md` for the complete compact selection table.

Read `references/high-frequency-demos.md` when the user refers to common RexUI demos such as scrollablePanel panel, textbox, yes-no dialog, popup menu, dialog, gridtable, or tabs table.

## Selection Rules

- Default to `sizer` for ordinary row/column layout.
- Use `gridSizer` for known rows and columns.
- Use `fixWidthSizer` for wrapping chip/button/tag flows.
- Use `overlapSizer` for stacked layers in one rectangle.
- Use `label` as the default compound visual unit: background + icon + text + action.
- Use `dialog` for custom popups; use `confirmDialog` only when the intent is confirmation.
- Use `scrollablePanel` for composed scrollable UI; use `gridTable` for many repeated items or virtualized lists.
- Use `states*` objects when the visual object itself needs hover/down/disabled state styles.

## Gotchas

- This skill is an index, not a config reference. Do not invent full configs from it alone.
- Do not trigger on generic UI questions unless the user mentions RexUI, `rexUI`, or Rex plugin usage.
- Some factory names have source/type declaration mismatches. For exact factory signatures, use `rexui-setup-and-factory/references/factory-map.md` and inspect `templates/ui/<component>/Factory.js`.
