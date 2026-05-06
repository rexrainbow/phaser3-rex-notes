# RexUI Basic Widget Events

Use this for common event names and state patterns.

## Button Group Events

`buttons`, `gridButtons`, `fixWidthButtons`, and `tabs` use button-group behavior.

Common events:

```js
buttons.on('button.click', (button, index, pointer, event) => {});
buttons.on('button.over', (button, index, pointer, event) => {});
buttons.on('button.out', (button, index, pointer, event) => {});
buttons.on('button.down', (button, index, pointer, event) => {});
buttons.on('button.up', (button, index, pointer, event) => {});
buttons.on('button.statechange', (button, index, value, previousValue) => {});
```

For `tabs`, `button.click` includes the group name:

```js
tabs.on('button.click', (button, groupName, index, pointer, event) => {});
```

## Button Selection Modes

Use checkboxes mode for multi-select:

```js
const buttons = this.rexUI.add.buttons({
    buttons: [a, b, c],
    buttonsType: 'checkboxes',
    setValueCallback(button, value) {
        button.getElement('icon').setFillStyle(value ? 0xffffff : undefined);
    }
}).layout();
```

Use radio mode for single-select:

```js
const buttons = this.rexUI.add.buttons({
    buttons: [a, b, c],
    buttonsType: 'radio'
}).layout();
```

Useful methods:

- `setButtonEnable(indexOrButtonOrBoolean, enable?)`
- `toggleButtonEnable(indexOrButton?)`
- `getButtonEnable(indexOrButton)`
- `getButton(indexOrNameOrButton)`
- `getButtons()`
- `emitButtonClick(indexOrButton)`
- `addButton(gameObject)`
- `removeButton(gameObject, destroyChild?)`
- `clearButtons(destroyChild?)`
- `showButton(indexOrButton)`
- `hideButton(indexOrButton)`
- `setSelectedButtonName(name)`
- `getSelectedButtonName()`

## Value Control Events

`slider`, `knob`, and `numberBar` can use callbacks in config or events after creation.

Config callback:

```js
const slider = this.rexUI.add.slider({
    valuechangeCallback(newValue, oldValue, slider) {
        // update text, setting, or game state
    }
}).layout();
```

Event:

```js
slider.on('valuechange', (newValue, oldValue, slider) => {});
knob.on('valuechange', (newValue, oldValue, knob) => {});
numberBar.on('valuechange', (newValue, oldValue, numberBar) => {});
```

Useful value methods:

- `getValue(min?, max?)`
- `setValue(value?, min?, max?)`
- `addValue(inc?, min?, max?)`
- `easeValueTo(value?, min?, max?)`
- `stopEaseValue()`
- `setEaseValueDuration(duration)`
- `setEaseValueFunction(ease)`

## Gotchas

- Call `.layout()` before relying on widget bounds.
- Button visuals are often `label` objects. Use `button.getElement(...)` only if that child was created/mapped by the label.
- Use `setValueCallback` for persistent selected visuals; do not only change visuals inside `button.click`.
- `buttonsType` and `type` are aliases in button-group config; prefer `buttonsType` to match examples.
