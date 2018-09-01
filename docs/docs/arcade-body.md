## Introduction

Arcade physics body.

- Author: Richard Davey

## Usage

### Get physics body

1. [Enable physics world](arcade-world.md#configuration)
1. Add an existing game object to physics world
    ```javascript
    var gameObject = scene.physics.add.existing(gameObject, isStatic);
    ```
1. Get physics body
    ```javascript
    var body = gameObject.body;
    ```

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

#### Friction

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

-Set 
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

#### Point inside

```javascript
var hit = body.hitTest(x, y);
```

#### Callbacks

[Add collider](arcade-world.md#collision)

#### Collision bound

- Rectangle
    ```javascript
    body.setSize(width, height, center);
    ```    
    - `center` : `false` to set body's offset to (0, 0).
- Circle
    ```javascript
    body.setCircle(radius, offsetX, offsetY);
    ```

##### Offset

```javascript
body.setOffset(x, y);
```

#### World bounds

- Enable
    ```javascript
    body.setCollideWorldBounds();
    ```
- Disable (default))
    ```javascript
    body.setCollideWorldBounds(false);
    ```

##### Events

- World bounds
    ```javascript
    scene.physics.world.on('worldbounds', function(body, blockedUp, blockedDown, blockedLeft, blockedRight ){ 
        // 
    });
    ```

#### Push out

```javascript
scene.physics.add.collider(objectsA, objectsB);
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

#### Blocked

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
            up: true,
            down: true,
            left: true,
            right: true
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

