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

    // ** pre-test **
    // occupiedTest: false,
    // blockerTest: false,
    // preTestCallback: undefined,
    // preTestCallbackScope: undefined,

    // ** cost **
    // costCallback: undefined,
    // costCallbackScope: undefined,
    // cost: undefined,   // constant cost

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
- Pre-test : Test tiles on visible path.
    - `occupiedTest` : Set `true` to test if target tile position is occupied or not.
    - `blockerTest` : Set `true` to test [blocker property](board-chessdata.md#blocker).
    - `preTestCallback`, `preTestCallbackScope` : Custom pre-test function, return `false` to discard cost function.
        ```javascript
        function(tileXYArray, visiblePoints, fieldOfView) {
            // return false;
        }
        ```
        - `tileXYArray[0]` is current tileXY position of chess.
- Cost function of each tile on visible path
    - `cost` : A constant cost for each non-blocked tile
    - `costCallback`, `costCallbackScope` :  Get cost via callback
        ```javascript
        function(curTile, fieldOfView, tileXYArray) {
            return cost;
        }
        ```
        - Cost of blocker : `fieldOfView.BLOCKER`
        - `curTile` : Currest testing tileXY.
        - `tileXYArray` : A *read only*  tileXY array of sight path.
- `debug` :
    - `debug.graphics` : A [graphics](graphics.md) object for showing debug messages.
    - `debug.visibleLineColor` : Color of visible line. Set `undefined` to not draw any line.
    - `debug.invisibleLineColor` : Color of invisible line. Set `undefined` to not draw any line.

### Set pre-test function

```javascript
fieldOfView.setPreTestFunction(callback, scope);
```

- `callback`
    ```javascript
    var callback = function(tileXYArray, visiblePoints, fieldOfView) {
           return false;
    }
    ```
    - `tileXYArray[0]` is current tileXY position of chess.

### Set cost function

- Constant cost for each non-blocked tile
    ```javascript
    fieldOfView.setCostFunction(cost);
    ```
- Get cost via callback
    ```javascript
    fieldOfView.setCostFunction(callback, scope);
    ```
    - `callback`
        ```javascript
        var callback = function(curTile, fieldOfView, tileXYArray) {
            return cost;
        }
        ```
        - Cost of blocker : `fieldOfView.BLOCKER`
        - `curTile` : Currest testing tileXY.
        - `tileXYArray` : A *read only*  tileXY array of sight path.

### Is tileXY/chess visible

```javascript
var isVisible = fieldOfView.isInLOS(chess);
// var isVisible = fieldOfView.isInLOS(chess, visiblePoints);
// var isVisible = fieldOfView.isInLOS(chess, visiblePoints, originTileXY);
```

- `chess` : Chess object or tileXY
- `visiblePoints`
    - `fieldOfView.INFINITY` (*undefined*) : Infinity visible points. Default value.
- `originTileXY` : Put chess at this tileXY position for visible testing temporary.
    - `undefined` : Use current tileXY position for visible testing.

### Get tileXY array in field of view

```javascript
var tileXYArray = fieldOfView.findFOV();
// var tileXYArray = fieldOfView.findFOV(visiblePoints);
// var tileXYArray = fieldOfView.findFOV(visiblePoints, originTileXY);
// var out = fieldOfView.findFOV(visiblePoints, out);
// var out = fieldOfView.findFOV(visiblePoints, originTileXY, out);
```

- `visiblePoints`
    - `fieldOfView.INFINITY` (*undefined*) : Infinity visible points. Default value.
- `out` : Returned tileXY array.
- `originTileXY` : Put chess at this tileXY position for visible testing temporary.
    - `undefined` : Use current tileXY position for visible testing.

### Filter visible tileXY array

- Filter visible tileXY array
    ```javascript
    var out = fieldOfView.LOS(chessArray);
    // var out = fieldOfView.LOS(chessArray, originTileXY);
    // var out = fieldOfView.LOS(chessArray, out);
    // var out = fieldOfView.LOS(chessArray, originTileXY, out);
    ```
    - `chessArray` : Array of chess object or tileXY
    - `out` : Array of visible chess object or tileXY
    - `originTileXY` : Put chess at this tileXY position for visible testing temporary.
        - `undefined` : Use current tileXY position for visible testing.
- Filter visible tileXY array with visible points
    ```javascript
    var out = fieldOfView.LOS(chessArray, visiblePoints);
    // var out = fieldOfView.LOS(chessArray, visiblePoints, originTileXY);
    // var out = fieldOfView.LOS(chessArray, visiblePoints, out);
    // var out = fieldOfView.LOS(chessArray, visiblePoints, originTileXY, out);
    ```
    - `chessArray` : Array of chess object or tileXY
    - `out` : Array of visible chess object or tileXY
    - `originTileXY` : Put chess at this tileXY position for visible testing temporary.
        - `undefined` : Use current tileXY position for visible testing.

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
- `face` :
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions).
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

### Debug

- Clear debug graphics
    ```javascript
    fieldOfView.clearDebugGraphics();
    ```
- Set color of lines
    ```javascript
    fieldOfView.setDebugLineColor(visibleLineColor, invisibleLineColor);
    ```
    - `visibleLineColor`, `invisibleLineColor` : Set `undefined` to not draw any line.