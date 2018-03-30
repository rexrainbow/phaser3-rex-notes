Scene manager:

- In Game instance : `game.scene`
- In each scene instance: `scene.scene`

## Add new scene

```javascript
scene.scene.add(key, sceneConfig, autoStart);
// game.scene.add(key, sceneConfig, autoStart);
```

## Remove scene

```javascript
scene.scene.remove(key);
```

## Start scene

Launch the given Scene and run it in parallel with this one.

```javascript
scene.scene.launch(key, data);
```

Shutdown this Scene and run the given one.

```javascript
scene.scene.start(key, data);
```

## Pause/Resume scene

Pause : stops the update step but still renders.

```javascript
scene.scene.pause(key);
// scene.scene.pause();  // pause myself
```

Resume : starts the update loop again.

```javascript
scene.scene.resume(key);
// scene.scene.resume();  // resume myself
```

Sleep : no update, no render but doesn't shutdown.

```javascript
scene.scene.sleep(key);
// scene.scene.sleep();  // sleep myself
```

Wake-up: starts update and render

```javascript
scene.scene.wake(key);
// scene.scene.wake();  // wake-up myself
```

Makes this Scene sleep then starts the Scene given.

```javascript
scene.scene.switch(key);
```

### Read status

```javascript
var isSleep = scene.scene.isSleeping(key);
// var isSleep = scene.scene.isSleeping();
```

```javascript
var isActive = scene.scene.isActive(key);
// var isActive = scene.scene.isActive();
```

```javascript
var isVisible = scene.scene.isVisible(key);
// var isVisible = scene.scene.isVisible();
```

## Stop scene

Stop : shutdown the Scene, clearing display list, timers, etc.

```javascript
scene.scene.stop(key);
// scene.scene.stop();  // stop myself
```

## Get scene

```javascript
var scene = scene.scene.get(key);
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