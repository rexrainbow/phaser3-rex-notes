## Introduction

[Event emitter](https://github.com/primus/eventemitter3).

## Usage

### Get event emitter

- Scene: 
    ```javascript
    var ee = scene.events;
    ```
- Game object:
    ```javascript
    var ee = gameObject;
    ```

### Attach listener

```javascript
ee.on(eventName, callback, scope);
ee.once(eventName, callback, scope);  // only fire listeners one time
```

Alias

```javascript
ee.addListener(eventName, callback, scope);
ee.addListener(eventName, callback, scope, true);  // only fire listeners one time
```

### Fire event

```javascript
ee.emit(eventName, parameter0, ...);
```

### Remove listeners

```javascript
ee.off(eventName, callback, scope);
ee.off(eventName, callback, scope, true);   // only remove one-time listeners
```

Alias

```javascript
ee.removeListener(eventName, callback, scope); 
ee.removeListener(eventName, callback, scope, true);  // only remove one-time listeners
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
    context: scope,
    once: once
}
```