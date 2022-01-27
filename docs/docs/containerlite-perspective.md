## Introduction

Snapshot children of [containerlite](containerlite.md), to a [perspective render texture](perspective-rendertexture.md).

- Author: Rex
- Behavior of [containerlite](containerlite.md)

## Live demos

- [Flip ui](https://codepen.io/rexrainbow/pen/vYKRbzx)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-perspective)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add perspective behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var perspective = scene.plugins.get('rexperspectiveimageplugin').addContainerPerspective(container, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPerspectiveImagePlugin',
                plugin: PerspectiveImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add perspective behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var perspective = scene.plugins.get('rexPerspectiveImagePlugin').addContainerPerspective(container, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ContainerPerspective } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add perspective behavior
    ```javascript
    // var container = scene.add.rexContainerLite(x, y);
    var perspective = new ContainerPerspective(container, config);
    ```

### Create instance

```javascript
var perspective = scene.plugins.get('rexPerspectiveImagePlugin').addContainerPerspective(container, {
    useParentBounds: false
});
```

- `useParentBounds` :
    - `true` : Use bounds of parent container
    - `false` : Union all visible children's bounds

### Perspective mode

#### Enter

```javascript
perspective.enter();
```

1. Snapshot current visible children into [perspective render texture](perspective-rendertexture.md)
1. Set current visible children to invisible
1. Set this perspective render texture to visible

#### Exit

```javascript
perspective.exit();
```

1. Inverse visible of children and perspective render texture

#### Is in perspective mode

```javascript
var isInPerspectiveMode = perspective.perspectiveState;
```

### Rotation

- Get rotation angle
    ```javascript
    var angleX = perspective.angleX; // Angle in degrees
    var angleY = perspective.angleY; // Angle in degrees
    var angleZ = perspective.angleZ; // Angle in degrees
    ```
    or
    ```javascript
    var rotationX = perspective.rotationX; // Angle in radians
    var rotationY = perspective.rotationY; // Angle in radians
    var rotationZ = perspective.rotationZ; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    perspective.angleX = angleX; // Angle in degrees
    perspective.angleY = angleY; // Angle in degrees
    perspective.angleZ = angleZ; // Angle in degrees
    ```
    or
    ```javascript
    perspective.rotationX = rotationX; // Angle in radians
    perspective.rotationY = rotationY; // Angle in radians
    perspective.rotationZ = rotationZ; // Angle in radians
    ```

#### Flip

```javascript
scene.tweens.add({
    targets: perspective,
    angleY: { start: 0, to: -180}
})
```

### Other properties

See [Perspective image](perspective-image.md) game object.