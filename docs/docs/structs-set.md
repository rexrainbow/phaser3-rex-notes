## Introduction

A collection of unique elements, built-in data structure of phaser.

- Author: Richard Davey

## Usage

### Create instance

```javascript
var set = Phaser.Structs.Set();
```

or

```javascript
var set = Phaser.Structs.Set(elements);
```

### Add an element

```javascript
set.set(element);
```

### Remove an element

```javascript
set.delete(element);
```

### Remove all elements

```javascript
set.clear();
```

### Has element

```javascript
set.contains(element);
```

### Get elements

```javascript
var elements = set.entries;
```

or get a shallow copy of elements

```javascript
var elements = set.getArray();
```

### Element counts

```javascript
var size = set.size;
```

### For each element

- For when you know this Set will be modified during the iteration.
    ```javascript
    set.each(function(element, index) {
        // return false;  // return false to cancel iteration
    }, scope)
    ```
- For when you absolutely know this Set won't be modified during the iteration.
    ```javascript
    set.iterate(function(element, index) {
        // return false;  // return false to cancel iteration
    }, scope)
    ```

### Set operations

- C = A | B
   ```javascript
   var setC = setA.union(setB);
   ```
- C = A & B
   ```javascript
   var setC = setA.intersect(setB);
   ```
- C = A - B
   ```javascript
   var setC = setA.difference(setB);
   ```