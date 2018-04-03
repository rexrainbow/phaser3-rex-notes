## Introduction

Display of static images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

See [loader](loader.md#image)

### Add blitter container

Add blitter container

```javascript
var blitter = scene.add.blitter(x, y, key);
```

Add blitter container from JSON

```javascript
var blitter = scene.make.blitter({
    x: 0,
    y: 0,
    key: '',

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true
});
```

### Add bob object

```javascript
var bob = blitter.create(x, y);
// var bob = blitter.create(x, y, frame, visible, index);
```

- frame : The Frame the Bob will use. It must be part of the Texture the parent Blitter object is using.
- visible : Should the created Bob render or not?
- index : The position in the Blitters Display List to add the new Bob at. Defaults to the top of the list.

#### Add mutiple bob objects

```javascript
var bobs = blitter.createMultiple(quantity, frame, visible);
```

- quantity : The quantity of Bob objects to create.

#### Add bob object from callback

```javascript
var bobs = blitter.createFromCallback(callback, quantity, frame, visible)
// var callback = function(bob, i){};
```

### Clear all bob objects

```javascript
blitter.clear();
```

### Bob object

A Bob has a position, alpha value and a frame from a texture that it uses to render with. You can also toggle the flipped and visible state of the Bob.

#### Position, frame

```javascript
bob.reset(x, y, frame);
```

```javascript
bob.setFrame(frame);
```

#### Flip

```javascript
bob.resetFlip();
```

```javascript
bob.setFlip(boolX, boolY);
```

```javascript
bob.setFlipX(boolean);
```

```javascript
bob.setFlipY(boolean);
```

#### Visible, alpha

```javascript
bob.setVisible(boolean);
// bob.visible = v;
// var visible = bob.visible;
```

```javascript
bob.setAlpha(v);
// bob.aplha = v;
// var alpha = bob.alpha;
```

#### Destroy

```javascript
bob.destroy();
```

#### Data

```javascript
var data = bob.data;  // {}
```