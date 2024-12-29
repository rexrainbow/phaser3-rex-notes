## Introduction

Calculates interpolation value over t (0~1), built-in method of phaser.

- Author: Phaser Team

## Usage

- Linear interpolation (lerp) two values
    ```javascript
    var result = Phaser.Math.Linear(p0, p1, t);
    ```
- Linear interpolation (lerp) two Vectors
    ```javascript
    var result = Phaser.Math.LinearXY(vector0, vector1, t);
    ```
    - `vector0`, `vector1` : [Phaser.Math.Vector2](vector2.md)
- Smooth interpolation
    ```javascript
    var result = Phaser.Math.Interpolation.SmoothStep(t, min, max);
    ```
    - `t` : 0~1
- Smoother interpolation
    ```javascript
    var result = Phaser.Math.Interpolation.SmootherStep(t, min, max);
    ```
    - `t` : 0~1
- Quadratic bezier interpolation
    ```javascript
    var result = Phaser.Math.Interpolation.QuadraticBezier(t, p0, p1, p2);
    ```
    - `t` : 0~1
    - `p0` : The start point.
    - `p1` : The control point.
    - `p2` : The end point.
- Cubic bezier interpolation
    ```javascript
    var result = Phaser.Math.Interpolation.CubicBezier(t, p0, p1, p2, p3);
    ```
    - `t` : 0~1
    - `p0` : The start point.
    - `p1` : The first control point.
    - `p2` : The second control point.
    - `p3` : The end point.