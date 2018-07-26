## Introduction

Drawing text with [BBCode](https://en.wikipedia.org/wiki/BBCode) protocol.

- Author: Rex
- A kind of game object, installed by global plugin

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/bbcodetext-plugin.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bbcodetext)

### BBCode

- bold: `[b]text[/b]`
- italic: `[i]text[/i]`
- color: `[color=red]text[/color]`
- size: `[size=18]text[/size]`
- stroke: `[stroke]text[/stroke]`
    - stroke with color setting: `[stroke=red]text[/stroke]`
- shadow: `[shadow]text[/shadow]`
- underline: `[u]text[/u]`
    - underline with color setting: `[u=red]text[/u]`

### Snapshot

```javascript
var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello');
txt.setText('[i]wor[/i]ld');
```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
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
var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello');
// var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
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
    testString: '|MÉqgy',
    wrap: {
        mode: 'none'     // 0|'none'|1|'word'|2|'char'|'character'
        width: null
    }
}
```

Add text from JSON

```javascript
var txt = scene.make.rexBBCodeText({
    x: 0,
    y: 0,
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
        //x: 32,    // 32px padding on the left/right
        //y: 16     // 16px padding on the top/bottom
    },
    text: 'Text\nGame Object\nCreated from config',
    style: {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#ff00ff'
    }
});
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

### Set text

```javascript
txt.setText('[b]h[/b]ello');
// var curContent = txt.text;
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