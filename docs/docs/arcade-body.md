## Introduction

Arcade physics body.

- Author: Richard Davey

## Usage

### Get physics body

1. [Enable physics world](arcade-world.md#configuration)
1. Add existing game object(s) to physics world
    - Add a game object
        ```javascript
        var gameObject = scene.physics.add.existing(gameObject, isStatic);
        ```
        - `isStatic` :
            - `0` : Dynamic body
            - `1` : Static body
    - Add game objects
        ```javascript
        scene.physics.world.enable(gameObjects, isStatic);
        ```
        - `gameObjects` : An array of game objects, or a group object
        - `isStatic` :
            - `0` : Dynamic body
            - `1` : Static body
1. Get physics body
    ```javascript
    var body = gameObject.body;
    ```

### Enable

Whether this Body is updated by the physics simulation.

- Enable (default)
    ```javascript
    body.setEnable();
    ```
    or
    ```javascript
    body.enable = true;
    ```
- Disable
    ```javascript
    body.setEnable(false);
    ```
    or
    ```javascript
    body.enable = false;
    ```
- Get
    ```javascript
    var enable = body.moves;
    ```

Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.

- Enable (default)
    ```javascript
    body.moves = true;
    ```
- Disable
    ```javascript
    body.moves = false;
    ```
- Get
    ```javascript
    var moves = body.moves;
    ```

!!! note "Use case"
    Set `body.moves` to `false` when game object is controlled by tween or dragging.

### Destroy

Physics body will be destroyed automatically when game object is destroyed.

### Movement

#### Velocity

- Set
    ```javascript
    body.setVelocity(x,y);
    ```
    or
    ```javascript
    body.setVelocityX(x);
    body.setVelocityY(x);
    ```
- Get
    ```javascript
    var vx = body.velocity.x;
    var vy = body.velocity.y;
    ```

##### Max speed

- Set
    ```javascript
    body.setMaxSpeed(speed);
    ```
- Get
    ```javascript
    var speed = body.maxSpeed;
    ```

##### Max velocity

- Set
    ```javascript
    body.setMaxVelocity(x, y);
    ```
- Get 
    ```javascript
    var vx = body.maxVelocity.x;
    var vy = body.maxVelocity.y;
    ```

#### Acceleration

- Set
    ```javascript
    body.setAcceleration(x, y);
    ```
    or
    ```javascript
    body.setAccelerationX(x);
    body.setAccelerationY(y);
    ```
- Get
    ```javascript
    var ax = body.acceleration.x;
    var ay = body.acceleration.y;
    ```

##### Gravity

- Set
    ```javascript
    body.setGravity(x, y);
    ```
    or
    ```javascript
    body.setGravityX(x);
    body.setGravityY(y);
    ```
- Get
    ```javascript
    var gx = body.gravity.x;
    var gy = body.gravity.y;
    ```  
- Enables (default)
    ```javascript
    body.setAllowGravity();
    ```
- Disable
    ```javascript
    body.setAllowGravity(false);
    ```

#### Drag

Reduces speed per second.

- Set
    ```javascript
    body.setDrag(x, y);
    ```
    or
    ```javascript
    body.setDragX(x);
    body.setDragY(y);
    ```
- Get
    ```javascript
    var dx = body.drag.x;
    var dy = body.drag.y;
    ```  
- Enables (default)
    ```javascript
    body.setAllowDrag();
    ```
- Disable
    ```javascript
    body.setAllowDrag(false);
    ```
- Enable damping (default: false)
    ```javascript
    body.useDamping = true;
    ```

#### Reset position

```javascript
body.reset(x, y);
```

#### Stop

Sets acceleration, velocity, and speed to zero.

```javascript
body.stop();
```

#### Immovable

- Enable
    ```javascript
    body.setImmovable();
    ```
- Disable (defalut)
    ```javascript
    body.setImmovable(false);
    ```
- Get
    ```javascript
    var immovable = body.immovable;
    ```

##### Friction

If this Body is `immovable` and in motion, this the proportion of this Body's movement received by the riding body on each axis.

- Set
    ```javascript
    body.setFriction(x, y);
    ```
    or
    ```javascript
    body.setFrictionX(x);
    body.setFrictionY(y);
    ```
- Get
    ```javascript
    var fx = body.friction.x;
    var fy = body.friction.y;
    ```

#### Speed

- The absolute (non-negative) change in this Body's horizontal/vertical position from the previous step.
    ```javascript
    var dx = body.deltaAbsX();
    var dy = body.deltaAbsY();
    ```

### Rotation

#### Allow rotation

Whether this Body's rotation is affected by its angular acceleration and velocity.

- Enable (default)
    ```javascript
    body.setAllowRotation();
    ```
- Disable
    ```javascript
    body.setAllowRotation(false);
    ```
- Get
    ```javascript
    var allowRotation = body.allowRotation;
    ```

#### Angular velocity

- Set 
    ```javascript
    body.setAngularVelocity(v);
    ```
- Get
    ```javascript
    var av = body.angularVelocity;
    ```

#### Angular acceleration

- Set 
    ```javascript
    body.setAngularAcceleration(v);
    ```
- Get
    ```javascript
    var aa = body.angularAcceleration;
    ```

#### Angular drag  

Reduces angular speed per second.

- Set
    ```javascript
    body.setAngularDrag(v);
    ```
- Get
    ```javascript
    var ad = body.angularDrag;
    ```

### Collision

#### Collision bound

- Rectangle
    ```javascript
    body.setSize(width, height, center);
    ```    
    - `center` : `false` to set body's offset to (0, 0).
        - Not work in [Graphics](graphics.md) object.
- Circle
    ```javascript
    body.setCircle(radius, offsetX, offsetY);
    ```

##### Offset

```javascript
body.setOffset(x, y);
```

#### Push out

```javascript
scene.physics.add.collider(objectsA, objectsB);
```

- `objectsA`, `objectsB` :
    - A game object
    - Game objects in array (Add or remove game objects)
    - Physics group (Add or remove game objects)
    - Group (Add or remove game objects)

#### Callbacks

[Add collider](arcade-world.md#collision)

#### Point inside

```javascript
var hit = body.hitTest(x, y);
```

#### Is colliding

- Is colliding this tick
    ```javascript
    var isColliding = body.touching;
    ```
    - `isColliding` :
        ```javascript
        {
            none: true,
            up: true,
            down: true,
            left: true,
            right: true
        }
        ```
- Was colliding previous tick
    ```javascript
    var wasColliding = body.wasTouching;
    ```
    - `wasColliding` :
        ```javascript
        {
            none: true,
            up: true,
            down: true,
            left: true,
            right: true
        }
        ```

#### Bounce

- Set
    ```javascript
    body.setBounce(x, y);
    ```
    or
    ```javascript
    body.setBounceX(x);
    body.setBounceY(y);
    ```    
- Get
    ```javascript
    var bx = body.bounce.x;
    var by = body.bounce.y;
    ```

#### World bounds

- [Default world bounds](arcade-world.md#world-bounds)
- Custom world bounds :
    ```javascript
    body.setBoundsRectangle(bounds);
    ```
    - `bounds` : A [rectangle object](geom-rectangle.md).
- Enable
    ```javascript
    body.setCollideWorldBounds();
    ```
- Disable (default)
    ```javascript
    body.setCollideWorldBounds(false);
    ```
- Get world bounds [rectangle](geom-rectangle.md)
    ```javascript
    var top = body.world.bounds.top;
    var bottom = body.world.bounds.bottom;
    var left = body.world.bounds.left;
    var right = body.world.bounds.right;
    ```

##### Blocked

Whether this Body is colliding with a tile or the world boundary.

- Blocked when moveing down
    ```javascript
    var onFloor = body.onFloor(); // blocked.down
    ```    
- Blocked when moveing up
    ```javascript
    var onCeiling = body.onCeiling();  // blocked.up
    ```
- Blocked when moveing left or right
    ```javascript
    var onWall = body.onWall();  // blocked.left || this.blocked.right
    ```
- State
    ```javascript
    var blocked = body.blocked;
    ```
    - `blocked` :
        ```javascript
        {
            none: true,
            up: false,
            down: false,
            left: false,
            right: false
        }
        ```

### Mass

- Set
    ```javascript
    body.setMass(m);
    ```
- Get
    ```javascript
    var m = body.mass;
    ```

### Static body

#### Sync

Syncs the Bodies *position* and *size* with its parent Game Object.

```javascript
body.updateFromGameObject();
```

### Debug

- Bounds of Body
    - Enable drawing body
        ```javascript
        body.debugShowBody = true;
        ```
    - Color
        ```javascript
        body.debugBodyColor = 0xff00ff;
        ```
- Direction and magnitude of velocity
    - Enable drawing body
        ```javascript
        body.debugShowVelocity = true;
        ```