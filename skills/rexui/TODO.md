# RexUI Skill Writing Plan

This plan is for Codex agents writing skills for:

```text
C:\mywork\phaser3\phaser3-rex-notes\templates\ui
```

## Core Decision

Do not make RexUI skills depend on `examples/` at usage time.

Skills may depend on the RexUI source and type definitions under `templates/ui`, but any example code needed by a skill should be copied, minimized, and stored inside that skill as bundled reference material.

Use `examples/` only as source material while authoring the skills. After extracting a useful pattern, copy the reduced version into the relevant skill, then rewrite it so it does not import from or refer to `examples/`.

## Why This Differs From Phaser Core Skills

Phaser core skills can mostly follow engine subsystems such as scenes, loader, input, physics, cameras, sprites, tilemaps, tweens, and animations.

RexUI is a component library. Its useful skill boundaries should follow UI construction tasks:

- Build a plugin setup correctly.
- Choose the right UI component.
- Compose nested layout with sizers.
- Configure large object literals safely.
- Wire modal, dialog, list, input, and button events.
- Apply skin/state objects consistently.

Avoid one skill per `templates/ui/*` folder. There are too many components, and many are variants of the same UI pattern.

## Authoritative Sources

Prefer these sources when writing skill content:

- `templates/ui/ui-plugin.js`: factory registration and available component families.
- `templates/ui/ui-plugin.d.ts`: public factory names and public API shape.
- `templates/ui/<component>/*.d.ts`: config object, events, methods, and child types.
- `templates/ui/<component>/Factory.js`: exact `this.rexUI.add.*` factory signature.
- `templates/ui/<component>/*.js`: behavior details only when `.d.ts` is insufficient.

Use `examples/` only to discover complete usage patterns. Do not require future Codex runs to read `examples/`.

## Copied Example Policy

When an example is useful:

1. Copy only the smallest complete pattern needed for the skill.
2. Remove demo-only assets, random text, unrelated controls, and visual noise.
3. Keep the example self-contained around `this.rexUI.add.*`.
4. Include the required `layout()` call when the component depends on layout.
5. Keep provenance in a short comment or reference note, for example:

```text
Derived from examples/ui-dialog/dialog.js, reduced for skill reference.
```

6. Store copied examples as reference files, not in `SKILL.md`, unless the snippet is very small.

Recommended locations:

```text
rexui-layout-sizers/references/sizer-recipes.md
rexui-dialogs-and-popups/references/dialog-recipes.md
rexui-scroll-lists-and-tables/references/list-recipes.md
rexui-text-and-input/references/input-recipes.md
```

If an example is a reusable runnable starter, place it under `assets/` instead of `references/`.

## Proposed Skill Set

### 1. rexui-setup-and-factory

Purpose:

- Teach how RexUI is installed into a Phaser scene.
- Explain `UIPlugin`, scene plugin registration, `mapping: 'rexUI'`, and `this.rexUI.add.*`.
- Explain how factories are registered through `ObjectFactory.register`.

Triggers:

- `RexUI setup`
- `rexUI plugin`
- `this.rexUI`
- `UIPlugin`
- `mapping: 'rexUI'`

References to create:

- `references/factory-map.md`: table of factory name, component folder, class, and common use.
- `references/plugin-setup.md`: minimal plugin registration patterns.

Example extraction:

- Copy one minimal plugin registration snippet from an existing RexUI example.
- Do not keep the full example scene unless needed.

### 2. rexui-layout-sizers

Purpose:

- Cover the layout model shared by most RexUI widgets.
- Teach `sizer`, `gridSizer`, `fixWidthSizer`, `overlapSizer`, `space`, `padding`, `align`, `expand`, `proportion`, child keys, and `layout()`.
- Emphasize nested composition.

Triggers:

- `RexUI layout`
- `sizer`
- `gridSizer`
- `fixWidthSizer`
- `overlapSizer`
- `layout()`
- `space`, `padding`, `expand`, `proportion`

References to create:

- `references/sizer-config.md`: common config fields and child add config.
- `references/layout-recipes.md`: copied minimal recipes.
- `references/layout-gotchas.md`: when to call `layout()`, child size issues, nested sizers, hidden children.

Example extraction:

- Reduce examples from `examples/ui-sizer`.
- Include recipes for horizontal row, vertical panel, grid, overlap, fixed-width wrapping, and nested layout.

### 3. rexui-basic-widgets

Purpose:

