## Introduction

Raycaster between obstacles.

- Author: Rex
- Member of scene

## Live demos

- [Reflaction](https://codepen.io/rexrainbow/pen/dyXjNZX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/raycaster)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);
    ```
- Add raycaster object
    ```javascript
    var raycaster = scene.plugins.get('rexraycasterplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RaycasterPlugin from 'phaser3-rex-plugins/plugins/raycaster-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRaycaster',
                plugin: RaycasterPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add raycaster object
    ```javascript
    var raycaster = scene.plugins.get('rexRaycaster').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Raycaster from 'phaser3-rex-plugins/plugins/raycaster.js';
    ```
- Add raycaster object
    ```javascript
    var raycaster = new Raycaster(config);
    ```

### Create instance

```javascript
var raycaster = scene.plugins.get('rexRaycaster').add({
    // maxRayLength: 10000
});
```

- `maxRayLength` : Max length of ray.

### Obstacle

#### Add

```javascript
raycaster.addObstacle(gameObject);
// raycaster.addObstacle(gameObject, polygon);
```

- `polygon` : A [polygon](geom-polygon.md). 
    - `undefined` : Created polygon from 4 vertics of game object.

or

```javascript
raycaster.addObstacle(gameObjects);
```

- `gameObjects` : Array of game object.

#### Remove

```javascript
raycaster.removeObstacle(gameObject);
```

- `gameObject` : A game object, or an array of game objects.

#### Clear

```javascript
raycaster.clearObstacle();
```

#### Update shape

```javascript
raycaster.updateObstacle(gameObject);
// raycaster.updateObstacle(gameObject, polygon);
```

- `polygon` : A [polygon](geom-polygon.md). 
    - `undefined` : Created polygon from 4 vertics of game object.

### Raycaster

```javascript
var result = raycaster.rayToward(x, y, angle);
```

- `x`, `y` : Emit ray from world-position.
- `angle` : Emit ray toward to angle, in radian.
- `result` :
    - `false` : Ray dose not hit any game object.
    - An object : Hit to a game object.
        ```javascript
        {
            gameObject,
            polygon,
            segment,
            x, y,
            reflectAngle
        }
        ```
        - `gameObject` : Hitting game object.
        - `polygon` : [Polygon](geom-polygon.md) of hitting game object.
        - `segment` : Segment([line](geom-line.md)) of hitting polygon.
        - `x`, `y` : World position of hitting
        - `reflectAngle` : Reflect angle, in radian.

!!! note "Reflection"
    Use `result.x`, `result.y`, `result.reflectAngle` for next reflection ray.
    ```javascript
    raycaster.rayToward(result.x, result.y, result.reflectAngle)
    ```