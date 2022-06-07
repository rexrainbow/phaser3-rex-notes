## Introduction

Snapshot children of [containerlite](containerlite.md), to a [skew render texture](skew-rendertexture.md).

- Author: Rex
- Behavior of [containerlite](containerlite.md)

## Live demos

- [Skew ui](https://codepen.io/rexrainbow/pen/LYQBqwP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-skew)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);
    ```
- Add skew behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var skew = scene.plugins.get('rexquadimageplugin').addContainerSkew(container, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import QuadImagePlugin from 'phaser3-rex-plugins/plugins/quadimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexQuadImagePlugin',
                plugin: QuadImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add skew behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var skew = scene.plugins.get('rexQuadImagePlugin').addContainerSkew(container, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ContainerSkew } from 'phaser3-rex-plugins/plugins/quadimage.js';
    ```
- Add skew behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var skew = new ContainerSkew(container, config);
    ```

### Create instance

```javascript
var quad = scene.plugins.get('rexQuadImagePlugin').addContainerSkew(container, {
    useParentBounds: false
});
```

- `useParentBounds` :
    - `true` : Use bounds of parent container
    - `false` : Union all visible children's bounds

### Skew mode

#### Enter

```javascript
skew.enter();
```

1. Snapshot current visible children into [skew render texture](skew-rendertexture.md)
1. Set current visible children to invisible
1. Set this skew render texture to visible

#### Exit

```javascript
skew.exit();
```

1. Inverse visible of children and skew render texture

#### Is in skew mode

```javascript
var isInSkewMode = skew.skewState;
```

### Skew

- Set
    ```javascript
    image.setSkewX(skewXRad);
    image.setSkewXDeg(skewXDeg);
    ```
    ```javascript
    image.setSkewY(skewXRad);
    image.setSkewYDeg(skewXDeg);
    ```
    ```javascript
    image.setSkew(skewXRad, skewYRad);
    image.setSkewDeg(skewXDeg, skewYDeg);
    ```
    ```javascript
    image.skewX = skewXRad;
    image.skewXDeg = skewXDeg;
    ```
    ```javascript
    image.skewY = skewYRad;
    image.skewYDeg = skewYDeg;
    ```
- Get
    ```javascript
    var skewXRad = image.skewX;
    var skewXDeg = image.skewXDeg;
    ```
    ```javascript
    var skewYRad = image.skewY;
    var skewYDeg = image.skewYDeg;
    ```

### Other properties

See [Skew rendertexture](skew-rendertexture.md) game object.