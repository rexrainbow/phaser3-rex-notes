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