## Introduction

Particles uses its own lightweight physics system, and can interact only with its Emitter's bounds and zones. Built-in game object of phaser.

- Author: Richard Davey

!!! note
    API is not compatible with 3.55.x

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add particle

```javascript
var particles = scene.add.particles(x, y, texture, {
    
    // EmitterOp
    accelerationX: 0,
    accelerationY: 0,
    alpha: 1,
    angle: { min: 0, max: 360 },
    bounce: 0,
    color: undefined,
    delay: 0,
    hold: 0,
    lifespan: 1000,
    maxVelocityX: 10000,
    maxVelocityY: 10000,
    moveToX: 0,
    moveToY: 0,
    quantity: 1,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    // scale:
    speedX: 0,
    speedY: 0,
    speed: 
    tint: 0xffffff,
    x: 0,
    y: 0,

    // Emitter properties
    active:
    advance:
    blendMode:
    colorEase:
    deathCallback:
    deathCallbackScope:
    duration:
    emitCallback:
    emitCallbackScope:
    // callbackScope    
    frequency:
    gravityX:
    gravityY:
    maxAliveParticles:
    maxParticles:
    name:
    emitting:
    particleBringToTop:
    particleClass:
    radial:
    sortCallback:
    sortOrderAsc:
    sortProperty:
    stopAfter:
    tintFill:
    timeScale:
    trackVisible:
    visible:

    // Position
    // emitZone : random-zone, edge-zone
    // random-zone
    emitZone: {
        type: 'random',
        source: geom,
    },

    // edge-zone
    emitZone:{
        type: 'edge',
        source: geom,
        quantity: 1,
        stepRate: 0,
        total: -1,
        yoyo: false,
        seamless: true
    },

    deathZone: {
        type: 'onEnter', // 'onEnter', or 'onLeave'
        source: geom,
    },

    bounds:               // {x, y, w, h}, or {x, y, width, height}, or Phaser.Geom.Rectangle
    collideLeft: true,
    collideRight: true,
    collideTop: true,
    collideBottom: true,

    follow:
    followOffset:{
       x: 0,
       y: 0
    },

    // Texture
    texture:
    frame:
    anim: [],  // string, or array of string
    
    reserve: 0,
    advance: 0
});
```

- Parameters of EmitterOp : Number, Random Array, Custom Callback, Stepped start/end, Eased start/end, min/max, Random object, Custom onEmit onUpdate, Interpolation
    - A number
    - `{min, max}` : Pick a random value between min and max
    - `{min, max, int}`
    - `{start, end}` : Pick values incremented continuously across a range. (`ease`=`'Linear'`)
        - `{start, end, ease}`
        - `{start, end, ease, easeParams}`
    - `{start, end, steps}` : Pick values incremented by steps across a range.
    - `{start, end, steps, yoyo: true}`
    - `{start, end, random}`
        - `random`: `true` or `false`
    - `{random: [start, end]}` : Pick a random number between start and and.
    - `[a, b, c, d]` : Pick a random number from an array.
    - `{min, max, steps}` : Pick values between min to max, with steps.
    - `{ values: [ a, b, c, d ], interpolation: 'catmull', ease: 'linear' }` : Interpolation (`linear`, `bezier`, `catmull`) in values array.
    - `function(particle, key, t, value) { return value; }`
    - `{onEmit, onUpdate}` : Get return value from a function invoking.
        ```javascript
        function(particle, key, t, value) {
            return value;
        }
        ```
- `active` : Whether this emitter updates itself and its particles.
    - `false` : Equal to pause.
- `advance` : If you wish to *fast forward* the emitter in time, set this value to a number representing the amount of ms the emitter should advance.
- `blendMode` : See [blend mode](blendmode.md)
- `colorEase` : The string-based name of the Easing function to use if you have enabled Particle color interpolation via the `color` property, otherwise has no effect.
- `deathCallback`, `deathCallbackScope`
    ```javascript
    function(particle) {

    }
    ```
