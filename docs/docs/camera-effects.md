## Introduction

Effects of camera.

- Author: Richard Davey

## Usage

### Fade-in / fade-out

```javascript
camera.fadeIn(duration);   // duration in ms
// camera.fadeIn(duration, red, green, blue, callback, context);
// red/green/blue: the value to fade the red/green/blue channel from. A value between 0 and 255.
```

```javascript
camera.fadeOut(duration);   // duration in ms
// camera.fadeOut(duration, red, green, blue, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

#### Events

```javascript
camera.on('camerafadeincomplete', camera, fade);
```

```javascript
camera.on('camerafadeoutcomplete', camera, fade);
```

### Flash

```javascript
camera.flash(duration);   // duration in ms
// camera.flash(duration, red, green, blue, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

#### Events

```javascript
camera.on('cameraflashstart', camera, flash, duration, red, green, blue);
```

```javascript
camera.on('cameraflashcomplete', camera, flash);
```

### Shake

```javascript
camera.shake(duration);   // duration in ms
// camera.shake(duration, intensity, force, callback, context);  // callback: invoked when completed
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

#### Events

```javascript
camera.on('camerashakestart', camera, shake, duration, intensity);
```

```javascript
camera.on('camerashakecomplete', camera, shake);
```

### Pan

```javascript
camera.pan(x, y, duration);   // duration in ms
// camera.pan(x, y, duration, ease, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress, x, y) {}
    ```

#### Events

```javascript
camera.on('camerapanstart', camera, pan, duration, x, y);
```

```javascript
camera.on('camerapancomplete', camera, pan);
```

### Zoom

```javascript
camera.zoomTo(zoomValue, duration);   // duration in ms
// camera.zoomTo(zoomValue, duration, ease, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress, zoomValue) {}
    ```

#### Events

```javascript
camera.on('camerazoomstart', camera, zoom, duration, zoomValue);
```

```javascript
camera.on('camerazoomcomplete', camera, zoom);
```

### Mask

- Add mask
    ```javascript
    camera.setMask(mask);
    ```
- Clear mask
    ```javascript
    camera.clearMask();
    ```

More detail about [mask](mask.md)


