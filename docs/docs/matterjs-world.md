## Introduction

[Matter](http://brm.io/matter-js/) physics engine in phaser.

- Author: Richard Davey

## Usage

### Configuration

```javascript
var config = {
    // ...
    physics: {
        default: 'matter',
        matter: {
        //    enabled: true,
        //    positionIterations: 6,
        //    velocityIterations: 4,
        //    constraintIterations: 2,
        //    enableSleeping: false,
        //    plugins: {
        //        attractors: false,
        //        wrap: false,
        //    },
        //    gravity: {
        //        x: 0,
        //        y: 0,
        //    }
        //    setBounds: {
        //        x: 0,
        //        y: 0,
        //        width: scene.sys.scale.width,
        //        height: scene.sys.scale.height,
        //        thickness: 64,
        //        left: true,
        //        right: true,
        //        top: true,
        //        bottom: true,
        //    },
        //    timing: {
        //        timestamp: 0,
        //        timeScale: 1,
        //    },
        //    correction: 1,
        //    getDelta: (function() { return 1000 / 60; }),
        //    autoUpdate: true,
        //    debug: false,
        //    debugShowBody: true,
        //    debugShowStaticBody: true,
        //    debugShowVelocity: true,
        //    debugBodyColor: 0xff00ff,
        //    debugBodyFillColor: 0xe3a7e3,
        //    debugStaticBodyColor: 0x0000ff,
        //    debugVelocityColor: 0x00ff00,
        //    debugShowJoint: true,
        //    debugJointColor: 0x000000,
        //    debugWireframes: true,
        //    debugShowInternalEdges: false,
        //    debugShowConvexHulls: false,
        //    debugConvexHullColor: 0xaaaaaa,
        //    debugShowSleeping: false,
        }
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Control

#### Pause

```javascript
scene.matter.world.pause();
```

#### Resume

```javascript
scene.matter.world.resume();
```

#### Drag object

```javascript
scene.matter.add.mouseSpring();
// scene.matter.add.mouseSpring(options);
```

- `options`
    ```javascript
    {
        length: 0.01,
        stiffness: 0.1,
        damping: 0,
        angularStiffness: 1,
        collisionFilter: {
            category: 0x0001,
            mask: 0xFFFFFFFF,
            group: 0
        }
    }
    ```
    - `collisionFilter` : Drag filter, see [collision](matterjs-gameobject.md#collision).

### World bounds

#### Enable

- World :
    - Set bounds
        ```javascript
        scene.matter.world.setBounds(x, y, width, height);
        // scene.matter.world.setBounds(x, y, width, height, thickness, left, right, top, bottom);
        ```
        - `thickness` : The thickness of each wall, in pixels.
        - `left`, `right`, `top`, `bottom` : If true will create the left/right/top/bottom bounds wall.

### Gravity

- Set
    ```javascript
    scene.matter.world.setGravity(x, y);
    // scene.matter.world.setGravity(x, y, scale);
    ```
- Disalbe
    ```javascript
    scene.matter.world.disableGravity();
    ```

### Constraint

#### Constraint of 2 game objects

```javascript
var constraint = scene.matter.add.constraint(gameObjectA, gameObjectB);
// var constraint = scene.matter.add.constraint(gameObjectA, gameObjectB, length, stiffness, options);
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
var constraint = scene.matter.add.spring(gameObjectA, gameObjectB, length, stiffness, options);
var constraint = scene.matter.add.joint(gameObjectA, gameObjectB, length, stiffness, options);
```

#### Constraint to world position

```javascript
var constraint = scene.matter.add.worldConstraint(gameObjectB, length, stiffness, options);
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

#### Remove constraint

```javascript
scene.matter.world.removeConstraint(constraint);
```
