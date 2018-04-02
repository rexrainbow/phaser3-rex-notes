## Introduction

Change properties by tween equations, built-in object of phaser.

- Author: Richard Davey

## Usage

### Create tween task

```javascript
var tween = scene.tweens.add({
    targets: gameobject,
    // delay: 0,
    // duration: 1000,
    // ease: 'Power0',
    // easeParams: null,
    // hold: 0,
    // repeat: 0,
    // repeatDelay: 0,
    // yoyo: false,
    // flipX: false,
    // flipY: false,

    // offset: null,
    // completeDelay: 0,
    // loop: 0
    // loopDelay: 0,
    // paused: false,
    // useFrames: false,

    // properties:
    // x: '+=600'
    // y: 500
    // rotation:
    // angle:
    // alpha:
    // ...

    // or
    // props: {
    //     x: { value: '+=600', duration: 3000, ease: 'Power2' },
    //     y: { value: '500', duration: 1500, ease: 'Bounce.easeOut' }
    // },

    // onStart: function () {},
    // onComplete: function () {},
    // onYoyo: function () {},
    // onRepeat: function () {}
});
```

- targets: The targets the tween is updating.
- delay: The time the tween will wait before it first starts
- duration: The duration of the tween
- ease: The ease function used by the tween
- easeParams: The parameters to go with the ease function (if any)
- hold: The time the tween will pause before running a yoyo
- repeat: The number of times the tween will repeat itself (a value of 1 means the tween will play twice, as it repeated once)
- repeatDelay: The time the tween will pause for before starting a repeat. The tween holds in the start state.
- yoyo: boolean - Does the tween reverse itself (yoyo) when it reaches the end?
- flipX: flip X the GameObject on tween end
- flipY: flip Y the GameObject on tween end
- offset: Used when the Tween is part of a Timeline
- completeDelay: The time the tween will wait before the onComplete event is dispatched once it has completed
- loop: The time the tween will pause before starting either a yoyo or returning to the start for a repeat
- loopDelay:
- paused: Does the tween start in a paused state, or playing?
- useFrames: Use frames or milliseconds?
- props: The properties being tweened by the tween
- onStart: callback which fired when tween task started
- onComplete: callback which fired when tween task done
- onYoyo: callback which fired when tween reversed (yoyo)
- onRepeat: callback which fired when repeat started

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
var isPlaying = tween.isPlaying()
```

### Time-scale

```javascript
var timeScale = tween.timeScale;
```

```javascript
tween.timeScale = timescale;
```

#### Global time-scale

```javascript
var timeScale = scene.tweens.timeScale;
```

```javascript
scene.tweens.timeScale = timescale;
```