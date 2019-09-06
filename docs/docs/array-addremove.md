
## Introduction

Add/insert/remove item(s) of an array, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Add item

```javascript
Phaser.Utils.Array.Add(arr, item);
// Phaser.Utils.Array.Add(arr, item, limit, callback, context);
```

- `item` : An item, or an array of items.
- `limit` : Optional limit which caps the size of the array.
- `callback` : A callback to be invoked for each item successfully added to the array.
- `context` : The context in which the callback is invoked.

### Insert item at

```javascript
Phaser.Utils.Array.AddAt(arr, item, index);
// Phaser.Utils.Array.AddAt(arr, item, index, limit, callback, context);
```

- `index` : The index in the array where the item will be inserted.
- `item` : An item, or an array of items.
- `limit` : Optional limit which caps the size of the array.
- `callback` : A callback to be invoked for each item successfully added to the array.
- `context` : The context in which the callback is invoked.

### Remove item

```javascript
Phaser.Utils.Array.Remove(arr, item);
// Phaser.Utils.Array.Remove(arr, item, callback, context);
```

- `item` : An item, or an array of items.
- `callback` : A callback to be invoked for each item successfully removed from the array.
- `context` : The context in which the callback is invoked.

### Remove item at 

```javascript
var removed = Phaser.Utils.Array.RemoveAt(arr, index);
// var removed = Phaser.Utils.Array.RemoveAt(arr, index, callback, context);
```

- `removed` : Removed item.
- `index` : The array index to remove the item from. The index must be in bounds or it will throw an error.
- `callback` : A callback to be invoked for each item successfully removed from the array.
- `context` : The context in which the callback is invoked.

### Remove items between

```javascript
var removed = Phaser.Utils.Array.RemoveBetween(arr, startIndex, endIndex);
// var removed = Phaser.Utils.Array.RemoveBetween(arr, startIndex, endIndex, callback, context);
```

- `removed` : Removed items.
- `startIndex` : The start index to remove from.
- `callback` : The end index to remove to.
- `callback` : A callback to be invoked for each item successfully removed from the array.
- `context` : The context in which the callback is invoked.

### Remove random item

```javascript
var item = Phaser.Utils.Array.RemoveRandomElement(arr);
```

### Replace item

Replaces an element of the array with the new element. The new element cannot already be a member of the array.

```javascript
Phaser.Utils.Array.Replace(arr, oldItem, newItem);
```

- `oldItem` : An item in array.
- `newItem` : Another item, which is not in array.