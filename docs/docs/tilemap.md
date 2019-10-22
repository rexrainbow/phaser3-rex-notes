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

1. Create tile map
    - Create map from tiled
        ```javascript
        var map = scene.add.tilemap(key);
        // var map = this.make.tilemap({ key: 'map' });
        ```
    - Create map from 2d array
        ```javascript
        var config = {
            data: tileIdxArray,  // [ [], [], ... ]
            tileWidth: 32,
            tileHeight: 32,
            width: 10,
            height: 10
        }
        var map = this.make.tilemap(config);
        ```
    - Create map from csv
        ```javascript
        var config = {
            key: 'map',     // csv file
            tileWidth: 32,
            tileHeight: 32
        }
        var map = this.make.tilemap(config);
        ```
2. Add tile set image
    ```javascript
    var tileset = map.addTilesetImage(tilesetName, key); // key: texture key
    // var tileset = map.addTilesetImage(tilesetName);  // key = tilesetName
    // var tileset = map.addTilesetImage(tilesetName, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid);
    ```
3. Create layer object to render tile image, a tile map object could have many layers. Layer object is a kind of game object.
    - Static
        ```javascript
        var layer = map.createStaticLayer(layerID, tileset);
        // var layer = map.createStaticLayer(layerID, tileset, x, y); // x, y : offset in pxiels
        ```
    - Dynamic
        ```javascript
        var layer = map.createDynamicLayer(layerID, tileset);
        // var layer = map.createDynamicLayer(layerID, tileset, x, y); // x, y : offset in pxiels
        ```
    - Blank dynamic
        ```javascript
        var layer = map.createBlankDynamicLayer(layerID, tileset);
        // var layer = map.createBlankDynamicLayer(layerID, tileset, x, y); // x, y : offset in pxiels
        ```
4. Create sprite objects with tile ID (optional)
    ```javascript
    var sprites = map.createFromObjects(name, id, spriteConfig);
    // var sprites = map.createFromObjects(name, id, spriteConfig, scene);
    ```
    - name: name of the object layer
    - id: gid (number), or id (number), or name (string)
    - spriteConfig: The config object to pass into the Sprite creator (i.e. `scene.make.sprite`). Extend spriteConfig with properties of object (`type`, `x`, `y`, `rotation`, `visible`, `width`, `height`, ... etc)

### Map

#### Select current layer

```javascript
map.setLayer(layer);  // layer name, layer index
// map.layer = layer;
```

#### Set tile size

```javascript
map.setBaseTileSize(tileWidth, tileHeight);
```

#### Draw on graphics

```javascript
var styleConfig = {
    tileColor: new Phaser.Display.Color(105, 210, 231, 150),         // null
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // null
    faceColor: new Phaser.Display.Color(40, 39, 37, 150)             // null
}
map.renderDebug(graphics, styleConfig);
// map.renderDebug(graphics, styleConfig, layer);
```

### Layer

#### Render order

```javascript
layer.setRenderOrder(renderOrder);
```

- `renderOrder`
    - `0`, or `'right-down'`
    - `1`, or `'left-down'`
    - `2`, or `'right-up'`
    - `3`, or `'left-up'`

### Tile

#### Get tile

```javascript
var tile = map.getTileAt(tileX, tileY);
// var tile = map.getTileAt(tileX, tileY, true);  // return a Tile object with an index of -1 for empty tile
```

#### Get tiles within

```javascript
var tiles = map.getTilesWithin(tileX, tileY, width, height);
```

```javascript
var filteringOptions = {
    // isNotEmpty: false,
    // isColliding: false,
    // hasInterestingFace: false
};
var tiles = map.getTilesWithin(tileX, tileY, width, height, filteringOptions);
```

#### Get tiles within world XY

```javascript
var tiles = map.getTilesWithinWorldXY(worldX, worldY, width, height);
// var tiles = map.getTilesWithinWorldXY(worldX, worldY, width, height, filteringOptions, camera, layer);
```

#### Get tiles within shape

```javascript
vat tiles = map.getTilesWithinShape(shape);
// vat tiles = map.getTilesWithinShape(shape, filteringOptions, camera, layer);
```

Shape:

- `new Phaser.Geom.Rectangle(x0, y0, width, height)`
- `new Phaser.Geom.Line(x0, y0, x1, y1)`
- `new Phaser.Geom.Circle(x, y, radius)`
- `new Phaser.Geom.Triangle(x0, y0, x1, y1, x2, y2)`

