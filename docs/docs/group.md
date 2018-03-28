## Introduction

Container of game objects, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add group object

```javascript
var group = scene.add.group(config);
// var group = scene.add.group(gameobjects, config);  // add game objects into group
```

#### Configuration

```javascript
{
    classType: Phaser.GameObjects.Sprite,
    defaultKey: null,
    defaultFrame: null,
    maxSize: -1,
    runChildUpdate: false    // run gameobject.update() if true
}
```

### Add game object

```javascript
group.add(gameobject);
// group.add(gameobject, true);  // add this game object to display and update list of scene
```

```javascript
group.addMultiple(gameobjects);   // array of game objects
// group.addMultiple(gameobjects, true);
```

Game object will only be added once.

### Remove game object

```javascript
group.remove(gameobject);
// group.remove(gameobject, true);  // also remove this game object from display and update list of scene
```

Remove all game objects

```javascript
group.clear();
// group.clear(true);  // also remove this game object from display and update list of scene
```

### Get game objects

```javascript
var gameobjects = group.getChildren();  // array of game objects
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
    var isInGroup = group.contains();
    ```

### Group actions

```javascript
group.playAnimation(key, startFrame);
group.toggleVisible();
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
group.kill(gameobject);         // gameobject.setActive(false)
group.killAndHide(gameobject);  // gameObject.setActive(false).setVisible(false)
```

Get first active/inactive game object, create one if `createIfNull` is `true`

```javascript
var gameobject = group.getFirst(active, createIfNull, x, y, key, frame, visible);  // active = true/false
var gameobject = group.getFirstAlive(createIfNull, x, y, key, frame, visible); // equal to group.getFirst(true, ...)
var gameobject = group.getFirstDead(createIfNull, x, y, key, frame, visible); // equal to group.getFirst(false, ...)
var gameobject = group.get(x, y, key, frame, visible); // equal to group.getFirst(false, true, ...)
```

### Create game objects

```javascript
var gameobjects = group.createFromConfig(config);
var gameobjects = group.createMultiple(config);    // config in array
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
    // Actions.SetXY(gameobjects, x, y, stepX, stepY)

    setRotation: {
        value: 0,
        step:
    },
    // Actions.SetRotation(gameobjects, value, step)

    setScale: {
        x:0,
        y:0,
        stepX:0,
        stepY:0
    },
    // Actions.SetScale(gameobjects, x, y, stepX, stepY)

    setAlpha: {
        value: 0,
        step:
    },
    // Actions.SetAlpha(gameobjects, value, step)

    hitArea: null,
    hitAreaCallback: null,
    // Actions.SetHitArea(gameobjects, hitArea, hitAreaCallback);

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