## Introduction

Update timers, built-in object of phaser. Each scene has a timeline (`scene.time`) already.

- Author: Richard Davey

## Usage

### Time-scale

- Get time-scale

    ```javascript
    var timeScale = scene.time.timeScale;
    ```

- Set time-scale

    ```javascript
    scene.time.timeScale = 2;
    ```

### Pause or resume

- Pause

    ```javascript
    scene.time.paused = true;
    ```

- Resume

    ```javascript
    scene.time.paused = false;
    ```

### Create timeline object

```javascript
var timeline = new Phaser.Time.Clock(scene);
```