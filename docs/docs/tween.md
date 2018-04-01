## Introduction

Change properties by tween equations, built-in object of phaser.

- Author: Richard Davey

## Usage

### Create tween task

```javascript
var tween = scene.tweens.add({
    targets: gameobject,
    // delay: 0,
    // duration: 1000,             // ms
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