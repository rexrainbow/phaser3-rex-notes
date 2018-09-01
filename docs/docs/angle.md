## Introduction

Convert angle value, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Degree <-> Radians

- Degree to radians
    ```javascript
    var rad = Phaser.Math.DegToRad(deg);
    ```
- Radians to degree
   ```javascript
   var deg = Phaser.Math.RadToDeg(rad);  // deg : -180 ~ 180
   ```
- Angle from (0,0) to vector (x2 - x1 , y2 - y1)
   ```javascript
   var rad = Phaser.Math.Angle.Between(x1, y1, x2, y2);
   ```
   ```javascript
   var rad = Phaser.Math.Angle.BetweenPoints(point1, point2);
   ```