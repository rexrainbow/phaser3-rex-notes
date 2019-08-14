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

#### Config

```javascript
{
    shape: 'rectangle',

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
    slop: 0.05,

    timeScale: 1,
}
```

- `shape` : `'rectangle'`, `'circle'`, `'trapezoid'`, `'polygon'`, `'fromVertices'`, `'fromPhysicsEditor'`
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
