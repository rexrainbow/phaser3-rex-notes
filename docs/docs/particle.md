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
        // x: 0,
        // y: 0,
        // follow: null,
        // followOffset: {
        //    x: 0,
        //    y: 0
        // }

        // **angle**
        // radial: true,
        // angle: { min: 0, max: 360 },

        // **scale**
        // scale: 1,             // { start, end },
        // scaleX: 1,
        // scaleY: 1, 

        // **render**
        // alpha: 1,      
        // visible: true,          
        // tint: 0xffffffff,
        // blendMode: 'NORMAL',  // Phaser.BlendModes

        // delay: 0,
        // lifespan: 1000,       // { min, max },        


        // **physics**
        // speed:                // { min, max },
        // speedX:
        // speedY:
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

    };
    var emitter = particles.createEmitter(config);
    ```