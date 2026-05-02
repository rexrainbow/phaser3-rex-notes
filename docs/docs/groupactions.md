## Introduction

Set properties of game objects, built-in methods of phaser.

- Author: Phaser Team

## Usage

### Call function

```javascript
Phaser.Actions.Call(gameObjects, function(gameObject) {

}, scope);
```

### Set any property

```javascript
Phaser.Actions.PropertyValueSet(gameObjects, key, value, step, index, direction);
```

- `gameObjects` : An array of game objects.
- `key` : The property to be updated.
- `value` : The amount to be added to the property.
- `step` : This is added to the `value` amount, multiplied by the iteration counter.
- `index` : An optional offset to start searching from within the items array.
- `direction` :
    - `1` : from beginning to end.
    - `-1`: from end to beginning.

```javascript
Phaser.Actions.PropertyValueInc(gameObjects, key, value, step, index, direction);
```

```javascript
Phaser.Actions.SmootherStep(gameObjects, key, min, max, inc));
```

```javascript
Phaser.Actions.SmoothStep(gameObjects, key, min, max, inc));
```

```javascript
Phaser.Actions.Spread(gameObjects, key, min, max, inc));
```

### Position

```javascript
Phaser.Actions.SetX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.IncY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetXY(gameObjects, x, y, stepX, stepY, index, direction);
```

```javascript
Phaser.Actions.IncXY(gameObjects, x, y, stepX, stepY, index, direction);
```

### Shift position

Set the position of first game object to (x, y), others to the position of previous game object.

```javascript
Phaser.Actions.ShiftPosition(gameObjects, x, y, direction, output);
```

### Position on shape

#### Grid align

```javascript
Phaser.Actions.GridAlign(gameObjects, {
    width: -1,
    height: -1,
    cellWidth: 1,
    cellHeight: 1,
    position: Phaser.Display.Align.TOP_LEFT,
    x: 0,
    y: 0
});
```

- `width` : The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
- `height` : The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `position` : The alignment position.
    - `0`, or `Phaser.Display.Align.TOP_LEFT` 
    - `1`, or `Phaser.Display.Align.TOP_CENTER`
    - `2`, or `Phaser.Display.Align.TOP_RIGHT`
    - `3`, or `Phaser.Display.Align.LEFT_TOP`
    - `4`, or `Phaser.Display.Align.LEFT_CENTER`
    - `5`, or `Phaser.Display.Align.LEFT_BOTTOM`
    - `6`, or `Phaser.Display.Align.CENTER`
    - `7`, or `Phaser.Display.Align.RIGHT_TOP`
    - `8`, or `Phaser.Display.Align.RIGHT_CENTER`
    - `9`, or `Phaser.Display.Align.RIGHT_BOTTOM`
    - `10`, or `Phaser.Display.Align.BOTTOM_LEFT`
    - `11`, or `Phaser.Display.Align.BOTTOM_CENTER`
    - `12`, or `Phaser.Display.Align.BOTTOM_RIGHT`
- `x`, `y` : Position of first item.

#### Line

[Line](geom-line.md) :

```javascript
var line = new Phaser.Geom.Line(x1, y1, x2, y2);
```

```javascript
Phaser.Actions.PlaceOnLine(gameObjects, line);
// Phaser.Actions.PlaceOnLine(gameObjects, line, ease);
```

