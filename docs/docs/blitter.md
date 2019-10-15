## Introduction

Display of static images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

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
    // flipY: true,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyBlitter extends Phaser.GameObjects.Blitter {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
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
    var blitter = new MyBlitter(scene, x, y, key);
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

### Get bob objects

```javascript
var bobs = blitter.children.list;
```

### Clear all bob objects

```javascript
blitter.clear();
```

### Bob object

A Bob has a position, alpha value and a frame from a texture that it uses to render with. You can also toggle the flipped and visible state of the Bob.

#### Position

- Get
    ```javascript
    var x = bob.x;
    var y = bob.y;
    ```
- Set
    ```javascript
    bob.setPosition(x, y);
    // bob.x = 0;
    // bob.y = 0;
    ```
    or
    ```javascript
    bob.reset(x, y);
    // bob.reset(x, y, frame);
    ```

#### Frame

- Get
    ```javascript
    var frame = bob.frame;
    ```
    - `frame` : [Frame object](texture.md#frame-object).
- Set
    ```javascript
    bob.setFrame(frame);
    ```

#### Flip

- Get
    ```javascript
    var flipX = bob.flipX;
    var flipY = bob.flipY;
    ```
- Set
    ```javascript
    bob.setFlip(boolX, boolY);
    // bob.setFlipX(boolean);
    // bob.setFlipY(boolean);
    // bob.flipX = flipX;
    // bob.flipY = flipY;
    ```
    or
    ```javascript
    bob.resetFlip(); // bob.setFlip(false, false)
    ```

#### Visible

- Get
    ```javascript
    var visible = bob.visible;
    ```
- Set
    ```javascript
    bob.setVisible(boolean);
    // bob.visible = v;
    ```

#### Alpha

- Get
    ```javascript
    var alpha = bob.alpha;
    ```
- Set
    ```javascript
    bob.setAlpha(v);
    // bob.aplha = v;
    ```

#### Tint

- Get
    ```javascript
    var tint = bob.tint;
    ```
- Set
    ```javascript
    bob.setTint(tint);
    // bob.tint = tint;
    ```
    - `tint` : Tint value, between `0` and `0xffffff`.

#### Destroy

```javascript
bob.destroy();
```

#### Data

```javascript
var data = bob.data;  // {}
```
