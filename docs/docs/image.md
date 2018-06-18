## Introduction

Display of static images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

See [loader](loader.md#image)

### Add image object

```javascript
var image = scene.add.image(x, y, key);
```

Add image from JSON

```javascript
var image = scene.make.image({
    x: 0,
    y: 0,
    key: '',

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true
});
```

### Other properties

See [game object](gameobject.md)