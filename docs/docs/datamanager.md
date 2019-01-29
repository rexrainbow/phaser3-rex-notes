## Introduction

Store data in key-value pairs, built-inobject of phaser.

- Author: Richard Davey

## Usage

### Write

#### Set value

```javascript
parent.data.set(key, value);
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