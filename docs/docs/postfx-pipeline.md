## Introduction

Post fx pipelines for game objects or camera.

- Author: Richard Davey

## Usage

### Post fx pipeline class

```javascript
class MyPostFxClass extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: '...',  // GLSL shader
            uniforms: []
        });
    }

    onPreRender() {
        this.set1f('intensity', this._intensity);
    }
}
```

Set uniform values in `onPreRender` method.

- Property with 1 value
    - Float
        ```javascript
        this.set1f(name, value0);
        ```
    - uniform1fv
        ```javascript
        this.set1fv(name, value0);
        ```
    - Int
        ```javascript
        this.set1i(name, value0);
        ```
- Property with 2 values
    - Float
        ```javascript
        this.set2f(name, value0, value1);
        ```
    - uniform2fv
        ```javascript
        this.set2fv(name, value0, value1);
        ```
    - Int
        ```javascript
        this.set2i(name, value0, value1);
        ``` 
- Property with 3 value
    - Float
        ```javascript
        this.set3f(name, value0, value1, value2);
        ```
    - uniform3fv
        ```javascript
        this.set3fv(name, value0, value1, value2);
        ```
    - Int
        ```javascript
        this.set3i(name, value0, value1, value2);
        ```
- Property with 4 values
    - Float
        ```javascript
        this.set4f(name, value0, value1, value2, value3);
        ```
    - uniform4fv
        ```javascript
        this.set4fv(name, value0, value1, value2, value3);
        ```
    - Int
        ```javascript
        this.set4i(name, value0, value1, value2, value3);
        ```

### Register post-fx pipeline

- Register post-fx pipeline in game config
    ```javascript
    import MyPostFxClass from 'path';
    var config = {
        // ...
        pipeline: [MyPostFxClass]
        // ...
    };
    var game = new Phaser.Game(config);
    ```

### Apply effect

- Apply effect to game object
    ```javascript
    gameObject.setPostPipeline(MyPostFxClass);
    ```
- Apply effect to camera
    ```javascript
    camera.setPostPipeline(MyPostFxClass);
    ```

### Get post-fx pipeline

- Get post-fx pipeline from game ovject
    ```javascript
    var pipelineInstance = gameObject.getPostPipeline(MyPostFxClass);
    ```
- Get post-fx pipeline from camera
    ```javascript
    var pipelineInstance = camera.getPostPipeline(MyPostFxClass);
    ```

### Color matrix

Use color martix to change RGB render result, and more...

```javascript
class MyPostFxClass extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: '...',  // GLSL shader
            uniforms: []
        });
    }

    onPreRender() {
        // this.set1f('intensity', this._intensity);
        this.colorMatrix.grayscale(this._intensity);
    }

    onDraw(renderTarget) {
        this.colorMatrix.grayscale(this._intensity);
        this.drawFrame(renderTarget, this.fullFrame1);
        this.bindAndDraw(this.fullFrame1);
    }
}
```

#### Color adjusting

Invoke before `drawFrame()`.

- Grayscale
    ```javascript
    this.colorMatrix.grayscale(value);
    // this.colorMatrix.grayscale(value, true); // Cascade
    ```
    - `value` : `0` ~ `1`
- Night vision tone
    ```javascript
    this.colorMatrix.night(value);
    // this.colorMatrix.night(value, true); // Cascade
    ```
    - `value` : `0` ~ `1`
- Sepia tone
    ```javascript
    this.colorMatrix.sepia();
    // this.colorMatrix.sepia(true); // Cascade
    ```
- Trippy color tone
    ```javascript
    this.colorMatrix.lsd();
    // this.colorMatrix.lsd(true); // Cascade
    ```
- Brown tone
    ```javascript
    this.colorMatrix.brown();
    // this.colorMatrix.brown(true); // Cascade
    ```
- Vintage pinhole color effect
    ```javascript
    this.colorMatrix.vintagePinhole();
    // this.colorMatrix.vintagePinhole(true); // Cascade
    ```
- Kodachrome color effect
    ```javascript
    this.colorMatrix.kodachrome();
    // this.colorMatrix.kodachrome(true); // Cascade
    ```
- Technicolor color effect
    ```javascript
    this.colorMatrix.technicolor();
    // this.colorMatrix.technicolor(true); // Cascade
    ```
- Polaroid color effect
    ```javascript
    this.colorMatrix.polaroid();
    // this.colorMatrix.polaroid(true); // Cascade
    ```    
- Brightness
    ```javascript
    this.colorMatrix.brightness(value);
    // this.colorMatrix.brightness(value, true); // Cascade
    ```
    - `value` : `0`(black) ~ `1`
- Saturation
    ```javascript
    this.colorMatrix.saturate(value);
    // this.colorMatrix.saturate(value, true); // Cascade
    ```
    - `value` : `-1` ~ `1`
- Desaturate
    ```javascript
    this.colorMatrix.desaturate();
    // this.colorMatrix.desaturate(true); // Cascade
    ```
- Hue
    ```javascript
    this.colorMatrix.hue(rotation);
    // this.colorMatrix.hue(rotation, true); // Cascade
    ```
    - `rotation` : Hue rotation, in degree.
- Black and white
    ```javascript
    this.colorMatrix.blackWhite();
    // this.colorMatrix.blackWhite(true); // Cascade
    ```
- Negative
    ```javascript
    this.colorMatrix.negative();
    // this.colorMatrix.negative(true); // Cascade
    ```
- Contrast
    ```javascript
    this.colorMatrix.contrast(value);
    // this.colorMatrix.contrast(value, true); // Cascade
    ```
- Desaturate luminance
    ```javascript
    this.colorMatrix.desaturateLuminance();
    // this.colorMatrix.desaturateLuminance(true); // Cascade
    ```
- Shifts RGB to BGR order
    ```javascript
    this.colorMatrix.shiftToBGR();
    // this.colorMatrix.shiftToBGR(true); // Cascade
    ```

#### Draw

Invoke under `onDraw(renderTarget)`.

```javascript
this.drawFrame(renderTarget, this.fullFrame1);
this.bindAndDraw(this.fullFrame1);
```