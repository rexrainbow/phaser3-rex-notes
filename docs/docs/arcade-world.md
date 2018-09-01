## Introduction

*World* of Arcade physics engine in phaser.

- Author: Richard Davey

## Usage

### Configuration

```javascript
var config = {
    // ...
    physics: {
        default: 'arcade',
        arcade: {
        //    x: 0,
        //    y: 0,
        //    width: scene.sys.game.config.width,
        //    height: scene.sys.game.config.height,
        //    gravity: {
        //        x: 0,
        //        y: 0
        //    },
        //    checkCollision: {
        //        up: true,
        //        down: true,
        //        left: true,
        //        right: true
        //    },
        //    fps: 60,
        //    timeScale: 1,     // 2.0 = half speed, 0.5 = double speed
        //    overlapBias: 4,
        //    tileBias: 16,
        //    forceX: false,
        //    isPaused: false,
        //    debug: false,
        //    debugShowBody: true,
        //    debugShowStaticBody: true,
        //    debugShowVelocity: true,
        //    debugBodyColor: 0xff00ff,
        //    debugStaticBodyColor: 0x0000ff,
        //    debugVelocityColor: 0x00ff00,
        //    maxEntries: 16,
        //    useTree: true   // set false if amount of dynamic bodies > 5000
        }
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Collision

- Add collider
    - Push out
        ```javascript
        scene.physics.add.collider(objectsA, objectsB);
        ```
    - Performs a collision check and separation between the two physics enabled objects given.
        ```javascript
        var collider = scene.physics.add.collider(objectsA, objectsB, collideCallback, processCallback, callbackContext);
        ```
    - If you don't require separation then use `overlap` instead.
        ```javascript
        var collider = scene.physics.add.overlap(objectsA, objectsB, collideCallback, processCallback, callbackContext);
        ```
    - Parameters
        - `objectsA`, `objectsB` :
            - A game object
            - Game objects in array
            - Physics group
            - Group
        - `collideCallback` :
            ```javascript
            var collideCallback = function(gameObject1, gameObject2) { 
                // ...
            }
            ```
        - `processCallback` : Fired when gameObject1 intersects gameObject2
            ```javascript
            var processCallback = function(gameObject1, gameObject2) {
                return true;  // return false will discard remaining collision checking
            }
            ```
- Remove collider
    ```javascript
    scene.physics.world.removeCollider(collider);
    ```

### Wrap

```javascript
scene.physics.world.wrap(gameObject, padding);
```

- gameObject:
    - game object (image, sprite)
    - group
    - array of game objects

### Move to

- Move to position with a steady velocity
    ```javascript
    scene.physics.moveTo(gameObject, x, y, speed, maxTime);
    ```
- Move to object with a steady velocity
    ```javascript
    scene.physics.moveToObject(gameObject, destination, speed, maxTime);
    ```

### Accelerate to

- Accelerate to position
    ```javascript
    scene.physics.accelerateTo(gameObject, x, y, acceleration, xSpeedMax, ySpeedMax);
    ```
- Accelerate to object
    ```javascript
    scene.physics.accelerateToObject(gameObject, destination, acceleration, xSpeedMax, ySpeedMax);
    ```


### Control

#### Pause

```javascript
scene.physics.pause();
```

#### Resume

```javascript
scene.physics.resume();
```

#### Duration per frame

- Time scale
    ```javascript
    scene.physics.world.timeScale = timeScale;
    ```
    - 1.0 = normal speed
    - 2.0 = half speed
    - 0.5 = double speed
- FPS
    ```javascript
    scene.physics.world.setFPS(framerate);
    ```

#### Step

Advances the simulation by one step.

```javascript
scene.physics.world.step(delta);
```