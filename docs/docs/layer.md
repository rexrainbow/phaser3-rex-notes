## Introduction

A local display list, built-in game object of phaser.

!!! warning "Layers have no position or size"
    Layers have no position or size within the Scene  

    - Cannot enable a Layer for physics or input.
    - Cannot change the position, rotation or scale of a Layer. 
    - No scroll factor, texture, tint, origin, crop or bounds.

!!! warning "Layers cannot be added to Containers"
    Containers can be added to Layers, but Layers cannot be added to Containers.

- Author: Richard Davey

## Usage

### Add layer

```javascript
var layer = scene.add.layer();
// var layer = scene.add.layer(children);
```

- `children` : Array of game objects added to this layer.

### Custom class

- Define class
    ```javascript
    class MyLayer extends Phaser.GameObjects.Layer {
        constructor(scene, children) {
            super(scene, children);
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
    var layer = new MyLayer(scene, children);
    ```

### Add child

- Add child
    ```javascript
    layer.add(gameObject);
    // layer.add(gameObjects);
    ```
    - `gameObject` : A game object, or an array of game objects.
- Add child at
    ```javascript
    layer.addAt(gameObject, index);
    ```
- Replace child
    ```javascript
    layer.replace(oldGameObject, newGameObject);
    ```

### Remove child

- Remove child
    ```javascript
    var removed = layer.remove(gameObject);
    ```
- Remove child at
    ```javascript
    var removed = layer.removeAt(index);
    ```
- Remove children between indexes
    ```javascript
    var removed = layer.removeBetween(startIndex, endIndex);
    ```
- Remove all children
    ```javascript
    layer.removeAll();
    ```

Removed game object won't be added to display list of scene, use

```javascript
scene.add.existing(gameObject);
```

to add it back.

### Get child

- Get child at
    ```javascript
    var gameObject = layer.getAt(index);
    ```
- Get first child by name
    ```javascript
    var gameObject = layer.getByName(name);
    ```
- Get first child by property
    ```javascript
    var gameObject = layer.getFirst(property, value);
    // var gameObject = layer.getFirst(property, value, startIndex, endIndex);
    ```
- Get random child
    ```javascript
    var gameObject = layer.getRandom();
    // var gameObject = layer.getRandom(startIndex, length);
    ```
- Get all children
    ```javascript
    var gameObjects = layer.getAll();
    ```
- Get index of child
    ```javascript
    var index = layer.getIndex(gameObject);
    ```
- Get child count
    ```javascript
    var count = layer.count(property, value);
    ```
- Get total children count
    ```javascript
    var count = layer.length;
    ```
- Has child
    ```javascript
    var hasChild = layer.exists(gameObject);
    ```

#### Iterate

- Get first child (set iterator index to 0)
    ```javascript
    var gameObject = layer.first;
    ```
- Get last child (set iterator index to last)
    ```javascript
    var gameObject = layer.last;
    ```
- Get next child (increase iterator index, until last)
    ```javascript
    var gameObject = layer.next;
    ```
- Get previous child (decrease iterator index, until 0)
    ```javascript
    var gameObject = layer.previous;
    ```

### Move child

- Swap
    ```javascript
    layer.swap(gameObject1, gameObject2);
    ```
- Move to
    ```javascript
    layer.moveTo(gameObject, index);
    ```
- Bring to top
    ```javascript
    layer.bringToTop(gameObject);
    ```
- Send to back
    ```javascript
    layer.sendToBack(gameObject);
    ```
- Move up
    ```javascript
    layer.moveUp(gameObject);
    ```
- Move down
    ```javascript
    layer.moveDown(gameObject);
    ```
- Move child1 above child2
    ```javascript
    layer.moveAbove(child1, child2);
    ```
- Move child1 below child2
    ```javascript
    layer.moveBelow(child1, child2);
    ```
- Sort
    ```javascript
    layer.sort(property);
    ```
    or
    ```javascript
    layer.sort('', function(gameObject1, gameObject2) { 
        return 1; // 0, or -1
    });
    ```
- Reverse
    ```javascript
    layer.reverse();
    ```
- Shuffle
    ```javascript
    layer.shuffle();
    ```

!!! note Sort by depth
    Children game objects also sort by depth.

### For each child

```javascript
layer.each(function(gameObject) {

}, scope);
```

### Set property

```javascript
layer.setAll(property, value);
// layer.setAll(property, value, startIndex, endIndex);
```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = image.createBitmapMask();
```

See [mask](mask.md)