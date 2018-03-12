## Introduction

Drawing text on canvas, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Snapshot

```javascript
var txt = scene.add.text(x, y, 'hello');
txt.setText('world');
```

### Add text object

```javascript
var txt = scene.add.text(x, y, 'hello');
// var txt = scene.add.text(x, y, 'hello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
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
    align: 'left',  // align only works with multi-lined text
    maxLines: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
        width: null,
        callback: null,
        callbackScope: null,
        useAdvancedWrap: false
    }
}
```

Add text from JSON

```javascript
var txt = scene.make.text({
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
        backgroundColor: '#ff00ff'
    }
});
```

### Word wrap

Wrap by width

```javascript
var txt = scene.make.text({
    x: 400,
    y: 100,
    text: 'The sky above the port was the color of television, tuned to a dead channel.',
    origin: { x: 0.5, y: 0.5 },
    style: {
        font: 'bold 25px Arial',
        fill: 'white',
        wordWrap: { width: 300 }
    }
});
```

Wrap by callback

```javascript
var txt = scene.make.text({
    x: 400,
    y: 300,
    text: 'The sky above the port was the color of television, tuned to a dead channel.',
    origin: 0.5,
    style: {
        font: 'bold 30px Arial',
        fill: 'white',
        wordWrap: { callback: wordWrap, scope: this }
    }
});

function wordWrap (text, textObject)
{
    // First parameter will be the string that needs to be wrapped
    // Second parameter will be the Text game object that is being wrapped currently

    // This wrap just puts each word on a separate line, but you could inject your own
    // language-specific logic here.
    var words = text.split(' ');

    // You can return either an array of individual lines or a string with line breaks (e.g. \n) in
    // the correct place.
    return words;
}
```

### Set text

```javascript
txt.setText('world');
// var curContent = txt.text;
```

### Set style

```javascript
txt.setStyle(style);
txt.setFont(font);
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

### Set padding

```javascript
txt.setPadding(left, top, right, bottom);
txt.setPadding({});
```

### Set max lines

```javascript
txt.setMaxLines(max);
```

### Set canvas size

```javascript
txt.setFixedSize(width, height);
```