- `emitCallback`, `emitCallbackScope`
    ```javascript
    function(particle, emitter) {

    }
    ```
- `duration` : Limit the emitter to emit particles for a maximum of `duration` ms. 
    - `0` : Forever, default behavior.
- `follow` : A Game Object whose position is used as the particle origin.
- `followOffset` : The offset of the particle origin from thefollow target.
- `frequency`
    - `0` : One particle flow cycle for each logic update (the maximum flow frequency).
    - `> 0` : The time interval between particle flow cycles in ms.
    - `-1` : Exploding emitter.
- `hold` : Frozen or 'held in place' after it has finished its lifespan for a set number of ms 
- `gravityX`, `gravityY`
- `maxAliveParticles`
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
- `anim` : 
    - String
    - Array of string
    - Configuration object :
        ```javascript
        {
            anim: [],  // Array of string
            cycle: false,
            quantity: 1
        }
        ```
- `particleBringToTop` : 
    - `true` : Newly emitted particles are added to the top of the particle list, i.e. rendered above those already alive. Default behavior.
- `sortCallback` : The callback used to sort the particles.
- `sortProperty` : Optionally sort the particles before they render based on this property. The property must exist on the `Particle` class, such as `y`, `lifeT`, `scaleX`, etc.
- `sortOrderAsc` : When `sortProperty` is defined this controls the sorting order, either ascending or descending.
- `stopAfter` : The Particle Emitter will stop emitting particles once this total has been reached. It will then enter a 'stopped' state, firing the `STOP` event.
- `radial` : A radial emitter will emit particles in all directions between angle min and max,
- `emitting` : Controls if the emitter is currently emitting a particle flow (when frequency >= 0). 
  Already alive particles will continue to update until they expire.
    - `false` : Equal to stop
- `tintFill` : 
- `timeScale` : The time rate applied to active particles, affecting lifespan, movement, and tweens. Values larger than 1 are faster than normal.
- `trackVisible` : Whether the emitter's `visible` state will track the follow target's visibility state.
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
        type: 'onEnter', // 'onEnter', or 'onLeave'
        source: geom
    }
    ```
- `bounds` : `{x, y, w, h}`, or `{x, y, width, height}`, or [Rectangle](geom-rectangle.md). 
- `collideLeft`, `collideRight`, `collideTop`, `collideBottom` : Whether particles interact with the left/right/top/bottom edge of the bounds.
- `name`
- [`particleClass`](particles.md#custom-particle-class)

### Control

- Start
    ```javascript
    emitter.start();
    // emitter.start(advance, duration);
    ```
    - `advance` : Advance this number of ms in time through the emitter.
    - `duration` : Limit this emitter to only emit particles for the given number of ms. Setting this parameter will override any duration already set in the Emitter configuration object.
- Stop
    ```javascript
    emitter.stop();
    // emitter.stop(kill);
    ```
    - `kill` : 
        - `true` : Kill all particles immediately
        - `false` : Leave them to die after their lifespan expires. Default behavior.
- Pause
    ```javascript
    emitter.pause();  // set `active` to false
    ```
- Resume
    ```javascript
    emitter.resume();  // set `active` to true
    ```
- Starts (or restarts) a particle flow.
    ```javascript
    emitter.flow(frequency, count, stopAfter);
    ```
    - `frequency` :
        - `>= 0` : The time interval of each flow cycle, in ms
        - `-1` : Explosion mode.
    - `count` : The number of particles to emit at each flow cycle.
    - `stopAfter` : Stop this emitter from firing any more particles once this value is reached. 
        - Setting this parameter will override any `stopAfter` value already set in the Emitter configuration object.
        - `0` : Unlimited
- Explode : Puts the emitter in explode mode (`frequency` = `-1`), stopping any current particle flow, and emits several particles all at once.
    ```javascript
    emitter.explode();
    // emitter.explode(count, x, y);
    ```
    - `count` : The number of Particles to emit.
    - `x`, `y` : The x, y coordinate to emit the Particles from.
- Emit : Emits particles at the given position. If no position is given, it will emit from this Emitters current location.
    ```javascript
    emitter.emitParticleAt();
    // emitter.emitParticleAt(x, y, count);    
    ```
    or
    ```javascript
    emitter.emitParticle(count, x, y);
    ```
    - `count` : The number of Particles to emit.
    - `x`, `y` : The x, y coordinate to emit the Particles from.
- Fast forward
    ```javascript
    emitter.fastForward(time, delta);
    ```
    - `time` : The number of ms to advance the Particle Emitter by.
    - `delta` : The amount of delta to use for each step. Defaults to `1000 / 60`.
- Kill all alive particles
    ```javascript
    emitter.killAll()
    ```

### Follow target

- Start
    ```javascript
    emitter.startFollow(target);
    // emitter.startFollow(target, offsetX, offsetY, trackVisible);
    ```
    - `target` : The Game Object to follow.
    - `offsetX`, `offsetY` : Horizontal/vertical offset of the particle origin from the Game Object.
    - `trackVisible` : Whether the emitter's visible state will track the target's visible state.    
- Stop
    ```javascript
    emitter.stopFollow();
    ```

### Frame

```javascript
emitter.setEmitterFrame(frames);
// emitter.setEmitterFrame(frames, pickRandom, quantity);
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
- `pickRandom` : 
    - `true` : Whether frames should be assigned at random from `frames`. Default behavior.
