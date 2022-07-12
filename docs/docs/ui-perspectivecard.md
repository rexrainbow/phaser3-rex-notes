## Introduction

A container with front and back faces.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Flip](https://codepen.io/rexrainbow/pen/eYMzwGa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-perspectivecard)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add card object
    ```javascript
    var card = scene.rexUI.add.perspectiveCard(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add card object
    ```javascript
    var card = scene.rexUI.add.perspectiveCard(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveCard } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add card object
    ```javascript    
    var card = new PerspectiveCard(scene, config);
    scene.add.existing(card);
    ```

### Add card object

```javascript
var sizer = scene.rexUI.add.perspectiveCard({    
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    back: backGameObject,
    front: frontGameObject,
    // face: 0,
    // orientation: 0,
    // snapshotPadding: 0,

    // flip : {
    //     frontToBack: 0,
    //     backToFront: 1,
    //     duration: 1000,
    //     ease: 'Cubic',
    //     delay: 0,
    // }

    // space: { left: 0, right:0, top:0, bottom:0 },
    // name: '',
    // draggable: false,
    // sizerEvents: false,

});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `front`, `back` : Any game object for front or back face.
- `face` : Show front or back face.
    - `'front'`, or `0` : Show front face.
    - `'back'`, or `1` : Show back face.
- `orientation` : Flipping orientation.
    - `'horizontal'`,`'h'`, `'x'`, or `0` : Flipping left-to-right, or right-to-left.
    - `'vertical'`,`'v'`, `'y'`, or `1` : Flipping top-to-bottom, or bottom-to-top.
- `snapshotPadding` : Padding around face when taking a snapshot of a face.
- `flip` : Configuration of flipping behavior.
    - `flip.frontToBack`, `flip.backToFront` : Flipping direction.
        - `'right'`, `'left-to-right'`, or `0` : Flipping from right to left.
        - `'left'`, `'right-to-left'`, or `1` : Flipping from left to right.
    - `flip.duration` : Duration of flipping, in millisecond.
    - `flip.delay` : Initial delay.
    - `flip.ease` : Ease function. Default value is `'Cubic'`.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyPerspectiveCard extends PerspectiveCard {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var card = new MyPerspectiveCard(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
card.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = card.getElement('background');
        ```
    - Front face game object
        ```javascript
        var frontFace = card.getElement('front');
        ```
    - Back face game object
        ```javascript
        var backFace = card.getElement('back');
        ```
- Get by name
    ```javascript
    var gameObject = card.getElement('#' + name);
    // var gameObject = card.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = card.getByName(name);
    // var gameObject = card.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Face

- Get
    ```javascript
    var face = card.face;
    ```
    - `face`:
        - `0` : Show front face.
        - `1` : Show back face.
- Set
    ```javascript
    card.setFace(face)
    ```
    - `face`
        - `'front'`, or `0` : Show front face.
        - `'back'`, or `1` : Show back face.
- Toggle
    ```javascript
    card.toggleFace()
    ```

### Face instances

- Front face
    ```javascript
    var frontFace = card.frontFace;
    // var frontFace = card.faces.front;
    ```
- Back face
    ```javascript
    var backFace = card.backFace;
    // var backFace = card.faces.back;
    ```

### Flip behavior

#### Start flipping

```javascript
card.flip.flip();
// card.flip.flip(duration, repeat);
```

- `duration` : Overwrite default duration value.
- `repeat` : Number of flipping time (`repeat + 1`) during `duration`. Default value is `0`.

or

- Flip-right
    ```javascript
    card.flip.flipRight();
    // card.flip.flipRight(duration, repeat);
    ```
- Flip-left
    ```javascript
    card.flip.flipLeft();
    // card.flip.flipLeft(duration, repeat);
    ```

!!! note
    - When flipping start:
        - Snapshot face game objects to [perspective-card mesh](perspective-card.md)
        - Set face game objects to invisible, and [perspective-card mesh](perspective-card.md) to visible
    - When flipping complete:
        - Revert visible of Face game objects and [perspective-card mesh](perspective-card.md)

#### Stop flipping

```javascript
card.flip.stop();
```

#### Set duration

```javascript
card.flip.setDuration(duration);
// card.flip.duration = duration;
```

### Set ease

```javascript
card.flip.setEase(ease);
// card.flip.ease = ease;
```

#### Events

- On flipping start
    ```javascript
    card.flip.on('start', function(){
        // ...
    });
    ```
- On flipping complete
    ```javascript
    card.flip.on('complete', function(){
        // ...
    });
    ```

#### Status

- Is flipping
    ```javascript
    var isRunning = card.flip.isRunning;
    ```

### Rotation

- Get rotation angle
    ```javascript
    var angleX = card.angleX; // Angle in degrees
    var angleY = card.angleY; // Angle in degrees
    var angleZ = card.angleZ; // Angle in degrees
    ```
    or
    ```javascript
    var rotationX = card.rotationX; // Angle in radians
    var rotationY = card.rotationY; // Angle in radians
    var rotationZ = card.rotationZ; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    card.angleX = angleX; // Angle in degrees
    card.angleY = angleY; // Angle in degrees
    card.angleZ = angleZ; // Angle in degrees
    ```
    or
    ```javascript
    card.rotationX = rotationX; // Angle in radians
    card.rotationY = rotationY; // Angle in radians
    card.rotationZ = rotationZ; // Angle in radians
    ```

### Other properties

See [overlapSizer](ui-overlapsizer.md).
