## Introduction

Base class of all game object in phaser.

- Author: Richard Davey

## Usage

### Position

- Get
    ```javascript
    var x = gameObject.x;
    var y = gameObject.y;
    ```
- Set
    ```javascript
    gameObject.x = 0;
    gameObject.y = 0;
    gameObject.setPosition(x,y);
    gameObject.setX(x);
    gameObject.setY(y);
    ```
    - Set random
        ```javascript
        gameObject.setRandomPosition(x, y, width, height);
        // gameObject.setRandomPosition(); // x=0, y=0, width=game.width, height=game.height
        ```

### Angle

- Get
    ```javascript
    var angle = gameObject.angle;
    var radians = gameObject.rotation;  // angle in radians
    ```
- Set
    ```javascript
    gameObject.angle = degrees;
    gameObject.rotation = radians;
    gameObject.setAngle(degrees);
    gameObject.setRotation(radians);
    ```

### Visible

- Get
    ```javascript
    var visible = gameObject.visible; // visible: true/false
    ```
- Set
    ```javascript
    gameObject.visible = visible;
    gameObject.setVisible(visible);
    ```

### Alpha

- Get
    ```javascript
    var alpha = gameObject.alpha;  // 0~1
    ```
- Set
    ```javascript
    gameObject.alpha = alpha;
    gameObject.setAlpha(alpha);
    gameObject.setAlpha(topLeft, topRight, bottomLeft, bottomRight);
    ```

### FlipX, FlipY

- Get
    ```javascript
    var flip = gameObject.flipX;  // flip: true/false
    var flip = gameObject.flipY;  // flip: true/false
    ```
- Set
    ```javascript
    gameObject.flipX = flip;
    gameObject.flipY = flip;
    gameObject.setFlipX(flip);
    gameObject.setFlipY(flip);
    gameObject.setFlip(flipX, flipY);
    gameObject.toggleFlipX();
    gameObject.toggleFlipY();
    gameObject.resetFlip();  // equal to gameObject.setFlip(false, false);
    ```

### Depth (z-index)

The depth starts from zero (the default value) and increases from that point. A game object with a higher depth value will always render in front of one with a lower value.

- Get
    ```javascript
    var depth = gameObject.depth;
    ```
- Set
    ```javascript
    gameObject.depth = value;
    gameObject.setDepth(value);
    ```

### Scroll factor

- Get
    ```javascript
    var scrollFactorX = gameObject.scrollFactorX;
    var scrollFactorY = gameObject.scrollFactorY;
    ```
- Set
    ```javascript
    gameObject.setScrollFactor(scrollFactor);
    gameObject.setScrollFactor(scrollFactorX, scrollFactorY);
    ```

Scroll factor: 0~1

- 0= fixed to camera
- 0.25= quarter the speed of the camera
- 0.5= half the speed of the camera

### Bounds

```javascript
var output = gameObject.getTopLeft(output);     // output: {x, y}
var output = gameObject.getTopRight(output);    // output: {x, y}
var output = gameObject.getBottomLeft(output);  // output: {x, y}
var output = gameObject.getBottomRight(output); // output: {x, y}
var output = gameObject.getCenter(output);      // output: {x, y}
var output = gameObject.getBounds(output);      // output: {x, y, width, height}
```

### Tint

- Get
    ```javascript
    var color = gameObject.tintTopLeft;     // color: 0xRRGGBB
    var color = gameObject.tintTopRight;
    var color = gameObject.tintBottomLeft;
    var color = gameObject.tintBottomRight;
    ```
- Set
    ```javascript
    gameObject.tint = color;
    gameObject.setTint(color);
    gameObject.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
    gameObject.clearTint();     // equal to `gameObject.setTint(0xffffff)`
    ```

### Size

- Native (un-scaled) size
    - Get
        ```javascript
        var width = gameObject.width;
        var height = gameObject.height;
        ```
    - Set
        ```javascript
        gameObject.width = width;
        gameObject.height = height;
        gameObject.setSize(width, height);
        ```
- Display size
    - Get
        ```javascript
        var displayWidth = gameObject.displayWidth;
        var displayHeight = gameObject.displayHeight;
        ```
    - Set
        ```javascript
        gameObject.displayWidth = displayWidth;
        gameObject.displayHeight = displayHeight;
        gameObject.setDisplaySize(displayWidth, displayHeight);
        ```
- Scale
    - Get
        ```javascript
        var scaleX = gameObject.scaleX;
        var scaleY = gameObject.scaleY;
        ```
    - Set
        ```javascript
        gameObject.scaleX = scaleX;
        gameObject.scaleY = scaleY;
        gameObject.setScale(scaleX, scaleY);
        ```

### Private data

- Get
    ```javascript
    var value = gameObject.getData(key);
    var values = gameObject.getData(keys); // keys: an array of keys
    var value = gameObject.data.values[key];
    ```
- Set
    ```javascript
    gameObject.setData(key, value);
    gameObject.setData(obj); // obj: {key0:value0, key1:value1, ...}
    gameObject.data.values[key] = value;
    gameObject.data.values[key] += inc;
    ```

See [data manager](datamanager.md)