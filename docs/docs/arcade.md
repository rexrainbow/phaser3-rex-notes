## Introduction

Arcade physics engine in phaser.

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

#### Pause / Resume

```javascript
scene.physics.pause();
```

```javascript
scene.physics.resume();
```

### Add physics object

#### Image object

Static object

```javascript
var image = scene.physics.add.staticImage(x, y, key);
```

Dynamic object

```javascript
var image = scene.physics.add.image(x, y, key);
```

#### Sprite object

Static object

```javascript
var image = scene.physics.add.staticSprite(x, y, key, frame);
```

Dynamic object

```javascript
var image = scene.physics.add.sprite(x, y, key, frame);
```

#### Group

Static sprite objects

```javascript
var group = scene.physics.add.staticGroup(children, config);
// var group = scene.physics.add.staticGroup(config);
```

Dynamic sprite objects

```javascript
var group = scene.physics.add.group(children, config);
// var group = scene.physics.add.staticGroup(config);
```

Confiugration

```javascript
var config = {
    setCollideWorldBounds: false,
    setAccelerationX: 0,
    setAccelerationY: 0,
    allowDrag: true,
    allowGravity: true,
    allowRotation: true
    setBounceX: 0,
    setBounceY: 0,
    setDragX: 0,
    setDragY: 0,
    setGravityX: 0,
    setGravityY: 0,
    setFrictionX: 0,
    setFrictionY: 0,
    setVelocityX: 0,
    setVelocityY: 0,
    setAngularVelocity: 0,
    setAngularAcceleration: 0,
    setAngularDrag: 0,
    setMass: 1,
    setImmovable: false
};
```

#### Destroy object

```javascript
gameObject.destroy();
```

### Collision

Performs a collision check and separation between the two physics enabled objects given.

```javascript
var collider = scene.physics.add.collider(objectsA, objectsB, collideCallback, processCallback, callbackContext);
```

If you don't require separation then use `overlap` instead.

```javascript
var collider = scene.physics.add.overlap(objectsA, objectsB, collideCallback, processCallback, callbackContext);
```

- objectsA, objectsB
    - a game object
    - game objects in array
    - physics group
    - group
- collideCallback:
    ```javascript
    function(gameObject1, gameObject2) { }
    ```
- processCallback: fired when gameObject1 intersects gameObject2
    ```javascript
    function(gameObject1, gameObject2) {
        return true;  // return false will discard remaining collision checking
    }
    ```

### Methods of game object

#### Size

- Rectangle
    ```javascript
    gameObject.setSize(width, height);            // set body's offset to center
    // gameObject.setSize(width, height, false);  // set body's offset to (0, 0)
    ```
- Circle
    ```javascript
    gameObject.setCircle(radius, offsetX, offsetY);
    ```

#### Offset

Sets the offset of the Body's position from its Game Object's position.

```javascript
gameObject.setOffset(x, y);
```

#### Sync body

Syncs the Bodies position and size in static game object.

```javascript
gameObject.refreshBody();
```

#### Velocity

```javascript
gameObject.setVelocity(x, y);
```

```javascript
gameObject.setVelocityX(x);
```

```javascript
gameObject.setVelocityY(x);
```

```javascript
gameObject.setMaxVelocity(y);
```

#### Rotation

```javascript
body.setAllowRotation(value);  // true to allow rotation on this body (default:true)
```

#### Mass

```javascript
gameObject.setMass(v);
```

#### Acceleration

```javascript
gameObject.setAcceleration(x, y);
```

```javascript
gameObject.setAccelerationX(x);
```

```javascript
gameObject.setAccelerationY(y);
```

#### Gravity

```javascript
gameObject.setGravity(x, y);
```

```javascript
gameObject.setGravityX(x);
```

```javascript
gameObject.setGravityY(y);
```

#### Friction

```javascript
gameObject.setFriction(x, y);
```

```javascript
gameObject.setFrictionX(x);
```

```javascript
gameObject.setFrictionY(y);
```

#### Drag

