## Introduction

Shader effect of camera.

- Author: Richard Davey

## Usage

### Register post-fx pipeline

- Register post-fx pipeline in game config
    ```javascript
    import PostFxClass from 'path';
    var config = {
        // ...
        pipeline: [PostFxClass]
        // ...
    };
    var game = new Phaser.Game(config);
    ```

Some post-fx pipelines:

- [Color replace](shader-colorreplace.md): Replace color post processing filter.
- [Cross-stitching](shader-crossstitching.md): Cross-stitching post processing filter.
- [Glow-filter](shader-glowfilter.md): Glow post processing filter.
- [Glow-filter](shader-glowfilter2.md): Glow post processing filter, ported from pixi.
- [Gray-scale](shader-grayscale.md): Gray scale post processing filter.
- [Hsl-adjust](shader-hsladjust.md): Adjust color in HSL domain, post processing filter.
- [Inverse](shader-inverse.md): Inverse color post processing filter.
- [Kawase-blur](shader-kawaseblur.md): Kawase-blur post processing filter.
- [Pixelation](shader-pixelation.md): Pixelation post processing filter.
- [Toonify](shader-toonify.md): Draw outlines and quantize color in HSV domain, post processing filter.
- [Shockwave](shader-shockwave.md): Shockwave post processing filter.
- [Swirl](shader-swirl.md): Swirl post processing filter.
- [Dissolve](shader-dissolve.md): Dissolve transition post processing filter.
- [Split](shader-split.md): Split image into 4 parts.
- [Barrel](shader-barrel.md): Barrel post processing filter.
- [Fish eye](shader-fisheye.md): Fish-eye post processing filter.

### Add post-fx pipeline

```javascript
camera.setPostPipeline(PostFxClass);
```

- `PostFxClass` : Class of post-fx pipeline.

### Remove post-fx pipeline

- Remove a kind of post-fx pipeline
    ```javascript
    camera.removePostPipeline(PostFxClass);
    ```
- Remove all post-fx pipelines
    ```javascript
    camera.resetPipeline(true);
    ```
    or
    ```javascript
    camera.postPipelines = [];
    camera.hasPostPipeline = false;
    ```

### Get post-fx pipeline

```javascript
var pipelineInstance = camera.getPostPipeline(PostFxClass);
```

- `pipelineInstance` : 
    - A pipeline instance
    - An array of pipeline instances