- Cover common controls used in settings panels and HUDs.
- Include `label`, `simpleLabel`, `titleLabel`, `buttons`, `gridButtons`, `tabs`, `slider`, `checkbox`, `toggleSwitch`, `numberBar`, `badgeLabel`, `knob`.

Triggers:

- `RexUI label`
- `RexUI button`
- `RexUI tabs`
- `RexUI slider`
- `RexUI checkbox`
- `RexUI settings panel`

References to create:

- `references/widget-catalog.md`: which widget to use for each UI need.
- `references/basic-widget-recipes.md`: copied minimal patterns.
- `references/events.md`: common button/select/change events.

Example extraction:

- Reduce examples from `examples/ui-label`, `examples/ui-buttons`, `examples/ui-slider`, `examples/ui-tabs`, and similar widget folders.

### 4. rexui-dialogs-and-popups

Purpose:

- Cover dialog-style interaction flows.
- Include `dialog`, `confirmDialog`, `confirmActionButton`, `nameInputDialog`, `modal`, `menu`, `dropDownList`, `simpleDropDownList`, `toast`, and `toastQueue`.

Triggers:

- `RexUI dialog`
- `confirmDialog`
- `modal`
- `popup`
- `dropdown`
- `toast`
- `menu`

References to create:

- `references/dialog-config.md`: content slots, toolbar, choices, actions, spacing, align, expand.
- `references/modal-patterns.md`: modal open/close, promises, close callbacks.
- `references/dialog-recipes.md`: copied minimal recipes.

Example extraction:

- Reduce examples from `examples/ui-dialog`, `examples/ui-confirmdialog`, `examples/ui-modal`, `examples/ui-dropdownlist`, `examples/ui-toast`.

### 5. rexui-scroll-lists-and-tables

Purpose:

- Cover UI that presents many items.
- Include `gridTable`, `scrollablePanel`, `scrollbar`, `textarea`, `trees`, `folder`, `pages`, and `tabPages`.

Triggers:

- `RexUI list`
- `gridTable`
- `scrollablePanel`
- `scrollbar`
- `tree`
- `pages`
- `inventory UI`

References to create:

- `references/scrollablepanel-config.md`
- `references/gridtable-config.md`
- `references/list-recipes.md`

Example extraction:

- Reduce examples from `examples/ui-gridtable`, `examples/ui-scrollablepanel`, `examples/ui-trees`, `examples/ui-pages`, `examples/ui-tabpages`.

### 6. rexui-text-and-input

Purpose:

- Cover text rendering, rich text, typing effects, editable fields, and input forms.
- Include `BBCodeText`, `tagText`, `dynamicText`, `textBox`, `simpleTextBox`, `textArea`, `textAreaInput`, `inputText`, `hiddenEdit`, `canvasInput`, `textTyping`, `textPage`, `textPlayer`, `nameInputDialog`, `fileChooser`, `fileDropZone`, `fileSelectorButton`, `colorInput`, `colorPicker`.

Triggers:

- `RexUI text`
- `BBCodeText`
- `tagText`
- `textBox`
- `textArea`
- `inputText`
- `canvasInput`
- `textTyping`
- `colorPicker`
- `fileChooser`

References to create:

- `references/text-catalog.md`
- `references/input-recipes.md`
- `references/rich-text-recipes.md`

Example extraction:

- Reduce examples from `examples/ui-textbox`, `examples/ui-textarea`, `examples/ui-inputtext`, `examples/ui-canvasinput`, `examples/ui-colorinput`, `examples/ui-colorpicker`.

### 7. rexui-shapes-and-states

Purpose:

- Cover visual building blocks and state-aware skins.
- Include `roundRectangle`, `ninePatch`, `ninePatch2`, `statesImage`, `statesText`, `statesBitmapText`, `statesRoundRectangle`, `statesNinePatch`, `statesNineSlice`, `statesBarRectangle`, progress components, `customShapes`, and `imageBox`.

Triggers:

- `RexUI skin`
- `RexUI state`
- `statesImage`
- `roundRectangle`
- `ninePatch`
- `progress`
- `imageBox`

References to create:

- `references/skin-states.md`
- `references/shape-catalog.md`
- `references/progress-recipes.md`

Example extraction:

- Reduce examples from `examples/ui-statesimage`, `examples/ui-statestext`, `examples/ui-roundrectangle`, `examples/ui-ninepatch`, `examples/ui-circularprogress`, `examples/ui-lineprogress`.

### 8. rexui-interactions-and-effects

Purpose:

