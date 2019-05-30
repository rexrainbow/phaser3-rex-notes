## Introduction

Get parameters from configuration object.

- Author: Richard Davey

## Usage

### Quick start

```javascript
const GetValue = Phaser.Utils.Objects.GetValue;
var myMethod = function(config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', 0);
    var height = GetValue(config, 'height', 0);
    // ...
}
```

### Get value

- Retrieves a value from an object.
    ```javascript
    var value = Phaser.Utils.Objects.GetValue(source, key, defaultValue);
    ```
    - `source` : Configuration object.
    - `key` : The name of the property to retrieve from the object. For example,
        - Property `source.name`, key = `name`
        - Property `source.position.x`, key = `position.x`
    - `defaultValue` : The value to return if the `key` isn't found in the `source` object.
- Finds the key within the *top level* of the source object, or returns `defaultValue`.
    ```javascript
    var value = Phaser.Utils.Objects.GetFastValue(source, key, defaultValue);
    ```
    - `key` : The key for the property on source. Must exist at the top level of the source object.
- Retrieves a value from an object. Allows for more advanced selection options.
    ```javascript
    var value = Phaser.Utils.Objects.GetAdvancedValue(source, key, defaultValue);
    ```
    - Implicit
        ```javascript
        var source = {x: 4};
        var value = Phaser.Utils.Objects.GetAdvancedValue(source, 'x'); // value = 4
        ```
    - From function
        ```javascript
        var source = {x: function(key){return 4;}};
        var value = Phaser.Utils.Objects.GetAdvancedValue(source, 'x'); // value = 4
        ```
        - Pass `key` to function's 1st parameter, and get return value as final result.
    - Randomly pick one element from the array
        ```javascript
        var source = {x: [a, b, c]};
        var value = Phaser.Utils.Objects.GetAdvancedValue(source, 'x'); // value = random item from array [a, b, c]
        ```
    - Random integer between min and max
        ```javascript
        var source = {x: randInt: [min, max]};
        var value = Phaser.Utils.Objects.GetAdvancedValue(source, 'x'); // value = random int min~max
        ```
    - Random float between min and max
        ```javascript
        var source = {x: randFloat: [min, max]};
        var value = Phaser.Utils.Objects.GetAdvancedValue(source, 'x'); // value = random float min~max
        ```

### Is plain object

```javascript
var isPlainObject = Phaser.Utils.Objects.IsPlainObject(object);
```

Plain object:
- `var obj = {};`
- `var obj = new Object();`
