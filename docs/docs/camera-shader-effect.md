## Introduction

Shader effect of camera.

- Author: Richard Davey

## Usage

### Setup

1. [Add render pipeline instance](render-pipeline.md#add-pipeline-instance)
1. Add custom pipeline
    - Post-pipeline
        ```javascript
        camera.setPostPipeline(pipelineName);
        ```
        - `pipelineName` : 
            - A string name of this render pipeline
            - A pipeline instance
1. [Set properties of piepline instance](render-pipeline.md#set-properties-of-filter)

### Reset

- Reset pipeline and remove post-pipeline
    ```javascript
    camera.resetPipeline(true);
    ```
- Reset pipeline only
    ```javascript
    camera.resetPipeline();
    ```
    or
    ```javascript
    camera.pipeline = camera.defaultPipeline;
    ```
- Remove post-pipeline
    ```javascript
    camera.setPostPipeline();
    ```
    or
    ```javascript
    camera.postPipeline = null;
    ```

### Get name

- Pipeline
    ```javascript
    var pipelineName = camera.getPipelineName();
    ```
- Post-pipeline
    ```javascript
    var pipelineName = camera.getPostPipelineName();
    ```