## Introduction

Shader effect of camera.

- Author: Richard Davey

## Usage

### Setup

1. [Add render pipeline instance](render-pipeline.md#add-pipeline-instance)
1. Add filter
    ```javascript
    camera.setRenderToTexture(pipelineName);
    ```
    - `pipelineName` :
        - A string : Name of this render pipeline
        - A pipeline instance
1. [Set properties of piepline instance](render-pipeline.md#set-properties-of-filter)

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