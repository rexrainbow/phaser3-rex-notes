## Introduction

A representation of a vector in 2D space (`{x, y}`), built-in object of phaser.

- Author: Richard Davey

## Usage

### Create object

```javascript
var vector = new Phaser.Math.Vector2();
// var vector = new Phaser.Math.Vector2(x, y);
// var vector = new Phaser.Math.Vector2({x, y});
```

#### Clone

```javascript
var newVector = vector.clone();
```

### Set components

- Set (x, y)
    ```javascript
    vector.set(x, y);
    // vector.setTo(x, y);
    ```
    or
    ```javascript
    vector.copy({x, y});
    // vector.setFromObject({x, y});
    ```
- Set angle
    ```javascript
    vector.setAngle(angle);
    ```
    - `angle` : Angle in radians.
- Rotate
    ```javascript
    vector.rotate(delta);
    ```
    - `delta` : The angle to rotate by, in radians.
- Set length
    ```javascript
    vector.setLength(length);
    ```
- Set from polar coordinate
    ```javascript
    vector.setToPolar(azimuth, radius);
    ```
    - `azimuth` : The angular coordinate, in radians.
    - `radius` : The radial coordinate (length). Default is `1`.
- Reset to (0, 0)
    ```javascript
    vector.reset();
    ```

### Get componments

- X, Y
    ```javascript
    var x = vector.x;
    var y = vector.y;
    ```
- Angle
    ```javascript
    var angle = vector.angle(); // angle in radians
    ```
- Length
    ```javascript
    var length = vector.length();
    ```
    or
    ```javascript
    var lengthSq = vector.lengthSq(); // squared
    ```

### Methods

- Scale
    ```javascript
    vector.scale(value);
    ```
- Limit the length
    ```javascript
    vector.limit(value);
    ```
- Normalize
    ```javascript
    vector.normalize();
    ```
- Negate
    ```javascript
    vector.negate();
    ```
- Rotate perpendicular
    ```javascript
    vector.normalizeRightHand();
    vector.normalizeLeftHand();
    ```
- Reflect
    - Reflect this Vector off a line defined by a normal.
        ```javascript
        vector.reflect(normal);
        ```
        - `normal` : A vector perpendicular to the line.
    - Reflect this Vector across another.
        ```javascript
        vector.mirror(axis);
        ```
        - `axis` : A vector to reflect across.

#### Vector methods

- Add
    ```javascript
    vector.add(src); // src: {x, y}
    ```
- Subtract
    ```javascript
    vector.subtract(src); // src: {x, y}
    ```
- Multiply
    ```javascript
    vector.multiply(src); // src: {x, y}
    ```
- Divide
    ```javascript
    vector.divide(src); // src: {x, y}
    ```
- Dot
    ```javascript
    var value = vector.dot(src); // src: {x, y}
    ```
- Cross
    ```javascript
    var value = vector.cross(src); // src: {x, y}
    ```
- Fuzzy Equal
    ```javascript
    var equal = vector.fuzzyEquals(src); // src: {x, y}
    // var equal = vector.fuzzyEquals(src, epsilon);
    ```

#### Points method

- Distance between 2 points.
    ```javascript
    var distance = vector.distance(src);
    ```
    or
    ```javascript
    var distanceSq = vector.distanceSq(src); // squared
    ```
- Linearly interpolate between 2 points.
    ```javascript
    vector.lerp(src, t); // src: {x, y}
    ```
    - `t` : The interpolation percentage, between 0 and 1.

### Constant

- Zero `(0,0)`
    ```javascript
    var vector = Phaser.Math.Vector2.ZERO;
    ```
- One `(1,1)`
    ```javascript
    var vector = Phaser.Math.Vector2.ONE;
    ```
- Right `(1,0)`
    ```javascript
    var vector = Phaser.Math.Vector2.RIGHT;
    ```
- Left `(-1,0)`
    ```javascript
    var vector = Phaser.Math.Vector2.LEFT;
    ```
- Up `(0,-1)`
    ```javascript
    var vector = Phaser.Math.Vector2.UP;
    ```
- Down `(0,1)`
    ```javascript
    var vector = Phaser.Math.Vector2.DOWN;
    ```