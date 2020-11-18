## Introduction

Get distance, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Distance

- Get distance between 2 points
    ```javascript
    var d = Phaser.Math.Distance.Between(x1, y1, x2, y2);
    ```
    or
    ```javascript
    var d = Phaser.Math.Distance.BetweenPoints(a, b); // a, b: {x, y}
    ```
- Get squared distance
    ```javascript
    var d = Phaser.Math.Distance.BetweenPointsSquared(a, b); // a, b: {x, y}
    ```
- Get Chebyshev distance (the maximum of the horizontal and vertical distances)
    ```javascript
    var d = Phaser.Math.Distance.Chebyshev(x1, y1, x2, y2);
    ```
- Get snake distance(i.e. rectilinear distance, Manhattan distance, the sum of the horizontal and vertical distance)
    ```javascript
    var d = Phaser.Math.Distance.Snake(x1, y1, x2, y2);
    ```
- Get power distance (the sum of the horizontal power distance and vertical power distance)
    ```javascript
    var d = Phaser.Math.Distance.Power(x1, y1, x2, y2);
    ```

### Speed

- Get speed
    ```javascript
    var d = Phaser.Math.GetSpeed(distance, time);
    ```
    - distance : The distance to travel in pixels.
    - time : The time, in ms, to cover the distance in.