- Cover behaviors that can be attached to game objects or UI elements.
- Include `click`, `clickOutside`, `tap`, `press`, `inTouching`, `drag`, `swipe`, `pan`, `pinch`, `rotate`, `flip`, `shake`, `fade`, `easemove`, `anchor`, `touchEventStop`, `fullscreenButton`.

Triggers:

- `RexUI click`
- `tap`
- `press`
- `drag`
- `swipe`
- `pinch`
- `anchor`
- `fade`
- `shake`
- `touchEventStop`

References to create:

- `references/gesture-behaviors.md`
- `references/effect-recipes.md`
- `references/anchor-fullscreen.md`

Example extraction:

- Reduce examples from `examples/ui-anchor`, `examples/ui-flip`, `examples/ui-scale`, `examples/ui-skew`, and behavior-specific examples.

### 9. rexui-components-catalog

Purpose:

- Provide a compact component selection index.
- Answer "Which RexUI component should I use?"
- Route Codex to the correct specialized RexUI skill.

Triggers:

- `RexUI components`
- `RexUI catalog`
- `which RexUI widget`
- `RexUI UI elements`

References to create:

- `references/component-catalog.md`: component name, factory name, category, source folder, common use, related skill.

Example extraction:

- No large examples. This skill should stay mostly tabular.

## Skill Folder Layout

For global installation, use top-level skill folders:

```text
$CODEX_HOME/skills/rexui-setup-and-factory/SKILL.md
$CODEX_HOME/skills/rexui-layout-sizers/SKILL.md
$CODEX_HOME/skills/rexui-basic-widgets/SKILL.md
...
```

For repository-local drafting, this folder may be used as a staging area:

```text
skills/rexui/rexui-setup-and-factory/
skills/rexui/rexui-layout-sizers/
...
```

Before installing, copy or link each individual skill folder so Codex can discover it as its own skill.

## SKILL.md Writing Rules

Each `SKILL.md` should:

- Keep frontmatter description specific to RexUI to avoid triggering on ordinary HTML, React, or Phaser UI requests.
- Include `RexUI`, `rexUI`, and relevant factory names in the description.
- Keep the body concise.
- Put large config tables and example recipes under `references/`.
- Link directly to every reference file that Codex may need.
- Prefer `.d.ts` public API summaries over implementation details.
- Include a "Use This First" section when the skill has a dominant pattern.
- Include gotchas that prevent invalid generated code.

Avoid:

- Long copied source files.
- Complete demo scenes when a 30-line recipe is enough.
- References that require reading `examples/`.
- Deeply nested references.
- Generic trigger words such as `button`, `label`, `input`, or `dialog` without `RexUI`.

## Common RexUI Gotchas To Capture

Every relevant skill should mention these when applicable:

- Most layout containers require calling `.layout()` after composition.
- Many child objects are supplied as Phaser game objects created separately, not plain strings.
- `this.rexUI.add.*` is available only when the scene plugin is installed and mapped.
- Spacing, alignment, expansion, and proportion are usually config-object driven.
- Some widgets are composed from sizers and inherit BaseSizer behavior.
- Some visual state objects are separate classes, not generic Phaser objects.
- Do not assume DOM input behavior unless using DOM-backed input components.

## Build Order

1. [x] Write `rexui-setup-and-factory`.
2. [x] Write `rexui-components-catalog`.
3. [x] Write `rexui-layout-sizers`.
4. [x] Write `rexui-basic-widgets`.
5. [x] Write `rexui-dialogs-and-popups`.
6. [x] Write `rexui-scroll-lists-and-tables`.
7. [x] Write `rexui-text-and-input`.
8. [x] Write `rexui-shapes-and-states`.
9. [x] Write `rexui-interactions-and-effects`.
10. [x] Add `rexui-components-catalog/references/high-frequency-demos.md` after all topic skills are complete.

Reason:

- Setup and catalog establish shared vocabulary.
- Layout is the foundation for most other RexUI widgets.
- Dialogs, lists, text/input, skins, and behaviors can then reuse the same layout concepts.
- High-frequency demo guidance should be added last so it can point to the final skill/reference locations.

## Validation Checklist

For each skill:

- Frontmatter has only `name` and `description`.
- Description includes clear RexUI-specific triggers.
- `SKILL.md` is short enough to load cheaply.
- Detailed config and recipes are moved to `references/`.
- Copied examples are reduced and self-contained.
- No reference requires `examples/` at usage time.
- Source file map points to `templates/ui` and `.d.ts` files.
- At least one realistic user prompt can be answered from the skill plus its references.
- Generated code uses `this.rexUI.add.*` correctly.
- Generated layout code calls `.layout()` where required.
