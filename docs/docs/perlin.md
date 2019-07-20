## Introduction

Perlin2/3 noise and simplex2/3 noise. ([Reference](https://github.com/josephg/noisejs/blob/master/perlin.js))

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/perlin-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexperlinplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/perlin/)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexPerlin from './plugins/perlin.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import PerlinPlugin from './plugins/perlin-plugin.js';

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

### Create noise instance

```javascript
var noise = cene.plugins.get('rexPerlin').add(seed);
```

- `seed` : A seed for this noise, like `Math.random()`

### Perlin

- Perlin2
    ```javascript
    var value = noise.perlin2(x, y);
    ```
- Perlin3
    ```javascript
    var value = noise.perlin3(x, y, z);
    ```

### Simplex

- Simplex2
    ```javascript
    var value = noise.simplex2(x, y);
    ```
- Simplex3
    ```javascript
    var value = noise.simplex3(x, y, z);
    ```

### Set seed

```javascript
noise.setSeed(seed);
```