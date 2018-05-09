## Introduction

Display of tiles map, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load tile map

```javascript
scene.load.tilemapWeltmeister(key, url);  // JSON
scene.load.tilemapCSV(key, url);          // CSV
```

### Add tile map object

1. create tile map object
    ```javascript
    var map = scene.add.tilemap(key);
    // scene.add.tilemap(key, undefined, undefined, undefined, undefined, undefined, true); // save memory     usage in large static tile map
    ```
2. add tile set image
    ```javascript
    var tileset = map.addTilesetImage(tilesetName, key); // key: texture key
    // var tileset = map.addTilesetImage(tilesetName);  // key = tilesetName
    ```
3. create layer object to render tile image
    - static
        ```javascript
        var layer = map.createStaticLayer(layerID, tileset);
        ```
    - dynamic
        ```javascript
        var layer = map.createDynamicLayer(layerID, tileset);
        ```
    - blank
        ```javascript
        var layer = map.createBlankDynamicLayer(layerID, tileset);
        ```