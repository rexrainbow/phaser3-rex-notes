# Rich Text Recipes

These recipes are reduced from RexUI examples and are self-contained around `this.rexUI.add.*`. They do not require reading `examples/` at skill usage time.

## BBCode Text

```js
const rich = this.rexUI.add.BBCodeText(80, 80, '[b]Quest[/b]\n[color=yellow]Find the key[/color]', {
  fontSize: 20,
  wrap: {
    mode: 'word',
    width: 360
  },
  lineSpacing: 6
});
```

Use `BBCodeText` when inline color, size, bold, underline, image tags, or per-span style are needed.

## Tag Text

```js
const text = this.rexUI.add.tagText(80, 80, '<class="title">Quest</class>\nFind the key', {
  fontSize: 20,
  wrap: {
    mode: 'word',
    width: 360
  },
  tags: {
    title: {
      fontSize: '28px',
      color: 'yellow'
    }
  }
});
```

Use `tagText` when a tag-style parser fits the project better than BBCode syntax.

## Dialogue TextBox

Derived from `examples/ui-textbox/textbox.js`, reduced for skill reference.

```js
const textBox = this.rexUI.add.textBox({
  x: 80,
  y: 420,
  width: 640,
  height: 140,
  typingMode: 'page',

  background: this.rexUI.add.roundRectangle({
    radius: 14,
    color: 0x222222,
    strokeColor: 0xffffff,
    strokeWidth: 2
  }),

  text: this.rexUI.add.BBCodeText(0, 0, '', {
    fontSize: 20,
    wrap: { mode: 'word', width: 520 },
    maxLines: 3
  }),

  action: this.add.text(0, 0, 'Next').setVisible(false),
  expandTextWidth: true,
  expandTextHeight: true,

  space: {
    left: 18,
    right: 18,
    top: 14,
    bottom: 14,
    text: 12
  },

  align: {
    action: 'bottom'
  }
})
  .setOrigin(0)
  .layout();

textBox
  .setInteractive()
  .on('pointerdown', () => {
    textBox.getElement('action').setVisible(false);

    if (textBox.isTyping) {
      textBox.stop(true);
    } else if (!textBox.isLastPage) {
      textBox.typeNextPage();
    }
  })
  .on('pageend', () => {
    if (!textBox.isLastPage) {
      textBox.getElement('action').setVisible(true);
      textBox.resetChildVisibleState(textBox.getElement('action'));
    }
  })
  .on('complete', () => {
    textBox.getElement('action').setVisible(false);
  });

textBox.start('[color=yellow]Guide[/color]: Welcome to the ruins.', 35);
```

## Simple TextBox

Use `simpleTextBox` when the default creators are enough and the caller mainly supplies text, title, icon, action, and style configs.

```js
const box = this.rexUI.add.simpleTextBox({
  x: 80,
  y: 420,
  width: 640,
  height: 140,
  title: 'Guide',
  text: 'Welcome',
  typingMode: 'page',
  page: { maxLines: 3 },
  type: { speed: 35 }
})
  .setOrigin(0)
  .layout()
  .start('Welcome to the ruins.', 35);
```

## TextArea

Use `textArea` for read-only scrollable text. Use `textAreaInput` for editable content.

```js
const textArea = this.rexUI.add.textArea({
  x: 400,
  y: 300,
  width: 420,
  height: 260,
  text: this.rexUI.add.BBCodeText(0, 0, '', {
    fontSize: 18,
    wrap: { mode: 'word', width: 340 }
  }),
  content: Array.from({ length: 30 }, (_, i) => `[color=yellow]${i}[/color] Log entry`).join('\n'),
  slider: {
    track: this.rexUI.add.roundRectangle({ width: 12, radius: 6, color: 0x333333 }),
    thumb: this.rexUI.add.roundRectangle({ radius: 8, color: 0xffffff })
  },
  space: { text: 10 }
}).layout();

textArea.scrollToLine(10, 250, 'Cubic');
```

## Standalone TextTyping

Use `textTyping` when the text object is not a `textBox`.

```js
const label = this.rexUI.add.BBCodeText(80, 80, '', {
  fontSize: 22,
  wrap: { mode: 'word', width: 420 }
});

const typing = this.rexUI.add.textTyping(label, {
  speed: 40
})
  .on('typechar', (char) => {
    // play tick sound if needed
  })
  .on('complete', () => {
    // reveal continue prompt
  });

typing.start('[color=yellow]System[/color]: Connection restored.');
```

## TextPage

Use `textPage` when paging logic should be separate from UI composition.

```js
const label = this.rexUI.add.BBCodeText(80, 80, '', {
  fontSize: 20,
  fixedWidth: 420,
  fixedHeight: 120,
  wrap: { mode: 'word', width: 420 },
  maxLines: 4
});

const page = this.rexUI.add.textPage(label, {
  maxLines: 4,
  pageBreak: '\f'
});

page.setText(longContent);
label.setText(page.getPage(0));

this.input.on('pointerdown', () => {
  if (!page.isLastPage) {
    label.setText(page.getNextPage());
  }
});
```

## TextPlayer

Use `textPlayer` for rich scripted playback with waits, styles, images, sound, camera tags, or choices. Keep simple dialogue on `textBox`.

```js
const player = this.rexUI.add.textPlayer({
  x: 80,
  y: 80,
  width: 520,
  height: 180,
  style: {
    fontSize: 22,
    wrap: { width: 500 }
  },
  typing: {
    speed: 35
  }
});

player.play(`
[color=yellow]Guide[/color]: Wait here.
[wait=500]
The door is opening.
`);
```

If generated code uses advanced `textPlayer` tags, verify the exact parser tags against `plugins/gameobjects/dynamictext/textplayer/parser/`.
