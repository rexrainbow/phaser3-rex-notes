## Introduction

Container of game objects, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add group object

```javascript
var group = scene.add.group(config);
// var group = scene.add.group(gameObjects, config);  // add game objects into group
```

#### Configuration

```javascript
{
    classType: Phaser.GameObjects.Sprite,
    defaultKey: null,
    defaultFrame: null,
    maxSize: -1,
    runChildUpdate: false    // run gameObject.update() if true
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

Game object will only be added once.

### Remove game object

```javascript
group.remove(gameObject);
// group.remove(gameObject, true);  // also remove this game object from display and update list of scene
```

Remove all game objects

```javascript
group.clear();
// group.clear(true);  // also remove this game object from display and update list of scene
```

### Get game objects

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

Amount of active/inactive game objects

```javascript
var activeCount = group.countActive();
// var inactiveCount = group.countActive(false);  // get amount of inactive game objects
```

```javascript
var activeCount = group.getTotalUsed();        // equal to group.countActive()
var freeCount = group.getTotalFree();          // group.maxSize - group.getTotalUsed()
```

```javascript
group.kill(gameObject);         // gameObject.setActive(false)
group.killAndHide(gameObject);  // gameObject.setActive(false).setVisible(false)
```

Get first active/inactive game object, create one if `createIfNull` is `true`

```javascript
var gameObject = group.getFirst(active, createIfNull, x, y, key, frame, visible);  // active = true/false
var gameObject = group.getFirstAlive(createIfNull, x, y, key, frame, visible); // equal to group.getFirst(true, ...)
var gameObject = group.getFirstDead(createIfNull, x, y, key, frame, visible); // equal to group.getFirst(false, ...)
var gameObject = group.get(x, y, key, frame, visible); // equal to group.getFirst(false, true, ...)
```

### Create game objects

```javascript
var gameObjects = group.createFromConfig(config);
var gameObjects = group.createMultiple(config);    // config in array
```

#### Configuration

```javascript
{
    classType: this.classType,
    key: undefined,             // required
    frame: null,
    visible: true,
    active: true,
    repeat: 0,                  // create (1 + repeat) game objects

    setXY: {
        x:0,
        y:0,
        stepX:0,
        stepY:0
    },
    // Actions.SetXY(gameObjects, x, y, stepX, stepY)

    setRotation: {
        value: 0,
        step:
    },
    // Actions.SetRotation(gameObjects, value, step)

    setScale: {
        x:0,
        y:0,
        stepX:0,
        stepY:0
    },
    // Actions.SetScale(gameObjects, x, y, stepX, stepY)

    setAlpha: {
        value: 0,
        step:
    },
    // Actions.SetAlpha(gameObjects, value, step)

    hitArea: null,
    hitAreaCallback: null,
    // Actions.SetHitArea(gameObjects, hitArea, hitAreaCallback);

    gridAlign: false
    // {
    //     width: -1,
    //     height: -1,
    //     cellWidth: 1,
    //     cellHeight: 1,
    //     position: Phaser.Display.Align.TOP_LEFT,
    //     x: 0,
    //     y: 0
    // }
}
```