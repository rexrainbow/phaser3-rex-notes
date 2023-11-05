## Introduction

Arcade physics body.

- Author: Richard Davey

## Usage

### Get physics body

1. [Enable physics world](arcade-world.md#configuration)
1. Add existing game object(s) to physics world
    - Add a game object
        ```javascript
        var gameObject = scene.physics.add.existing(gameObject, bodyType);
        ```
        - `bodyType` :
            - `0` : Dynamic body
            - `1` : Static body
    - Add game objects
        ```javascript
        scene.physics.world.enable(gameObjects, bodyType);
        ```
        - `gameObjects` : An array of game objects, or a group object
        - `bodyType` :
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

### Direct control

Enable `directControl` when game object is controlled by tween or dragging.  
Default behavior is disable.

- Enable
    ```javascript
    body.setDirectControl();
    // body.setDirectControl(true);
    ```
    or
    ```javascript
    body.directControl = true;
    ```
- Disable
    ```javascript
    body.setDirectControl(false);
    ```
    or
    ```javascript
    body.directControl = false;
    ```

### Immovable

Whether this Body can be moved by collisions with another Body.

- Enable
    ```javascript
    body.setImmovable();
    // body.immovable = true;
    ```
- Disable (defalut)
    ```javascript
    body.setImmovable(false);
    // body.immovable = false;
    ```
- Get
    ```javascript
    var immovable = body.immovable;
    ```

### Pushable

Sets if this Body can be pushed by another Body.

- Enable (default value of dynamic body)
    ```javascript
    body.pushable = true;
    ```
- Disable, reflect back all of the velocity it is given to the colliding body.
    ```javascript
    body.pushable = false;
    ```
- Get
    ```javascript
    var pushable = body.pushable;
    ```

### Moveable

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
    or
    ```javascript
    body.setMaxVelocityX(x);
    body.setMaxVelocityY(y);
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
- Enable Damping (default: disable)
    ```javascript
    body.setDamping(true);
    // body.useDamping = true;
    ```

#### Slide factor

The Slide Factor controls how much velocity is preserved when this Body is pushed by another Body.

```javascript
body.slideFactor.set(x, y);
```

- `x`, `y` :
    - `1` : Take on all velocity given in the push. Default value.
    - `0` : Allow this Body to be pushed but then remain completely still after the push ends, 
      such as you see in a game like *Sokoban*.
    - Other value between `0` ~ `1` : Keep `x`/`y` of the original velocity when the push ends.
        - Combine this with the `setDrag()` method to create deceleration.

#### Reset position

```javascript
body.reset(x, y);
```

#### Stop

Sets acceleration, velocity, and speed to zero.

```javascript
body.stop();
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

#### Collision category

A body is only below to one collision category.  
A body can collide with multiple collision categories.  
The default is that all bodies collide with all others.

- Collision category
    - Get
        ```javascript
        var collisionCategory = body.collisionCategory;
        ```
    - Set
        ```javascript
        body.setCollisionCategory(category);
        ```
        - `category` : 
            - `(1 << 0)` 
            - `(1 << 1)` 
            - `(1 << 2)` 
            - ...
            - `(1 << 31)`
    - Reset collision category, to default behavior (all bodies collide with all others)
        ```javascript
        body.resetCollisionCategory();
        ```
        - Set `collisionCategory` to `1`.
        - Set `collisionMask` to `1`
- Collision mask
    - Get
        ```javascript
        var collisionMask = body.collisionMask;
        ```
    - Set
        ```javascript
        body.setCollidesWith(categories);
        ```
        - `categories` : A single category value, or an array of them.
    - Add
        ```javascript
        body.addCollidesWith(category):
        ```
        - `category` : A single category value.
    - Remove
        ```javascript
        body.removeCollidesWith(category);
        ```
        - `category` : A single category value.

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