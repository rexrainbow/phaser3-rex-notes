## Introduction

Particle uses its own lightweight physics system, and can interact only with its Emitter's bounds and zones. Built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add particle

1. Create a particle manager
    ```javascript
    var particles = scene.add.particles(key);
    ```
    - Create particle manager and emitters
        ```javascript
        var particles = scene.add.particles(key, [
            emitterConfig0,
            emitterConfig1,
            // ...
        ]);
        ```
        or
        ```javascript
        var particles = scene.make.particles({
            key: key,
            // origin: {x: 0.5, y: 0.5},
            add: true,
            emitters: [
                emitterConfig0,
                emitterConfig1,
                // ...
            ]
        });
        ```
1. Create a particle emitter
    ```javascript
    var emitter = particles.createEmitter({
        // **basic properties of particles**
        // **initial position**
        // x: 0,             // { min, max }, or { min, max, steps }
        // y: 0,             // { min, max }, or { min, max, steps }
        // follow: null,
        // followOffset: {
        //    x: 0,
        //    y: 0
        // },
        // **emit zone**
        // emitZone: {
        //     type: 'random',    // 'random', or 'edge'
        //     source: geom,      // Geom like Circle, or a Path or Curve
        //     **type = edge**
        //     quantity: 1,
        //     stepRate: 0,
        //     yoyo: false,
        //     seamless: true
        // },

        // **target position**
        // moveToX:          // { min, max }, or { min, max, steps }
        // moveToY:          // { min, max }, or { min, max, steps }
        // **death zone**
        // deathZone: {
        //      type: 'onEnter',  // 'onEnter', or 'onLeave'
        //      source: geom      // Geom like Circle or Rect that supports a 'contains' function
        // }

        // **angle**
        // radial: true,
        // angle: { min: 0, max: 360 },  // { start, end, steps }

        // **scale**
        // scale: 1,             // { start, end },
        // scaleX: 1,
        // scaleY: 1,

        // **render**
        // frame:                // one or more texture frames, or a configuration object.
        // alpha: 1,             // { min, max }
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

        // **bounce**
        // bounce: 0,
        // bounds: nul,           // Phaser.Geom.Rectangle, or { x, y, width, height }
        // collideBottom: true,
        // collideTop: true,
        // collideLeft: true,
        // collideRight : true,

        // **callback**
        // emitCallback: null,
        // emitCallbackScope: null,
        // deathCallback: null,
        // deathCallbackScope: null,

        // **custom particle**
        // particleClass: Phaser.GameObjects.Particles.Particle

        // **emitter**
        // name: '',
        // on: true,          // set false to stop emitter
        // active: true,      // set false to pause emitter and particles
        // frequency: 0,      // -1 for exploding emitter
        // quantity: 1,       // { min, max }
        // maxParticles: 0,
        // reserve: 0,
        // rotate: 0,         // { start, end }, or { start, end, ease }
        // timeScale: 1,

    });
    ```
    - Format of value
        - `{min, max}` : Pick a random value between min and max
        - `{start, end}` : Pick values incremented continuously across a range. (`ease`=`'Linear'`)
            - `{start, end, ease}`
            - `{start, end, ease, easeParams}`
        - `{start, end, steps}` : Pick values incremented by steps across a range.
        - `{start, end, random}`
            - `random`: `true` or `false`
        - `{random:[start, end]}` : Pick a random number between start and and.
        - `{min, max, steps}` : Pick values between min to max, with steps.
        - `{onEmit: function(particle, key, t, value) {return value}}` : Get return value from a function invoking.
    - `on` : Controls if the emitter is currently emitting a particle flow (when frequency >= 0). Already alive particles will continue to update until they expire.
    - `active` : Whether this emitter updates itself and its particles.
    - `frequency`
        - `0` : One particle flow cycle for each logic update (the maximum flow frequency).
        - `> 0` : The time interval between particle flow cycles in ms.
        - `-1` : Exploding emitter.
    - `maxParticles`
        - `0` : Unlimited.
        - `> 0` : Hard limit the amount of particle objects.
    - `frames` : One or more texture frames, or a configuration object.
        - String or number value
        - Array of string or number value
        - Configuration object :
            ```javascript
            {
                frames: [],
                cycle: false,
                quantity: 1
            }
            ```
    - `emitZone` :
        - [Emit zone](particles.md#emit-zone)
            ```javascript
            {
                type: 'random',
                source: geom,
            }            
            ```
        - [Emit edge](particles.md#emit-edge)
            ```javascript
            {
                type: 'edge',
                source: curve,
            
                quantity: 1,
                stepRate: 0,
                yoyo: false,
                seamless: true
            }            
            ```
    - [`deathZone`](particles.md#death-zone)
        ```javascript
        {
            type: 'onEnter',
            source: geom
        }
        ```
    - `lifespan` : The lifespan of emitted particles, in ms.
        - `Infinity` : Immortal particle.
    - `reserve` : Creates specified number of inactive particles and adds them to this emitter's pool.
    - `name` : The name of this Particle Emitter.
        - Get emitter by name
            ```javascript
            var emitter = particles.emitters.getByName(name);
            ```

### Emit zone

```javascript
emitter.setEmitZone({
    type: 'random',
    source: geom,
});
```

- `source` : Geom like [Circle](geom-circle.md), [Ellipse](geom-ellipse.md), [Rectangle](geom-rectangle.md),[Triangle](geom-triangle.md), [Polygon](geom-polygon.md), [BitmapZone](bitmapzone.md), or [Path or Curve](path.md), which has `getRandomPoint(point)` method
    - Custom zone
        ```javascript
        {
            getRandomPoint: function(point) {
                // point.x = ...
                // point.y = ...
                return point;
            }
        }
        ```

#### Zone source

- Get
    ```javascript
    var source = emitter.emitZone.source;
    ```

#### Clear zone

```javascript
emitter.setEmitZone();
```

### Emit edge

```javascript
emitter.setEmitZone({
    type: 'edge',
    source: curve,

    quantity: 1,
    stepRate: 0,
    yoyo: false,
    seamless: true
});
```

- `source` : Geom like [Circle](geom-circle.md), [Ellipse](geom-ellipse.md), [Rectangle](geom-rectangle.md),[Triangle](geom-triangle.md), [Polygon](geom-polygon.md), or [Path or Curve](path.md), which has `getPoints(quantity, stepRate)` method
    - Custom edge
        ```javascript
        {
            getPoints: function(quantity, stepRate) {
                // output = [point0, point1, ...];  // point: Phaser.Math.Vector2, or {x, y}
                return output;
            }
        }
        ```
- `quantity` : The number of particles to place on the source edge. Set to 0 to use `stepRate` instead.
- `stepRate` : The distance between each particle. When set, `quantity` is implied and should be set to 0.
- `yoyo` : Whether particles are placed from start to end and then end to start. Default is `false`.
- `seamless` : Whether one endpoint will be removed if it's identical to the other. Default is `true`.

!!! note "quantity or stepRate"
    - Any geometry like [circle](geom-circle.md), [ellipse](geom-ellipse.md), [kine](geom-line.md), [polygon](geom-polygon.md), [rectangle](geom-rectangle.md), [triangle](geom-triangle.md) source has *quantity*, or *stepRate*
    - [Curve](path.md) source has *quantity*, or *stepRate*
    - [Path](path.md) source only has *quantity*

#### Curve source

- Get curve source
    ```javascript
    var source = emitter.emitZone.source;
    ```
- Update points of curve source
    ```javascript
    emitter.emitZone.updateSource();
    ```
- Set source to another curve, also update points
    ```javascript
    emitter.emitZone.changeSource(curve);
    ```

#### Clear edge zone

```javascript
emitter.setEmitZone();
```

### Death zone

```javascript
emitter.setDeathZone({
     type: 'onEnter',
     source: geom
});
```

- `type` : 'onEnter' or 'onLeave'
- `source` : Geom like [Circle](geom-circle.md), [Ellipse](geom-ellipse.md), [Rectangle](geom-rectangle.md),[Triangle](geom-triangle.md), [Polygon](geom-polygon.md)
    - Custom `source` :
        ```javascript
        {
            contains: function (x, y) {
                // ...
                return bool;
            }
        }
        ```

#### Zone source

- Get
    ```javascript
    var source = emitter.deathZone.source;
    ```

#### Clear zone

```javascript
emitter.setDeathZone();
```

### Control

- Start
    ```javascript
    emitter.start();  // set `on` to true
    ```
- Stop
    ```javascript
    emitter.stop();   // set `on` to false
    ```
- Pause
    ```javascript
    emitter.pause();  // set `active` to false
    ```
- Resume
    ```javascript
    emitter.resume();  // set `active` to true
    ```
- Explode
    ```javascript
    emitter.explode(count, x, y);
    ```
- Emit
    ```javascript
    emitter.emitParticleAt(x, y, count);
    ```
    or
    ```javascript
    emitter.emitParticle(count, x, y);
    ```
- Kill all alive particles
    ```javascript
    emitter.killAll()
    ```

### Properties

```javascript
emitter.fromJSON(config);
```

#### Position

- Emitter
    - Position
        ```javascript
        emitter.setPosition(x, y);
        ```
    - Follow
        - Start
            ```javascript
            emitter.startFollow(target);
            // emitter.startFollow(target, offsetX, offsetY, trackVisible);
            ```
            - `trackVisible` : Whether the emitter's visible state will track the target's visible state.    
        - Stop
            ```javascript
            emitter.stopFollow();
            ```
- All emitters
    ```javascript
    particles.setPosition(x, y);
    ```
    or
    ```javascript
    particles.x = x;
    particles.y = y;
    ```    

#### Rotation

- Emitter
   ```javascript
   emitter.setRadial(bool);   // set true to emit particles in all directions between angle min and max
   emitter.setAngle(value);
   ```
- All emitters
    ```javascript
    particles.setAngle(angle); // angle in degrees
    // particles.setRotation(angle); // angle in radians
    ```
    or
    ```javascript
    particles.angle = angle;
    // particles.rotation = angle;
    ``` 

#### Scale

- Emitter
    ```javascript
    emitter.setScale(value);
    ```
    or
    ```javascript
    emitter.setScaleX(value);
    emitter.setScaleY(value);
    ```
- All emitters
    ```javascript
    particles.setScale(value);
    // particles.setScale(x, y);
    ```
    or
    ```javascript
    particles.scaleX = scaleX;
    particles.scaleY = scaleY;
    ``` 

#### Render

- Frame
    ```javascript
    emitter.setFrame(frames);  // pickRandom = true, quantity = 1
    emitter.setFrame(frames, pickRandom, quantity);
    ```
    - `frames` : One or more texture frames, or a configuration object.
        - String or number value
        - Array of string or number value
        - Configuration object :
            ```javascript
            {
                frames: [],
                cycle: false,
                quantity: 1
            }
            ```
    - `pickRandom` : Whether frames should be assigned at random from `frames`.
    - `quantity` : The number of consecutive particles that will receive each frame.
- Alpha
    ```javascript
    emitter.setAlpha(value);   // value: 0 ~ 1 
    ```
- Visible
   ```javascript
   emitter.setVisible(visible);  // visible: true/false
   ```
- Blend mode
   ```javascript
   emitter.setBlendMode(mode);  // Phaser.BlendModes
   ```

#### Physics

- Speed
    ```javascript
    emitter.setSpeed(value);
    ```
    or
    ```javascript
    emitter.setSpeedX(value);
    emitter.setSpeedY(value);
    ```
- Gravity
    ```javascript
    emitter.setGravity(x, y);
    ```
    or
    ```javascript
    emitter.setGravityX(value);
    emitter.setGravityY(value);
    ```
- Bounds
    ```javascript
    emitter.setBounds(x, y, width, height);
    ```
    or
    ```javascript
    emitter.setBounds(rect);
    ```
    - `rect` : Phaser.Geom.Rectangle, or { x, y, width, height }

#### Time

- Lifespan
    ```javascript
    emitter.setLifespan(value);  // time in ms
    ```
- Frequency
    ```javascript
    emitter.setFrequency(frequency, quantity);
    ```
    - `frequency` : The time interval (>= 0) of each flow cycle, in ms; or -1 to put the emitter in explosion mode.
    - `quantity` : The number of particles to release at each flow cycle or explosion.

#### Quantity

```javascript
emitter.setQuantity(quantity);
```

### Particles

- Hard limit the amount of particle objects
    ```javascript
    var count = emitter.maxParticles;
    ```
    - Whether this emitter is at its limit
        ```javascript
        var atLimit = emitter.atLimit();
        ```    
- Alive (active) particles
    - Amount of alive particles
        ```javascript
        var count = emitter.getAliveParticleCount();
        ```
    - Add callback for newly emitted particle
        ```javascript
        var callback = function(particle, emitter) { /* ... */ }
        emitter.onParticleEmit(callback, context);
        ```
        - Clear callback
            ```javascript        
            emitter.onParticleEmit();
            ```              
    - For each alive particle
        ```javascript
        var callback = function(particle, emitter) { /* ... */ }
        emitter.forEachAlive(callback, context);
        ```
- Dead (inactive) particles        
    - Amount of dead particles
        ```javascript
        var count = emitter.getDeadParticleCount();
        ```
    - Add callback for each particle death
        ```javascript
        var callback = function(particle, emitter) { /* ... */ }
        emitter.onParticleDeath(callback, context);
        ```
        - Clear callback
            ```javascript        
            emitter.onParticleDeath();
            ```        
    - For each dead particle
        ```javascript
        var callback = function(particle, emitter) { /* ... */ }
        emitter.forEachDead(callback, context);
        ```
    - Add dead particles into pool
        ```javascript
        emitter.reserve(count);
        ```
- Total (alive + dead) number of particles
    ```javascript
    var count = emitter.getParticleCount();
    ```
- Custom particle class
    ```javascript
    class MyParticle extends Phaser.GameObjects.Particles.Particle {
        constructor (emitter) {
            super(emitter);
            /* ... */
        }

        update (delta, step, processors) {
            super.update(delta, step, processors);
            /* ... */
        }
    }
    ```

#### Properties

- `emitter`
- `frame`
- `x`, `y`
- `angle` (degree), `rotation` (radians)
- `alpha`, `tint`, `color`    
- `velocityX`, `velocityY`
- `accelerationX`, `accelerationY`
- `maxVelocityX`, `maxVelocityY`
- `bounce`
- `scaleX`, `scaleY`
- `life`, `lifeCurrent`, `lifeT`

### Gravity well

- Create a gravity well
    ```javascript
    var well = particles.createGravityWell(x, y);
    //var well = particles.createGravityWell(x, y, power, epsilon, gravity);
    ```
    or
    ```javascript
    var well = particles.createGravityWell({
        // x: 0,
        // y: 0,
        // power: 0,
        // epsilon: 100,
        // gravity: 50
    });
    ```
- Enable
    - Active
       ```javascript
       well.active = true;
       ```
    - Inactive
       ```javascript
       well.active = false;
       ```
- Position
    ```javascript
    well.x = x;
    well.y = y;
    ```
- Gravity
    ```javascript
    well.gravity = value;
    ```
- Power
    ```javascript
    well.power = value;
    ```
- Custom gravity well
    ```javascript
    var well = {
        active: true,
        update: function(particle, delta) {
            // particle.velocityX = 
            // particle.velocityY =       
            // return dead;      
        }
    }
    particles.addGravityWell(well);
    ```
    - Return `true` to kill particle.

### Particles manager

#### Fire all emitters

```javascript
particles.emitParticleAt(x, y);
// particles.emitParticleAt(x, y, count);
```

#### Z index of emitters

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