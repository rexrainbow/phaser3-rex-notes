## Introduction

Perlin2/Perlin3 noise and simplex2/simplex3 noise. ([Reference](https://github.com/josephg/noisejs/blob/master/perlin.js))

- Author: Rex
- Method only

## Live demos

- [Perlin2](https://codepen.io/rexrainbow/pen/BXyvOo)
- [Terrain generator](https://codepen.io/rexrainbow/pen/YmyzoE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/perlin/)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperlinplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperlinplugin.min.js', true);
    ```
- Add perlin noise object
    ```javascript
    var noise = scene.plugins.get('rexperlinplugin').add(seed);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PerlinPlugin from 'phaser3-rex-plugins/plugins/perlin-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPerlin',
                plugin: PerlinPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add perlin noise object
    ```javascript
    var noise = scene.plugins.get('rexPerlin').add(seed);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Perlin from 'phaser3-rex-plugins/plugins/perlin.js';
    ```
- Add perlin noise object
    ```javascript
    var noise = new Perlin(seed);
    ```

### Create noise instance

```javascript
var noise = scene.plugins.get('rexPerlin').add(seed);
```

- `seed` : A seed for this noise, like `Math.random()`

### Perlin

- Perlin2
    ```javascript
    var value = noise.perlin2(x, y);
    ```
    - `value` : `-1` ~ `1`
- Perlin3
    ```javascript
    var value = noise.perlin3(x, y, z);
    ```
    - `value` : `-1` ~ `1`

### Simplex

- Simplex2
    ```javascript
    var value = noise.simplex2(x, y);
    ```
    - `value` : `-1` ~ `1`    
- Simplex3
    ```javascript
    var value = noise.simplex3(x, y, z);
    ```
    - `value` : `-1` ~ `1`

### Set seed

```javascript
noise.setSeed(seed);
```
