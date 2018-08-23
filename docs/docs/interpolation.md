## Introduction

Calculates interpolation value over t, built-in method of phaser.

- Author: Richard Davey

## Usage

- Linear (lerp)
    ```javascript
    var result = Phaser.Math.Linear(p0, p1, t);  // t: 0~1, result: p0~p1
    ```    
- Smooth
    ```javascript
    var result = Phaser.Math.SmoothStep(x, min, max);  // x: min~max, result: 0~1
    ```
- Smoother
    ```javascript
    var result = Phaser.Math.SmootherStep(x, min, max);  // x: min~max, result: 0~1
    ```