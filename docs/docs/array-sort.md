## Introduction

Array sorting, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Built-in array sort

```javascript
var out = arr.sort(compareFunction);
```

- `compareFunction` : A function that defines an alternative sort order.
    ```javascript
    function(a, b) {
        // return a - b;
    }
    ```
    - Return a negative value
    - Return 0
    - Return a positive value

### Stable array sort

```javascript
var out = Phaser.Utils.Array.StableSort(arr, compareFunction);
```

### Shuffle

```javascript
var arr = Phaser.Utils.Array.Shuffle(arr);
```

### Move item

- Moves the given element to the top of the array.
    ```javascript
    Phaser.Utils.Array.BringToTop(arr, item);
    ```
- Moves the given element to the bottom of the array.
    ```javascript
    Phaser.Utils.Array.SendToBack(arr, item);
    ```
- Moves the given array element up.
    ```javascript
    Phaser.Utils.Array.MoveUp(array, item);
    ```
- Moves the given array element down.
    ```javascript
    Phaser.Utils.Array.MoveDown(array, item);
    ```
-  Moves an element in an array to a new position.
    ```javascript
    Phaser.Utils.Array.MoveTo(array, item, index);
    ```
- Swaps the position of two elements.
    ```javascript
    Phaser.Utils.Array.Swap(array, item1, item2);
    ```
- Moves the element at the start of the array to the end, shifting all items in the process.
    ```javascript
    Phaser.Utils.Array.RotateLeft(array, steps);
    ```
    - `steps` : The number of times to shift the array.
- Moves the element at the end of the array to the start, shifting all items in the process.
    ```javascript
    Phaser.Utils.Array.RotateRight(array, steps);
    ```
    - `steps` : The number of times to shift the array.