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
        //    maxEntries: 16
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
gameobject.destroy();
```

### Collision

```javascript
var collider = scene.physics.add.collider(objectsA, objectsB, collideCallback, processCallback, callbackContext);
// var collider = scene.physics.add.addOverlap(objectsA, objectsB, collideCallback, processCallback, callbackContext);
```

- objectsA, objectsB
    - a game object
    - game objects in array
    - group
- collideCallback:
    ```javascript
    function(gameobject1, gameobject2){}
    ```
- processCallback: fired when gameobject1 intersects gameobject2
    ```javascript
    function(gameobject1, gameobject2){
        return true;  // return false will discard remaining collision checking
    }
    ```

### Methods of game object

#### Size

```javascript
gameobject.setSize(width, height, isCenter);  // isCenter: boolean
```

```javascript
gameobject.setCircle(radius, offsetX, offsetY);
```

```javascript
gameobject.setOffset(x, y);
```

#### Sync body

Syncs the Bodies position and size in static game object.

```javascript
gameobject.refreshBody();
```

#### Velocity

```javascript
gameobject.setVelocity(x, y);
```

```javascript
gameobject.setVelocityX(x);
```

```javascript
gameobject.setVelocityY(x);
```

```javascript
gameobject.setMaxVelocity(y);
```

#### Rotation

```javascript
body.setAllowRotation(value);  // true to allow rotation on this body (default:true)
```

#### Mass

```javascript
gameobject.setMass(v);
```

#### Acceleration

```javascript
gameobject.setAcceleration(x, y);
```

```javascript
gameobject.setAccelerationX(x);
```

```javascript
gameobject.setAccelerationY(y);
```

#### Gravity

```javascript
gameobject.setGravity(x, y);
```

```javascript
gameobject.setGravityX(x);
```

```javascript
gameobject.setGravityY(y);
```

#### Friction

```javascript
gameobject.setFriction(x, y);
```

```javascript
gameobject.setFrictionX(x);
```

```javascript
gameobject.setFrictionY(y);
```

#### Drag

```javascript
gameobject.setDrag(x, y);
```

```javascript
gameobject.setDragX(x);
```

```javascript
gameobject.setDragY(y);
```

```javascript
body.setAllowDrag(value);  // true to allow drag on this body (default:true)
```

#### Angular

```javascript
gameobject.setAngularVelocity(v);
```

```javascript
gameobject.setAngularAcceleration(v);
```

```javascript
gameobject.setAngularDrag(v);
```

#### Bounce

```javascript
gameobject.setBounce(x, y);
```

```javascript
gameobject.setBounceX(x);
```

```javascript
gameobject.setBounceY(y);
```

```javascript
gameobject.setCollideWorldBounds(boolean);
```

#### Immovable

```javascript
gameobject.setImmovable(boolean);
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

### Add a game object to physics world

```javascript
scene.physics.existing(gameObject, isStatic);
// var body = gameObject.body;
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
scene.physics.world.wrap(gameobject, padding);
```

- gameobject:
    - game object (image, sprite)
    - group
    - array of game objects