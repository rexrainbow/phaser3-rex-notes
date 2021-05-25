## Introduction

An ordered list, built-in data structure of phaser.

- Author: Richard Davey

## Usage

### Create instance

```javascript
var list = Phaser.Structs.List();
```

### Add child

```javascript
list.add(child);
```

```javascript
list.addAt(child, index);
```

### Exist

```javascript
var hasChild = list.exists(child);
```

### Get child

```javascript
var firstChild = list.first;
var nextChild = list.next;
var prevChild = list.previous;
var lastChild = list.last;
```

```javascript
var child = list.getByName(name);
```

```javascript
var child = list.getRandom(startIndex, length);
```

```javascript
var child = list.getFirst(property, value, startIndex, endIndex);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

```javascript
var child = list.getAll(property, value, startIndex, endIndex);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

```javascript
var child = list.count(property, value);
// value: the value to test the property against. Must pass a strict (`===`) comparison check.
```

### Sort children

- Sort by property
    ```javascript
    list.sort(property);
    // list.sort(property, handler);
    ```
    - `property` : The property to lexically sort by.
    - `handler` :
        ```javascript
        function (childA, childB) {
            return 0; // 0, 1, -1
        }
        ```

### Remove child

```javascript
list.remove(child);
```

```javascript
list.removeAt(index);
```

```javascript
list.removeBetween(startIndex, endIndex);
```

```javascript
list.removeAll();
```

### Order of child

```javascript
list.moveTo(child, index);
```

```javascript
list.bringToTop(child);
```

```javascript
list.sendToBack(child);
```

```javascript
list.moveUp(child);
```

```javascript
list.moveDown(child);
```

```javascript
list.moveAbove(child1, child2);  // Move child1 above child2
```

```javascript
list.moveBelow(child1, child2);  // Move child1 below child2
```

```javascript
list.swap(child1, child2);
```

```javascript
list.reverse();
```

```javascript
list.shuffle();
```

### Replace child

```javascript
list.replace(oldChild, newChild);
```

### Set properties

```javascript
list.setAll(property, value, startIndex, endIndex);
```

#### For each child

- Iterate current children list
    ```javascript
    list.each(callback);
    // list.each(callback, context);
    // list.iterate(callback, context, arg0, arg1, ...);
    ```
    - `callback` : 
        ```javascript
        function(child, arg0, arg1, ...) {

        }
        ```

### Children counts

```javascript
var size = list.length;
```
