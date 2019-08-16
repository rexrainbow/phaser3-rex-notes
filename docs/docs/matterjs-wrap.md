## Introduction

Automatically wrap the position of bodies and composites such that they always stay within the given bounds.

- [Reference](https://github.com/liabru/matter-wrap)

## Usage

### System configuration

- Game config
    ```javascript
    var config = {
        // ...
        physics: {
            matter: {
                // ...
                plugins: {
                    wrap: true,
                    // ...
                }
                // ...
            }
        }
        // ...
    }
    var game = new Phaser.Game(config);
    ```
- Runtime
    ```javascript
    scene.matter.system.enableWrapPlugin();
    ```

### Matter object configuration

```javascript
var options = {
    // ...
    plugin: {
        wrap: {
            min: {
                x: 0,
                y: 0
            },
        max: {
            x: 1024,
            y: 1024
        }
    }
    },
    // ...
}
```
