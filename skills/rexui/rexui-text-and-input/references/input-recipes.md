# Input Recipes

These recipes cover editable input components. DOM-backed inputs require Phaser DOM support:

```js
const config = {
  dom: { createContainer: true }
};
```

## DOM InputText In RexUI Layout

Derived from `examples/ui-inputtext/fix-width-sizer.js`, reduced for skill reference.

```js
const nameInput = this.rexUI.add.inputText({
  width: 220,
  height: 40,
  type: 'text',
  text: 'Player',
  style: {
    fontSize: '18px',
    color: '#ffffff',
    backgroundColor: '#222222',
    border: '1px solid #666666',
    padding: '6px'
  }
});

const form = this.rexUI.add.sizer({
  x: 400,
  y: 300,
  width: 320,
  orientation: 'y',
  space: { left: 12, right: 12, top: 12, bottom: 12, item: 8 }
})
  .addBackground(this.rexUI.add.roundRectangle({ radius: 8, color: 0x111111 }))
  .add(this.add.text(0, 0, 'Nickname'), { expand: true })
  .add(nameInput, { expand: true })
  .layout();
```

Use DOM `inputText` when native browser selection, keyboard, IME, mobile keyboard, or password fields matter more than canvas-only rendering.

## CanvasInput Field

Derived from `examples/ui-canvasinput/login.js`, reduced for skill reference.

```js
const username = this.rexUI.add.canvasInput({
  height: 36,
  style: {
    fontSize: 20,
    backgroundBottomY: 5,
    backgroundHeight: 20,
    'cursor.color': 'black',
    'cursor.backgroundColor': 'white'
  },
  wrap: { vAlign: 'center' },
  text: 'Player'
});

const field = this.rexUI.add.label({
  orientation: 'x',
  background: this.rexUI.add.roundRectangle({ radius: 8 }).setStrokeStyle(2, 0x888888),
  text: username,
  expandTextWidth: true,
  space: { top: 5, bottom: 5, left: 8, right: 8 }
}).layout();

username.on('textchange', (text) => {
  // update model
});
```

Current `canvasInput` source accepts `this.rexUI.add.canvasInput({ ... })` even though the factory type also lists positional parameters.

## Masked CanvasInput Password

```js
let masked = true;

const password = this.rexUI.add.canvasInput({
  height: 36,
  rawText: '',
  text: '',
  style: {
    fontSize: 20,
    backgroundBottomY: 5,
    backgroundHeight: 20,
    'cursor.color': 'black',
    'cursor.backgroundColor': 'white'
  },
  wrap: { vAlign: 'center' },
  onUpdate(text) {
    return masked ? '*'.repeat(text.length) : undefined;
  }
});

const toggle = this.add.text(0, 0, 'Show').setInteractive();
toggle.on('pointerdown', () => {
  masked = !masked;
  password.updateFromEditor();
});

const row = this.rexUI.add.label({
  orientation: 'x',
  background: this.rexUI.add.roundRectangle({ radius: 8 }).setStrokeStyle(2, 0x888888),
  text: password,
  action: toggle,
  expandTextWidth: true,
  space: { left: 8, right: 8, top: 5, bottom: 5, text: 8 }
}).layout();

const value = password.rawText;
```

## TextAreaInput

Derived from `examples/ui-textareainput/textareainput.js`, reduced for skill reference.

```js
const textArea = this.rexUI.add.textAreaInput({
  x: 400,
  y: 300,
  width: 320,
  height: 260,

  background: this.rexUI.add.roundRectangle({ color: 0x222222 }),

  text: {
    background: {
      stroke: 'white',
      'focus.stroke': 'yellow'
    },
    style: {
      fontSize: 20,
      backgroundBottomY: 1,
      backgroundHeight: 20,
      'cursor.color': 'black',
      'cursor.backgroundColor': 'white'
    },
    wrap: {
      wrapMode: 'word'
    }
  },

  slider: {
    track: { width: 12, radius: 6, color: 0x333333 },
    thumb: { radius: 8, color: 0xffffff }
  },

  mouseWheelScroller: {
    focus: true,
    speed: 0.1
  },

  space: {
    text: 10
  },

  content: 'Editable multiline text'
})
  .on('textchange', (text) => {
    // update model
  })
  .on('close', (text) => {
    // commit on editor close
  })
  .layout();

textArea.setReadOnly(false);
```

## TextEdit And HiddenEdit

Use `textEdit` or `hiddenEdit` to edit an existing text-like object. These are lower-level helpers; prefer `canvasInput` or `inputText` for ordinary form fields.

```js
const text = this.add.text(100, 100, 'Click to edit', { fontSize: 24 })
  .setInteractive();

const edit = this.rexUI.add.textEdit(text, {
  onTextChanged(textObject, text) {
    textObject.setText(text);
  }
});

text.on('pointerdown', () => {
  edit.open();
});
```

If the target is a RexUI `BBCodeText` or `tagText`, verify the exact text edit behavior against `templates/ui/textedit` and `plugins/textedit`.

## NameInputDialog

Use `nameInputDialog` when the UI is exactly a first-name/last-name modal. Use `rexui-dialogs-and-popups` for generic prompts.

```js
const dialog = this.rexUI.add.nameInputDialog({
  x: 400,
  y: 300,
  width: 360,
  background: { radius: 10, color: 0x222222 },
  title: { text: 'Name' },
  firstNameTitle: { text: 'First' },
  lastNameTitle: { text: 'Last' },
  button: { text: 'OK' }
})
  .resetDisplayContent({
    firstName: 'Ada',
    lastName: 'Lovelace'
  })
  .layout();

dialog.modalPromise().then((data) => {
  if (data && data.firstName !== undefined) {
    useName(data.firstName, data.lastName);
  }
});
```
