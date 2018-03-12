## Introduction

Display of static images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, path/to/image);
```

### Add image object

```javascript
var image = scene.add.image(x, y, key);
```

#### Add image from JSON

```javascript
var image = scene.make.image({
    x: 100,
    y: 100,
    key: ''
});
```