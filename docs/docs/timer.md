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
        loop: false,
        repeat: 0,
        startAt: 0,
        timeScale: 1,
        paused: false
    });
    ```
- Reuse timer
    ```javascript
    timer.reset({
        delay: 500,                // ms
        callback: callback,
        args: [],
        callbackScope: thisArg,
        loop: false,
        repeat: 0,
        startAt: 0,
        timeScale: 1,
        paused: false
    })
    scene.time.addEvent(timer);
    ```

### Pause/resume

- Pause timer
    ```javascript
    timer.paused = true;
    ```
- Resume timer
    ```javascript
    timer.paused = false;
    ```
- Is paused
    ```javascript
    var isPaused = timer.paused;
    ```

### Stop

- Stop a running timer
    ```javascript
    timer.remove();
    ```
- Remove from timeline's all internal lists, for timer re-using
    ```javascript
    scene.time.removeEvent(timer);
    ```

### Time scale

- Set
    ```javascript
    timer.timeScale = 2;
    ```
- Get
    ```javascript
    var timeScale = timer.timeScale;
    ```

### Other properties

- Get elapsed time
    ```javascript
    var elapsed = timer.getElapsed();   // ms
    var elapsed = timer.getElapsedSeconds(); // sec
    // var elapsed = timer.elapsed;  // ms
    ```
- Get remaining time
    ```javascript
    var remaining = timer.getRemaining();   // ms
    var remaining = timer.getRemainingSeconds(); // sec
    // var remaining = timer.getOverallRemaining();   // ms
    // var remaining = timer.getOverallRemainingSeconds(); // sec
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