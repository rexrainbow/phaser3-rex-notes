---
name: rexui-dialogs-and-popups
description: "Use this skill when building RexUI dialogs, confirmDialog, confirmActionButton, nameInputDialog, modal overlays, popup panels, menus, dropDownList, simpleDropDownList, toast, or toastQueue flows. Triggers on: RexUI dialog, RexUI confirmDialog, RexUI modal, RexUI popup, RexUI dropdown, RexUI dropDownList, RexUI menu, RexUI toast, modalPromise."
---

# RexUI Dialogs And Popups

Use this skill for RexUI interaction flows that open, close, select, confirm, or notify.

## Use This First

Choose the popup component:

| Need | Use |
|---|---|
| Fully custom title/content/choices/actions layout | `dialog` |
| Standard yes/no, ok/cancel, or choice confirmation | `confirmDialog` |
| Confirmation behavior attached to a button | `confirmActionButton` |
| Prompt for a name/text value | `nameInputDialog` |
| Make an existing RexUI object modal | `modal`, `modalPromise`, `modalClose` |
| Hierarchical or popup menu | `menu` |
| Select one option from a popup list | `dropDownList` or `simpleDropDownList` |
| Short notification | `toast` |
| Multiple queued notifications | `toastQueue` |

For layout details inside dialog content, use `rexui-layout-sizers`. For button visuals and selection state, use `rexui-basic-widgets`.

## Required Setup

This skill assumes RexUI is available as `this.rexUI`. If not, use `rexui-setup-and-factory`.

## References

Read these only when needed:

- `references/dialog-config.md`: component chooser and key config fields.
- `references/modal-patterns.md`: modal lifecycle, promises, close behavior.
- `references/dialog-recipes.md`: reduced recipes for dialog, confirm, dropdown, toast, and modal.

## Core Rules

- Call `.layout()` before `.modal()`, `.modalPromise()`, `.popUp()`, or relying on bounds.
- Use `confirmDialog` for common confirmation flows instead of hand-building `dialog`.
- Use `dialog` when the layout has custom toolbars, descriptions, choices, or action sections.
- Use `modalPromise()` when caller needs a result object.
- Use `dropDownList` when the selected value should live in the label itself.
- Use `toast` for one toast instance with internal message queue; use `toastQueue` for visible stacked messages.
- Do not use these skills for generic browser dialogs or DOM popups unless RexUI is explicitly involved.

## Source File Map

- `templates/ui/dialog/Dialog.d.ts`
- `templates/ui/confirmdialog/ConfirmDialog.d.ts`
- `templates/ui/confirmactionbutton/ConfirmActionButton.d.ts`
- `templates/ui/nameinputdialog/NameInputDialog.d.ts`
- `templates/ui/modal/Modal.d.ts`
- `templates/ui/menu/Menu.d.ts`
- `templates/ui/dropdownlist/DropDownList.d.ts`
- `templates/ui/simpledropdownlist/SimpleDropDownList.d.ts`
- `templates/ui/toast/Toast.d.ts`
- `templates/ui/toastqueue/ToastQueue.d.ts`

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose the correct component family.
- `rexui-layout-sizers`: internal dialog layout.
- `rexui-basic-widgets`: labels, buttons, and button state.
- `rexui-text-and-input`: text input and textarea content.