- `ease` : 
    - [A string](tween.md#ease-equations)
    - A function object.

```javascript
Phaser.Actions.RandomLine(gameObjects, line);
```

#### Circle

[Circle](geom-circle.md) :

```javascript
var circle = new Phaser.Geom.Circle(x, y, radius);
Phaser.Actions.PlaceOnCircle(gameObjects, circle, startAngle, endAngle);
```

```javascript
Phaser.Actions.RandomCircle(gameObjects, circle);
```

#### Ellipse

[Ellipse](geom-ellipse.md) :

```javascript
var ellipse = new Phaser.Geom.Ellipse(x, y, width, height);
Phaser.Actions.PlaceOnEllipse(gameObjects, ellipse, startAngle, endAngle);
```

#### Triangle

[Triangle](geom-triangle.md) :

```javascript
var triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
Phaser.Actions.PlaceOnTriangle(gameObjects, triangle, stepRate);
```

```javascript
Phaser.Actions.RandomTriangle(gameObjects, triangle);
```

#### Rectangle

[Rectangle](geom-rectangle.md) :

```javascript
var rect = new Phaser.Geom.Rectangle(x, y, width, height);
Phaser.Actions.PlaceOnRectangle(gameObjects, rect, shift;
```

```javascript
Phaser.Actions.RandomRectangle(gameObjects, rect);
```

```javascript
Phaser.Actions.WrapInRectangle(gameObjects, rect, padding);
```

### Angle

```javascript
Phaser.Actions.Angle(gameObjects, value, step, index, direction);
// value: angle in radians
```

```javascript
Phaser.Actions.Rotate(gameObjects, value, step, index, direction);
// value: angle in degree
```

```javascript
Phaser.Actions.RotateAround(gameObjects, point, angle);
// point: {x, y}, angle: angle in radians
```

```javascript
Phaser.Actions.RotateAroundDistance(gameObjects, point, angle, distance);
// point: {x, y}, angle: angle in radians
```

### Visible

```javascript
Phaser.Actions.SetVisible(gameObjects, value, index, direction);
```

```javascript
Phaser.Actions.ToggleVisible(gameObjects);
```

### Alpha

```javascript
Phaser.Actions.SetAlpha(gameObjects, value, step, index, direction);
```

### Tint

```javascript
Phaser.Actions.setTint(gameObjects, value);
//Phaser.Actions.setTint(gameObjects, topLeft, topRight, bottomLeft, bottomRight);
```

### Origin

```javascript
Phaser.Actions.SetOrigin(gameObjects, originX, originY, stepX, stepY, index, direction);
```

### Scale

```javascript
Phaser.Actions.ScaleX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.ScaleXY(gameObjects, x, y, stepX, stepY, index, direction);
```

### Scroll factor

```javascript
Phaser.Actions.SetScrollFactorX(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetScrollFactorY(gameObjects, value, step, index, direction);
```

```javascript
Phaser.Actions.SetScrollFactor(gameObjects, x, y, stepX, stepY, index, direction);
```

### Depth

```javascript
Phaser.Actions.SetDepth(gameObjects, value, step, index, direction);
```

### Hit area

```javascript
Phaser.Actions.SetHitArea(gameObjects, hitArea, hitAreaCallback);
```

### Blend mode

```javascript
Phaser.Actions.SetBlendMode(gameObjects, blendMode, index, direction);
```

- `blendMode` : [Blend mode](blendmode.md)

### Play animation

```javascript
Phaser.Actions.PlayAnimation(gameObjects, key, ignoreIfPlaying);
```

### Shuffle

```javascript
Phaser.Actions.Shuffle(gameObjects);
```

### Fit to region

```javascript
Phaser.Actions.FitToRegion(gameObjects, scaleMode, region, itemCoverage)
```

- `scaleMode` :
    - `0` : sets each axis to fill the region independently. 
    - `-1` : scales both axes uniformly so the item touches the _inside_ of the region. 
    - `1` : scales both axes uniformly so the item touches the _outside_ of the region.
- `region` : The region to fit. 
    - `undefined` : Size of scene. (`scene.scale.width, scene.scale.height`)
- `itemCoverage` : Override or define the region covered by the item.
    ```javascript
    {
        width: 1,
        height: 1,
        originX: 0.5,
        originY: 0.5,
    }
    ```

### Add bloom effect

- Apply bloom to the scene camera.
    ```javascript
    var { parallelFilters, threshold, blur } = Phaser.Actions.AddEffectBloom(scene.cameras.main)[0];
    // The return is an array.
    ```
    ```javascript
    Phaser.Actions.AddEffectBloom(camera, {
        threshold: 0.5,
        blurRadius: 2,
        blurSteps: 4,
        blurQuality: 0,
        blendAmount: 1,
        blendMode: Phaser.BlendModes.ADD,
        useInternal: false
    })
    ```
    - `gameObjects` : A game object, camera, or an array of game objects/cameras.
    - `parallelFilters`, `threshold`, `blur` : See [Parallel](shader-builtin.md#parallel), [Threshold](shader-builtin.md#threshold), [Blur](shader-builtin.md#blur)
- Destroy the bloom effect
    ```javascript
    parallelFilters.destroy();
    ```

!!! warning "WebGL only"
    Only work in WebGL render mode.

### Add shine effect

- Apply shine to a game object or camera.
    ```javascript
    var { dynamicTexture, gradient, tween, parallelFilters, blendFilter } = Phaser.Actions.AddEffectShine(gameObject)[0];
    // The return is an array.
    ```
    ```javascript
    Phaser.Actions.AddEffectShine(gameObjects, {
        // radius: 0.5,
        // direction: 0.5,
        // scale: 2,
        // width: 128,
        // height: 128,
        // colorFactor: [1.15, 0.85, 0.85, 1],
        // displacementMap: undefined,
        // displacement: 0.1,
        // duration: 2000,
        // repeatDelay: 0,
        // ease: undefined,
        // yoyo: false,
        // useExternal: false,
        // reveal: false
    });
    ```
    - `gameObjects` : A game object, camera, or an array of game objects/cameras.
    - `radius` : The width of the shine, as a proportion of the size of the target. Default value is `0.5`.
    - `direction` : The direction the shine travels in radians.
        - `0` : left to right, increasing clockwise. Default value is `0.5`.
    - `scale` : The length the shine travels, as a proportion of the size of the target. Default value is `2`.
    - `width`, `height` : The size of the gradient texture.
        - `undefined` : Derived from the target size, or `128`.
    - `bands` : Custom color bands to use in the gradient.
    - `colorFactor` : The RGBA factor which multiplies the shiny part of the image. Default value is `[1.15, 0.85, 0.85, 1]`.
        - Values can be greater than `1` for a brighter shine.
    - `displacementMap` : A displacement texture key to apply to the gradient.
        - `undefined` : No displacement.
    - `displacement` : The displacement strength. Default value is `0.1`.
    - `duration` : Duration of the shine animation, in milliseconds. Default value is `2000`.
    - `repeatDelay` : Delay between repetitions. Default value is `0`.
    - `ease` : Ease mode of the shine tween.
        - A string.
        - A function object.
    - `yoyo` : Whether to move the shine back and forth. Default value is `false`.
    - `useExternal` : Whether to add the shine effect to the external filter list. Default value is `false`.
        - `false` : Use `filters.internal`.
        - `true` : Use `filters.external`.
    - `reveal` : Whether to use reveal mode. Default value is `false`.
        - `false` : Add the shine over the original image.
        - `true` : Only show the shiny part of the image. `parallelFilters` will be `undefined`.
- Return values
    ```javascript
    var {
        item,
        dynamicTexture,
        gradient,
        tween,
        parallelFilters,
        blendFilter
    } = result;
    ```
    - `gameObjects` : The game object or camera to which the shine is applied.
    - `dynamicTexture` : The dynamic texture where the shine gradient is rendered.
    - `gradient` : The gradient object which controls the shine area.
    - `tween` : The tween which animates and redraws the shine gradient.
    - `parallelFilters` : See [Parallel](shader-builtin.md#parallel).
        - `undefined` in reveal mode.
    - `blendFilter` : See [Blend](shader-builtin.md#blend).
- Destroy the shine effect
    - Normal mode
        ```javascript
        tween.destroy();
        dynamicTexture.destroy();
        parallelFilters.destroy();
        ```
    - Reveal mode
        ```javascript
        tween.destroy();
        dynamicTexture.destroy();
        blendFilter.destroy();
        ```
    - These resources are destroyed automatically when the target is destroyed.
    - Destroy them manually to remove the shine effect earlier.

!!! warning "WebGL only"
    Only work in WebGL render mode.

### Add mask shape

```javascript
var mask = Phaser.Actions.AddMaskShape(gameObjects, {
    // shape: 'circle',
    // aspectRatio: 1,
    // invert: false,
    // useInternal: false,
    // blurRadius: 0,
    // blurSteps: 4,
    // blurQuality: 0,
    // scaleMode: 0,
    // padding: 0,
    // region: Phaser.Geom.Rectangle,
})[0]; 
// The return is an array.
```

- `gameObjects` : A game object, camera, or an array of game objects/cameras.
- `shape` : `'circle'`, `'ellipse'`, `'square'` or `'rectangle'`.
- `aspectRatio` : The aspect ratio of width to height for ellipse and rectangle shapes.
- `invert` : Whether to invert the mask, typically for creating borders.
- `useInternal` : Whether to use the internal or external filter list. Internal masks follow game objects, and are executed before external filters.
- `blurRadius` : The radius of blur to apply to the mask. If `0`, no blur is applied. A good value is `2`.
- `blurSteps` : The number of steps to run blur on the mask. This value should always be an integer.
- `blurQuality` : The quality of any blur: 
    - `0` : low
    - `1` : medium
    - `2` : high
- `scaleMode` : The scale mode to use when fitting the shape. 
    - `0` : each axis to fill the region independently. 
    - `-1` : scales both axes uniformly so the shape touches the _inside_ of the region. 
    - `1` : scales both axes uniformly so the shape touches the _outside_ of the region.
- `padding` : Padding applies an inset around the edge of the masked region. This provides space for blur to soften the edges of a mask.
- `region` : The region to fit. If not defined, it will be inferred from the target's scene scale. (`scene.scale.width, scene.scale.height`)

!!! warning "WebGL only"
    Only work in WebGL render mode.
