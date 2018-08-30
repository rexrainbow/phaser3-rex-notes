## Introduction

Create an array representing the range of numbers, built-in method of phaser.

- Author: Richard Davey

## Usage

### Create number array

Create an array representing the range of numbers (usually integers), between, and inclusive of, the given `start` and `end` arguments.

```javascript
var arr = Phaser.Utils.Array.NumberArray(start, end);
```

For example,
```javascript
var arr = Phaser.Utils.Array.NumberArray(2, 4);
// arr = [2, 3, 4]
```

### Create number array with step

Create an array of numbers (positive and/or negative) progressing from `start` up to but not including `end` by advancing by `step`.

```javascript
var arr = Phaser.Utils.Array.NumberArray(start, end, step);
```

For example,
```javascript
var arr = Phaser.Utils.Array.NumberArrayStep(0, 20, 5);
// arr =  [0, 5, 10, 15]
```

### Create *prefix-number-suffix* string array

```javascript
var arr = Phaser.Utils.Array.NumberArray(start, end, prefix, suffix);
```

For example,
```javascript
var arr = Phaser.Utils.Array.NumberArray(5, 7, 'HD-', '.png');
// arr = ['HD-5.png', 'HD-6.png', 'HD-7.png']
```
