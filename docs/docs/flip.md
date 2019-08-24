## Introduction

Flipping game object to another face by scaling width/height.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/flip-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexflipplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/flip), [Sample code-2](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-flip)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexFlip from './plugins/flip.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import FlipPlugin from './plugins/flip-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexFlip',
            plugin: FlipPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var flip = scene.plugins.get('rexFlip').add(gameObject, {
    face: 'back',
    front: { key, frame }, // key, or callback
    back: { key, frame },  // key, or callback

    // orientation: 0, // 0|'x'|1|'y'
    // duration: 500,
    // delay: 0,
    // ease: 'Sine',
});
```

- `face` : Initial face.
    - `0`, `'front'` : Front face.
    - `1`, `'back'` : Back face.
- `front`, `back` : Texture of front/back face.
    - `undefined` : Use current texture key, or frame name
    - `key` : A string for texture key.
    - `{key, frame}`, or `{frame}` : A texture key and frame name
    - `callback` : Configure game object via callback.
        ```javascript
        function(gameObject) {
        }
        ```
- `orientation` : Flipping orientation.
    - `0`, `'x'`, or `'horizontal'` : Horizontal flipping.
    - `1`, `'y'`, or `'vertical'` : Vertical flipping.
- `duration` : Duration of flipping, in millisecond.
- `delay` : Initial delay
- `ease` Ease function. Default value is `'Sine'`.

### Start flipping

```javascript
flip.flip();
// flip.flip(duration);
```

### Stop flipping

```javascript
flip.stop();
```

### Set duration

```javascript
flip.setDuration(duration);
// flip.duration = duration;
```

### Faces

#### Current face

- Get
    ```javascript
    var face = flip.face;
    ```
    - `0` : Front face
    - `1` : Back face
- Set
    ```javascript
    flip.setFace(face);
    ```
    - `0`, `'front'` : Front face.
    - `1`, `'back'` : Back face.
- Toggle face
    ```javascript
    flip.toggleFace();
    ```

#### Set texture of face

- Front face
    ```javascript
    flip.setFrontFace(key, frame);
    ```
    or
    ```javascript
    flip.setFrontFace(callback);
    ```
    - `callback` : 
        ```javascript
        function(gameObject) {
            // ...            
        }
        ```
- Back face
    ```javascript
    flip.setBackFace(key, frame);
    ```
    or
    ```javascript
    flip.setBackFace(callback);
    ```
    - `callback` : 
        ```javascript
        function(gameObject) {
            // ...            
        }
        ```

### Events

- On flipping complete
    ```javascript
    flip.on('complete', function(flip, gameObject){});
    ```

### Status

- Is flipping
    ```javascript
    var isRunning = flip.isRunning;
    ```
