## Introduction

Apply custom filter.

- Author: Phaser Team
- Filters shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos


## Usage

### Classes

```javascript
var FilterName = 'MyFilter';
```

Filter name used in [filter class](#filter-class) and [filter controller class](#filter-controller-class).

#### Filter shader

```javascript
var MyFilterFragmentShader = 
`
#pragma phaserTemplate(shaderName)

precision mediump float;

varying vec2 outTexCoord;

#pragma phaserTemplate(fragmentHeader)

void main ()
{
}
`
```

#### Filter class

```javascript
class MyFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader
{
    constructor (manager)
    {
        super(FilterName, manager, null, MyFilterFragmentShader);
    }

    setupUniforms (controller, drawingContext)
    {
        var programManager = this.programManager;

        programManager.setUniform('resolution', [ drawingContext.width, drawingContext.height ]);
        programManager.setUniform('strength', controller.strength);
    }
}
```

- `controller` : See [filter controller class](#filter-controller-class)


#### Filter controller class

```javascript
class MyFilterController extends Phaser.Filters.Controller
{
    constructor (camera)
    { 
        super(camera, FilterName);

        this.strength = 1;
    }
}
```

### Install

See [steps](shader-builtin.md#steps)