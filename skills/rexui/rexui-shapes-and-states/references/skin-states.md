# Skin States

Use state-aware visual objects when button/list/menu state should be represented by a skin object instead of ad hoc style mutations.

## State Fields

State-aware objects support normal/default fields plus prefixed state fields:

- `active.*`: selected, checked, or current item.
- `hover.*`: pointer-over state.
- `disable.*`: disabled state.

Examples:

```js
const background = this.rexUI.add.statesRoundRectangle({
  radius: 8,
  color: 0x222222,
  strokeWidth: 0,

  'active.color': 0x4e79a7,
  'hover.strokeColor': 0xffffff,
  'hover.strokeWidth': 2,
  'disable.color': 0x111111,
  'disable.alpha': 0.5
});
```

```js
const icon = this.rexUI.add.statesImage({
  key: 'pause',
  'active.key': 'play',
  scale: 1,
  'hover.scale': 1.25,
  'disable.scale': 0.8
});
```

## State Methods

Every state-aware skin has:

```js
skin.setActiveState(enable);
skin.setHoverState(enable);
skin.setDisableState(enable);
```

Call these from the owning UI events. Do not rely on the skin to manage selection by itself.

## Buttons With State Background

Derived from `examples/ui-statesroundrectangle/buttons.js`, reduced for skill reference.

```js
const bgStyle = {
  radius: 10,
  color: 0x260e04,
  'active.color': 0x4e342e,
  strokeWidth: 0,
  'hover.strokeColor': 0xffffff,
  'hover.strokeWidth': 2
};

const createButton = (scene, text) => scene.rexUI.add.label({
  background: scene.rexUI.add.statesRoundRectangle(bgStyle),
  text: scene.add.text(0, 0, text, { fontSize: 18 }),
  space: { left: 10, right: 10, top: 10, bottom: 10 },
  name: text
});

const buttons = this.rexUI.add.buttons({
  x: 400,
  y: 300,
  width: 220,
  orientation: 'y',
  buttons: ['AAA', 'BBB', 'CCC'].map((text) => createButton(this, text)),
  buttonsType: 'radio',
  space: { item: 8 }
})
  .layout()
  .on('button.statechange', (button, index, value) => {
    button.getElement('background').setActiveState(value);
  })
  .on('button.over', (button) => {
    button.getElement('background').setHoverState(true);
  })
  .on('button.out', (button) => {
    button.getElement('background').setHoverState(false);
  });
```

## Buttons With State Icon

Derived from `examples/ui-statesimage/buttons.js`, reduced for skill reference.

```js
const iconStyle = {
  key: 'pause',
  'active.key': 'play',
  scale: 1,
  'hover.scale': 1.25
};

const createButton = (scene, text) => scene.rexUI.add.label({
  icon: scene.rexUI.add.statesImage(iconStyle),
  text: scene.add.text(0, 0, text, { fontSize: 18 }),
  space: { left: 10, right: 10, top: 10, bottom: 10, icon: 8 },
  name: text
});

this.rexUI.add.buttons({
  x: 400,
  y: 300,
  orientation: 'y',
  buttons: ['AAA', 'BBB', 'CCC'].map((text) => createButton(this, text)),
  buttonsType: 'radio',
  space: { item: 8 }
})
  .layout()
  .on('button.statechange', (button, index, value) => {
    button.getElement('icon').setActiveState(value);
  })
  .on('button.over', (button) => {
    button.getElement('icon').setHoverState(true);
  })
  .on('button.out', (button) => {
    button.getElement('icon').setHoverState(false);
  });
```

## Buttons With State Text

Derived from `examples/ui-statestext/buttons.js`, reduced for skill reference.

```js
const textStyle = {
  fontSize: 24,
  padding: { left: 10, right: 10, top: 10, bottom: 10 },
  backgroundColor: '#260e04',
  'active.backgroundColor': '#7b5e57',
  color: '#ffffff',
  'active.color': '#000000',
  'active.fontStyle': 'bold'
};

const createButton = (scene, text) => scene.rexUI.add.label({
  text: scene.rexUI.add.statesText(textStyle).setText(text),
  space: { left: 10, right: 10, top: 10, bottom: 10 },
  name: text
});
```

## Common State Patterns

- Radio buttons: drive `active` from `button.statechange`.
- Checkbox buttons: drive `active` from each button value.
- Hover-only lists: drive `hover` from `button.over` and `button.out`.
- Disabled items: set both interaction state in the owner and `setDisableState(true)` on the skin.
- Reused grid-table cells: reset all `active`, `hover`, and `disable` state every time the cell container is reused.

## Gotchas

- State-aware skins do not automatically subscribe to parent button events.
- Use `getElement('background')`, `getElement('icon')`, or `getElement('text')` based on where the state-aware object was placed.
- `statesText` changes Phaser text style fields; `statesRoundRectangle` changes shape fields; `statesImage` changes texture/frame/scale fields.
- Keep the model state outside the skin. The skin should be a view of the current state.
