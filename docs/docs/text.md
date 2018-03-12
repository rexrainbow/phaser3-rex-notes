## Introduction

Drawing text on canvas, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add text object

```javascript
var text = scene.add.text(x, y, text);
// scene.add.text(x, y, text, { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
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
    align: 'left',
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

#### Add text from JSON

```javascript
var text = scene.make.text({
    x: 100,
    y: 100,
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