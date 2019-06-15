## Introduction

Visible testing, to find field of view, chess behavior of Board system.

- Author: Rex
- Behavior of chess

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-fieldofview)

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var fieldOfView = scene.rexBoard.add.fieldOfView(chess, {
    // face: 0,
    // cone: undefined,
    // coneMode: 0,

    // occupiedTest: false,
    // blockerTest: false,

    // ** cost **
    // cost: 0,   // constant cost
    // costCallback: undefined,
    // costCallbackScope: undefined,

    // debug: {
    //     graphics: undefined,
    //     visibleLineColor: 0x00ff00,
    //     invisibleLineColor: 0xff0000,
    //     log: false,
    // }
})
```

- `face` : Face of chess.
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions).
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).
- `cone` : View of cone. Tile position or chess which not in view of cone will be invisible.
    - `undefined` : Ignore this feature
- `coneMode` : Unit of cone , in direction or angle.
    - `'direction'`, or `0` : Cone in directions.  
        For example, visible directions are between *(0 - 2/2)* to *(0 + 2/2)* if set
        ```
        face : 0,
        cone : 2,
        coneMode: 0
        ```
    - `'angle'`, or `1` : Cone in angle.
        For example, visible angle is between *(0 - 120/2)* to *(0 + 120/2)* if set
        ```
        face : 0,
        cone : 120,
        coneMode: 1
        ```
- `occupiedTest` : Set `true` to test if target tile position is occupied or not, in cost function.
- `blockerTest` : Set `true` to test [blocker property](board-chessdata.md#blocker) in cost function.
- Cost function
    - `cost` : A constant cost for each non-blocked tile
    - `costCallback`, `costCallbackScope` :  Get cost via callback
        ```javascript
        function(curTile, fieldOfView) {
            return cost;
        }
        ```
        - Cost of blocker : `fieldOfView.BLOCKER`
- `debug` :
    - `debug.graphics` : A [graphics](graphics.md) object for showing debug messages.
    - `debug.visibleLineColor` : Color of visible line. Set `undefined` to not draw any line.
    - `debug.invisibleLineColor` : Color of invisible line. Set `undefined` to not draw any line.
    - `debug.log` : Show messages on console.

### Set cost function

- Constant cost for each non-blocked tile
    ```javascript
    fieldOfView.setCostFunction(cost);
    ```
- Get cost via callback
    ```javascript
    fieldOfView.setCostFunction(callback, scope);
    ```

### Is tileXY/chess visible

```javascript
var isVisible = fieldOfView.isInLOS(chess);
// var isVisible = fieldOfView.isInLOS(chess, visiblePoints);
```

- `chess` : Chess object or tileXY
- `visiblePoints`
    - `fieldOfView.INFINITY` (*undefined*) : Infinity visible points. Default value.

### Get tileXY array in field of view

```javascript
var tileXYArray = fieldOfView.findFOV();
// var tileXYArray = fieldOfView.findFOV(visiblePoints);
// var out = fieldOfView.findFOV(visiblePoints, out);
```

- `visiblePoints`
    - `fieldOfView.INFINITY` (*undefined*) : Infinity visible points. Default value.

### Face

Face direction

- Get
    ```javascript
    var face = fieldOfView.face;
    ```
- Set
    ```javascript
    fieldOfView.setFace(direction);
    ```
    or
    ```javascript
    fieldOfView.face = direction;
    // fieldOfView.face ++;
    ```

### Debug

- Clear debug graphics
    ```javascript
    fieldOfView.clearDebugGraphics();
    ```