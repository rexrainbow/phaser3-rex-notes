# RexUI Basic Widget Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They assume `UIPlugin` is installed with `mapping: 'rexUI'`.

## Label As Button Visual

Use `label` for most button-like visuals.

```js
const makeButton = (scene, text) => scene.rexUI.add.label({
    width: 120,
    height: 44,
    background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 12, 0x4e79a7),
    text: scene.add.text(0, 0, text, { fontSize: 18 }),
    icon: scene.rexUI.add.roundRectangle(0, 0, 18, 18, 9, 0xffffff),
    space: { left: 12, right: 12, icon: 8 }
});

const button = makeButton(this, 'Start')
    .setPosition(400, 300)
    .layout();
```

Derived from `examples/ui-label/label.js`, reduced for skill reference.

## Linear Buttons

Use `buttons` for a horizontal or vertical group.

```js
const buttons = this.rexUI.add.buttons({
    x: 400,
    y: 300,
    orientation: 'x',
    buttons: [
        makeButton(this, 'A'),
        makeButton(this, 'B'),
        makeButton(this, 'C')
    ],
    space: { item: 8 }
})
    .layout();

buttons.on('button.click', (button, index) => {
    console.log(`clicked ${index}`);
});
```

Derived from `examples/ui-buttons/buttons.js`, reduced for skill reference.

## Checkbox Or Radio Button Group

Use `buttonsType: 'checkboxes'` for multi-select and `buttonsType: 'radio'` for single-select.

```js
const options = ['Music', 'SFX', 'Hints'];

const buttons = this.rexUI.add.buttons({
    x: 400,
    y: 300,
    orientation: 'y',
    buttonsType: 'checkboxes',
    buttons: options.map((name) => this.rexUI.add.label({
        name,
        width: 160,
        height: 40,
        icon: this.add.circle(0, 0, 10).setStrokeStyle(1, 0xffffff),
        text: this.add.text(0, 0, name),
        space: { left: 10, right: 10, icon: 10 }
    })),
    setValueCallback(button, value) {
        button.getElement('icon').setFillStyle(value ? 0xffffff : undefined);
    }
}).layout();

buttons.on('button.click', () => {
    console.log(buttons.getAllButtonsState());
});
```

Derived from `examples/ui-buttons/checkboxes.js`, reduced for skill reference.

## Tabs With Panel

Use `tabs` when side/top/bottom buttons control a central panel.

```js
const makeTab = (scene, text) => scene.rexUI.add.label({
    width: 90,
    height: 36,
    background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0x555555),
    text: scene.add.text(0, 0, text),
    space: { left: 10, right: 10 }
});

const panel = this.rexUI.add.roundRectangle(0, 0, 360, 220, 16, 0x222222);

const tabs = this.rexUI.add.tabs({
    x: 400,
    y: 300,
    panel,
    topButtons: [
        makeTab(this, 'Stats'),
        makeTab(this, 'Items'),
        makeTab(this, 'Map')
    ],
    space: {
        left: 12,
        right: 12,
        top: 12,
        bottom: 12,
        topButton: 8
    }
}).layout();

tabs.on('button.click', (button, groupName, index) => {
    console.log(`${groupName}:${index}`);
});
```

Derived from `examples/ui-tabs/tabs.js`, reduced for skill reference.

## Slider

Use `slider` for a linear normalized value.

```js
const valueText = this.add.text(20, 20, '');

const slider = this.rexUI.add.slider({
    x: 400,
    y: 300,
    width: 260,
    height: 24,
    orientation: 'x',
    track: this.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0x222222),
    indicator: this.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0x4e79a7),
    thumb: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0xffffff),
    input: 'drag',
    value: 0.5,
    valuechangeCallback(value) {
        valueText.setText(value.toFixed(2));
    }
}).layout();
```

Derived from `examples/ui-slider/slider.js`, reduced for skill reference.

## Knob

Use `knob` for compact circular numeric input.

```js
const knob = this.rexUI.add.knob({
    x: 400,
    y: 300,
    width: 160,
    height: 160,
    background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0x222222),
    trackColor: 0x333333,
    barColor: 0x4e79a7,
    input: 'pan',
    value: 0.5,
    text: this.add.text(0, 0, ''),
    textFormatCallback(value) {
        return `${Math.round(value * 100)}%`;
    }
}).layout();

knob.on('valuechange', (value) => {
    console.log(value);
});
```

Derived from `examples/ui-knob/knob.js`, reduced for skill reference.
