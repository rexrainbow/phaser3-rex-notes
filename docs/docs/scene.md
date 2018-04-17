## Define a scene

### ES6 class

```javascript
class MyScene extends Phaser.Scene {

    constructor (config)
    {
        super(config);
    }

    preload () {}
    create ()  {}
    update() {}

}
```

### Class

```javascript
var MyScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene (config)
    {
        Phaser.Scene.call(this, config)
    },

    preload: function () {},
    create: function () {},
    update: function () {}
});
```

```javascript
var MyGame = {};

MyGame.Boot = function ()
{
};

MyGame.Boot.prototype.constructor = MyGame.Boot;

MyGame.Boot.prototype = {
    preload: function () {},
    create: function () {},
    update: function () {}
};
```

### Overwrite

```javascript
var demo = new Phaser.Scene('Demo');

demo.preload = function (){};
demo.create = function (){};
demo.update = function (){};
```

## Members

- `sys`
- `game`
- `anims`
- `cache`
- `registry`
- `sound`
- `textures`
- `events`
- `cameras`
- `cameras3d`
- `add`
- `make`
- `scene` : scenePlugin
- `children` : displayList
- `lights`
- `data`
- `input`
- `load`
- `time`
- `tweens`
- `physics` : arcadePhysics
- `impact` : impactPhysics
- `matter` :　matterPhysics

Preserve word in a scene.

## Events

- start
    ```javascript
    scene.events.on('start', function(){});
    ```

- destroy
    ```javascript
    scene.events.on('destroy', function(){});
    ```

- preupdate
    ```javascript
    scene.events.on('preupdate', function(time, delta){});
    ```

- update
    ```javascript
    scene.events.on('update', function(time, delta){});
    ```

- postupdate
    ```javascript
    scene.events.on('postupdate', function(time, delta){});
    ```

- render
    ```javascript
    scene.events.on('render', function(){});
    ```

- pause
    ```javascript
    scene.events.on('pause', function(){});
    ```

- resume
    ```javascript
    scene.events.on('resume', function(){});
    ```

- sleep
    ```javascript
    scene.events.on('sleep', function(){});
    ```

- wake
    ```javascript
    scene.events.on('wake', function(){});
    ```

- resize
    ```javascript
    scene.events.on('resize', function(){});
    ```

- boot
    ```javascript
    scene.events.on('boot', function(){});
    ```

- shutdown
    ```javascript
    scene.events.on('shutdown', function(){});
    ```