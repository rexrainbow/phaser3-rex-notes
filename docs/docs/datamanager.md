## Introduction

Save data in key-value pairs, built-inobject of phaser.

- Author: Richard Davey

## Usage

### Set value

```javascript
parent.data.set(key, value);
parent.data.merge(data);     // {}
```

### Pop key

```javascript
var value = parent.data.pop(key);
```

Get and remove that key.

### Remove key

```javascript
parent.data.remove(key);
```

### Get value

```javascript
var value = parent.data.get(key);
var allValues = parent.data.getAll();  // return a copy of data
```

### Query

Using [string.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) to pick matched keys.

```javascript
var result = parent.data.query(rgExp);
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

Reset status and clean all keys.

```javascript
parent.data.reset()
```

### Event of changing data

Event 'setdata', 'changedata' will be fired when invoking `parent.data.set(key, value)`.

```javascript
parent.data.event.on('setdata', function(parent, key, value){
    /* ... */
}, scope);
```

```javascript
parent.data.event.on('changedata', function(parent, key, value, resetValue){
    // resetValue(newValue);  // overwrite value to newValue
}, scope);
```
