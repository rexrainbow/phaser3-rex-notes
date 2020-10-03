## Introduction

Render pipelines for camera of game objects (with texture).

- Author: Richard Davey

## Usage

### Add pipeline instance

```javascript
var config = {
    game: scene.game,
    fragShader: '...',  // GLSL shader
    name: 'WebGLPipeline',
    uniforms: []
};
var pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.MultiPipeline(config);
scene.game.renderer.addPipeline(pipelineName, pipelineInstance);
```

- `name` : Name of the pipeline. Used for identification.
- `uniforms` : String array of the shader uniforms.
- `pipelineName` : Name of this render pipeline, a string.

#### Camera effect

- Add filter
    ```javascript
    camera.setRenderToTexture(pipelineInstance);
    ```
    - `pipelineName` :
        - A string : Name of this render pipeline
        - A pipeline instance
- Clear filter
    ```javascript
    camera.clearRenderToTexture();
    ```

#### Game object effect

- Add filter
    ```javascript
    gameObject.setPipeline(pipelineName);
    ```
    - `pipelineName` : Name of this render pipeline, a string.
- Reset custom render pipeline to defaule render pipeline
    ```javascript
    gameObject.resetPipeline();
    ```
- Get current name of render pipeline:
    ```javascript
    var pipelineName = gameObject.getPipelineName();
    ```

#### Set properties of filter

- Property with 1 value
    - Float
        ```javascript
        pipelineInstance.set1f(name, value0);
        ```
    - uniform1fv
        ```javascript
        pipelineInstance.set1fv(name, value0);
        ```
    - Int
        ```javascript
        pipelineInstance.set1i(name, value0);
        ```
- Property with 2 values
    - Float
        ```javascript
        pipelineInstance.set2f(name, value0, value1);
        ```
    - uniform2fv
        ```javascript
        pipelineInstance.set2fv(name, value0, value1);
        ```
    - Int
        ```javascript
        pipelineInstance.set2i(name, value0, value1);
        ``` 
- Property with 3 value
    - Float
        ```javascript
        pipelineInstance.set3f(name, value0, value1, value2);
        ```
    - uniform3fv
        ```javascript
        pipelineInstance.set3fv(name, value0, value1, value2);
        ```
    - Int
        ```javascript
        pipelineInstance.set3i(name, value0, value1, value2);
        ```
- Property with 4 values
    - Float
        ```javascript
        pipelineInstance.set4f(name, value0, value1, value2, value3);
        ```
    - uniform4fv
        ```javascript
        pipelineInstance.set4fv(name, value0, value1, value2, value3);
        ```
    - Int
        ```javascript
        pipelineInstance.set4i(name, value0, value1, value2, value3);
        ```

### Remove pipeline instance

```javascript
scene.game.renderer.removePipeline(pipelineName);
```

### Get pipeline instance

```javascript
var pipelineInstance = scene.game.renderer.getPipeline(pipelineName);
```

- `pipelineInstance` : Pipeline instance, or `null` if not found.

### Has pipeline instance

```javascript
var hasPipelineInstance = scene.game.renderer.hasPipeline(pipelineName);
```
