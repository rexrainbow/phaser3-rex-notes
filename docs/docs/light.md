## Introduction

lighting system from normal map.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Light system

#### Enable

- Enable
    ```javascript
    scene.lights.enable();
    ```
- Disable
    ```javascript
    scene.lights.disable();
    ```
    or
    ```javascript
    scene.lights.active = false;
    ```

#### Ambient color

```javascript
scene.lights.setAmbientColor(color);
```

- `color` : Integer color value.

### Light

- Add
    ```javascript
    var light = scene.lights.addLight(x, y, radius);
    // var light = scene.lights.addLight(x, y, radius, color, intensity);
    ```
    - `x`, `y` : The horizontal/vertical position of the Light.
    - `radius` : The radius of the Light.
    - `color` : The integer RGB color of the light. Default is `0xffffff`.
    - `intensity` : The intensity of the Light.
- Remove
    ```javascript
    scene.lights.removeLight(light);
    ```

#### Position

- Set
    ```javascript
    light.setPosition(x, y);
    ```
    or
    ```javascript
    light.x = x;
    light.y = y;
    ```
- Get
    ```javascript
    var x = light.x;
    var y = light.y;
    ```

#### Color

- Set
    - Red, green, blue
        ```javascript
        light.color.set(red, green, blue);
        ```
        or
        ```javascript
        light.color.r = red;
        light.color.g = green;
        light.color.b = blue;
        ```
    - Integer value
        ```javascript
        light.setColor(colorInteger);
        ```
- Get
    - Red, green, blue
        ```javascript
        var red = light.color.r;
        var green = light.color.g;
        var blue = light.color.b;
        ```

#### Radius

- Set
    ```javascript
    light.setRadius(radius);
    ```
    or
    ```javascript
    light.radius = radius;
    ```
- Get
    ```javascript
    var radius = light.radius;
    ```

#### Intensity

- Set
    ```javascript
    light.setIntensity(intensity);
    ```
    or
    ```javascript
    light.intensity = intensity;
    ```
- Get
    ```javascript
    var intensity = light.intensity;
    ```

### Game object

#### Load texture with normal map

```javascript
scene.load.image(key, [url, normalMapUrl]);
```

- `url` : Url of texture.
- `url` : Url of texture.
- `normalMapUrl` : Url of normal map.

#### Apply light pipeline

```javascript
gameObject.setPipeline('Light2D');
```
