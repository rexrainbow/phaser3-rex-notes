## Introduction

Interpolate points between previous position and current position with fixed step length.

- Author: Rex
- Behavior of game object

## Live demos

- [Step](https://codepen.io/rexrainbow/pen/jOvYJpq)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/step)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexstepplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexstepplugin.min.js', true);
    ```
- Add step behavior
    ```javascript
    var step = scene.plugins.get('rexstepplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import StepPlugin from 'phaser3-rex-plugins/plugins/step-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexStep',
                plugin: StepPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add move-to behavior
    ```javascript
    var step = scene.plugins.get('rexStep').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Step from 'phaser3-rex-plugins/plugins/step.js';
    ```
- Add move-to behavior
    ```javascript
    var step = new Step(gameObject, config);
    ```

### Create instance

```javascript
var step = scene.plugins.get('rexStep').add(gameObject, {
    // enable: true,
    // stepLength: 5,    
});
```

- `enable` : Set `true` to fire `step` event for each interpolate point.
- `stepLength` : Fixed length between each interpolate point.

### Enable

- Enable (default)
    ```javascript
    step.setEnable();
    ```
    or
    ```javascript
    step.enable = true;
    ```
- Disable
    ```javascript
    step.setEnable(false);
    ```
    or
    ```javascript
    step.enable = false;
    ```

### Set step length

```javascript
step.setStepLength(stepLength);
// step.stepLength = stepLength;
```

### Events

- On each interpolate point
    ```javascript
    step.on('step', function(gameObject, step, x, y){

    }, scope);
    ```
    - Invoke `step.cancelStep()` to cancel interpolation.
- On interpolate points between previous position and current position
    ```javascript
    step.on('steps', function(gameObject, step, points){

    }, scope);
    ```
    - `points` : Array of point `{x, y}`

### Inject methods

- Inject methods into game object
    ```javascript
    scene.plugins.get('rexStep').injectMethods(gameObject);
    ```
- Inject methods into class of game object
    ```javascript
    scene.plugins.get('rexStep').injectMethods(GameObjectClass.prototype);
    // scene.plugins.get('rexStep').injectMethods(Phaser.GameObjects.Sprite.prototype);
    ```
- Inject methods into class of game object
    ```javascript
    scene.plugins.get('rexStep').injectMethods(GameObjectClass.prototype);
    // scene.plugins.get('rexStep').injectMethods(Phaser.GameObjects.Sprite.prototype);
    ```
- Inject methods into root class of game object
    ```javascript
    scene.plugins.get('rexStep').injectMethodsToRootClass(e);
    // scene.plugins.get('rexStep').injectMethods(Phaser.GameObjects.GameObject.prototype);
    ```

#### Injected methods

- Step start
    ```javascript
    gameObject.stepStart(stepLength);
    // gameObject.stepStart({stepLength});
    ```
- Step stop
    ```javascript
    gameObject.stepStop();
    ```
- Events
    - Step
        ```javascript
        gameObject.on('step.step', function(gameObject, x, y) { 
            
        });
        ```