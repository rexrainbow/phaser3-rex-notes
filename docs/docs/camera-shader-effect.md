## Introduction

Shader effect of camera.

- Author: Richard Davey

## Usage

### Setup

1. Create filter
   ```javascript
    var config = {
        game: scene.game,
        renderer: scene.game.renderer,
        fragShader: '...'  // GLSL shader
    };
    var customPipeline = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);
    var filter = scene.game.renderer.addPipeline(pipelineName, customPipeline);
    ```
    - `pipelineName` : Name of this render pipeline, a string.
1. Add filter
    ```javascript
    camera.setRenderToTexture(filter);
    ```
1. Set/change properties of filter
    - Property with 1 value
        - Float
            ```javascript
            filter.setFloat1(name, value0);
            ```
        - uniform1fv
            ```javascript
            filter.setFloat1v(name, value0);
            ```
        - Int
            ```javascript
            filter.setInt1(name, value0);
            ```
    - Property with 2 values
        - Float
            ```javascript
            filter.setFloat2(name, value0, value1);
            ```
        - uniform2fv
            ```javascript
            filter.setFloat2v(name, value0, value1);
            ```
        - Int
            ```javascript
            filter.setInt2(name, value0, value1);
            ``` 
    - Property with 3 value
        - Float
            ```javascript
            filter.setFloat3(name, value0, value1, value2);
            ```
        - uniform3fv
            ```javascript
            filter.setFloat3v(name, value0, value1, value2);
            ```
        - Int
            ```javascript
            filter.setInt3(name, value0, value1, value2);
            ```
    - Property with 4 values
        - Float
            ```javascript
            filter.setFloat4(name, value0, value1, value2, value3);
            ```
        - uniform4fv
            ```javascript
            filter.setFloat4v(name, value0, value1, value2, value3);
            ```
        - Int
            ```javascript
            filter.setInt4(name, value0, value1, value2, value3);
            ```

### Other methods

- Change filter
    ```javascript
    camera.setPipeline(pipelineName);
    ```
    or
    ```javascript
    camera.setPipeline(filter);
    ```
    - `pipelineName` : Name of this render pipeline, a string.
- Clear filter
    ```javascript
    camera.clearRenderToTexture();
    ```