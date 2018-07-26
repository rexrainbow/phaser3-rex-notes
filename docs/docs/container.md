## Introduction

Control the position and angle of children game object, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Container

#### Add container object

```javascript
var container = scene.add.container(x, y);
// var container = scene.add.container(x, y, children); // children: an array of game object
```

#### Destroy

```javascript
container.destroy();
```

Also destroy all children game object.

#### Set properties

Reference [game object](gameobject.md), to set position, angle, visible, alpha, etc...

#### Set size

```javascript
container.setSize(width, height);
```

Default size is 0x0.

#### Hit area

```javascript
container.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);
// container.setInteractive(false); // disable
```

Assign hit area with a circle shape.

#### Non-exclusive

```javascript
container.setExclusive(false);
```

Allows a game object added to container many times.

### Children

#### Add child

```javascript
container.add(child);  // child: a game object or an array of game objects
```

```javascript
container.addAt(child, index);
```

#### Exist

```javascript
var hasChild = container.exists(child);
```

#### Get child

```javascript
var firstChild = container.first;
var nextChild = container.next;
var prevChild = container.previous;
var lastChild = container.last;
```

```javascript
var child = container.getByName(name);
```

```javascript
var child = container.getRandom(startIndex, length);
```

```javascript
var child = container.getFirst(property, value, startIndex, endIndex);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

```javascript
var children = container.getAll(property, value, startIndex, endIndex);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

```javascript
var amount = container.count(property, value, startIndex, endIndex);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

#### Remove child

```javascript
container.remove(child);
// container.remove(child, true);  // remove child object and destroy it
```

```javascript
container.removeAt(index);
// container.removeAt(index, true);  // remove child object and destroy it
```

```javascript
container.removeBetween(startIndex, endIndex);
// container.removeBetween(startIndex, endIndex, true);  // remove children objects and destroy them
```

```javascript
container.removeAll();
// container.removeAll(true);  // remove all children objects and destroy them
```

#### Replace child

```javascript
container.replace(oldChild, newChild);
// container.replace(oldChild, newChild, true);  // destroy oldChild
```

#### Order of child

```javascript
container.moveTo(child, index);
```

```javascript
container.bringToTop(child);
```

```javascript
container.sendToBack(child);
```

```javascript
container.moveUp(child);
```

```javascript
container.moveDown(child);
```

```javascript
container.swap(child1, child2);
```

```javascript
container.reverse();
```

```javascript
container.shuffle();
```

#### Set properties

```javascript
container.setAll(property, value, startIndex, endIndex);
```

#### For each child

- Iterate current children list
    ```javascript
    container.iterate(callback);
    // container.iterate(callback, context);
    // container.iterate(callback, context, arg0, arg1, ...);
    // var callback = function(child, arg0, arg1, ...) {};
    ```
- Iterate a copy of current children list
    ```javascript
    container.each(callback);
    // container.each(callback, context);
    // container.each(callback, context, arg0, arg1, ...);
    // var callback = function(child, arg0, arg1, ...) {};
    ```

## Compare with [group object](group.md)

- Container and group objects are all has a children list.
- Container has position, angle, alpha, visible, ...etc, but group does not have.
- Container controls properties of children (position, angle, alpha, visible, ...etc), but group won't.
- A game object could be added to many group, but it only could be added to a container (`exclusive` mode).