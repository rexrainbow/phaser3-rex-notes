## Introduction

Store data in key-value pairs, built-in object of phaser.

- Author: Phaser Team

## Usage

### Write

#### Set value

- Set value
    ```javascript
    parent.data.set(key, value);
    ```
    or
    ```javascript
    parent.data.values[key] = value;
    ```
    - `key` : Key string.
- Increase number value. If the key doesn't already exist in the Data Manager then it is increased from 0.
    ```javascript
    parent.data.inc(key, data);
    ```
    or
    ```javascript
    parent.data.values[key] += value;
    ```
    - `data` : The value to increase. 
- Toggle boolean value. If the key doesn't already exist in the Data Manager then it is toggled from false.
    ```javascript
    parent.data.toggle(key);
    ```
    or
    ```javascript
    parent.data.values[key] = !parent.data.values[key];
    ```

#### Set values

```javascript
parent.data.set(data);    // data: {key:value, ...}
```

#### Merge values

```javascript
parent.data.merge(data);  // data: {key:value, ...}
parent.data.merge(data, false);  // won't overwrite existed keys
```

#### Events

Fires `setdata` event when a value is first set.

```javascript
parent.data.events.on('setdata', function(parent, key, value){ /* ... */ });
```

Fires `changedata`, and `changedata- + key` events when a value is set that already exists.

```javascript
parent.data.events.on('changedata', function(parent, key, value, previousValue){ /* ... */ });
```

```javascript
parent.data.events.on('changedata-' + key, function(parent, value, previousValue){ /* ... */ });
```

### Read

#### Get value

```javascript
var value = parent.data.get(key);
```
or
```javascript
var value = parent.data.values[key];
```

#### Get values

```javascript
var values = parent.data.get(keys); // values: [value, value, ...], keys: [key, key, ...]
```

#### Get all values

```javascript
var allValues = parent.data.getAll();  // return a copy of data
```

#### Query

Using [string.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) to pick matched keys.

```javascript
var result = parent.data.query(rgExp);
```

### Remove

#### Remove key

```javascript
parent.data.remove(key);
```

#### Remove keys

```javascript
parent.data.remove(keys);  // keys: [key, key, ...]
```

#### Pop key

```javascript
var value = parent.data.pop(key);
```

Get and remove that key.

#### Delet all keys

Delete all data in this Data Manager and unfreeze it.

```javascript
parent.data.reset();
```

#### Events

Fires `removedata` event when a key is removed.

```javascript
parent.data.events.on('removedata', function(parent, key, value){ /* ... */ });
```

### Freeze

```javascript
var isFrozen = parent.data.freeze;
parent.data.freeze = true;
```

No changes can be written to it.

### Has key

```javascript
var hasKey = parent.data.has(key);
```

### For each key

```javascript
parent.data.each(function(parent, key, value){
    /* ... */
}, scope);
```

### Count of data

```javascript
var cnt = parent.data.count;
```

### Reset

Reset status and clear all keys.

```javascript
parent.data.reset()
```