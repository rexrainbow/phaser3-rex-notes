## Introduction

Base class of all game object in phaser.

- Author: Richard Davey

## Usage

### Position

```javascript
var x = gameObject.x;
var y = gameObject.y;
gameObject.x = 0;
gameObject.y = 0;
```

### Angle

```javascript
gameObject.angle = 90;
var angle = gameObject.angle;

// angle in radians
gameObject.rotation = Phaser.Math.DegToRad(90);
var rad = gameObject.rotation;
```

### Visible

```javascript
gameObject.visible = true;
var visible = gameObject.visible;
```

### Alpha

```javascript
gameObject.alpha = 0.5;
var alpha = gameObject.alpha;
```

### FlipX, FlipY

```javascript
gameObject.flipX = false;
var flipX = gameObject.flipX;

gameObject.flipY = false;
var flipY = gameObject.flipY;
```

### Depth (z-index)

The depth starts from zero (the default value) and increases from that point. A game object with a higher depth value will always render in front of one with a lower value.

```javascript
gameObject.depth = 0;
// gameObject.setDepth(value);
var depth = gameObject.depth;
```

### Scroll factor

```javascript
gameObject.setScrollFactor(f);
```

factor: 0~1

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

```javascript
gameObject.setTint(color);  // color: 0xRRGGBB
// gameObject.tint = color;
gameObject.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
gameObject.clearTint();     // equal to `gameObject.setTint(0xffffff)`
var color = gameObject.tintTopLeft;
var color = gameObject.tintTopRight;
var color = gameObject.tintBottomLeft;
var color = gameObject.tintBottomRight;
```

### Size

```javascript
gameObject.setDisplaySize(width, height);
```

### Private data

```javascript
gameObject.setData(key, value);
var value = gameObject.getData(key);
```

See [data manager](datamanager.md)