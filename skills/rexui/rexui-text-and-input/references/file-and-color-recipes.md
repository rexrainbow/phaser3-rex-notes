# File And Color Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They do not require reading `examples/` at skill usage time.

## FileSelectorButton For Image Import

Derived from `examples/ui-fileselectorbutton/select-image.js`, reduced for skill reference.

Requires Phaser DOM support:

```js
const config = {
  dom: { createContainer: true }
};
```

```js
const preview = this.rexUI.add.imageBox({
  image: this.rexUI.add.canvas()
}).setName('preview');

const selectButton = this.rexUI.add.fileSelectorButton({
  background: this.rexUI.add.roundRectangle({ radius: 6, color: 0x333333 }),
  text: this.add.text(0, 0, 'Import image'),
  accept: 'image/*',
  space: { left: 10, right: 10, top: 6, bottom: 6 }
})
  .on('select', (files) => {
    if (!files || files.length === 0) {
      return;
    }

    preview.image.loadFromFilePromise(files[0]).then(() => {
      preview.resize(preview.width, preview.height);
    });
  });

this.rexUI.add.sizer({
  x: 400,
  y: 300,
  width: 320,
  height: 360,
  orientation: 'y',
  space: { left: 12, right: 12, top: 12, bottom: 12, item: 10 }
})
  .addBackground(this.rexUI.add.roundRectangle({ radius: 10, color: 0x111111 }))
  .add(selectButton, { expand: true })
  .add(preview, { proportion: 1, expand: true })
  .layout();
```

## ImageInputLabel

Use `imageInputLabel` when the selected image should be previewed inside a label-like control.

```js
const imageInput = this.rexUI.add.imageInputLabel({
  width: 260,
  height: 180,
  background: this.rexUI.add.roundRectangle({ radius: 8, color: 0x222222 }),
  text: this.add.text(0, 0, 'Choose image'),
  canvas: {
    width: 180,
    height: 120,
    fill: '#111111'
  },
  clickTarget: null,
  scaleUpIcon: true,
  space: { left: 10, right: 10, top: 10, bottom: 10, icon: 8 }
})
  .on('select', (file, label) => {
    label.saveTexture('selected-avatar');
  })
  .layout();

imageInput.open();
```

Call `open()` from a pointer/click handler in browser contexts where file dialogs require user activation.

## OpenFileChooser Helper

Use `openFileChooser` for a one-shot browser file dialog.

```js
button.on('pointerdown', () => {
  this.rexUI.openFileChooser(this, {
    accept: 'image/*',
    multiple: false
  }).then(({ files }) => {
    if (files && files[0]) {
      useFile(files[0]);
    }
  });
});
```

If this helper shape changes, verify against `templates/ui/filechooser/FileChooser.d.ts` and `plugins/filechooser.d.ts`.

## ColorInput

Derived from `examples/ui-colorinput/color-input.js`, reduced for skill reference.

```js
const colorInput = this.rexUI.add.colorInput({
  height: 56,
  swatch: { size: 22 },
  inputText: {
    background: { color: 0x222222 },
    focusStyle: { color: 0x444444 },
    style: {
      backgroundBottomY: 4,
      backgroundHeight: 18
    },
    cursorStyle: {
      color: 'black',
      backgroundColor: 'white'
    }
  },
  colorPicker: {
    width: 160,
    height: 170,
    background: { color: 0x1b1b1b, strokeColor: 0x666666 },
    space: { left: 10, right: 10, top: 10, bottom: 10, item: 8 }
  },
  colorComponents: {
    space: { item: 8 }
  },
  space: { left: 10, right: 10, top: 10, bottom: 10, item: 8 },
  value: 0xffcc00
})
  .on('valuechange', (value) => {
    target.setFillStyle(value);
  })
  .layout();
```

Use `colorInputLite` when the popup color picker is not needed.

## Standalone ColorPicker

Derived from `examples/ui-colorpicker/color-picker.js`, reduced for skill reference.

```js
const rect = this.add.rectangle(40, 40, 100, 100, 0xffffff).setOrigin(0);

const picker = this.rexUI.add.colorPicker({
  x: 400,
  y: 300,
  background: this.rexUI.add.roundRectangle({ radius: 10, color: 0x424242 }),
  svPalette: {
    width: 128,
    height: 128
  },
  hPalette: {
    size: 16
  },
  space: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    item: 10
  },
  valuechangeCallback(value) {
    rect.setFillStyle(value);
  },
  value: 0xffcc00
}).layout();
```

## ColorComponents

Use `colorComponents` when users should edit RGB/HSV component values directly.

```js
const components = this.rexUI.add.colorComponents({
  x: 400,
  y: 300,
  inputText: {
    style: { fontSize: 18 }
  },
  formatLabel: {
    text: { fontSize: 18 },
    background: { color: 0x333333 }
  },
  valuechangeCallback(value) {
    target.setFillStyle(value);
  },
  value: 0xffcc00
})
  .setColorFormat('RGB')
  .layout();
```

`value` and `color` are numeric `0xRRGGBB` values on color components.
