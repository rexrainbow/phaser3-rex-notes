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

### Wrap

- Wrap angle (radians) in the range of -PI to PI
   ```javascript
   var rad = Phaser.Math.Angle.Wrap(angle);
   ```
- Wrap angle (radians) in the range of 0 to 2*PI
   ```javascript
   var rad = Phaser.Math.Angle.Normalize(angle);
   ```
- Wrap angle (degrees) in the range of -180 to 180
   ```javascript
   var deg = Phaser.Math.Angle.WrapDegrees(angle);
   ```

### Angle between points

- Angle from (0,0) to vector (x2 - x1 , y2 - y1)
   ```javascript
   var rad = Phaser.Math.Angle.Between(x1, y1, x2, y2);
   ```
   ```javascript
   var rad = Phaser.Math.Angle.BetweenPoints(point1, point2);
   ```

### Angle between angles

- Shortest angle (degrees) between 2 angles
    ```javascript
    var deg = Phaser.Math.Angle.ShortestBetween(angle1, angle2)
    ```
    - `angle1`, `angle2` : Angle in degrees in the range of -180 to 180
    - `deg` : Shortest angle in degrees
        - deg > 0 : Counter-ClockWise rotation
        - deg < 0 : ClockWise rotation

### Rotate around position

- Rotate a `point` around `x` and `y` by the given `angle`.
    ```javascript
    var out = Phaser.Math.RotateAround(point, x, y, angle);
    ```
- Rotate a `point` around `x` and `y` by the given `angle` and `distance`.
    ```javascript
    var out = Phaser.Math.RotateAroundDistance(point, x, y, angle, distance);
    ```