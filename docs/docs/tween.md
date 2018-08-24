## Introduction

Change properties by tween equations, built-in object of phaser.

- Author: Richard Davey

## Usage

### Create tween task

```javascript
var tween = scene.tweens.add({
    targets: gameObject,
    x: 400,               // '+=100'
    y: 300,               // '+=100'
    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 1000,
    repeat: 0,            // -1: infinity
    yoyo: false
});
```

or

```javascript
var tween = scene.tweens.add({
    targets: gameObject,
    paused: false,
    callbackScope: tween,

    // timming/callback of each state
    onStart: function () {},
    onStartScope: callbackScope,
    onStartParams: [],

    // initial delay
    delay: 0,

    // tween duration
    duration: 1000,
    ease: 'Linear',
    easeParams: null,

    onUpdate: function () {},
    onUpdateScope: callbackScope,
    onUpdateParams: [],

    // delay between tween and yoyo
    hold: 0,
    yoyo: false,  // true to tween backward
    flipX: false,
    flipY: false,
    onYoyo: function () {},
    onYoyoScope: callbackScope,
    onYoyoParams: [],

    // repeat count (-1: infinite)
    repeat: 0,
    onRepeat: function () {},
    onRepeatScope: callbackScope,
    onRepeatParams: [],
    // delay to next pass
    repeatDelay: 0,

    // loop count (-1: infinite)
    loop: 0,
    onLoop: function () {},
    onLoopScope: callbackScope,
    onLoopParams: [],
    // delay to next loop
    loopDelay: 0,

    // delay to onComplete callback
    completeDelay: 0,
    onComplete: function () {},
    onCompleteScope: callbackScope,
    onCompleteParams: [],
    // timming/callback of each state

    // properties:
    x: '+=600',        // start from current value
    y: 500,
    rotation: ...
    angle: ...
    alpha: ...
    // ...

    // or
    props: {
        x: { value: '+=600', duration: 3000, ease: 'Power2' },
        y: { value: '500', duration: 1500, ease: 'Bounce.easeOut' }
    },

    // or
    props: {
       x: {
           duration: 400,
           yoyo: true,
           repeat: 8,
           ease: 'Sine.easeInOut',
           value: {
               getEnd: function (target, key, value)
               {
                   destX -= 30;
                   return destX;
               },
               getStart: function (target, key, value)
               {
                   return value + 30;
               }
           }
       },
       ....
    },

    offset: null,
    useFrames: false
});
```

- `targets` : The targets the tween is updating.
- `delay` : The time the tween will wait before it first starts
- `duration` : The duration of the tween
- `ease` : The ease function used by the tween
- `easeParams` : The parameters to go with the ease function (if any)
- `hold` : The time the tween will pause before running a yoyo
- `repeat` : The number of times the tween will repeat itself (a value of 1 means the tween will play twice, as it repeated once)
- `repeatDelay` : The time the tween will pause for before starting a repeat. The tween holds in the start state.
- `yoyo` : boolean - Does the tween reverse itself (yoyo) when it reaches the end?
- `flipX` : flip X the GameObject on tween end
- `flipY` : flip Y the GameObject on tween end
- `offset` : Used when the Tween is part of a Timeline
- `completeDelay` : The time the tween will wait before the onComplete event is dispatched once it has     completed
- `loop` : `-1` for an infinite loop
- `loopDelay`
- `paused` : Does the tween start in a paused state, or playing?
- `useFrames` : Use frames or milliseconds?
- `props` : The properties being tweened by the tween
- `onStart` : callback which fired when tween task started
- `onUpdate` : callback which fired when tween task updated
- `onComplete` : callback which fired when tween task done
- `onYoyo` : callback which fired when tween reversed (yoyo)
- `onRepeat` : callback which fired when repeat started

#### Ease equations

