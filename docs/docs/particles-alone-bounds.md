## Introduction

Emit [particles](particles.md) alone bounds of game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Particles-aline-bounds](https://codepen.io/rexrainbow/pen/gOaVRmP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/particles-alone-bounds)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexparticlesaloneboundsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexparticlesaloneboundsplugin.min.js', true);
    ```
- Start emit particles alone bounds of game object
    ```javascript
    var particles = scene.plugins.get('rexparticlesaloneboundsplugin').startEffect(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DragPlugin from 'phaser3-rex-plugins/plugins/particlesalonebounds-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexParticlesAloneBounds',
                plugin: ParticlesAloneBoundsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Start emit particles alone bounds of game object
    ```javascript
    var particles = scene.plugins.get('rexParticlesAloneBounds').startEffect(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ParticlesAloneBounds from 'phaser3-rex-plugins/plugins/particlesalonebounds.js';
    ```
- Start emit particles alone bounds of game object
    ```javascript
    var particles = ParticlesAloneBounds(gameObject, config);
    ```

### Create instance

```javascript
var particles = scene.plugins.get('rexParticlesAloneBounds').startEffect(gameObject, {
    textureKey: key,
    // textureFrames: undefined,
    // blendMode: 'ADD',
    // lifespan: 1000,
    // stepRate: 10,
    // spread: 10,

    // scale: undefined,
    // alpha: undefined,
    // tint: undefined,

    // repeat: 0,
    // reuse: false,
    // gravityX: 0,
    // gravityY: 0,
    // duration: undefined
});
```

- `textureKey` : Texture key of particles.
- `textureFrames` : : One or more texture frames, or a configuration object.
    - String or number value.
    - Array of string or number value.
    - Configuration object :
        ```javascript
        {
            frames: [],
            cycle: false,
            quantity: 1
        }
        ```
- `blendMode` : Blend mode (Phaser.BlendModes) of particles. Default value is `ADD`.
- `lifespan` : Lifespan of particle.
- `stepRate` : Step length between each particle's initial position alone bounds of game object.
- `spread` : Moving speed of particle.
- `scale` : Scale changing of particle.
- `alpha` : Alpha changing of particle.
- `tint` : Tint changing of particle.
- `repeat` : Fire particles around bounds repeatly.
    - `0` : Fire particles around bounds one time, default value.
- `reuse` : Reuse this particles.
    - `false` : Destroy particles when fire completed. Default value.
    - `true` : Don't destroy particles when fire completed. To reuse this particles, start firing via
        ```javascript
        scene.plugins.get('rexParticlesAloneBounds').startEffect(gameObject, config, particles);
        ```
- `gravityX`, `gravityY` : Gravity vector of world axis. This vector will rotate back if game object is rotated.
- `duration` : Total duration from firing of 1st particle to destroy last particle.
    - `undefined` : Use default behavior of particles
    - Less or equal to `lifespan` : Fires all particles at begining.

Format of `spread`, `scale`, `alpha`, `tint` parameters :

- `{min, max}` : Pick a random value between min and max
- `{start, end}` : Pick values incremented continuously across a range. (`ease`=`'Linear'`)
    - `{start, end, ease}`
- `{start, end, steps}` : Pick values incremented by steps across a range.
- `{start, end, random}`
    - `random`: `true` or `false`
- `{min, max, steps}` : Pick values between min to max, with steps.
- `{onEmit: function(particle, key, t, value) {return value}}` : Get return value from a function invoking.

### Events

- On fire completed, i.e. last particle is dead
    ```javascript
    particles.on('complete', function(particles, gameObject){

    }, scope);
    ```