#### For each tile in layer

```javascript
var callback = function (tile) { /* ... */};
map.forEachTile(callback, context);
// map.forEachTile(callback, context, tileX, tileY, width, height, filteringOptions);
```

```javascript
var callback = function (tile) { /* ... */};
layer.forEachTile(callback, context);
// layer.forEachTile(callback, context, tileX, tileY, width, height, filteringOptions);
```

#### Tiled index

```javascript
var index = tile.index;
```

```javascript
tile.index = index;
```

#### Properties

```javascript
var properties = tile.properties;  // object or null
var value = properties[key];
```

```javascript
tile.properties[key] = value;
```

#### Tile at world XY

World XY at map

```javascript
var hasTile = map.hasTileAtWorldXY(worldX, worldY);  // true/false
// hasTile = map.hasTileAtWorldXY(worldX, worldY, camera, layer);
```

XY at layer

```javascript
var hasTile = layer.hasTileAtWorldXY(worldX, worldY);  // true/false
// hasTile = layer.hasTileAtWorldXY(worldX, worldY, camera);
```

### Collision

#### Enable collision

```javascript
map.setCollision(index);   // index: tile index
// map.setCollision(index, true, recalculateFaces, updateLayer);
map.setCollision(indexes); // indexes: an array of tile index
// map.setCollision(indexes, true, recalculateFaces, updateLayer);
map.setCollisionBetween(start, stop); // indexes from `start` to `stop`
map.setCollisionByExclusion(indexes); // indexes: an array of tile index
map.setCollisionByProperty({key:value});  // enable collision if value of tile property 'key' is equal to 'value'
map.setCollisionFromCollisionGroup();  // set by collision group data in tileset collision editor
```

[Collision editor](http://docs.mapeditor.org/en/stable/manual/editing-tilesets/#tile-collision-editor)

#### Disable collision

```javascript
map.setCollision(index, false);
map.setCollision(indexes, false);
map.setCollisionBetween(start, stop, false);
map.setCollisionByProperty({key:value}, false);
map.setCollisionFromCollisionGroup(false);
```

### Tile set

#### Get collision group

```javascript
var collisionGroup = tileset.getTileCollisionGroup(tile.index); // array of collision shapes, or null
```

Types of collision shape (`collisionGroup.objects`)

- object.rectangle (object.x, object.y, object.width, object.height)
- object.ellipse (object.x, object.y, object.width, object.height)
- object.polygon (object.x, object.y, [{x,y}, {x,y}, ...])
- object.polyline (object.x, object.y, [{x,y}, {x,y}, ...])

#### Change texture of tileset

```javascript
var texture = scene.sys.textures.get(key);
tileset.setImage(texture);
```

### Dynamic layer

#### Fill tiles

```javascript
map.fill(index);
// map.fill(index, tileX, tileY, width, height);
```

```javascript
layer.fill(index);
// layer.fill(index, tileX, tileY, width, height);
```

#### Randomize

```javascript
map.randomize(tileX, tileY, width, height, indexes); // indexes: array of tile index
```

```javascript
layer.randomize(tileX, tileY, width, height, indexes);
```

```javascript
var weightedIndexes = [
    { index: 0, weight: 4 },
    { index: [0, 1], weight: 4 }
]
map.weightedRandomize(tileX, tileY, width, height, weightedIndexes); // weightedIndexes: [{index, weight}, ...]
```

#### Copy tiles

```javascript
map.copy(srcTileX, srcTileY, width, height, destTileX, destTileY); // indexes: array of tile index
```

#### Put tile at

```javascript
map.putTileAt(tile, tileX, tileY);  // tile: Tile object or tile index
```

```javascript
map.putTilesAt(tilesArray, tileX, tileY);  // tilesArray: 1d/2d array of Tile object or tile index
```

#### Replace tiles

```javascript
map.replaceByIndex(findIndex, newIndex);
// map.replaceByIndex(findIndex, newIndex, tileX, tileY, width, height, layer);
```

#### Swap tiles

```javascript
map.replaceByIndex(indexA, indexB);
// map.replaceByIndex(indexA, indexB, tileX, tileY, width, height, layer);
```

#### Shuffle tiles

```javascript
map.shuffle();
// map.shuffle(tileX, tileY, width, height, layer);
```

#### Convert to static layer

```javascript
staticLayer = map.convertLayerToStatic(dynamicLayer);
```

dynamicLayer will be destroyed.