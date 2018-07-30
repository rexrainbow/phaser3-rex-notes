## Introduction

Control the position and angle of children game objects.

It is inspired from [Ziao/phaser3-interim-containers](https://github.com/Ziao/phaser3-interim-containers).

- Author: Rex
- A kind of game object, installed by global plugin

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/containerlite-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcontainerliteplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/containerlite.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/container-lite)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'ContainerLitePlugin',
            plugin: ContainerLitetPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add container object

```javascript
var container = scene.add.rexContainerLite(x, y);  // width = 1, height = 1
// var container = scene.add.rexContainerLite(x, y, width, height);
```
or
```javascript
var container = scene.add.rexContainerLite(x, y, children);  // width = 1, height = 1
// var container = scene.add.rexContainerLite(x, y, width, height, children);
```

Add container from JSON

```javascript
var container = scene.make.rexContainerLite({
    x: 0,
    y: 0,
    width: 1,
    height: 1,

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // scale : {
    //    x: 1,
    //    y: 1
    //}
});
```

### Custom class

- Define class
    ```javascript
    class MyContainer extends ContainerLite {
        constructor(scene, x, y, width, height, children) {
            super(scene, x, y, width, height, children);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var container = new MyContainer(scene, x, y, width, height, children);
    ```

### Destroy

```javascript
container.destroy();
```

Also destroy all child game objects.

### Other properties

This container game object inherits from [Zone](zone.md).

### Add(pin) child

Add(pin) a game obejct to container

```javascript
container.add(child);  // child: a game object
```

Or add(pin) children

```javascript
container.addMultiple(children);  // children: an array of game objects
// container.add(children);  // children: an array of game objects
```

Position/Angle/Scale/Visible/Alpha of children will be changed with container.

### Remove child

```javascript
container.remove(child);  // child: a game object
```

Or remove all children

```javascript
container.clear();
```

### Get children

```javascript
var gameObjects = container.getChildren();
```

### Exist

```javascript
var hasChild = container.contains();
```

### Children group

```javascript
var group = container.children;
```

Reference [Group](group.md)

### Position/Angle/Scale of children

Position/Angle/Scale of children will be updated when position, angle, or scale of container is changed.

Or call

```javascript
container.updateChildPosition(gameObject);
```

to update child's position/angle/scale manually.

### Visible of children

Visible of children will be updated when visible of container is changed.

Or call

```javascript
container.updateChildVisible(gameObject);
```

to update child's visible manually.

### Alpha of children

Alpha of children will be updated when alpha of container is changed.

Or call

```javascript
container.updateChildAlpha(gameObject);
```

to update child's alpha manually.

### Local position of child

```javascript
var localState = container.getLocalState(child);
```

- Properties of `localState`
    - `x`, `y`, `face`
    - `scaleX`, `scaleY`
    - `alpha`

#### Set local position

```javascript
container.setChildLocalPosition(child, x, y);
```

## Compare with Official Container

- Nested container :
    - [Container](container.md) : Feature of nested container will be dropped after v3.12.
    - Container-Lite : Support nested container.
- Position/anlge/scale of a child object :
    - [Container](container.md) : Local position/anlge/scale, responding to parent container, not a world position/anlge/scale.
    - Container-Lite : World position/anlge/scale.
- Updating period
    - [Container](container.md) : Re-calculate position/anlge/scale of each child every render.
    - Container-Lite: Re-calculate position/anlge/scale of each child when parent container changes position/anlge/scale.