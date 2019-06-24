## Introduction

Execute callback when time-out, built-in object of phaser.

- Author: Richard Davey

## Usage

### Start timer

- Looped timer

    ```javascript
    var timer = scene.time.addEvent({
        delay: 500,                // ms
        callback: callback,
        //args: [],
        callbackScope: thisArg,
        loop: true
    });
    ```

- Repeat timer

    ```javascript
    var timer = scene.time.addEvent({
        delay: 500,                // ms
        callback: callback,
        //args: [],
        callbackScope: thisArg,
        repeat: 4
    });
    ```

- Oneshot timer

    ```javascript
    var timer = scene.time.delayedCall(delay, callback, args, scope);  // delay in ms
    ```

- All properties of timer

    ```javascript
    var timer = scene.time.addEvent({
        delay: 500,                // ms
        callback: callback,
        args: [],
        callbackScope: thisArg,
        loop: fasle,
        repeat: 0,
        startAt: 0,
        timeScale: 1,
        paused: false
    });
    ```

### Status of timer

- Get elapsed time

    ```javascript
    var elapsed = timer.getElapsed();   // ms
    var elapsed = timer.getElapsedSeconds(); // sec
    ```

- Get repeat count

    ```javascript
    var repeat = timer.getRepeatCount();
    ```

- Gets the progress of the current iteration

    ```javascript
    var progress = timer.getProgress();  // elapsed / delay
    ```

- Gets the progress of the timer overall, factoring in repeats.

    ```javascript
    var progress = timer.getOverallProgress();  // totalElapsed / totalDuration
    ```

- Get delay time

    ```javascript
    var delay = timer.delay;   // ms
    ```

- Is paused

    ```javascript
    var isPaused = timer.paused;
    ```

- Get time-scale

    ```javascript
    var timeScale = timer.timeScale;
    ```

### Methods of timer

- Pause timer
    ```javascript
    timer.paused = true;
    ```
- Resume timer
    ```javascript
    timer.paused = false;
    ```
- Remove timer from timeline
    ```javascript
    timer.remove();
    ```
- Set time-scale
    ```javascript
    timer.timeScale = 2;
    ```