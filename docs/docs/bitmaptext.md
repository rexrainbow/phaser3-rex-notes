## Introduction

Drawing text by texture, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load bitmap font

```javascript
scene.load.bitmapFont(key, textureURL, xmlURL);
```

Reference: [load bitmap font](loader.md#bitmap-font)

### Add bitmap text object

```javascript
var txt = scene.bitmapText(x, y, key, text);
// var txt = scene.bitmapText(x, y, key, text, size, align);
```

- `size` : The size of the font
- `align` : The alignment of the text in a *multi-line* BitmapText object.
    - `0` : Left aligned (default)
    - `1` : Middle aligned
    - `2` : Right aligned

Add text from JSON

```javascript
var txt = scene.make.bitmapText({
    x: 0,
    y: 0,
    text: 'Text\nGame Object\nCreated from config',
    font: '',
    size: false,
    align: 0,
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyText extends BitmapText {
        constructor(scene, x, y, key, text, size, align) {
            super(scene, x, y, key, text, size, align);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var txt = new MyText(scene, x, y, key, text);
    ```

### Set text

```javascript
txt.setText('...');
```

or

```javascript
txt.text = '...';
```

### Set align

- Left aligned
    ```javascript
    txt.setLeftAlign();
    ```
- Middle aligned
    ```javascript
    txt.setCenterAlign();
    ```
- Right aligned
    ```javascript
    txt.setRightAlign();
    ```

or

```javascript
txt.align = align;
```

- `0` : Left aligned (default)
- `1` : Middle aligned
- `2` : Right aligned

### Set letter spacing

```javascript
txt.setLetterSpacing(spacing);
```

or

```javascript
txt.letterSpacing = spacing;
```

Can be a positive value to increase the space, or negative to reduce it.

### Set font size

```javascript
txt.setFontSize(size);
```

or

```javascript
txt.fontSize = size;
```

### Set font

```javascript
txt.setFont(key);
// txt.setFont(key, size, align);
```

### Get bound

```javascript
var width = txt.width;
var height = txt.height;
```

or

```javascript
var bounds = txt.setFixedSize(width, height);
// bounds = {
//     local: {
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0
//     },
//     global: {
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0
//     },
//     lines: {
//         shortest: 0,
//         longest: 0,
//         lengths: null
//     }
// };
```

- `local` : The BitmapText based on fontSize and 0x0 coords
- `global` : The BitmapText, taking into account scale and world position
- `lines` : The BitmapText line data

### Other properties

See [game object](gameobject.md)