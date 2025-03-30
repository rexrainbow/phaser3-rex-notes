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
var MyFilterName = 'MyFilter';
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
class MyFilterClass extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader
{
    constructor (manager)
    {
        super(MyFilterName, manager, null, MyFilterFragmentShader);
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
        super(camera, MyFilterName);

        this.strength = 1;
    }
}
```

### Install

#### Register filter class

```javascript
var renderNodeManager = scene..sys.game.renderer.renderNodes;
if (!renderNodeManager.hasNode(MyFilterName)) {
    renderNodeManager.addNodeConstructor(MyFilterName, MyFilterClass);
}
```

#### Add controller instance

```javascript
// gameObject.enableFilters();
var filterList = gameObject.filters.internal;
filterList.add(new MyFilterController(filterList.camera));
```

or

```javascript
var filterList = camera.filters.internal;
filterList.add(new MyFilterController(filterList.camera));
```
