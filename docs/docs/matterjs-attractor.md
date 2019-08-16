## Introduction

Apply continual forces on bodies.

- [Reference](https://github.com/liabru/matter-attractors)

## Usage

### System configuration

- Game config
    ```javascript
    var config = {
        // ...
        physics: {
            matter: {
                // ...
                plugins: {
                    attractors: true,
                    // ...
                }
                // ...
            }
        }
        // ...
    }
    var game = new Phaser.Game(config);
    ```
- Runtime
    ```javascript
    scene.matter.system.enableAttractorPlugin();
    ```

### Matter object configuration

```javascript
var options = {
    // ...
    plugin: {
        attractors: [
            callback,
            // ...
        ]
    },
    // ...
}
```

- `callback` :
    - Retuen a force (`{x,y}`), which will be applied to *bodyB*
        ```javascript
        function(bodyA, bodyB) {
            return {x, y}; // Force
        }
        ```
        - `bodyA` : Attractor matter object.
        - `bodyB` : Other matter object.
    - Apply forece to bodies directly.
        ```javascript
        function(bodyA, bodyB) {
            bodyA.gameObject.applyForce({x, y});
            bodyB.gameObject.applyForce({x, y});
        }
        ```
        - `bodyA` : Attractor matter object.
            - `bodyA.gameObject` : [Game object](matterjs-gameobject.md).
        - `bodyB` : Other matter object.
            - `bodyB.gameObject` : [Game object](matterjs-gameobject.md).