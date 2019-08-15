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
```

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

### Collision

```javascript
scene.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
});
```

- `bodyA`, `bodyB` : Matter body object.
    - `bodyA.gameObject`, `bodyB.gameObject` : Game object of matter body.