```javascript
gameObject.setDrag(x, y);
```

```javascript
gameObject.setDragX(x);
```

```javascript
gameObject.setDragY(y);
```

Enables drag

```javascript
body.setAllowDrag(value);  // true to allow drag on this body (default:true)
```

Enable damping

```javascript
gameObject.setDamping(value);
```

#### Angular

```javascript
gameObject.setAngularVelocity(v);
```

```javascript
gameObject.setAngularAcceleration(v);
```

```javascript
gameObject.setAngularDrag(v);
```

#### Bounce

```javascript
gameObject.setBounce(x, y);
```

```javascript
gameObject.setBounceX(x);
```

```javascript
gameObject.setBounceY(y);
```

```javascript
gameObject.setCollideWorldBounds(boolean);
```

#### Immovable

```javascript
gameObject.setImmovable(boolean);
```

#### Speed

The absolute (non-negative) change in this Body's horizontal/vertical position from the previous step.

```javascript
var dx = body.deltaAbsX();
var dy = body.deltaAbsY();
```

#### Point inside

```javascript
var hit = gameObject.hitTest(x, y);
```

#### Blocked

- Blocked when moveing down
    ```javascript
    var onFloor = body.onFloor();
    ```    
- Blocked when moveing up
    ```javascript
    var onCeiling = body.onCeiling();
    ```
- Blocked when moveing left or right
    ```javascript
    var onWall = body.onWall();
    ```
- State
    ```javascript
    var blocked = body.blocked;
    ```
    - `blocked.none`
    - `blocked.up`
    - `blocked.down`
    - `blocked.left`
    - `blocked.right`

### Methods of group

```javascript
group.setVelocity(x, y, step);
```

```javascript
group.setVelocityX(value, step);
```

```javascript
group.setVelocityY(value, step);
```

```javascript
group.refresh();  // call this method when position of game objects were changed in static object group
```

### Add a game object to physics world

```javascript
scene.physics.existing(gameObject, isStatic);
```

#### Get physics body

```javascript
var body = gameObject.body;
```

#### Size

```javascript
body.setSize(width, height, center);
```

```javascript
body.setCircle(radius, offsetX, offsetY);
```

```javascript
body.setOffset(x, y);
```

#### Reset position

```javascript
body.reset(x, y);
```

#### Velocity

```javascript
body.velocity.set(x, y);
```

```javascript
body.velocity.x = x;
```

```javascript
body.velocity.y = y;
```

```javascript
body.maxVelocity.set(x, y);
```

#### Mass

```javascript
body.mass = v;
```

#### Acceleration

```javascript
body.acceleration.set(x, y);
```

```javascript
body.acceleration.x = x;
```

```javascript
body.acceleration.y = y;
```

#### Gravity

```javascript
body.gravity.set(x, y);
```

```javascript
body.gravity.x = x;
```

```javascript
body.gravity.y = y;
```

```javascript
body.setAllowGravity(value);  // true to allow gravity on this body (default:true)
```

#### Friction

```javascript
body.friction.set(x, y);
```

```javascript
body.friction.x = x;
```

```javascript
body.friction.y = y;
```

#### Drag

```javascript
body.drag.set(x, y);
```

```javascript
body.drag.x = x;
```

```javascript
body.drag.y = y;
```

Enables drag

```javascript
body.allowDrag = true;
```

Enable damping

```javascript
body.useDamping = true;
```

#### Angular

```javascript
body.angularVelocity = v;
```

```javascript
body.angularAcceleration = v;
```

```javascript
body.angularDrag = v;
```

#### Bounce

```javascript
body.bounce.set(x, y);
```

```javascript
body.bounce.x = x;
```

```javascript
body.bounce.y = y;
```

```javascript
body.collideWorldBounds = boolean;
```

#### Immovable

```javascript
body.immovable = boolean;
```

### Methods of World

#### Wrap

```javascript
scene.physics.world.wrap(gameObject, padding);
```

- gameObject:
    - game object (image, sprite)
    - group
    - array of game objects

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