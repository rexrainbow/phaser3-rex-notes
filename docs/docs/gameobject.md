## Introduction

Base class of all game object in phaser.

- Author: Richard Davey

## Usage

### Position

```javascript
var x = gameobject.x;
var y = gameobject.y;
gameobject.x = 100;
gameobject.y = 100;
```

### Angle

```javascript
var angle = gameobject.angle;
gameobject.angle = 90;

// angle in radians
var rad = gameobject.rotation;
gameobject.rotation = Phaser.Math.DegToRad(90);
```

### Visible

```javascript
var visible = gameobject.visible;
gameobject.visible = true;
```

### Alpha

```javascript
var alpha = gameobject.alpha;
gameobject.alpha = 0.5;
```

### FlipX, FlipY

```javascript
var flipX = gameobject.flipX;
gameobject.flipX = false;

var flipY = gameobject.flipY;
gameobject.flipY = false;
```

### Edges

```javascript
var topLeft = gameobject.getTopLeft();         // topLeft.x, topLeft.y
var topRight = gameobject.getTopRight();       // topRight.x, topRight.y
var bottomLeft = gameobject.getBottomLeft();   // bottomLeft.x, bottomLeft.y
var bottomRight = gameobject.getBottomRight(); // bottomRight.x, bottomRight.y
```