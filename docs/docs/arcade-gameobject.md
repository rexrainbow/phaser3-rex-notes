## Introduction

Arcade physics Image/Sprite/Group object.

- Author: Richard Davey

## Usage

### Add physics object

[Enable physics world](arcade-world.md#configuration)

#### Image object

- Static object, extends from [Image object](image.md)
    ```javascript
    var image = scene.physics.add.staticImage(x, y, key);
    ```
- Dynamic object, extends from [Image object](image.md)
    ```javascript
    var image = scene.physics.add.image(x, y, key);
    ```

#### Sprite object

- Static object, extends from [Sprite object](sprite.md)
    ```javascript
    var image = scene.physics.add.staticSprite(x, y, key, frame);
    ```
- Dynamic object, extends from [Sprite object](sprite.md)
    ```javascript
    var image = scene.physics.add.sprite(x, y, key, frame);
    ```

#### Group

- Static sprite objects, extends from [Group object](group.md)
    ```javascript
    var group = scene.physics.add.staticGroup(children, config);
    // var group = scene.physics.add.staticGroup(config);
    ```
- Dynamic sprite objects, extends from [Group object](group.md)
    ```javascript
    var group = scene.physics.add.group(children, config);
    // var group = scene.physics.add.staticGroup(config);
    ```
    - `config`
        ```javascript
        var config = {
            classType: ArcadeSprite,
            enable: true,
            setCollideWorldBounds: false,
            setBoundsRectangle: null,
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
            setImmovable: false,
            maxSize: -1,
            runChildUpdate: false
        };
        ```

### Enable

- Enable body
    ```javascript
    gameObject.enableBody();
    // gameObject.enableBody(false, 0, 0, enableGameObject, showGameObject);
    ```
    - Enable and reset position
        ```javascript
        gameObject.enableBody(true, x, y);
        // gameObject.enableBody(true, x, y, enableGameObject, showGameObject);
        ```
    - `enableGameObject` : Also activate this Game Object.
    - `showGameObject` : Also show this Game Object.
- Disable body
    ```javascript
    gameObject.disableBody();
    // gameObject.disableBody(disableGameObject, hideGameObject);
    ```
    - `disableGameObject` : Also deactivate this Game Object.
    - `hideGameObject` : Also hide this Game Object.

### Movement

#### Velocity

- Set
    ```javascript
    gameObject.setVelocity(x, y);
    ```
    or
    ```javascript
    gameObject.setVelocityX(x);
    gameObject.setVelocityY(y);
    ```
- Get
    ```javascript
    var vx = gameObject.body.velocity.x;
    var vy = gameObject.body.velocity.y;
    ```

##### Max velocity

- Set
    ```javascript
    gameObject.setMaxVelocity(x, y);
    ```
- Get 
    ```javascript
    var vx = gameObject.body.maxVelocity.x;
    var vy = gameObject.body.maxVelocity.y;
    ```

#### Acceleration

- Set
    ```javascript
    gameObject.setAcceleration(x, y);
    ```
    or
    ```javascript
    gameObject.setAccelerationX(x);
    gameObject.setAccelerationY(y);
    ```
- Get
    ```javascript
    var ax = gameObject.body.acceleration.x;
    var ay = gameObject.body.acceleration.y;
    ```  

##### Gravity

- Set
    ```javascript
    gameObject.setGravity(x, y);
    ```
    or
    ```javascript
    gameObject.setGravityX(x);
    gameObject.setGravityY(y);
    ```
- Get
    ```javascript
    var gx = gameObject.body.gravity.x;
    var gy = gameObject.body.gravity.y;
    ```  

#### Drag

- Set
    ```javascript
    gameObject.setDrag(x, y);
    ```
    or
    ```javascript
    gameObject.setDragX(x);
    gameObject.setDragY(y);
    ```
- Get
    ```javascript
    var dx = gameObject.body.drag.x;
    var dy = gameObject.body.drag.y;
    ```  
- Enable damping
    ```javascript
    gameObject.setDamping(value);
    ```

#### Immovable

- Enable
    ```javascript
    gameObject.setImmovable();
    ```
- Disable
    ```javascript
    gameObject.setImmovable(false);
    ```
- Get
    ```javascript
    var immovable = gameObject.body.immovable;
    ```

##### Friction

If this Body is `immovable` and in motion, this the proportion of this Body's movement received by the riding body on each axis.

- Set
    ```javascript
    gameObject.setFriction(x, y);
    ```
    or
    ```javascript
    gameObject.setFrictionX(x);
    gameObject.setFrictionY(y);
    ```
- Get
    ```javascript
    var fx = gameObject.body.friction.x;
    var fy = gameObject.body.friction.y;
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
    var allowRotation = gameObject.body.allowRotation;
    ```

#### Angular velocity

- Set
    ```javascript
    gameObject.setAngularVelocity(v);
    ```
- Get
    ```javascript
    var av = gameObject.body.angularVelocity;
    ```

#### Angular acceleration

-Set 
    ```javascript
    gameObject.setAngularAcceleration(v);
    ```
- Get
    ```javascript
    var aa = gameObject.body.angularAcceleration;
    ```

#### Angular drag  

- Set
    ```javascript
    gameObject.setAngularDrag(v);
    ```
- Get
    ```javascript
    var ad = gameObject.body.angularDrag;
    ```

### Collision

#### Collision bound

- Rectangle
    ```javascript
    gameObject.setSize(width, height, center);
    ```
    - `center` : `false` to set body's offset to (0, 0)
- Circle
    ```javascript
    gameObject.setCircle(radius, offsetX, offsetY);
    ```

##### Offset

```javascript
gameObject.setOffset(x, y);
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

### Point inside

```javascript
var hit = gameObject.hitTest(x, y);
```

#### Bounce

- Set
    ```javascript
    gameObject.setBounce(x, y);
    ```
    or
    ```javascript
    gameObject.setBounceX(x);
    gameObject.setBounceY(y);
    ```    
- Get
    ```javascript
    var bx = gameObject.body.bounce.x;
    var by = gameObject.body.bounce.y;
    ```
- Enable bounce when colliding with the world boundary
    ```javascript
    gameObject.setCollideWorldBounds();
    ```
- Disable bounce when colliding with the world boundary
    ```javascript
    gameObject.setCollideWorldBounds(false);
    ```

### Mass

- Set
    ```javascript
    gameObject.setMass(m);
    ```
- Get
    ```javascript
    var m = gameObject.body.mass;
    ```

### Static game object

#### Sync

Syncs the Bodies position and size in static game object.

```javascript
gameObject.refreshBody();
```

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

### Debug

```javascript
gameObject.setDebug(showBody, showVelocity, bodyColor);
```

```javascript
gameObject.setDebugBodyColor(bodyColor);
```