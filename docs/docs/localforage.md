## Introduction

Offline storage, improved.

- Author: [Mozilla](https://github.com/localForage/localForage)

## Usage

[Official document](https://localforage.github.io/localForage/)

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/localforage)

By default, LocalForage selects backend drivers for the datastore in this order:

1. IndexedDB
1. WebSQL
1. localStorage

### Save data

- Callback
    ```javascript
    localforage.setItem(key, value, function(){ /* ... */ });
    ```
- Promise
    ```javascript
    localforage.setItem(key, value)
        .then(function(value){ /* ... */ })
        .catch(function(err){ /* ... */ });
    ```

### Read data

- Callback
    ```javascript
    localforage.getItem(key, function(err, value){ /* ... */ });
    ```
- Promise
    ```javascript
    localforage.getItem(key)
        .then(function(value){ /* ... */ })
        .catch(function(err){ /* ... */ });
    ```

### Remove data

- Callback
    ```javascript
    localforage.removeItem(key, function(){ /* ... */ });
    ```
- Promise
    ```javascript
    localforage.removeItem(key)
        .then(function(value){ /* ... */ })
        .catch(function(err){ /* ... */ });
    ```