- `quantity` : The number of consecutive particles that will receive each frame. Default value is `1`.

### Animation

```javascript
emitter.setAnim(anims);
// emitter.setAnim(anims, pickRandom, quantity);
```
- `anims` : One or more animations, or a configuration object.
    - String
    - Array of string
    - Configuration object :
        ```javascript
        {
            anims: [],
            cycle: false,
            quantity: 1
        }
        ```
        - `anims` : One or more animations names, or Play Animation Config objects.
            - String
            - Array of string
            - [Animation config](animation.md#add-animation)
            - Array of [Animation config](animation.md#add-animation)
- `pickRandom` : 
    - `true` : Whether frames should be assigned at random from `frames`. Default behavior.
- `quantity` : The number of consecutive particles that will receive each frame. Default value is `1`.

### Particle

- Speed
    ```javascript
    emitter.setParticleSpeed(x, y);
    ```
    or
    ```javascript
    emitter.speedX = x;
    emitter.speedY = y;
    ```
    - Changes the emitter from radial to a point emitter
- Bounce
    ```javascript
    emitter.bounce = value;
    ```
    - `0` : No bounce
    - `1` : Full rebound
- Max velocity
    ```javascript
    emitter.maxVelocityX = x;
    emitter.maxVelocityY = y;
    ```
- Gravity
    ```javascript
    emitter.setParticleGravity(x, y);
    ```
    or
    ```javascript
    emitter.gravityX = x;
    emitter.gravityY = y;
    ```
- Acceleration
    ```javascript
    emitter.accelerationX = x;
    emitter.accelerationY = y;
    ```
- Lifespan : Sets the lifespan of newly emitted particles in milliseconds.
    ```javascript
    emitter.setParticleLifespan(time);
    ```
    or
    ```javascript
    emitter.lifespan = time
    ```
- The number of milliseconds to wait after emission before the particles start updating.
    ```javascript
    emitter.delay = time;
    ```
- The number of milliseconds to wait after a particle has finished its life before it will be removed.
    ```javascript
    emitter.hold = time;
    ```
- Tint
    ```javascript
    emitter.setParticleTint(tint);
    ```
    or
    ```javascript
    emitter.particleTint = tint;
    ```
    - Webgl only
- Color
    ```javascript
    emitter.particleColor = color;   // WebGL only.
    emitter.colorEase = easeName;
    ```
    - Webgl only
- Alpha
    ```javascript
    emitter.setParticleAlpha(alpha);
    ```
    or
    ```javascript
    emitter.setAlpha(alpha);
    ```
    or
    ```javascript
    emitter.particleAlpha = alpha;
    ```
- Scale : Sets the vertical and horizontal scale of the emitted particles.
    ```javascript
    emitter.setParticleScale(x, y);
    ```
    or
    ```javascript
    emitter.setScale(x, y);
    ```
    or
    ```javascript
    emitter.particleScaleX = x;
    emitter.particleScaleY = y;
    ```
- Position
    ```javascript
    emitter.particleX = x;
    emitter.particleY = y;
    ```
- Position to move toward
    ```javascript
    emitter.moveToX = x;
    emitter.moveToY = y;
    ```    
- The angle at which the particles are emitted.
    ```javascript
    emitter.particleAngle = angle;  // degrees    
    ```
- The rotation (or angle) of each particle when it is emitted.
    ```javascript
    emitter.particleRotate = rotation; // degrees
    ```
- The number of particles that are emitted each time an emission occurs
    ```javascript
    emitter.quantity = quantity;
    ```
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
        or
        ```javascript
        var count = emitter.alive.length;
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
        or
        ```javascript
        var count = emitter.dead.length;
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
- Total (alive + dead) number of particles.
    ```javascript
    var count = emitter.getParticleCount();
    ```
- Active particles overlaps with a Rectangle Geometry object or an Arcade Physics Body.
    ```javascript
    var particles = emitter.overlap(target);
    ```
    - `target` : 
        - A [Rectangle](geom-rectangle.md).
        - Arcade Physics Body.
    - `particles` : An array of Particles that overlap with the given target
- Gets a bounds Rectangle calculated from the bounds of all currently active Particles
    ```javascript
    emitter.getBounds(padding, advance, delta, output);
    ```
    - `padding` : The amount of padding, in pixels, to add to the bounds Rectangle.
    - `advance`, `delta` : *Fast forward* in time to try and allow the bounds to be more accurate.
    - `output` : The [Rectangle](geom-rectangle.md) to store the results in.
- Gets the bounds of this particle as a Geometry Rectangle
    ```javascript
    particle.getBounds();
    ```

#### Render order

- Sort by property
    ```javascript
    emitter.setSortProperty(property, ascending);
    ```
    - `property` : The property on the `Particle` class to sort by.
    - `ascending` : Should the particles be sorted in ascending or descending order?
- Sort by callback
    ```javascript
    var callback = function(particleA, particleB) {
        return 1; // 0,1,-1
    }
    emitter.setSortCallback(callback);
    ```

### Emitter

- Frequency
    ```javascript
    emitter.setFrequency(frequency);
    // emitter.setFrequency(frequency, quantity);
    ```
    - `frequency` :
        - `>= 0` : The time interval of each flow cycle, in ms
        - `-1` : Explosion mode.
    - `quantity` : The number of particles to release at each flow cycle or explosion.
- Quantity
    ```javascript
    emitter.setQuantity(quantity);
    ```
    - `quantity` : The number of particles to release at each flow cycle or explosion.

### Zone

### Emit zone

#### Add emit zone

```javascript
var zone = emitter.addEmitZone({
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

#### Add emit edge

```javascript
var zone = emitter.addEmitZone({
    type: 'edge',
    source: curve,

    quantity: 1,
    stepRate: 0,
    yoyo: false,
    seamless: true,
    total: -1
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
- `total` : The total number of particles this zone will emit before passing over to the next emission zone in the Emitter.

!!! note "quantity or stepRate"
    - Any geometry like [circle](geom-circle.md), [ellipse](geom-ellipse.md), [kine](geom-line.md), [polygon](geom-polygon.md), [rectangle](geom-rectangle.md), [triangle](geom-triangle.md) source has *quantity*, or *stepRate*
    - [Curve](path.md) source has *quantity*, or *stepRate*
    - [Path](path.md) source only has *quantity*

#### Set emit zone

```javascript
emitter.setEmitZone(zone);
```

- `zone` : The Emit Zone to set as the active zone.
    - A zone object
    - A number as index

#### Zone source

- Get
    ```javascript
    // var zone = emitter.emitZones[i];
    var source = zone.source;    
    ```
- (Edge type only) Update points of curve source
    ```javascript
    zone.updateSource();
    ```
- (Edge type only) Set source to another curve, also update points
    ```javascript
    zone.changeSource(curve);
    ```

#### Remove emit zone

```javascript
emitter.removeEmitZone(zone)
```

#### Clear emit zone

```javascript
emitter.clearEmitZones();
```
or
```javascript
emitter.emitZones.length = 0;
emitter.zoneIndex = 0;
```

### Death zone

```javascript
var zone = emitter.addDeathZone({
     type: 'onEnter',
     source: geom
});
```

- `type` : `'onEnter'` or `'onLeave'`
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

#### Remove death zone

```javascript
emitter.removeDeathZone(zone)
```

#### Clear death zone

```javascript
emitter.clearDeathZones();
```
or
```javascript
emitter.deathZones.length = 0;
```

### Update Configuration

```javascript
emitter.updateConfig(config)
```

- `config` : See [config parameter](#add-particle) in constructor.

### Events

- Starts emission of particles.
    ```javascript
    emitter.on('start', function(emitter) {

    })
    ```
- Explodes a set of particles.
    ```javascript
    emitter.on('explode', function(emitter, particle) {

    })
    ```
- Death Zone kills a Particle instance.
    ```javascript
    emitter.on('deathzone', function(emitter, particle, zone) {

    })
    ```
- Stops emission
    ```javascript
    emitter.on('stop', function(emitter) {

    })
    ```
    - Directly call the `ParticleEmitter.stop` method.
    - Stop after a set time via the `duration` property.
    - Stop after a set number of particles via the `stopAfter` property.
- Complete Event, no particles are still rendering at this point in time.
    ```javascript
    emitter.on('complete', function(emitter) {

    })
    ```

### Bounds

- Add bounds
    ```javascript
    var bounds = emitter.addParticleBounds(x, y, width, height);
    // var bounds = emitter.addParticleBounds(x, y, width, height, collideLeft, collideRight, collideTop, collideBottom);
    ```
    or
    ```javascript
    var bounds = emitter.addParticleBounds(rect);
    ```
    - `x, y, width, height`, `{x, y, width, height}`, or `{x, y, w, h}`, or [Rectangle](geom-rectangle.md) : Bounds
    - `collideLeft`, `collideRight`, `collideTop`, `collideBottom` : Whether particles interact with the left/right/top/bottom edge of the bounds.
- Collide edges
    ```javascript
    bounds.collideLeft = enabled;
    bounds.collideRight = enabled;
    bounds.collideTop = enabled;
    bounds.collideBottom = enabled;
    ```
- Bound rectangle
    ```javascript
    var rect = bounds.bounds;
    ```
    - `rect` : [Rectangle](geom-rectangle.md)

### Gravity well

- Create a gravity well    
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

### Custom Particle Processor

- Declare Particle Processor class
    ```javascript
    class MyParticleProcessor extends Phaser.GameObjects.Particles.ParticleProcessor {
        constructor() {
            super(x, y, active);
            // ...
        }

        update(particle, delta, step, t) {
            // particle : The Particle to update.
            // delta : The delta time in ms.
            // step : The delta value divided by 1000.
            // t : The current normalized lifetime of the particle, between 0 (birth) and 1 (death).
        }

        destroy() {
            super.destroy();
        }
    }
    ```
    - Override `update` method
- Add to emitter
    ```javascript
    var myParticleProcessor = emitter.addParticleProcessor(new MyParticleProcessor);
    ```

### Custom particle class
    
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

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = emitter.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [postFX effects](shader-builtin.md)

!!! note
    No preFX effect support
