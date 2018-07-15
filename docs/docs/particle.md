## Introduction

Particle uses its own lightweight physics system, and can interact only with its Emitter's bounds and zones. Built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

See [loader](loader.md#image)

### Add particle

1. Create a particle manager
    ```javascript
    var particles = scene.add.particles(key);
    ```
1. Create a particle emitter
    ```javascript
    var config = {
        // **basic properties of particles**
        // **position**
        // x: 0,             // { min, max }, or { min, max, steps }
        // y: 0,             // { min, max }, or { min, max, steps }
        // follow: null,
        // followOffset: {
        //    x: 0,
        //    y: 0
        // }

        // **angle**
        // radial: true,
        // angle: { min: 0, max: 360 },  // { start, end, steps }

        // **scale**
        // scale: 1,             // { start, end },
        // scaleX: 1,
        // scaleY: 1, 

        // **render**
        // frame: 
        // alpha: 1,      
        // visible: true,          
        // tint: 0xffffffff,     // a number 0xfffffff, or an array [ 0xffff00, 0xff0000, 0x00ff00, 0x0000ff ]
        // blendMode: 'NORMAL',  // Phaser.BlendModes

        // delay: 0,
        // lifespan: 1000,       // { min, max }, or { min, max, steps }


        // **physics**
        // speed:                // { min, max }, or { min, max, steps }
        // speedX:               // { min, max }, or { min, max, steps }
        // speedY:               // { min, max }, or { min, max, steps }
        // gravityX:
        // gravityY:
        // accelerationX:
        // accelerationY:
        // maxVelocityX: 10000,
        // maxVelocityY: 10000,
        // moveToX:
        // moveToY:

        // **bounce**
        // bounce: 0,
        // bounds: nul,           // { x, y, width, height }
        // collideBottom: true,
        // collideTop: true,
        // collideLeft: true,
        // collideRight : true,


        // **callback**
        // deathCallback: null,
        // deathCallbackScope: null,
        // emitCallback: null,
        // emitCallbackScope: null,


        // **custom particle**
        // particleClass: Phaser.GameObjects.Particles.Particle

        // **emitter**
        // name: '',        
        // on: true,
        // active: true,
        // frequency: 0,
        // quantity: 1,
        // maxParticles: 0,
        // rotate: 0,
        // timeScale: 1,

        // emitZone: {
        // type: 'random',    // 'random', or 'edge'
        // source: geom,      // Geom like Circle, or a Path or Curve

        // **type = edge**
        // quantity: 1,
        // stepRate: 0,
        // yoyo: false,
        // seamless: true
        // }
    };
    var emitter = particles.createEmitter(config);
    ```

### Z index of emitters

Z index of emitters is the same as `particles.emitters` (an array).

- Bring an emitter to top
    ```javascript
    particles.emitters.bringToTop(emitter);
    ```
- Send an emitter to bottom
    ```javascript
    particles.emitters.sendToBack(emitter);
    ```
- Move an emitter up
    ```javascript
    particles.emitters.moveUp(emitter);
    ```
- Move an emitter down
    ```javascript
    particles.emitters.moveDown(emitter);
    ```
- Move an emitter to index
    ```javascript
    particles.emitters.moveTo(emitter, index);
    ```
- Reverse order
    ```javascript
    particles.emitters.reverse();
    ```
- Shuffle order
    ```javascript
    particles.emitters.shuffle();
    ```
- Swap 2 emitters
    ```javascript
    particles.emitters.swap(emitter0, emitter1);
    ```