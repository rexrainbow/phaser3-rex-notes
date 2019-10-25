Scene manager plugin:

- In each scene instance: `scene.scene`

## Add new scene

```javascript
var newScene = scene.scene.add(key, sceneConfig, autoStart, data);
// var newScene = game.scene.add(key, sceneConfig, autoStart, data);
```

- `key` : A unique key used to reference the Scene.
- `sceneConfig` : The [config for the Scene](scene.md#configuration-of-scene), or a [scene](scene.md#es6-class) class.
- `autoStart` : Set `true` to start scene immediately after added.
- `data` : Optional data object. This will be set as Scene.settings.data and passed to `Scene.init`.

### Load scene from external files

1. [load script](loader.md#script)
    ```javascript
    scene.load.script(key, url);
    ```
1. add new scene
    ```javascript
    scene.scene.add(key, sceneConfig, autoStart);
    // game.scene.add(key, sceneConfig, autoStart);
    ```

## Destroy scene

```javascript
scene.scene.remove(key);
```

- Fires scene.events `destroy`

## Start scene

- Launch the given Scene and run it in parallel with this one
    ```javascript
    scene.scene.launch(key, data);
    ```
- Shutdown this Scene and run the given one
    ```javascript
    scene.scene.start(key, data);
    ```
- Restarts this Scene
    ```javascript
    scene.scene.restart(data);
    ```

## Pause/Resume scene

- Pause : stops the update step but still renders
    ```javascript
    scene.scene.pause(key);
    // scene.scene.pause();  // pause myself
    ```
    - Fires scene.events `pause`
- Resume : starts the update loop again
    ```javascript
    scene.scene.resume(key);
    // scene.scene.resume();  // resume myself
    ```
    - Fires scene.events `resume`
- Sleep : no update, no render but doesn't shutdown
    ```javascript
    scene.scene.sleep(key);
    // scene.scene.sleep();  // sleep myself
    ```
    - Fires scene.events `sleep`
- Wake-up: starts update and render
    ```javascript
    scene.scene.wake(key);
    // scene.scene.wake();  // wake-up myself
    ```
    - Fires scene.events `wake`
- Makes this Scene sleep then starts the Scene given
    ```javascript
    scene.scene.switch(key);
    ```

## Run scene

Runs the given Scene, but does not change the state of this Scene.

If the given Scene is paused, it will resume it. If sleeping, it will wake it.
If not running at all, it will be started.

```javascript
scene.scene.run(key, data);
```

## Stop scene

Stop : shutdown the Scene, clearing display list, timers, etc.

```javascript
scene.scene.stop(key);
// scene.scene.stop();  // stop myself
```

## Set visible

```javascript
scene.scene.setVisible(value, key);  // value: true/false
// scene.scene.setVisible(value);    // set visible to myself
```

## Read status

```javascript
var isSleep = scene.scene.isSleeping(key);
// var isSleep = scene.scene.isSleeping();
```

```javascript
var isPaused = scene.scene.isPaused(key);
// var isPaused = scene.scene.isPaused();
```

```javascript
var isActive = scene.scene.isActive(key);
// var isActive = scene.scene.isActive();
```

```javascript
var isVisible = scene.scene.isVisible(key);
// var isVisible = scene.scene.isVisible();
```

|       | Update/isActive    | Render/isVisible   |
| ----- | ------------------ | ------------------ |
| Run   | :heavy_check_mark: | :heavy_check_mark: |
| Pause |                    | :heavy_check_mark: |
| Sleep |                    |                    |

## Get scene

```javascript
var scene = scene.scene.getScene(key);
```

## Order of scenes

Swaps the position of two scenes in the Scenes list.

```javascript
scene.scene.swapPosition(keyA, keyB);
// scene.scene.stop(keyA);
```

```javascript
scene.scene.moveAbove(keyA, keyB);
// scene.scene.moveAbove(keyA);
```

Scene B is directly above Scene A.

```javascript
scene.scene.moveBelow(keyA, keyB);
// scene.scene.moveBelow(keyA);
```

Scene B is directly below Scene A.

```javascript
scene.scene.moveUp(keyA);
// scene.scene.moveBelow();
```

```javascript
scene.scene.moveDown(keyA);
// scene.scene.moveDown();
```

```javascript
scene.scene.bringToTop(keyA);
// scene.scene.bringToTop();
```

```javascript
scene.scene.sendToBack(keyA);
// scene.scene.sendToBack();
```

## Transition

```javascript
scene.scene.transition({
    target: nextSceneClass,   // the Scene key to transition to
    // data: null,            // an object containing any data you wish to be passed to the target scenes init / create methods.
    // moveAbove: false,      // move the target Scene to be above this current scene before the transition starts
    // moveBelow: false,      // move the target Scene to be below this current scene before the transition starts

    duration: 1000,           // the duration, in ms

    // sleep: false,          // set true to sleep this scene, set false to stop this scene
    // allowInput: false,     // set true to enable input system of current scene and target scene

    // onUpdate: null,
    // onUpdateScope: scene
})
```

### Events

- boot
    ```javascript
    scene.events.on('transitioninit', function(fromScene, duration)){});
    ```
- start
    ```javascript
    scene.events.on('transitionstart', function(fromScene, duration){});
    ```
- transition-out
    ```javascript
    scene.events.on('transitionout', function(targetScene){});
    ```
- complete
    ```javascript
    scene.events.on('transitioncomplete', function(scene){});
    ```
- wake : wake-up target scene if it was previously asleep
    ```javascript
    scene.events.on('transitionwake', function(fromScene, duration){});
    ```
