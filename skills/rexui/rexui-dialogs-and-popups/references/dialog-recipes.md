# RexUI Dialog And Popup Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They assume `UIPlugin` is installed with `mapping: 'rexUI'`.

## Custom Dialog

Use `dialog` when you need custom title, content, choices, actions, and toolbar sections.

```js
const makeLabel = (scene, text) => scene.rexUI.add.label({
    width: 48,
    height: 40,
    background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 12, 0x4e79a7),
    text: scene.add.text(0, 0, text),
    space: { left: 10, right: 10, top: 8, bottom: 8 }
});

const dialog = this.rexUI.add.dialog({
    x: 400,
    y: 300,
    width: 480,
    background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0x222222),
    title: makeLabel(this, 'Title'),
    content: makeLabel(this, 'Content'),
    choices: [makeLabel(this, 'Choice A'), makeLabel(this, 'Choice B')],
    actions: [makeLabel(this, 'OK'), makeLabel(this, 'Cancel')],
    space: {
        left: 18,
        right: 18,
        top: 18,
        bottom: 18,
        title: 14,
        content: 14,
        choices: 14,
        choice: 8,
        action: 8
    },
    align: { actions: 'right' },
    click: { mode: 'release' }
})
    .setDraggable('background')
    .layout()
    .popUp(250);

dialog.on('button.click', (button, groupName, index) => {
    console.log(`${groupName}:${index}`);
});
```

Derived from `examples/ui-dialog/dialog.js`, reduced for skill reference.

## Promise Confirm Dialog

Use `confirmDialog` for common yes/no or ok/cancel flows.

```js
const style = {
    width: 320,
    space: { left: 20, right: 20, top: 20, bottom: 20, title: 16, content: 24, action: 12 },
    background: { color: 0x222222, strokeColor: 0x888888, radius: 16 },
    title: {
        text: { fontSize: 24 },
        background: { color: 0x333333 },
        space: { left: 8, right: 8, top: 6, bottom: 6 }
    },
    content: {
        text: { fontSize: 18 },
        space: { left: 8, right: 8, top: 6, bottom: 6 }
    },
    buttonMode: 2,
    button: {
        background: { color: 0x333333, strokeColor: 0x888888, radius: 8 },
        space: { left: 12, right: 12, top: 8, bottom: 8 }
    },
    align: { actions: 'right' }
};

this.rexUI.add.confirmDialog(style)
    .setPosition(400, 300)
    .setDraggable('title')
    .resetDisplayContent({
        title: 'Confirm',
        content: 'Apply this change?',
        buttonA: 'Yes',
        buttonB: 'No'
    })
    .layout()
    .modalPromise()
    .then((data) => {
        if (data.index === 0) {
            console.log('confirmed');
        }
    });
```

Derived from `examples/ui-confirmdialog/yes-no.js`, reduced for skill reference.

## DropDownList

Use `dropDownList` when a label should show a selected value and open a popup option panel.

```js
const options = [
    { text: 'Easy', value: 'easy' },
    { text: 'Normal', value: 'normal' },
    { text: 'Hard', value: 'hard' }
];

const list = this.rexUI.add.dropDownList({
    x: 400,
    y: 300,
    background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0x222222),
    icon: this.rexUI.add.roundRectangle(0, 0, 18, 18, 9, 0x4e79a7),
    text: this.add.text(0, 0, '-- Select --').setFixedSize(140, 0),
    space: { left: 10, right: 10, top: 8, bottom: 8, icon: 8 },
    options,
    list: {
        createBackgroundCallback(scene) {
            return scene.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0x333333);
        },
        createButtonCallback(scene, option) {
            const button = scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),
                text: scene.add.text(0, 0, option.text),
                space: { left: 10, right: 10, top: 8, bottom: 8 }
            });
            button.value = option.value;
            return button;
        },
        onButtonClick(button) {
            this.text = button.text;
            this.value = button.value;
        }
    }
}).layout();
```

Derived from `examples/ui-dropdownlist/dropdown-list.js`, reduced for skill reference.

## Toast

Use `toast` for short notifications.

```js
const toast = this.rexUI.add.toast({
    x: 400,
    y: 300,
    background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0x222222),
    text: this.add.text(0, 0, '', { fontSize: 22 }),
    space: { left: 18, right: 18, top: 12, bottom: 12 },
    duration: { in: 200, hold: 1200, out: 200 },
    transitIn: 'popUp',
    transitOut: 'scaleDown'
});

toast
    .showMessage('Saved')
    .showMessage('Synced');
```

Derived from `examples/ui-toast/toast.js`, reduced for skill reference.

## Existing Panel As Modal

Use `modal()` when you already have a panel and only need modal cover/input behavior.

```js
const panel = this.rexUI.add.sizer({
    x: 400,
    y: 300,
    width: 320,
    orientation: 'y',
    space: { left: 16, right: 16, top: 16, bottom: 16, item: 10 }
})
    .addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 12, 0x222222))
    .add(this.add.text(0, 0, 'Modal panel'), { expand: true })
    .layout();

panel.modal({
    cover: { color: 0x000000, alpha: 0.5 }
});
```

Derived from `examples/ui-modal/modal-overlap-panel.js`, reduced for skill reference.
