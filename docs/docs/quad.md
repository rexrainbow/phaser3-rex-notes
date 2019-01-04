## Introduction

Manipulate the corner points of static images, built-in game object of phaser.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add object

```javascript
var quad = scene.add.quad(x, y, key);
```

Add quad from JSON

```javascript
var quad = scene.make.quad({
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

### Custom quad class

- Define class
    ```javascript
    class MyQuad extends Phaser.GameObjects.Quad {
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
    var quad = new MyQuad(scene, x, y, key);
    ```

### Properties of corner points

#### Position

- Get
    ```javascript
    var topLeftX = quad.topLeftX;
    var topLeftY = quad.topLeftY;
    var topRightX = quad.topRightX;
    var topRightY = quad.topRightY;
    var bottomLeftX = quad.bottomLeftX;
    var bottomLeftY = quad.bottomLeftY;
    var bottomRightX = quad.bottomRightX;
    var bottomRightY = quad.bottomRightY;    
    ```
- Set
    ```javascript
    quad.topLeftX = topLeftX;
    quad.topLeftY = topLeftY;
    quad.topRightX = topRightX;
    quad.topRightY = topRightY;
    quad.bottomLeftX = bottomLeftX;
    quad.bottomLeftY = bottomLeftY;
    quad.bottomRightX = bottomRightX;
    quad.bottomRightY = bottomRightY;

    quad.setTopLeft(x, y);
    quad.setTopRight(x, y);
    quad.setBottomLeft(x, y);
    quad.setBottomRight(x, y);    
    quad.resetPosition();
    ```
    
#### Alpha

- Get
    ```javascript
    var topLeftAlpha = quad.topLeftAlpha;
    var topRightAlpha = quad.topRightAlpha;
    var bottomLeftAlpha = quad.bottomLeftAlpha;
    var bottomRightAlpha = quad.bottomRightAlpha;
    ```
- Set
    ```javascript
    quad.topLeftAlpha = topLeftAlpha;
    quad.topRightAlpha = topRightAlpha;
    quad.bottomLeftAlpha = bottomLeftAlpha;
    quad.bottomRightAlpha = bottomRightAlpha;

    quad.resetAlpha();
    ```

#### Color

- Get
    ```javascript
    var topLeftColor = quad.topLeftColor;
    var topRightColor = quad.topRightColor;
    var bottomLeftColor = quad.bottomLeftColor;
    var bottomRightColor = quad.bottomRightColor;
    ```
- Set
    ```javascript
    quad.topLeftColor = topLeftColor;
    quad.topRightColor = topRightColor;
    quad.bottomLeftColor = bottomLeftColor;
    quad.bottomRightColor = bottomRightColor;

    quad.resetColors();
    ```

#### Reset all

```javascript
quad.reset();
```

### Set frame

```javascript
quad.setFrame(frame);
```