- `Power0` : Linear
- `Power1` : Quadratic.Out
- `Power2` : Cubic.Out
- `Power3` : Quartic.Out
- `Power4` : Quintic.Out
- `Linear`
- `Quad` : Quadratic.Out
- `Cubic` : Cubic.Out
- `Quart` : Quartic.Out
- `Quint` : Quintic.Out
- `Sine` : Sine.Out
- `Expo` : Expo.Out
- `Circ` : Circular.Out
- `Elastic` : Elastic.Out
- `Back` : Back.Out
- `Bounce` : Bounce.Out
- `Stepped`
- `Quad.easeIn`
- `Cubic.easeIn`
- `Quart.easeIn`
- `Quint.easeIn`
- `Sine.easeIn`
- `Expo.easeIn`
- `Circ.easeIn`
- `Back.easeIn`
- `Bounce.easeIn`
- `Quad.easeOut`
- `Cubic.easeOut`
- `Quart.easeOut`
- `Quint.easeOut`
- `Sine.easeOut`
- `Expo.easeOut`
- `Circ.easeOut`
- `Back.easeOut`
- `Bounce.easeOut`
- `Quad.easeInOut`
- `Cubic.easeInOut`
- `Quart.easeInOut`
- `Quint.easeInOut`
- `Sine.easeInOut`
- `Expo.easeInOut`
- `Circ.easeInOut`
- `Back.easeInOut`
- `Bounce.easeInOut`

### Pause / Resume task

```javascript
tween.pause();
```

```javascript
tween.resume();
```

```javascript
var isPlaying = tween.isPlaying();
var isPaused = tween.isPaused();
```

### Stop task

```javascript
tween.stop();
```

### Play task

```javascript
tween.play();
```

### Restart task

```javascript
tween.restart();
```

### Time-scale

```javascript
tween.setTimeScale(v);
// tween.timeScale = timescale;
```

```javascript
var timeScale = tween.getTimeScale();
// var timeScale = tween.timeScale;
```

#### Global time-scale

```javascript
var timeScale = scene.tweens.timeScale;
```

```javascript
scene.tweens.timeScale = timescale;
```

### Tween value

1. Create tween task
    ```javascript
    var tween = scene.tweens.addCounter({
        from: 0,
        to: 1,
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        repeat: 0,            // -1: infinity
        yoyo: false,
    });
    ```
    or
    ```javascript
    var tween = scene.tweens.addCounter({
        from: 0,
        to: 1,
        // ...
    });
    ```
1. Get value
    ```javascript
    var value = tween.getValue();
    ```

### Custom ease function

```javascript
var tween = scene.tweens.add({
    targets: gameObject,
    // ...
    ease: function (t) {  // t: 0~1
        return value;     // value: 0~1
    },
    // ...
});
```

### Flow chart

```mermaid
graph TB

Start((Start)) --> CallbackOnStart
CallbackOnStart>"Callback: onStart"] --> ActiveDelay["delay"]
ActiveDelay --> DurationForward["Tween forward<br>Callback: onUpdate<br>(duration)"]

subgraph A pass

DurationForward --> Hold["hold"]
Hold --> IsYoyo{Is yoyo}
IsYoyo --> |Yes| CallbackOnYoyo>"Callback: onYoyo"]
CallbackOnYoyo --> DurationBackward["Tween backword<br>Callback: onUpdate<br>(duration)"]
DurationBackward --> IsRepeat{"Repeat count > 0"}
IsYoyo --> |No| IsRepeat
IsRepeat --> |Yes| CallbackOnRepeat>"Callback: onRepeat"]
CallbackOnRepeat --> RepeatDelay["repeatDelay"]
RepeatDelay --> DurationForward

end

IsRepeat --> |No| IsLoop{"Loop count > 0"}

IsLoop --> |Yes| CallbackOnLoop
CallbackOnLoop>"Callback: onLoop"] --> LoopDelay["loopDelay"]
LoopDelay --> DurationForward

IsLoop --> |No| CompleteDelay
CompleteDelay["completeDelay"] --> CallbackOnComplete>"Callback: onComplete"]
CallbackOnComplete --> End((End))
```