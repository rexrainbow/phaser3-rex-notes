## Introduction

The Size component allows you to set `width` and `height` properties and define the relationship between them.

- Author: Richard Davey

## Usage

### Create instance

```javascript
var size = new Phaser.Structs.Size();
```

or

```javascript
var size = new Phaser.Structs.Size(width, height, aspectMode, parent);
```

- `width`, `height` : The width/height of the Size component.
- `aspectMode` : Aspect mode
    - `0`, or `Phaser.Structs.Size.NONE` : Change the ratio when the size changes.
    - `3`, or `Phaser.Structs.Size.FIT` : Fit inside the given parent, while keeping the aspect ratio.
    - `4`, or `Phaser.Structs.Size.ENVELOP` : Make the size cover the entire parent while keeping the aspect ratio.
    - `1`, or `Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT` : The height is automatically adjusted based on the width.
    - `2`, or `Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH` : The width is automatically adjusted based on the height.
- `parent` :
    - Any gameObject, or any object with `width` and `height` properties.
    - `undefinied` : No parent.

!!! note "Aspect Ratio"
    Aspect Ratio used in FIT mode is set via `width`, and `height`.  
    - Calling `size.setAspectRatio(ratio)` to override it.

### Set size

1. Set aspect ratio if aspect ratio is changed
    ```javascript
    size.setAspectRatio(ratio);  // call size.setSize() immediately using the current dimensions.
    ```
    or
    ```javascript
    size.aspectRatio = ratio;
    ```
    - `ratio` : `width/height`
1. Set size
    ```javascript
    size.setSize(width, height);
    ```
    or
    ```javascript
    size.setWidth(width);
    size.setHeight(height);
    ```
    or
    ```javascript
    size.width = width;
    size.height = height;
    ```
1. Get actual size
    ```javascript
    var newWidth = size.width;
    var newHeight = size.height;
    ```

### Set min/max size

- Set the minimum width and height values this Size component will allow.
    ```javascript
    size.setMin(width, height);
    ```
- Set the maximum width and height values this Size component will allow.
    ```javascript
    size.setMax(width, height);
    ```

### Set snap

```javascript
size.setSnap(snapWidth, snapHeight);
```

- `snapWidth`, `snapHeight` : The amount to [snap](snap.md#floor) the width/height to. Set to `0` if you don't want to snap the width/height.

### Set aspect mode

```javascript
size.setAspectMode(mode);  // call size.setSize() immediately using the current dimensions.
```
or
```javascript
size.aspectMode = mdoe;
```

### Set parent

```javascript
size.setParent(parent);  // call size.setSize() immediately using the current dimensions.
```
or
```javascript
size._parent = parent;
```


- `parent` : 
    - Any gameObject, or any object with `width` and `height` properties.
    - `undefinied` : Clear parent.

The parent influences the maximum extents to which this Size component can expand, based on the aspect mode:

- `0`, or `Phaser.Structs.Size.NONE` : The parent clamps both the width and height.
- `3`, or `Phaser.Structs.Size.FIT` : The parent clamps whichever axis is required to ensure the size fits within it.
- `4`, or `Phaser.Structs.Size.ENVELOP` : The parent is used to ensure the size fully envelops the parent.
- `1`, or `Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT` : The parent clamps just the width.
- `2`, or `Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH` : The parent clamps just the height.
