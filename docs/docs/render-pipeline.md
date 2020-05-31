## Introduction

Render pipelines for camera of game objects (with texture).

- Author: Richard Davey

## Usage

### Add pipeline instance

```javascript
var config = {
    game: scene.game,
    renderer: scene.game.renderer,
    fragShader: '...'  // GLSL shader
};
var pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);
scene.game.renderer.addPipeline(pipelineName, pipelineInstance);
```

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
        pipelineInstance.setFloat1(name, value0);
        ```
    - uniform1fv
        ```javascript
        pipelineInstance.setFloat1v(name, value0);
        ```
    - Int
        ```javascript
        pipelineInstance.setInt1(name, value0);
        ```
- Property with 2 values
    - Float
        ```javascript
        pipelineInstance.setFloat2(name, value0, value1);
        ```
    - uniform2fv
        ```javascript
        pipelineInstance.setFloat2v(name, value0, value1);
        ```
    - Int
        ```javascript
        pipelineInstance.setInt2(name, value0, value1);
        ``` 
- Property with 3 value
    - Float
        ```javascript
        pipelineInstance.setFloat3(name, value0, value1, value2);
        ```
    - uniform3fv
        ```javascript
        pipelineInstance.setFloat3v(name, value0, value1, value2);
        ```
    - Int
        ```javascript
        pipelineInstance.setInt3(name, value0, value1, value2);
        ```
- Property with 4 values
    - Float
        ```javascript
        pipelineInstance.setFloat4(name, value0, value1, value2, value3);
        ```
    - uniform4fv
        ```javascript
        pipelineInstance.setFloat4v(name, value0, value1, value2, value3);
        ```
    - Int
        ```javascript
        pipelineInstance.setInt4(name, value0, value1, value2, value3);
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
