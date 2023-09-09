## Introduction

Post fx pipelines for game objects or camera. 
A game object or a camera can stack many post-fx effect.

- Author: Richard Davey

!!! warning "WebGL only"
    All kinds of post fx pipelines only work in WebGL render mode.

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

    onDraw(renderTarget) {
    }
}
```

#### Set uniform values

- Property with 1 value
    - Float
        ```javascript
        pipelineInstance.set1f(name, value0);
        // pipelineInstance.set1f(name, value0, shader);
        ```
    - uniform1fv
        ```javascript
        pipelineInstance.set1fv(name, value0);
        // pipelineInstance.set1fv(name, value0, shader);
        ```
    - Int
        ```javascript
        pipelineInstance.set1i(name, value0);
        // pipelineInstance.set1i(name, value0, shader);
        ```
- Property with 2 values
    - Float
        ```javascript
        pipelineInstance.set2f(name, value0, value1);
        // pipelineInstance.set2f(name, value0, value1, shader);
        ```
    - uniform2fv
        ```javascript
        pipelineInstance.set2fv(name, value0, value1);
        // pipelineInstance.set2fv(name, value0, value1, shader);
        ```
    - Int
        ```javascript
        pipelineInstance.set2i(name, value0, value1);
        // pipelineInstance.set2i(name, value0, value1, shader);
        ``` 
- Property with 3 value
    - Float
        ```javascript
        pipelineInstance.set3f(name, value0, value1, value2);
        // pipelineInstance.set3f(name, value0, value1, value2, shader);
        ```
    - uniform3fv
        ```javascript
        pipelineInstance.set3fv(name, value0, value1, value2);
        // pipelineInstance.set3fv(name, value0, value1, value2, shader);
        ```
    - Int
        ```javascript
        pipelineInstance.set3i(name, value0, value1, value2);
        // pipelineInstance.set3i(name, value0, value1, value2, shader);
        ```
- Property with 4 values
    - Float
        ```javascript
        pipelineInstance.set4f(name, value0, value1, value2, value3);
        // pipelineInstance.set4f(name, value0, value1, value2, value3, shader);
        ```
    - uniform4fv
        ```javascript
        pipelineInstance.set4fv(name, value0, value1, value2, value3);
        // pipelineInstance.set4fv(name, value0, value1, value2, value3, shader);
        ```
    - Int
        ```javascript
        pipelineInstance.set4i(name, value0, value1, value2, value3);
        // pipelineInstance.set4i(name, value0, value1, value2, value3, shader);
        ```

#### onPreRender

- [Set uniform values](postfx-pipeline.md#set-uniform-values) in `onPreRender` method.

#### onDraw

- Ping-pong drawing
    - Variables : 
        - `renderTarget` : Render target, parameter of `onDraw` method.
        - `pipelineInstance.fullFrame1`, `pipelineInstance.fullFrame2` : Ping-pong render texture.
    - Steps
        1. Copy frame to `pipelineInstance.fullFrame1`
            ```javascript
            pipelineInstance.copyFrame(source, target);
            // pipelineInstance.copyFrame(source, target, brightness, clear, clearAlpha);
            ```
        1. [Set uniform values](postfx-pipeline.md#set-uniform-values)
        1. Bind and draw on `pipelineInstance.fullFrame1`, `pipelineInstance.fullFrame2`.
            ```javascript
            pipelineInstance.bindAndDraw(source, target);
            // pipelineInstance.bindAndDraw(source, target, clear, clearAlpha, shader);
            ```
        1. Draw result back
            ```javascript
            pipelineInstance.bindAndDraw(source);
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
- Or register post-fx pipeline at runtime
    ```javascript
    var pipelineManager = scene.sys.renderer.pipelines;
    pipelineManager.addPostPipeline(PostFxName, MyPostFxClass);
    ```

### Apply effect

```javascript
gameObject.setPostPipeline(MyPostFxClass);
```
```javascript
camera.setPostPipeline(MyPostFxClass);
```

Will create an effect instance then push it into postPipelines list.

### Get post-fx pipeline

```javascript
var pipelineInstance = gameObject.getPostPipeline(MyPostFxClass);
```
```javascript
var pipelineInstance = camera.getPostPipeline(MyPostFxClass);
```

### Remove post-fx pipeline

```javascript
gameObject.removePostPipeline(MyPostFxClass);
```
```javascript
camera.removePostPipeline(MyPostFxClass);
```

### Unregister post-fx pipeline

```javascript
var pipelineManager = scene.sys.renderer.pipelines;
pipelineManager.remove(PostFxName);
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