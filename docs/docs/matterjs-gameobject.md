## Introduction

Matterjs physics Image/Sprite/Group object.

- Author: Richard Davey

## Usage

### Add physics object

[Enable physics world](matterjs-world.md#configuration)

#### Image object

```javascript
var image = scene.matter.add.imag(x, y, key, frame);
// var image = scene.matter.add.imag(x, y, key, frame, config);
```

- `config` : [Config object](matterjs-gameobject.md#config)

#### Sprite object

```javascript
var image = scene.matter.add.sprite(x, y, key, frame);
// var image = scene.matter.add.sprite(x, y, key, frame, config);
```

- `config` : [Config object](matterjs-gameobject.md#config)

#### Any game object

```javascript
var gameObject = scene.matter.add.gameObject(gameObject);
// var gameObject = scene.matter.add.gameObject(gameObject, config);
```

- `config` : [Config object](matterjs-gameobject.md#config)

#### Image composite

Create a new composite containing Matter Image objects created in a grid arrangement.

```javascript
var composite = scene.matter.add.imageStack(key, frame, x, y, columns, rows);
// var composite = scene.matter.add.imageStack(key, frame, x, y, columns, rows, columnGap, rowGap, options);
```

- `key`, `frame` : Texture key and frame name.
- `x`, `y` : Top-left position of these game objects.
- `columns`, `rows` : The number of columns/rows in the grid.
- `columnGap`, `rowGap` : The distance between each column/row.
- `config` : [Config object](matterjs-gameobject.md#config)
- `composite` : Composite matter object.
    - `composite.bodies` : An array of bodies.

#### Config

```javascript
{
    label: 'Body',
    shape: 'rectangle',
    chamfer: null,

    isStatic: false,
    isSensor: false,
    isSleeping: false,
    ignoreGravity: false,
    ignorePointer: false,

    sleepThreshold: 60,
    density: 0.001,
    restitution: 0,
    friction: 0.1,
    frictionStatic: 0.5,
    frictionAir: 0.01,

    force: { x: 0, y: 0 },
    angle: 0,
    torque: 0,

    collisionFilter: {
        group: 0,
        category: 0x0001,
        mask: 0xFFFFFFFF,
    },

    // parts: [],

    // plugin: {
    //     attractors: [
    //         (function(bodyA, bodyB) { return {x, y}}),
    //     ]
    // },

    slop: 0.05,

    timeScale: 1,
}
```

- `label` : An arbitrary `String` name to help the user identify and manage bodies.
- `shape` : 
    - A string : `'rectangle'`, `'circle'`, `'trapezoid'`, `'polygon'`, `'fromVertices'`, `'fromPhysicsEditor'`
    - An object : 
        - Rectangle shape
            ```javascript
            {
                type: 'rectangle',
                // width: gameObject.width
                // height: gameObject.height
            }
            ```
        - Circle shape
            ```javascript
            {
                type: 'circle',
                // radius: (Math.max(gameObject.width, gameObject.height) / 2),
                // maxSides: 25
            }
            ```
        - Trapezoid shape
            ```javascript
            {
                type: 'trapezoid',
                // slope: 0.5,
            }
            ```
        - Polygon shape
            ```javascript
            {
                type: 'polygon',
                // radius: (Math.max(gameObject.width, gameObject.height) / 2),
                // sides: 5,
            }
            ```
        - Vertices
            ```javascript
            {
                type: 'fromVertices',
                verts: points,
                // flagInternal: false,
                // removeCollinear: 0.01,
                // minimumArea: 10,
            }
            ```
            - `points` :
                - A string : `'x0 y0 x1 y1 ...'`
                - An array of points : `[{x:x0, y:y0}, {x:x1, y:y1}, ...]`
- `chamfer` : 
    - `null`
    - A number
    - `{radius: value}`
    - `{radius: [topLeft, topRight, bottomRight, bottomLeft]}`
- `isStatic` : A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
- `isSensor` : A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
- `isSleeping` : A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
- `sleepThreshold` : The number of updates in which this body must have *near-zero velocity* before it is set as sleeping.
- `density` : Density of the body, that is its mass per unit area.
- `restitution` : The restitution/bounce/elasticity of the body. The value is always positive and is in the range `(0, 1)`.
    - `0` : Collisions may be perfectly inelastic and no bouncing may occur.
    - `0.8` : The body may bounce back with approximately 80% of its kinetic energy.
- `friction` : Friction of the body. The value is always positive and is in the range `(0, 1)`.
    - `0` : The body may slide indefinitely.
    - `1` : The body may come to a stop almost instantly after a force is applied.
- `frictionStatic` : The static friction of the body (in the Coulomb friction model). 
    - `0` : The body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
    - `10` :  The higher the value, the more force it will take to initially get the body moving when nearly stationary.
- `frictionAir` : The air friction of the body (air resistance). 
    - `0` : The body will never slow as it moves through space.
    - The higher the value, the faster a body slows when moving through space.
- `force` : The force to apply in the current step.
- `angle` : Angle of the body, in radians.
- `torque` : the torque (turning force) to apply in the current step.
- `collisionFilter` : An `Object` that specifies the collision filtering properties of this body.
    - `collisionFilter.group`
    - `collisionFilter.category` : A bit field that specifies the collision category this body belongs to.
    - `collisionFilter.mask` : A bit mask that specifies the collision categories this body may collide with.
- `slop` : A tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
    - The default should generally suffice, although very large bodies may require larger values for stable stacking.

##### Collision

Collisions between two bodies will obey the following rules: 

- (grpupA > 0) && (groupB > 0) :
    - Collision = (groupA == groupB)
- (grpupA == 0) || (groupB == 0) :
    - Collision = ((categoryA & maskB) !== 0) && ((categoryB & maskA) !== 0)

### Movement

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

#### Acceleration

##### Force

- Applies a force to a body.
    ```javascript
    gameObject.applyForce(force);
    ```
    - `force` : `{x, y}`
- Applies a force to a body from a given position.
    ```javascript
    gameObject.applyForceFrom(position, force); // position, force: {x, y}
    ```
    - `position` : `{x, y}`
    - `force` : `{x, y}`
- Apply thrust to the forward position of the body.
    ```javascript
    gameObject.thrust(speed);
    ```
    - `speed` : A number.
- Apply thrust to the left position of the body.
    ```javascript
    gameObject.thrustLeft(speed);
    ```
    - `speed` : A number.
- Apply thrust to the right position of the body.
    ```javascript
    gameObject.thrustRight(speed);
    ```
    - `speed` : A number.
- Apply thrust to the back position of the body.
    ```javascript
    gameObject.thrustBack(speed);
    ```
    - `speed` : A number.
- Apply thrust to the back position of the body.
    ```javascript
    gameObject.thrustBack(speed);
    ```
    - `speed` : A number.

##### Gravity

- Ignore world gravity
    ```javascript
    gameObject.setIgnoreGravity(ignore);
    ```
    - `ignore` : Set to true to ignore the effect of world gravity

##### Friction

```javascript
gameObject.setFriction(value, air, fstatic);
```

```javascript
gameObject.setFrictionAir(v);
```

```javascript
gameObject.setFrictionStatic(v);
```

### Rotation

#### Fixed rotation

```javascript
gameObject.setFixedRotation();
```

#### Angular velocity

```javascript
gameObject.setAngularVelocity(v);
```

### Collision

#### Enable

- Get
    ```javascript
    var isSensor = gameObject.isSensor();
    ```
- Set
    ```javascript
    gameObject.setSensor(value);
    ```
    - `value` : Set `true` to enable senser.

#### Collision group

- Collision grpup
    ```javascript
    gameObject.setCollisionGroup(value);
    ```
- Collision category
    1. Get new collision category
        ```javascript
        var category = scene.matter.world.nextCategory();
        ```
        - `category` : An one-shot number (1, 2, 4, 8, ...., 2147483648 (1<<31))
    1. Set collision category of game object
        ```javascript
        gameObject.setCollisionCategory(category);
        ```
    1. Set category mask
        ```javascript
        gameObject.setCollidesWith([categoryA, categoryB, ...]);
        // gameObject.setCollidesWith(categoryA);
        ```

#### Collision event

```javascript
scene.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
    // var pairs = event.pairs;
});
```

- `event` : 
    - `event.pairs` : An array of collision pairs
        - `event.pairs[i].bodyA`, `event.pairs[i].bodyB` : Matter body object.
            - `body.gameObject` : Game object of matter body.
- `bodyA`, `bodyB` : Equal to `event.pairs[0].bodyA`, `event.pairs[0].bodyB`.

#### Collision bound

- Rectangle
    ```javascript
    gameObject.setRectangle(width, height, options);
    ```
- Circle
    ```javascript
    gameObject.setCircle(radius, options);
    ```
- Polygon
    ```javascript
    gameObject.setPolygon(radius, sides, options);
    ```
- Trapezoid
    ```javascript
    gameObject.setTrapezoid(width, height, slope, options);
    ```
- Any
    ```javascript
    gameObject.setBody(config, options);
    ```
    - `config` : 
        - Rectangle shape
            ```javascript
            {
                type: 'rectangle',
                // width: gameObject.width
                // height: gameObject.height
            }
            ```
        - Circle shape
            ```javascript
            {
                type: 'circle',
                // radius: (Math.max(gameObject.width, gameObject.height) / 2),
                // maxSides: 25
            }
            ```
        - Trapezoid shape
            ```javascript
            {
                type: 'trapezoid',
                // slope: 0.5,
            }
            ```
        - Polygon shape
            ```javascript
            {
                type: 'polygon',
                // radius: (Math.max(gameObject.width, gameObject.height) / 2),
                // sides: 5,
            }
            ```

#### Bounce

```javascript
gameObject.setBounce(v);
```

- restitution

### Mass

```javascript
gameObject.setMass(v);
```

```javascript
gameObject.setDensity(v);
```

### Sleep

#### Enable

```javascript
var config = {
    // ...
        physics: {
            matter: {
                // ...
                enableSleeping: true
                // ...
            }
        }

}
```

#### Sleep threshold

```javascript
gameObject.setSleepThreshold(value);
```

#### Sleep events

- Sleeping start
    ```javascript
    scene.matter.world.on('sleepstart', function (event, body) {
    });
    ```
- Sleeping end
    ```javascript
    scene.matter.world.on('sleepend', function (event, body) {
    });
    ```
