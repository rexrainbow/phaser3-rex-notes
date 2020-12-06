## Introduction

A point light with gradient color in a circle.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Add point light

```javascript
var pointLight = scene.add.pointlight(x, y, color, radius, intensity, attenuation);
```

- `x`, `y` : The horizontal/vertical position of this Game Object in the world.
- `color` : Color of this light.
- `radius` : Radius of this light.
- `intensity` : `0`~`1`, intensity of color.
- `attenuation` : `0`~`1`, decay intensity along radius.

### Position

- Set
    ```javascript
    pointLight.setPosition(x, y);
    ```
    or
    ```javascript
    pointLight.x = x;
    pointLight.y = y;
    ```
- Get
    ```javascript
    var x = pointLight.x;
    var y = pointLight.y;
    ```

### Color

- Set
    - Red, green, blue
        ```javascript
        pointLight.color.set(red, green, blue);
        ```
        or
        ```javascript
        pointLight.color.r = red;
        pointLight.color.g = green;
        pointLight.color.b = blue;
        ```
        - `red`, `green`, `blue` : `0`~`1`.
- Get
    - Red, green, blue
        ```javascript
        var red = pointLight.color.r;
        var green = pointLight.color.g;
        var blue = pointLight.color.b;
        ```
        - `red`, `green`, `blue` : `0`~`1`.

### Radius

- Set
    ```javascript
    pointLight.radius = radius;
    ```
- Get
    ```javascript
    var radius = pointLight.radius;
    ```

### Intensity

- Set
    ```javascript
    pointLight.intensity = intensity;
    ```
- Get
    ```javascript
    var intensity = pointLight.intensity;
    ```

### Attenuation

- Set
    ```javascript
    pointLight.attenuation = attenuation;
    ```
- Get
    ```javascript
    var attenuation = pointLight.attenuation;
    ```
