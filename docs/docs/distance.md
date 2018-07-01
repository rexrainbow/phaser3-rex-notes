## Introduction

Get distance, built-in methods of phaser.

- Author: Richard Davey

## Usage

- Get distance between 2 points
    ```javascript
    var d = Phaser.Math.Distance.Between(x1, y1, x2, y2);
    ```
- Get speed
    ```javascript
    var d = Phaser.Math.GetSpeed(distance, time);
    ```
    - distance : The distance to travel in pixels.
    - time : The time, in ms, to cover the distance in.