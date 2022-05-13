## Introduction

Control the position and angle of children game objects.

It is inspired from [Ziao/phaser3-interim-containers](https://github.com/Ziao/phaser3-interim-containers).

- Author: Rex
- Game object

## Live demos


- [Rotate, alpha](https://codepen.io/rexrainbow/pen/NBgpYd)
- [Tween child](https://codepen.io/rexrainbow/pen/KKpGzvx)
- [Create tween config](https://codepen.io/rexrainbow/pen/qBxdwxo)
- [Timeline child](https://codepen.io/rexrainbow/pen/GRQJPLV)
- [Mix timeline](https://codepen.io/rexrainbow/pen/VwQLNyG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/container-lite)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcontainerliteplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcontainerliteplugin.min.js', true);
    ```
- Add container object
    ```javascript
    var container = scene.add.rexContainerLite(x, y);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ContainerLitePlugin from 'phaser3-rex-plugins/plugins/containerlite-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexContainerLitePlugin',
                plugin: ContainerLitePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add container object
    ```javascript
    var container = scene.add.rexContainerLite(x, y);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ContainerLite from 'phaser3-rex-plugins/plugins/containerlite.js';
    ```
- Add container object
    ```javascript    
    var container = new ContainerLite(scene, x, y);
    scene.add.existing(container);
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
    // alpha: 1,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},
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

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var container = new MyContainer(scene, x, y, width, height, children);
    ```

### Destroy

```javascript
container.destroy();
```

Also destroy all children.

### Other properties

This container game object inherits from [Zone](zone.md).

### Add child

#### Pin

Add(pin) a game obejct to container

```javascript
container.add(child);  // child: a game object
// container.pin(child);
```

- `child` : A game object

or

```javascript
container.pin(child, {
    // syncPosition: true,
    // syncRotation: true,
    // syncScale : true,
    // syncAlpha: true,
});
```

- `child` : A game object
- `syncPosition` : 
    - `true` : Sync position of child, default behavior.
    - `false` : Don't sync position of child.
- `syncRotation` : 
    - `true` : Sync angle of child, default behavior.
    - `false` : Don't sync angle of child.
- `syncScale` : 
    - `true` : Sync scale of child, default behavior.
    - `false` : Don't sync angle of child.    
- `syncAlpha` : 
    - `true` : Sync alpha of child, default behavior.
    - `false` : Don't sync alpha of child. 


Or add(pin) children

```javascript
container.addMultiple(children);
// container.add(children);
```

- `children` : An array of game objects

These world properties of children will be changed with container.

- Position/Angle/Scale
- Visible
- Alpha
- Scroll factor
- Mask

!!! note
    - Position of child is the world position, i.e. position of child won't be changed when adding to container initially.
        - For example, container-lite is at (100, 100), and child is at **(110, 110)**, then child will be placed at (110, 110) after adding to container-lite.
    - This behavior is different from [official container](container.md), which using related position of child when adding to container.
        - For example, official container is at (100, 100), and child is at **(10, 10)**, then child will be placed at (110, 110) after adding to official container.

#### Add local

```javascript
container.addLocal(child);
```

or

```javascript
container.addLocalMultiple(children);
```

or

```javascript
container.pinLocal(child, {
    // syncPosition: true,
    // syncRotation: true,
    // syncScale : true,
    // syncAlpha: true,
});
```

Add child to container with related properties, like official container.  
For example, container-lite is at (100, 100), and child is at **(10, 10)**, then child will be placed at (110, 110) after adding to container-lite.

### Remove child

- Remove a child
    ```javascript
    container.remove(child);
    // container.remove(child, destroyChild);
    ```
    - `child` : Game object
    - `destroyChild` : Set true to destroy child. Default is `false`.
- Remove all children
    ```javascript
    container.clear();
    // container.clear(destroyChild);
    ```

### Get child

- Get first child by name
    ```javascript
    var gameObject = container.getByName(name);
    // var gameObject = container.getByName(name, recursive);
    ```
    - `gameObject` : A child, or `null` if not found.
    - `recursive` : Set `true` to search all children recursively.
- Get a random child
    ```javascript
    var gameObject = container.getRandom();
    // var gameObject = container.getRandom(startIndex, length);
    ```
- Get children in this container-lite
    - Internal children array
        ```javascript
        var gameObjects = container.getChildren();
        ```
    - Copy of children array
        ```javascript
        var gameObjects = container.getChildren([]);
        // var gameObjects = container.getChildren(out);
        ```
- Get all children under this container-lite recursively
    ```javascript
    var gameObjects = container.getAllChildren();
    ```
    - Put container itself and all children into [Layer](layer.md)
        ```javascript
        layer.add(container.getAllChildren([container]));
        ```
    - Draw on [render texture](rendertexture.md#paste-texture)
        ```javascript
        rt.draw(container.getAllChildren());
        ```
    - Ignored in [camera](camera.md#ignore-game-object)
        ```javascript
        camera.ignore(container.getAllChildren());
        ```

### Traversal

- Depth-First Search
    ```javascript
    container.dfs(function(current) {
        // return true;  // Discard children traveraling
    })
    ```
    - Return `true` to discard children traveraling
- Breadth-First Search
    ```javascript
    container.bfs(function(current) {
        // return true;  // Discard children traveraling
    })
    ```
    - Return `true` to discard children traveraling

### Exist

Return true if child is under this container-lite (nested).

```javascript
var hasChild = container.contains(child);
```

### Children

```javascript
var children = container.children;
```

- `children` : Array of child game objects.

### Get parent

```javascript
var parentContainer = scene.plugins.get('rexContainerLitePlugin').getParent(child);
```

or

```javascript
var parentContainer = Container.GetParent(child); // Static method
```

### Set properties of child

#### Position

```javascript
container.setChildPosition(child, x, y);
```

#### Rotation

```javascript
container.setChildRotation(child, rotation);
```

- `rotation` : Angle in radians.

#### Scale

```javascript
container.setChildScale(child, scaleX, scaleY);
```

or 

```javascript
container.setChildDisplaySize(child, width, height);
```


#### Visible

```javascript
container.setChildVisible(child, visible);
```

#### Alpha

```javascript
container.setChildAlpha(child, alpha);
```

### Local state of child

Get local state

```javascript
var localState = container.getLocalState(child);
```

or

```javascript
var localState = child.rexContainer;
```

- Properties of `localState`
    - `x`, `y`
    - `rotation`
    - `scaleX`, `scaleY`
    - `visible`
    - `alpha`

#### Change local state of child

- Local position
    ```javascript
    container.setChildLocalPosition(child, x, y);
    ```
- Local scale
    ```javascript
    container.setChildLocalScale(child, scaleX, scaleY);
    ```
- Local alpha
    ```javascript
    container.setChildLocalAlpha(child, alpha);
    ```
- Local visible
    ```javascript
    container.setChildLocalVisible(child, visible);
    ```

#### Reset local state of child

Reset local state of child according to current properties of children

- Reset local state of all properties
    ```javascript
    container.resetChildState(child);
    ```
- Reset local state of position
    ```javascript
    container.resetChildPositionState(child);
    ```
- Reset local state of rotation
    ```javascript
    container.resetChildRotationState(child);
    ```
- Reset local state of scale
    ```javascript
    container.resetChildScaleState(child);
    ```
- Reset local state of alpha
    ```javascript
    container.resetChildAlphaState(child);
    ```
- Reset local state of visible
    ```javascript
    container.resetChildVisibleState(child);
    ```
- Reset local state of active
    ```javascript
    container.resetChildActiveState(child);
    ```

#### Tween local state

```javascript
var tweenObj = container.tweenChild({
    targets: child,
    // x: '+=100',
    // y: '+=100',
    // repeat: -1,
    // yoyo: true
})
```

[Paramters of configuration](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/#create-tween-task) is the same as tween task.

Supported properties :

- `x`, `y`,
- `angle`, `rotation`
- `scaleX`, `scaleY`, `displayWidth`, `displayHeight`
- `alpha`

#### Create tween config

```javascript
var tweenConfig = container.createTweenChildConfig({
     targets: child,
    // x: '+=100',
    // y: '+=100',
    // repeat: -1,
    // yoyo: true
});
scene.tweens.add(tweenConfig);
```

- Input of `targets` is/are game object(s), will be replaced by local state of game object(S)
- Wrap `onUpdate` callback, to update properties of child according to local state.

#### Timeline local state

```javascript
var timelineObj = container.timelineChild({
    targets: child,    // Can assign child here
    loop: -1,
    duration: 100,
    tweens: [
        {
            // targets: child,    // Or assign child here
            angle: 10,
            yoyo: true,
        },
        {
            // targets: child,    // Or assign child here
            angle: -10,
            yoyo: true,
        },
    ]
})
```

[Paramters of configuration](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween-timeline/#create-timeline-included-tween-tasks) is the same as creating timeline.

### Depth

- Get depth of container
    ```javascript
    var depth = container.depth;
    ```
- Set depth of container
    ```javascript
    container.setDepth(value, true);
    // container.depth = depth;
    ```
- Set depth of container and all children
    ```javascript
    container.setDepth(value);
    ```
- Swap depth with another container
    ```javascript
    containerA.swapDepth(containerB);
    ```
- Increase of container and all children
    ```javascript
    container.incDepth(value);
    ```
- Move game object below this container and all children
    ```javascript
    container.moveDepthBelow(gameObject);
    ```
- Move game object above this container and all children
    ```javascript
    container.moveDepthAbove(gameObject);
    ```

### Mask

- Assign [mask object](mask.md) to children
    ```javascript
    container.setMask(mask);  // container.mask = mask;
    ```
- Remove mask object of children
    ```javascript
    container.clearMask();
    ```

### Scroll factor

- Set scroll factor to children
   ```javascript
   container.setScrollFactor(x, y);
   ```

### Change origin

```javascript
container.changeOrigin(originX, originY);
```

This method also wull reset all local state of children.

### Add to container

- Add to [built-in container](container.md)
    ```javascript
    containerLite.addToContainer(p3Container);
    ```
    - `container` : [Container](container.md) game object.
- Add to [Layer](layer.md)
    ```javascript
    container.addToLayer(layer);
    ```
    - `layer` : [Layer](layer.md) game object.

!!! note
    `container.add(containerLite)`, or `layer.add(containerLite)` won't add children of containerLite.

## Compare with Official Container

- Position/anlge/scale of a child object :
    - [Container](container.md) : Local position/anlge/scale, responding to parent container, not a world position/anlge/scale.
    - Container-Lite : World position/anlge/scale.
- Updating period
    - [Container](container.md) : Re-calculate position/anlge/scale of each child every render.
    - Container-Lite: Re-calculate position/anlge/scale of each child when parent container changes position/anlge/scale.
- Mask
    - [Container](container.md) : It has mask property, and it could become a mask object.
    - Container-Lite : It has mask property, but it could not become a mask object.