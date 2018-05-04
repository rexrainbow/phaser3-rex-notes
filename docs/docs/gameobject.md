## Introduction

Base class of all game object in phaser.

- Author: Richard Davey

## Usage

### Position

```javascript
var x = gameobject.x;
var y = gameobject.y;
gameobject.x = 0;
gameobject.y = 0;
```

### Angle

```javascript
gameobject.angle = 90;
var angle = gameobject.angle;

// angle in radians
gameobject.rotation = Phaser.Math.DegToRad(90);
var rad = gameobject.rotation;
```

### Visible

```javascript
gameobject.visible = true;
var visible = gameobject.visible;
```

### Alpha

```javascript
gameobject.alpha = 0.5;
var alpha = gameobject.alpha;
```

### FlipX, FlipY

```javascript
gameobject.flipX = false;
var flipX = gameobject.flipX;

gameobject.flipY = false;
var flipY = gameobject.flipY;
```

### Depth (z-index)

The depth starts from zero (the default value) and increases from that point. A game object with a higher depth value will always render in front of one with a lower value.

```javascript
gameobject.depth = 0;
// gameobject.setDepth(value);
var depth = gameobject.depth;
```

### Scroll factor

```javascript
gameobject.setScrollFactor(f);
```

factor: 0~1

- 0= fixed to camera
- 0.25= quarter the speed of the camera
- 0.5= half the speed of the camera

### Bounds

```javascript
var output = gameobject.getTopLeft(output);     // output: {x, y}
var output = gameobject.getTopRight(output);    // output: {x, y}
var output = gameobject.getBottomLeft(output);  // output: {x, y}
var output = gameobject.getBottomRight(output); // output: {x, y}
var output = gameobject.getCenter(output);      // output: {x, y}
var output = gameobject.getBounds(output);      // output: {x, y, width, height}
```

### Tint

```javascript
gameobject.setTint(color);  // color: 0xRRGGBB
// gameobject.tint = color;
gameobject.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
gameobject.clearTint();     // equal to `gameobject.setTint(0xffffff)`
var color = gameobject.tintTopLeft;
var color = gameobject.tintTopRight;
var color = gameobject.tintBottomLeft;
var color = gameobject.tintBottomRight;
```

### Size

```javascript
gameobject.setDisplaySize(width, height);
```

### Private data

```javascript
gameobject.setData(key, value);
var value = gameobject.getData(key);
```

See [data manager](datamanager.md)