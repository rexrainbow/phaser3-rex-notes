## Introduction

Pre fx pipelines for texture-base game objects. 
A texture-base game object has a pre-fx effect.

- Author: Richard Davey

!!! warning "WebGL only"
    All kinds of post fx pipelines only work in WebGL render mode.

## Usage

### Post fx pipeline class

```javascript
class MyPreFxClass extends Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
    constructor(game) {
        super({
            game: game,
            fragShader: '...',  // GLSL shader
        });
    }

    onDraw(renderTarget) {
        var sprite = this.tempSprite;
        this.set1f('intensity', sprite._intensity);

        super.onDraw(renderTarget);
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

#### onDraw

- [Set uniform values](prefx-pipeline.md#set-uniform-values) in `onDraw` method.

### Add pre-fx pipeline instance

```javascript
var pipelineManager = scene.sys.renderer.pipelines;
var pipelineInstance = pipelineManager.add(PreFxName, new MyPreFxClass(scene.game));
```

### Apply effect

```javascript
gameObject.setPipeline(pipelineInstance);
```

Will replace current effect instance.

### Get pre-fx pipeline

```javascript
var pipelineInstance = gameObject.pipeline;
```

### Reset to default effect

```javascript
gameObject.resetPipeline();
```

### Unregister pre-fx pipeline

```javascript
var pipelineManager = scene.sys.renderer.pipelines;
pipelineManager.remove(PreFxName);
```
