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
        // this.set1f('intensity', this._intensity);
    }
}
```

Set uniform values in `onPreRender` method

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
