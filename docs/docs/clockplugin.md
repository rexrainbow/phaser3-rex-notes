## Introduction

A clock to count elapsed time.

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/clock/ClockPlugin.js)

## Usage

### Create instance

```javascript
var clock = new ClockPlugin(scene, {
    // timeScale: 1
});
```

Properties

- timeScale : time-scale for counting elapsed time.

### Start counting

```javascript
clock.start();
// clock.start(startAt);  // start-at time in ms
```

### Get elapsed time

```javascript
var now = clock.now;  // elapsed time in ms
```

### Pause, Resume, stop counting

```javascript
clock.pause();
clock.resume();
clock.stop();
```

### Seek elapsed time

```javascript
clock.seek(time);   // elapsed time in ms
```

### State of counting

```javascript
var isRunning = clock.isRunning;
```

### Time-scale

```javascript
var timeScale = clock.timeScale;
clock.timeScale = 0.5;
```