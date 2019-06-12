## Introduction

Objects pool, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add group object

```javascript
var group = scene.add.group(config);
// var group = scene.add.group(gameObjects, config);  // Add game objects into group
```

- `config`
    ```javascript
    {
        classType: Phaser.GameObjects.Sprite,
        defaultKey: null,
        defaultFrame: null,
        active: true,
        maxSize: -1,
        runChildUpdate: false,
        createCallback: null,
        removeCallback: null,
        createMultipleCallback: null
    }
    ```
    - `classType` :
        - [Sprite](sprite.md) : `Phaser.GameObjects.Sprite`
        - [Image](image.md) : `Phaser.GameObjects.Image`
    - `runChildUpdate` : Set `true` to run `gameObject.update()` every tick.
    - `createCallback` : A function to be called when adding or creating group members.
        ```javascript
        var callback = function(gameObject) {
        }
        ```
    - `removeCallback` : A function to be called when removing group members.
        ```javascript
        var callback = function(gameObject) {
        }
        ```
    - `createMultipleCallback` : A function to be called when creating several group members at once.
        ```javascript
        var callback = function(gameObjects) {
        }
        ```

### Add game object

```javascript
group.add(gameObject);
// group.add(gameObject, true);  // add this game object to display and update list of scene
```

```javascript
group.addMultiple(gameObjects);   // array of game objects
// group.addMultiple(gameObjects, true);
```

- Game object will only be added once.
- Game object will be removed automatically when destroyed.

### Remove game object

```javascript
group.remove(gameObject);
// group.remove(gameObject, true);  // also remove this game object from display and update list of scene
```

Remove all game objects

```javascript
group.clear();
// group.clear(removeFromScene, destroyChild);
```

### Get game objects

- Get all game objects.
    ```javascript
    var gameObjects = group.getChildren();  // array of game objects
    ```
- Amount of game objects.
    ```javascript
    var len = group.getLength();
    ```
- Group is full. Maximun size is set in [`maxSize`](group.md#configuration).
    ```javascript
    var isFull = group.isFull();
    ```
- Game object is in group.
    ```javascript
    var isInGroup = group.contains(child);
    ```

### Group actions

```javascript
group.playAnimation(key, startFrame);
```

```javascript
group.toggleVisible();
```

```javascript
group.setDepth(value, step);
```

### Active/inactive game objects

- Set inactive
    ```javascript
    group.kill(gameObject);         // gameObject.setActive(false)
    group.killAndHide(gameObject);  // gameObject.setActive(false).setVisible(false)
    ```
- Amount of active game objects
    ```javascript
    var activeCount = group.countActive();
    ```
    or
    ```javascript
    var activeCount = group.getTotalUsed();
    ```
- Amount of active game objects
    ```javascript
    var inactiveCount = group.countActive(false);
    ```
- Amount of free (maxSize - activeCount) game objects
    ```javascript
    var freeCount = group.getTotalFree();  // group.maxSize - group.getTotalUsed()
    ```
- Get first active/inactive game object,
    - Return `null` if no game object picked.
        ```javascript
        var gameObject = group.getFirst(active);  // active = true/false
        var gameObject = group.getFirstAlive(); // Equal to group.getFirst(true, ...)
        var gameObject = group.getFirstDead(); // Equal to group.getFirst(false, ...)
        ```
    - Create one if no game object picked.
        ```javascript
        var gameObject = group.getFirst(active, true, x, y, key, frame, visible);  // active = true/false
        var gameObject = group.getFirstAlive(true, x, y, key, frame, visible); // Equal to group.getFirst(true, ...)
        var gameObject = group.getFirstDead(true, x, y, key, frame, visible); // Equal to group.getFirst(false, ...)
        var gameObject = group.get(x, y, key, frame, visible); // Equal to group.getFirst(false, true, ...)
        ```
        - Use (`x`, `y`, `key`, `frame`) to create [Image](image.md)/[Sprite](sprite.md) game object.
            ```javascript
            var newGameObject = new GameObjectClass(x, y, key, frame);
            ```

### Create game objects

```javascript
var gameObjects = group.createFromConfig(config);
var gameObjects = group.createMultiple(config);    // config in array
```

-  `config`
    ```javascript
    {
        classType: this.classType,
        key: undefined,             // Required
        frame: null,
        visible: true,
        active: true,
        repeat: 0,                  // Create (1 + repeat) game objects
        createCallback: undefined,  // Override this.createCallback if not undefined

        // Position
        setXY: {
            x:0,
            y:0,
            stepX:0,
            stepY:0
        },
        // Actions.SetXY(gameObjects, x, y, stepX, stepY)
        gridAlign: false,
        // {
        //     width: -1,
        //     height: -1,
        //     cellWidth: 1,
        //     cellHeight: 1,
        //     position: Phaser.Display.Align.TOP_LEFT,
        //     x: 0,
        //     y: 0
        // }
        // Actions.GridAlign(gameObjects, gridAlign)

        // Angle
        setRotation: {
            value: 0,
            step:
        },
        // Actions.SetRotation(gameObjects, value, step)

        // Scale
        setScale: {
            x:0,
            y:0,
            stepX:0,
            stepY:0
        },
        // Actions.SetScale(gameObjects, x, y, stepX, stepY)

        // Alpha
        setAlpha: {
            value: 0,
            step:
        },
        // Actions.SetAlpha(gameObjects, value, step)

        // Input
        hitArea: null,
        hitAreaCallback: null,
        // Actions.SetHitArea(gameObjects, hitArea, hitAreaCallback)
    }
    ```
    - `classType` :
        - [Sprite](sprite.md): `Phaser.GameObjects.Sprite`
        - [Image](image.md): `Phaser.GameObjects.Image`