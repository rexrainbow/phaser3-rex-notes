## Introduction

Schedule events to happen at specific times in the future, built-in object of phaser.

- Author: Richard Davey

## Usage

### Create timeline

```javascript
var timeline = scene.add.timeline([    
    {
        at: 0,
        in:
        from:

        set: {
            key: value,
        },
        
        tween: {
            targets: gameObject,
            alpha: 1,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false
        },

        run(){ 
            // this: target parameter
        },

        sound: '',

        event: '',

        // target: this,

        // once: false,
        // stop: false,
    },

    // ...
])
```

- Time
    - `at` : Absolute delay time after starting in ms.
    - `in` : Absolute delay time after current time in ms.
    - `from` : Relative delay time after previous event in ms
- Actions :
    - `set` : A key-value object of properties to set on the `target`.
    - `tween` : [tween config](tween.md#create-tween-task)
    - `run` : A function which will be called when the Event fires.
        ```javascript
        function() {
            // this: target parameter
        }
        ```
    - `sound` : 
        - A string : A key from the Sound Manager to play
        - A config object for a sound to play when the Event fires. 
            ```javascript
            {
                key,
                config
            }
            ```
            - `key` : The key of the sound to play
            - `config` : [config of playing sound](audio.md#configuration_1)
    - `event` : String-based event name to emit when the Event fires. The event is emitted from the Timeline instance.
        ```javascript
        timeline.on(eventName);
        ```
    - `target` : The scope (`this` object) with which to invoke the `run`.
- Control
    - `once` : If set, the Event will be removed from the Timeline when it fires.
    - `stop` : If set, the Timeline will stop and enter a complete state when this Event fires, even if there are other events after it.


The Timeline always starts paused.


### Start

```javascript
timeline.play();
```

Restart

```javascript
timeline.play(true);
```

### Stop

```javascript
timeline.stop();
```

### Pause / Resume

```javascript
timeline.pause();
// timeline.paused = true;
```

```javascript
timeline.resume();
// timeline.paused = false;
```

### Is playing

Timeline is currently playing, not paused or not complete.

```javascript
var isPlaying = timeline.isPlaying()
```

### Add event

```javascript
timeline.add(config);
```

or

```javascript
timeline.add([config0, config1, ...]);
```

### Clear all events

```javascript
timeline.clear();
```

### Destroy

Also remove updating.

```javascript
timeline.destroy();
```
