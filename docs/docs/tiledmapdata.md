## Introduction

Parses a [Tiled](https://www.mapeditor.org/) [JSON object](https://doc.mapeditor.org/en/stable/reference/json-map-format/) into a new MapData object.

- Author: Richard Davey

## Usage

```javascript
var mapData = Phaser.Tilemaps.Parsers.Tiled.ParseJSONTiled(name, json, insertNull);
```

- `name` : The name of the tilemap, used to set the name on the MapData.
- `json` : The Tiled JSON object.
- `insertNull` : Controls how empty tiles, tiles with an index of `-1`.
    - `true` : Empty locations will get a value of `null`.
    - `false` : Empty location will get a Tile object with an index of `-1`.

### Map data

#### Map type

```javascript
var mapType = mapData.orientation;
```

- `mapType` : `orthogonal`, `isometric`, `hexagonal`

#### Map size

- Grid size
    ```javascript
    var mapWidth = mapData.width;
    var mapHeight = mapData.height;
    ```
- Pixel size
    ```javascript
    var mapWidth = mapData.widthInPixels;
    var mapHeight = mapData.heightInPixels;
    ```

#### Tile size

```javascript
var tileWidth = mapData.tileWidth;
var tileHeight = mapData.tileHeight;
```

#### Layer

```javascript
var layers = mapData.layers;
```

```javascript
mapData.layers.forEach(function(layer){
    var name = layer.name;


    var alpha = layer.alpha;
    var visible = layer.visible;

    var x = layer.x;
    var y = layer.y;
    var width = layer.width;
    var height = layer.height;
    var data = layer.data;

    layer.data.forEach(function(gid, index){
        var tileX = index % width;
        var tileY = Math.floor(index / width);
        if (gid === -1) { // Empty

        } else {

        }
    })
})
```