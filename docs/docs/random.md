## Introduction

Get random value, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Get random value between (min, max)

- Random integer
    ```javascript
    var value = Phaser.Math.Between(min, max);
    ```
- Random floating point number
    ```javascript
    var value = Phaser.Math.FloatBetween(min, max);
    ```

### Get random vector

- 2D vector
    ```javascript
    var vec = Phaser.Math.RandomXY(vec);    // return vec {x, y}
    // var vec = Phaser.Math.RandomXY(vec, scale);
    ```
- 3D vector
    ```javascript
    var vec = Phaser.Math.RandomXYZ(vec);    // return vec {x, y, z}
    // var vec = Phaser.Math.RandomXYZ(vec, scale);
    ```
- 4D vector
    ```javascript
    var vec = Phaser.Math.RandomXYZW(vec);    // return vec {x, y, z, w}
    // var vec = Phaser.Math.RandomXYZW(vec, scale);
    ```