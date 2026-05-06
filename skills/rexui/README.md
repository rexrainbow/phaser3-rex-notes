# RexUI Skills Maintenance Guide

This README is a maintainer guide for the repository-local RexUI skill set. It is not itself a Codex skill.

Each subfolder with a `SKILL.md` is an independent skill draft. When RexUI changes, update the smallest relevant skill/reference files and keep `rexui-components-catalog` as the routing index.

## Folder Role

This folder stages Codex skills for:

```text
templates/ui
```

Do not treat this folder as a single skill. For installation or discovery, each child folder should be copied or linked as its own skill folder.

## Skill Set Outline

| Skill | Responsibility |
| --- | --- |
| `rexui-setup-and-factory` | Plugin setup, `UIPlugin`, `mapping: 'rexUI'`, factory registration, package import paths. |
| `rexui-components-catalog` | Component selection index and routing to specialized skills. |
| `rexui-layout-sizers` | `sizer`, `gridSizer`, `fixWidthSizer`, `overlapSizer`, shared layout rules, `.layout()`. |
| `rexui-basic-widgets` | Labels, buttons, tabs, sliders, toggles, checkboxes, knobs, settings controls. |
| `rexui-dialogs-and-popups` | Dialogs, confirm dialogs, modals, menus, dropdowns, toasts. |
| `rexui-scroll-lists-and-tables` | `scrollablePanel`, `gridTable`, scrollbars, trees, folders, pages, tab pages. |
| `rexui-text-and-input` | Rich text, text boxes, editable input, text typing/page helpers, file/color input. |
| `rexui-shapes-and-states` | Shapes, skin objects, state-aware objects, progress components, image boxes. |
| `rexui-interactions-and-effects` | Click/touch/gesture behaviors, drag, anchor, fullscreen, touch blocking, fade/move/flip/shake/skew/perspective effects. |

## Source Of Truth

Prefer these sources when updating skills:

| Source | Use |
| --- | --- |
| `templates/ui/ui-plugin.js` | Check actual imported factories and helper methods. |
| `templates/ui/ui-plugin.d.ts` | Check public factory names and exposed helper method names. |
| `templates/ui/<component>/Factory.js` | Confirm exact `this.rexUI.add.*` factory name and argument shape. |
| `templates/ui/<component>/*.d.ts` | Confirm config fields, events, methods, and child element types. |
| `templates/ui/<component>/*.js` | Read implementation details only when `.d.ts` is insufficient or contradictory. |
| `examples/` | Use only as source material for reduced patterns; never make skills depend on reading examples at usage time. |

For npm-installed project examples, use package paths such as:

```js
import UIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';
```

Local paths such as `templates/ui/label/Label.js` are source-map paths for maintainers.

## When RexUI Adds A New Component

Use this update sequence:

1. Find the component source folder under `templates/ui`.
2. Check whether `templates/ui/ui-plugin.js` imports and registers the component.
3. Check whether `templates/ui/ui-plugin.d.ts` exposes the factory/type.
4. Read `templates/ui/<component>/Factory.js` for exact factory name and arguments.
5. Read `templates/ui/<component>/*.d.ts` for config, events, methods, and child types.
6. Decide which skill family owns the component.
7. Update `rexui-components-catalog/references/component-catalog.md`.
8. Update the owning skill's `SKILL.md` only if its routing, source map, or core rules change.
9. Add or update a focused reference file under the owning skill if config/events/recipes are needed.
10. If examples reveal a common pattern, copy a reduced self-contained recipe into the relevant reference.
11. Add any factory-name or behavior gotchas found while comparing `Factory.js`, `ui-plugin.js`, and `.d.ts`.
12. Validate generated snippets use the right factory/helper boundary.

## Choosing The Owning Skill

Use these boundaries:

| New component kind | Put in |
| --- | --- |
| Setup, import, factory registration, `this.rexUI` access | `rexui-setup-and-factory` |
| New layout container or BaseSizer-like layout behavior | `rexui-layout-sizers` |
| Basic control, compound label, button group, tabs, numeric control | `rexui-basic-widgets` |
| Dialog, confirmation, modal, menu, dropdown, toast, popup flow | `rexui-dialogs-and-popups` |
| Scrolling, virtual list/table, tree, folder, pages, tab pages | `rexui-scroll-lists-and-tables` |
| Rich text, text box, editable input, file input, color input | `rexui-text-and-input` |
| Shape, state-aware visual, image skin, progress, spinner, chart/visual primitive | `rexui-shapes-and-states` |
| Input behavior, gesture, anchor, fullscreen, touch blocking, visual effect, motion helper | `rexui-interactions-and-effects` |

If a component spans categories, put selection/routing in `rexui-components-catalog` and implementation details in the skill that owns the highest-risk behavior.

## Updating Existing Skills

Keep responsibilities split:

- `SKILL.md`: concise trigger-specific rules, routing, source map, and gotchas.
- `references/*-catalog.md`: component choice tables and source links.
- `references/*-config.md`: config fields, event names, method summaries, and exact signatures.
- `references/*-recipes.md`: reduced patterns that Codex can adapt without reading `examples/`.
- `rexui-components-catalog/references/component-catalog.md`: global component index.
- `rexui-components-catalog/references/high-frequency-demos.md`: only high-frequency demo patterns and routing.

Avoid duplicating the same long table or recipe in multiple skills. Link to the owning reference instead.

## Recipe Extraction Rules

When reducing an example:

1. Copy only the smallest complete pattern.
2. Remove demo-only assets, random data, debug text, console logging, and unrelated controls.
3. Remove third-party demo dependencies unless the pattern specifically requires them.
4. Keep required `.layout()` calls.
5. Keep examples centered on `this.rexUI.add.*` and `this.rexUI.*`.
6. Use package import paths only in full setup examples.
7. Preserve provenance in one short sentence when useful.
8. Do not require future Codex runs to read `examples/`.

Good reference note:

```text
Derived from examples/ui-dialog/dialog.js, reduced for skill reference.
```

## Common Gotchas To Preserve

Capture these where relevant:

- Most RexUI layout containers require `.layout()` after composition or mutation.
- Child objects are Phaser/RexUI game objects, not plain strings.
- Some APIs are `this.rexUI.add.*` factories; others are `this.rexUI.*` helpers.
- `fadeIn`, `fadeOutDestroy`, `easeMoveTo`, `easeMoveFrom`, and `requestDrag` are helpers on `this.rexUI`, not factories.
- Opaque backgrounds or covers can hide content if display-list order/depth is wrong.
- Some factory names differ between source and type declarations; verify against `Factory.js`.
- DOM-backed components need Phaser DOM support.
- Scrollable panels, sliders, drags, and gestures can compete for the same pointer.
- Reused `gridTable` cells must reset all item-dependent state in every callback.

## Validation Checklist

Before considering an update complete:

- Every `SKILL.md` frontmatter has only `name` and `description`.
- Descriptions are RexUI-specific and avoid generic triggers such as bare `button`, `label`, or `input`.
- New components appear in `rexui-components-catalog/references/component-catalog.md`.
- Owning skill source maps include new source/type files when needed.
- Factory names and helper names are checked against `Factory.js`, `ui-plugin.js`, and `ui-plugin.d.ts`.
- Generated snippets call `.layout()` when layout bounds are needed.
- Recipes do not depend on reading `examples/` at usage time.
- Examples use npm package paths when showing imports.
- No helper/factory boundary is mixed up, for example `this.rexUI.add.fadeIn(...)`.
- Any known mismatch or typo is documented as a gotcha in the closest reference.
