## Introduction

Non-rendering rectangular game object for creating drop zones and input hit areas, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add zone object

```javascript
var zone = scene.add.zone(x, y, width, height);
```

Add zone from JSON

```javascript
var zone = scene.make.zone({
    x: 0,
    y: 0,
    //width: 1,
    //height: 1
});
```

### Custom class

- Define class
    ```javascript
    class MyZone extends Phaser.GameObjects.Zone {
        constructor(scene, x, y, width, height) {
            super(scene, x, y, width, height);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var zone = new MyZone(x, y, width, height);
    ```

### Other properties

See [game object](gameobject.md)

### Input hit zone

```javascript
zone.setInteractive();
```

See [touch events](touchevents.md#register-interactive)

### Drop zones

- Rectangle drop zone
    ```javascript
    zone.setRectangleDropZone(width, height);
    ```
- Circular drop zone
    ```javascript
    zone.setCircleDropZone(radius);
    ```
- Custom drop zone
    ```javascript
    zone.setInteractive(shape, callback, true);
    ```
    - `callback`
        ```javascript
        function(shape, x, y, gameObject) {
            return hit;  // true/false
        }
        ```
    
See [drop zone](touchevents.md#drop-zone)