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

See [loader](loader.md#image)

### Add quad object

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
    // flipY: true
});
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