## Introduction

Drawing text by texture with a callback for each character triggered at every tick, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load bitmap font

Reference: [load bitmap font](bitmaptext.md##load-bitmap-font)

### Add bitmap text object

```javascript
var txt = scene.dynamicBitmapText(x, y, key, text);
// var txt = scene.dynamicBitmapText(x, y, key, text, size, align);
```

- `size` : The size of the font
- `align` : The alignment of the text in a *multi-line* BitmapText object.
    - `0` : Left aligned (default)
    - `1` : Middle aligned
    - `2` : Right aligned

Add text from JSON

```javascript
var txt = scene.make.dynamicBitmapText({
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
    class MyText extends Phaser.GameObjects.DynamicBitmapText {
        constructor(scene, x, y, key, text, size, align) {
            super(scene, x, y, key, text, size, align);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var txt = new MyText(scene, x, y, key, text);
    ```

### Set callback

```javascript
var callback = function(data) {
    // input
    // data.index, data.charCode
    // data.x, data.y, data.scale, data.rotation
    // data.data
    // data.tint.topLeft, data.tint.topRight, data.tint.bottomLeft, data.tint.bottomRight    

    // modify input `data` then return it
    // ...
    // offset: data.y += 2
    // set tint: data.color = tint
    return data;
}
txt.setDisplayCallback(callback);
```

### Set text

```javascript
txt.setText('...');
```

or

```javascript
txt.text = '...';
```

### Other properties

This dynamic bitmap text class is extended from [bitmap text](bitmaptext.md)