## Introduction

Get random value, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Get random integer between (min, max)

```javascript
var value = Phaser.Math.Between(min, max);
```

### Get random vector

```javascript
var vec = Phaser.Math.RandomXY(vec);    // return vec {x, y}
// var vec = Phaser.Math.RandomXY(vec, scale);
```

### Shuffle

```javascript
var arr = Phaser.Utils.Array.Shuffle(arr);
```

### Remove random item

```javascript
var item = Phaser.Utils.Array.RemoveRandomElement(arr);
```