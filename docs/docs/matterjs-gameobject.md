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

    // plugin: {
    //     attractors: [
    //         (function(bodyA, bodyB) { return {x, y}}),
    //     ]
    // },

    slop: 0.05,

    timeScale: 1,
}
```

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
- `collisionFilter` : An `Object` that specifies the collision filtering properties of this body. Collisions between two bodies will obey the following rules: 
    - If the two bodies have the same non-zero value of `collisionFilter.group`, they will always collide if the value is positive, and they will never collide if the value is negative.
    - If the two bodies have different values of `collisionFilter.group` or if one (or both) of the bodies has a value of `0`, then the category/mask rules apply as follows: `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
        - `collisionFilter.category` : A bit field that specifies the collision category this body belongs to.
        - `collisionFilter.mask` : A bit mask that specifies the collision categories this body may collide with.
- `slop` : A tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
    - The default should generally suffice, although very large bodies may require larger values for stable stacking.

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

#### collision group

- Collision grpup
    ```javascript
    gameObject.setCollisionGroup(value);
    ```
- Collision category
    ```javascript
    gameObject.setCollisionCategory(value);
    gameObject.setCollidesWith(mask);
    ```

#### Collision bound

```javascript
gameObject.setRectangle(width, height, options);
```

```javascript
gameObject.setCircle(radius, options);
```

```javascript
gameObject.setPolygon(radius, sides, options);
```

```javascript
gameObject.setTrapezoid(width, height, slope, options);
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

### Constraint

#### Constraint of 2 game objects

```javascript
scene.matter.add.constraint(gameObjectA, gameObjectB);
// scene.matter.add.constraint(gameObjectA, gameObjectB, length, stiffness, options);
```

- `gameObjectA`, `gameObjectB` : Matter game object, or matter body object.
- `length` : The target resting length of the constraint.
    - `undefined` : Current distance between gameObjectA and gameObjectB. (Default value)
- `stiffness` : The stiffness of the constraint.
    - `1` : Very stiff. (Default value)
    - `0.2` : Acts as a soft spring.
- `options` :
    ```javascript
    {
        pointA: {
            x: 0,
            y: 0,
        },
        pointB: {
            x: 0,
            y: 0,
        },
        damping: 0,
        angularStiffness: 0,
        // render: {
        //     visible: true
        // }
    }
    ```
    - `pointA`, `pointB` : Offset position of `gameObjectA`, `gameObjectB`.

Alias:

```javascript
scene.matter.add.spring(gameObjectA, gameObjectB, length, stiffness, options);
scene.matter.add.joint(gameObjectA, gameObjectB, length, stiffness, options);
```

#### Constraint to world position

```javascript
scene.matter.add.worldConstraint(gameObjectB, length, stiffness, options);
```

- `gameObjectB` : Matter game object, or matter body object.
- `length` : The target resting length of the constraint.
    - `undefined` : Current distance between gameObjectA and gameObjectB. (Default value)
- `stiffness` : The stiffness of the constraint.
    - `1` : Very stiff. (Default value)
    - `0.2` : Acts as a soft spring.
- `options` :
    ```javascript
    {
        pointA: {
            x: 0,
            y: 0,
        },
        pointB: {
            x: 0,
            y: 0,
        },
        damping: 0,
        angularStiffness: 0,
        // render: {
        //     visible: true
        // }
    }
    ```
    - `pointA` : World position.
    - `pointB` : Offset position of `gameObjectB`.

#### Chain game objects

```javascript
var composite = scene.matter.add.chain(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options);
```

- `composite` : [Image composite](matterjs-gameobject.md#image-composite)
- `xOffsetA`, `yOffsetA` : Offset position of gameObjectA, in scale.
    - xOffset = (Offset distance / width)
    - yOffset = (Offset distance / height)
- `xOffsetB`, `yOffsetB` : Offset position of gameObjectB, in scale.
- `options` : 
    ```javascript
    {
        length: undefined,
        stiffness: 1,
        damping: 0,
        angularStiffness: 0,
        // render: {
        //     visible: true
        // }
    }
    ```
    - `length` : The target resting length of the constraint.
        - `undefined` : Current distance between gameObjectA and gameObjectB. (Default value)
    - `stiffness` : The stiffness of the constraint.
        - `1` : Very stiff. (Default value)
        - `0.2` : Acts as a soft spring.
- `composite`
    - `composite.bodies` : An array of bodies.
    - `composite.constraints` : An array of constraints

### Plugins

#### Attractors

##### Enable

- Game config
    ```javascript
    var config = {
        // ...
        physics: {
            default: 'matter',
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

##### Attractor matter object

- Attractor Matter object config
    ```javascript
    var config = {
        // ...
        plugin: {
            attractors: [
                (function(bodyA, bodyB) { return {x, y}}),
            ]
        },
        // ...
    }
    ```
- Attractor force
    ```javascript
    function(bodyA, bodyB) {
        return {x, y}; // Force
    }
    ```
    - `bodyA` : Attractor matter object.
    - `bodyB` : Other matter object
    - Return a force in vector2 (`{x,y}`) format, apply to bodyB.

#### Wrap
