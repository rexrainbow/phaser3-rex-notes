## Introduction

Warp transition post processing filter.

- Author: Richard Davey
- A post-fx shader effect

## Usage

[Reference](https://github.com/photonstorm/phaser3-warp-post-fx)

### Install plugin

#### Import class

- Get minify file from [github](https://github.com/photonstorm/phaser3-warp-post-fx/tree/main/dist)
- Add to game config
    ```javascript
    import { WarpPostFX } from './dist/WarpPostFX.js';  // Path to your minify file
    var config = {
        // ...
        pipeline: { WarpPostFX }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(WarpPostFX);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(WarpPostFX);
        ```

### Remove effect

```javascript
gameObject.removePostPipeline(WarpPostFX); // WarpPostFX class
```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = gameObject.getPostPipeline(WarpPostFX); // WarpPostFX class
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = camera.getPostPipeline(WarpPostFX); // WarpPostFX class
    ```

#### Set texture

```javascript
pipelineInstance.setTexture(textureKey, resizeMode);
```

- `textureKey` : The key of the texture to use.
- `resizeMode` : 
    - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
    - `1`, or `'contain'` : The target texture is resized to fit the source texture.
    - `2`, or `'cover'` : The target texture is resized to cover the source texture.   

### Progress

- Get
    ```javascript
    var progress = pipelineInstance.progress;
    ```
- Set
    ```javascript
    pipelineInstance.setProgress(value);  // value: 0~1
    ```
    or
    ```javascript
    pipelineInstance.progress = value;  // value: 0~1
    ```

### Direction

- Get
    ```javascript
    var direction = pipelineInstance.direction;  // {x, y}
    ```
    - Default value is `{x:-1, y:1}`
- Set
    ```javascript
    pipelineInstance.setDirection(x, y);  // x, y : 1, or -1
    ```

### Smoothness

- Get
    ```javascript
    var smoothness = pipelineInstance.smoothness;
    ```
- Set
    ```javascript
    pipelineInstance.setSmoothness(value);  // value: 0~1
    ```
    or
    ```javascript
    pipelineInstance.smoothness = value;  // value: 0~1
    ```

#### Resize mode

- Get
    ```javascript
    var mode = pipelineInstance.resizeMode;
    ```
- Set
    ```javascript
    pipelineInstance.setResizeMode(mode);
    ```
    - `mode` : 
        - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
        - `1`, or `'contain'` : The target texture is resized to fit the source texture.
        - `2`, or `'cover'` : The target texture is resized to cover the source texture.    
