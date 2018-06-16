## Introduction

[Event emitter](https://github.com/primus/eventemitter3).

## Usage

### Get event emitter

- Scene: 
    ```javascript
    var ee = scene.sys.events;
    ```
- Game object:
    ```javascript
    var ee = gameObject;
    ```

### Attach listener

```javascript
ee.on(eventName, callback, callbackScope);
ee.once(eventName, callback, callbackScope);  // only fire listeners one time
```

Alias

```javascript
ee.addListener(eventName, callback, callbackScope);
ee.addListener(eventName, callback, callbackScope, true);  // only fire listeners one time
```

### Fire event

```javascript
ee.emit(eventName);
```

### Remove listeners

```javascript
ee.off(eventName, callback, callbackScope);
ee.off(eventName, callback, callbackScope, true);   // only remove one-time listeners
```

Alias

```javascript
ee.removeListener(eventName, callback, callbackScope); 
ee.removeListener(eventName, callback, callbackScope, true);  // only remove one-time listeners
```

### Remove all listeners

```javascript
ee.removeAllListeners();
```

### Get listeners count

```javascript
var count = ee.listenerCount(eventName);
//var noListener = (ee.listenerCount(eventName) === 0);
```

### Get listeners

```javascript
var listeners = ee.listeners(eventName);
```

#### Listener

```javascript
{
    fn: callback,
    context: callbackScope,
    once: once
}
```