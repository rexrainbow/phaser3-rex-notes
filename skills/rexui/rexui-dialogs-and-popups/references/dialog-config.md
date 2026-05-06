# RexUI Dialog And Popup Config

Use this as a compact public API guide. Prefer `.d.ts` files for exact signatures.

## Component Chooser

| Need | Factory/helper | Source | Notes |
|---|---|---|---|
| Custom dialog composition | `dialog` | `templates/ui/dialog/Dialog.d.ts` | Most flexible dialog. |
| Preset confirmation dialog | `confirmDialog` | `templates/ui/confirmdialog/ConfirmDialog.d.ts` | Has content reset helpers and confirm/cancel indexes. |
| Confirm behavior button | `confirmActionButton` | `templates/ui/confirmactionbutton` | Use when a button should ask before executing. |
| Text/name prompt | `nameInputDialog` | `templates/ui/nameinputdialog` | Prompt-style dialog. |
| Modal behavior | `modal`, `modalPromise`, `modalClose` | `templates/ui/modal/Modal.d.ts` | Methods on UIPlugin/BaseSizer objects. |
| Hierarchical menu | `menu` | `templates/ui/menu/Menu.d.ts` | Built on buttons. |
| Popup option selector | `dropDownList` | `templates/ui/dropdownlist/DropDownList.d.ts` | Label-based selector with popup list. |
| Simple popup option selector | `simpleDropDownList` | `templates/ui/simpledropdownlist` | Creator-driven simplified dropdown. |
| One notification widget | `toast` | `templates/ui/toast/Toast.d.ts` | Toast label with internal queue. |
| Visible queued notifications | `toastQueue` | `templates/ui/toastqueue/ToastQueue.d.ts` | Stacked/queued message labels. |

## Dialog

`dialog` is a `Sizer` with named sections.

Important config:

- `background`: dialog background object.
- `title`: title game object.
- `toolbar`: right/top toolbar buttons.
- `leftToolbar`: left toolbar buttons.
- `content`: main content game object.
- `description`: secondary content game object.
- `choices`: choice buttons.
- `choicesType`: choice layout type.
- `choicesWidth`, `choicesHeight`.
- `choicesBackground`.
- `actions`: action buttons.
- `actionsBackground`.
- `space`: section spacing.
- `proportion`: section proportions.
- `expand`: section expand flags.
- `align`: section alignment.
- `click`: button click behavior.

Common methods:

- `emitChoiceClick(indexOrButton)`
- `emitActionClick(indexOrButton)`
- `emitToolbarClick(indexOrButton)`
- `emitLeftToolbarClick(indexOrButton)`
- `setChoiceEnable(indexOrButton, enable?)`
- `setActionEnable(indexOrButton, enable?)`
- `setToolbarEnable(indexOrButton, enable?)`
- `toggleChoiceEnable(indexOrButton)`
- `toggleActionEnable(indexOrButton)`
- `getChoiceEnable(indexOrButton)`
- `getActionEnable(indexOrButton)`

Common events:

```js
dialog.on('button.click', (button, groupName, index, pointer, event) => {});
dialog.on('button.over', (button, groupName, index, pointer, event) => {});
dialog.on('button.out', (button, groupName, index, pointer, event) => {});
```

`groupName` is typically one of the dialog button groups, such as choices, actions, toolbar, or leftToolbar.

## ConfirmDialog

Use `confirmDialog` for yes/no, ok/cancel, and choice confirmation flows.

Important config:

- `background`: style config, not necessarily a game object.
- `title`: SimpleLabel config.
- `content`: SimpleLabel or text area config.
- `buttonMode`: preset action button mode.
- `button`, `buttonA`, `buttonB`: shared/individual button styles.
- `choicesType`, `choice`, `choicesWidth`, `choicesHeight`.
- `modal`: dialog modal behavior config.
- `space`, `proportion`, `expand`, `align`.

Important methods:

- `resetDisplayContent({ title, content, buttonA, buttonB, choices })`
- `setConfirmButtonIndex(index)`
- `setCancelButtonIndex(index)`
- `modalPromise()`

Typical `modalPromise()` data:

- `index`: clicked button index.
- `text`: clicked button text.
- `button`: clicked button game object.
- `dialog`: dialog instance.
- `value`: optional custom value.

## DropDownList

`dropDownList` extends `label` and owns a popup list panel.

Important config:

- `background`, `icon`, `text`, `space`: label display.
- `options`: option data array.
- `value`: current selected value.
- `setValueCallback(dropDownList, value, previousValue)`.
- `list.createBackgroundCallback(scene)`.
- `list.createButtonCallback(scene, option, index, options)`.
- `list.onButtonClick(button, index, pointer, event)`.
- `list.onButtonOver`, `list.onButtonOut`.
- `list.wrap`: use wrapped list layout.
- `list.maxHeight`, `list.width`, `list.height`.
- `list.expandDirection`: `'down'` or `'up'`.
- `list.alignParent`: `'text'`, `'icon'`, or `'label'`.
- `list.draggable`.

Important methods:

- `setOptions(options)`
- `openListPanel()`
- `closeListPanel()`
- `toggleListPanel()`
- `setValue(value)`
- `setCreateButtonCallback(callback)`
- `setButtonClickCallback(callback)`

## Menu

Use `menu` for hierarchical option menus.

Important config:

- `items`: source item list.
- `popUp`: show as popup.
- `createBackgroundCallback(items)`.
- `createButtonCallback(item, index, items)`.
- `easeIn`, `easeOut`.
- `expandEvent`: `'button.click'` or `'button.over'`.
- `subMenuSide`: `'right'`, `'down'`, `'left'`, `'up'`.

Important methods:

- `collapse()`
- `collapseSubMenu()`

## Toast

Use `toast` for short notification messages.

Important config:

- Inherits `label` config: `background`, `text`, `space`.
- `duration.in`, `duration.hold`, `duration.out`.
- `transitIn`: `'popUp'`, `'fadeIn'`, or callback.
- `transitOut`: `'scaleDown'`, `'fadeOut'`, or callback.

Important methods:

- `showMessage(messageOrCallback)`
- `removeAllMessages()`
- `setTransitInTime(time)`
- `setDisplayTime(time)`
- `setTransitOutTime(time)`

## ToastQueue

Use `toastQueue` when multiple message labels should be visible/queued in a stack.

Important config:

- `createMessageLabelCallback(scene, message, toastQueue)`.
- `queueDirection`: `'bottom-to-top'`, `'top-to-bottom'`, `'right-to-left'`, `'left-to-right'`.
- `duration.in`, `duration.hold`, `duration.out`.
- `transitIn`, `transitOut`.

Important methods:

- `showMessage(message)`
- `removeMessage(messageLabel)`
- `removeAllMessages()`
