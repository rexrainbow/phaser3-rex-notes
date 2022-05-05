## Introduction

Chain a series of [tween tasks](tween.md), built-in object of phaser.

- Author: Richard Davey

## Usage

### Create timeline, then chain tween tasks

1. Create timeline
    ```javascript
    var timeline = scene.tweens.createTimeline();
    ```
2. Add tween task configuration
    ```javascript
    timeline.add({
        targets: gameObject,
        x: 400,               // '+=100'
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        repeat: 0,            // -1: infinity
        yoyo: false,
        // offset: '-=500',   // starts 500ms before previous tween ends
    })
    ```
    - `offset` : Start this tween task with a time offset.
        - A number : Absolute offsets, start this tween task after timeline start.
        - A string, `'-=n'` : Relative offsets, start this tween task before previous tween ends.
3. Start tween tasks
    ```javascript
    timeline.play();
    ```

### Create timeline, included tween tasks

```javascript
var timeline = scene.tweens.timeline({
    targets: gameObject,
    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    easeParams:

    duration: 1000,
    delay: 0,
    loop: 0,
    hold: 0,
    repeat: 0,
    loopDelay: 0,
    completeDelay: 0,
    yoyo: false,

    paused: false,
    useFrames: false,
    flipX: false,
    flipY: false,


    tweens: [
        {
            targets: gameObject,
            x: 400,               // '+=100'
            // ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            // duration: 1000,
            // repeat: 0,            // -1: infinity
            // yoyo: false,
            // offset: '-=500',   // starts 500ms before previous tween ends
        },
        // ...
    ],


    callbackScope: timeline,

    onStart: function () {},
    onStartScope: 
    onStartParams: [],

    onUpdate: function () {},
    onUpdateScope:
    onUpdateParams: [],

    onLoop: function () {},
    onLoopScope:
    onLoopParams: [],

    onYoyo: function () {},
    onYoyoScope:
    onYoyoParams: [],

    onComplete: function () {},
    onCompleteScope:
    onCompleteParams: [],

    totalDuration: 0,

});
```