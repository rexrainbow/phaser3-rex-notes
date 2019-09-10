## Introduction

Get random value from a random generator, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Random data generator

- Pre-defined random data generator
    ```javascript
    var rnd = Phaser.Math.RND;
    ```
- New random generator
    ```javascript
    var rnd = new Phaser.Math.RandomDataGenerator(seed);
    ```

### Set seed

- Set seed in game config for pre-defined random data generator
    ```javascript
    var config = {
        // ...
        seed: seed,
        // ...
    }
    var game = new Phaser.Game(config);
    ```
    - `seed` : 
        - An array of string, like `[(Date.now() * Math.random()).toString()]`
- Set seed
    ```javascript
    rnd.init(seed);
    ```
    - `seed` : A string or an array of string.

### Get random value

- Random real number between `0` and `1`.
    ```javascript
    var value = rnd.frac();
    ```
- Random integer between `0` and `2^32`.
    ```javascript
    var value = rnd.integer();
    ```
- Random real number between 0 and 2^32.
    ```javascript
    var value = rnd.real();
    ```
- Random integer between and including min and max.
    ```javascript
    var value = rnd.between(min, max);
    // var value = rnd.integerInRange(min, max);
    ```
- Random real number between min and max.
    ```javascript
    var value = rnd.realInRange(min, max);
    ```
- Random real number between -1 and 1.
    ```javascript
    var value = rnd.normal();
    ```
- Random angle between `-180` and `180`.
    ```javascript
    var angle = rnd.angle();
    ```
- Random rotation in radians, between `-3.141` and `3.141`.
    ```javascript
    var angle = rnd.rotation();
    ```
- Random timestamp between min and max.
    ```javascript
    var timestamp = rnd.timestamp(min, max);
    ```
    - `min` : Default value is the beginning of 2000.
    - `max` : Default value is the end of 2020.
- [UUID](uuid.md)
    ```javascript
    var uuid = rnd.uuid();
    ```
- Random sign value
    ```javascript
    var sign = rnd.sign();
    ```
    - `sign` : `-1` or `1`

### Get random item

- Random element from within the given array.
    ```javascript
    var item = rnd.pick(arr);
    ```
- Random element from within the given array, favoring the earlier entries.
    ```javascript
    var item = rnd.weightedPick(arr);
    ```

### Shuffle array

```javascript
var arr = rnd.shuffle(arr);
```
