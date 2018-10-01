## Introduction

Displays text with multi-color, font face, or font size with tags.

- Author: Rex
- A kind of game object, installed by global plugin

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/tagtext-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextagtextplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/tagtext.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/tagtext)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add text object

```javascript
var tags = {
    tag0: {
      color: 'red'
    },
    tag1: {
      color: 'blue'
    }
};
var txt = scene.add.rexTagText(x, y, '<style="tag0">h</style>ello', {tags:tags});
// var txt = scene.add.rexTagText(x, y, '<style="tag0">h</style>ello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00', tags:tags });
```

Properties of a tag

```javascript
{
    fontFamily: 'Courier',   // or 'family', 'font-family'
    fontSize: '16px',        // or 'size', 'font-size'
    fontStyle: 'bold italic',// or 'style', 'font-style'
    color: 'red',            // or 'font-color'
    stroke: {
        color: 'blue',
        thinkness: 1
    },
    shadow: {
        color: 'black',
        offsetX: 2,
        offsetY: 2,
        blur: 2
    },
    underline: {            // or 'u'
        color: 'blue',
        thinkness: 3,
        offset: -1
    }
}
```

Default style

```javascript
{
    fontFamily: 'Courier',
    fontSize: '16px',
    fontStyle: '',
    backgroundColor: null,
    color: '#fff',
    stroke: '#fff',
    strokeThickness: 0,
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#000',
        blur: 0,
        stroke: false,
        fill: false
    },
    underline: {
        color: '#000',
        thinkness: 0,
        offset: 0
    },
    align: 'left',  // 0|'left'|1|'center'|2|'right'
    maxLines: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    lineSpacing: 0,
    testString: '|MÉqgy',
    wrap: {
        mode: 'none'     // 0|'none'|1|'word'|2|'char'|'character'
        width: null
    }

    tags: {
        //tag0: {
        //  color: 'red'
        //},
        //tag1: {
        //  color: 'blue'
        //}
    },
    // resolution: 1
}
```

Add text from JSON

```javascript
var txt = scene.make.rexTagText({
    x: 100,
    y: 100,
    padding: {
        left: 64,
        right: 16,
        top: 20,
        bottom: 40
        //x: 32,    // 32px padding on the left/right
        //y: 16     // 16px padding on the top/bottom
    },
    text: 'Text\nGame Object\nCreated from config',
    style: {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#ff00ff',
        tags: {}
    },

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyText extends TagText {
        constructor(scene, x, y, text, style) {
            super(scene, x, y, text, style);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var txt = new MyText(scene, x, y, '<style="tag0">h</style>ello', {tags:tags});
    ```

### Word wrap

Wrap by word or character.

```javascript
var txt = scene.make.text({
    x: 400,
    y: 100,
    text: 'The sky above the port was the color of television, tuned to a dead channel.',
    origin: { x: 0.5, y: 0.5 },
    style: {
        font: 'bold 25px Arial',
        fill: 'white',
        wrap: {
            mode: 'word'     // 0|'none'|1|'word'|2|'char'|'character'
            width: 300
        }
    }
});
```

### Content

- Get
    ```javascript
    var content = txt.text;
    ```
- Set
    ```javascript
    txt.setText('<style="name1">wor</style>ld');
    // txt.text = '<style="name1">wor</style>ld';
    ```

### Set style

```javascript
txt.setStyle(style);
txt.setFont(font);  // font: {fontFamily, fontSize, fontStyle}
txt.setFontFamily(family);
txt.setFontSize(size);
txt.setFontStyle(style);
```

### Set color

```javascript
txt.setColor(color);
txt.setStroke(color, thickness);
txt.setBackgroundColor(color);
txt.setFill(color);
```

### Set shadow

```javascript
txt.setShadow(x, y, color, blur, shadowStroke, shadowFill);
txt.setShadowOffset(x, y);
txt.setShadowColor(color);
txt.setShadowBlur(blur);
txt.setShadowStroke(enabled);
txt.setShadowFill(enabled);
```

### Set underline

```javascript
txt.setUnderline(color, thinkness, ofset);
txt.setUnderlineColor(color);
txt.setUnderlineThinkness(thinkness);
txt.setUnderlineOffset(ofset);
```

### Set line spacing

This value is *added* to the height of the font when calculating the overall line height.

```javascript
txt.setLineSpacing(value);
```

### Set padding

```javascript
txt.setPadding(left, top, right, bottom);
// txt.setPadding(padding); // padding: {left, top, right, bottom}
```

### Set max lines

```javascript
txt.setMaxLines(max);
```

### Set wrap properties

```javascript
txt.setWrapMode(mode);  // mode: 0|'none'|1|'word'|2|'char'|'character'
txt.setWrapWidth(width);
```

### Set object size

```javascript
txt.setFixedSize(width, height);
```

### Inline style

Define style inline text.

- `<style='color:red'>Some text</style>`
- `<style='size:30px'>Some text</style>`
- `<style='stroke:blue 1px'>Some text</style>` (color thinkness)
- `<style='shadow:blue 2px 2px 2px'>Some text</style>` (color offsetX offsetY blur)
- `<style='underline:blue 3px -1px'>Some text</style>` (color thinkness offset)

Or mix them

- `<style='color:red;size:30px'>Some text</style>`

### Get text

- Source text
    ```javascript
    var curContent = txt.text;
    ```
- Plain text
    ```javascript
    var plainText = txt.getPlainText();
    ```