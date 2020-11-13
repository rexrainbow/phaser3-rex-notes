## Introduction

Display of tiles map, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load tile map

```javascript
scene.load.tilemapTiledJSON(key, url);  // JSON
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
        var map = this.make.tilemap({
            data: tileIdxArray,  // [ [], [], ... ]
            tileWidth: 32,
            tileHeight: 32,
            width: 10,
            height: 10
        });
        ```
    - Create map from csv
        ```javascript
        var map = this.make.tilemap({
            key: 'map',     // csv file
            tileWidth: 32,
            tileHeight: 32
        });
        ```
2. Add tile set image
    ```javascript
    var tileset = map.addTilesetImage(tilesetName, key); // key: texture key
    // var tileset = map.addTilesetImage(tilesetName);  // key = tilesetName
    // var tileset = map.addTilesetImage(tilesetName, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid);
    ```
3. Create layer object to render tile image, a tile map object could have many layers. Layer object is a kind of game object.
    ```javascript
    var layer = map.createLayer(layerID, tileset);
    // var layer = map.createLayer(layerID, tileset, x, y); // x, y : offset in pixels
    ```
    - `tileset` : The tileset, or an array of tilesets.
        - A string, or an array of string.
        - A tileset object, or an array of tileset objects.
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
```

or

```javascript
map.layer = layer;
```

#### Set tile size

```javascript
map.setBaseTileSize(tileWidth, tileHeight);
```

#### Draw on graphics

```javascript
map.renderDebug(graphics);
```

or

```javascript
map.renderDebug(graphics, {
    tileColor: new Phaser.Display.Color(105, 210, 231, 150),         // null
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // null
    faceColor: new Phaser.Display.Color(40, 39, 37, 150)             // null
});
```

or

```javascript
map.renderDebug(graphics, styleConfig, layer);
```

- `graphics` : [Graphics game object](graphics.md).

### Layer

#### Get layer

```javascript
var layer = map.getLayer(name);
```

#### Render order

```javascript
layer.setRenderOrder(renderOrder);
```

- `renderOrder`
    - `0`, or `'right-down'`
    - `1`, or `'left-down'`
    - `2`, or `'right-up'`
    - `3`, or `'left-up'`

#### Fill tiles

- Fill current layer
    ```javascript
    map.fill(index);  // Fill all grids
    ```
    or
    ```javascript
    map.fill(index, tileX, tileY, width, height);
    ```    
- Fill layer
    ```javascript
    layer.fill(index);  // Fill all grids
    ```
    or
    ```javascript
    layer.fill(index, tileX, tileY, width, height);
    ```

#### Randomize

- Randomize current layer
    ```javascript
    map.randomize(); // Randomize all grids
    ```
    or
    ```javascript
    map.randomize(tileX, tileY, width, height, indexes);
    ```
    - `indexes` An array of tile indexes.
- Weight randomize current layer
    ```javascript
    map.weightedRandomize(tileX, tileY, width, height, {
        { index: 0, weight: 4 },
        { index: [0, 1], weight: 4 }
    });
    ```
- Randomize layer
    ```javascript
    layer.randomize();  // Randomize all grids
    ```
    or
    ```javascript
    layer.randomize(tileX, tileY, width, height, indexes);
    ```
    - `indexes` An array of tile indexes.
- Weight randomize layer
    ```javascript
    layer.weightedRandomize(tileX, tileY, width, height, {
        { index: 0, weight: 4 },
        { index: [0, 1], weight: 4 }
    });
    ```

#### Copy tiles

- Copy current layer
    ```javascript
    map.copy(srcTileX, srcTileY, width, height, destTileX, destTileY);
    ```
- Copy layer
    ```javascript
    map.copy(srcTileX, srcTileY, width, height, destTileX, destTileY, recalculateFaces, layer);
    ```
    or
    ```javascript
    layer.copy(srcTileX, srcTileY, width, height, destTileX, destTileY, recalculateFaces);
    ```

#### Put tile at

- Put on current layer
    ```javascript
    map.putTileAt(tile, tileX, tileY);
    ```
    - `tile` : Tile index, or tile object.
- Put on layer
    ```javascript
    map.putTileAt(tile, tileX, tileY, recalculateFaces, layer);
    ```
    or
    ```javascript
    layer.putTileAt(tile, tileX, tileY, recalculateFaces);
    ```
    - `tile` : Tile index, or tile object.

#### Put tiles at

- Put on current layer
    ```javascript
    map.putTilesAt(tilesArray, tileX, tileY);  // tilesArray: 1d/2d array of Tile object or tile index
    ```
    - `tilesArray` : 1d/2d array of tile objects or tile indexes
- Put on layer
    ```javascript
    map.putTilesAt(tilesArray, tileX, tileY, recalculateFaces, layer);
    ```
    or
    ```javascript
    layer.putTilesAt(tilesArray, tileX, tileY, recalculateFaces);
    ```
    - `tilesArray` : 1d/2d array of tile objects or tile indexes

#### Replace tiles

- Replace on current layer
   ```javascript
   map.replaceByIndex(findIndex, newIndex); // Search on all grids
   ```
   or
   ```javascript
   map.replaceByIndex(findIndex, newIndex, tileX, tileY, width, height);
   ```
- Replace on layer
   ```javascript
   map.replaceByIndex(findIndex, newIndex, tileX, tileY, width, height, layer);
   ```
   or
   ```javascript
   layer.replaceByIndex(findIndex, newIndex, tileX, tileY, width, height);
   ```

#### Swap tiles

- Swap on current layer
    ```javascript
    map.swapByIndex(indexA, indexB);
    ```
    or
    ```javascript
    map.swapByIndex(indexA, indexB, tileX, tileY, width, height);
    ```
- Swap on layer
    ```javascript
    map.swapByIndex(indexA, indexB, tileX, tileY, width, height, layer);
    ```
    or
    ```javascript
    layer.swapByIndex(indexA, indexB, tileX, tileY, width, height);
    ```

#### Shuffle tiles

- Shuffle on current layer
    ```javascript
    map.shuffle();
    ```
    or
    ```javascript
    map.shuffle(tileX, tileY, width, height);
    ```
- Shuffle on layer
    ```javascript
    map.shuffle(tileX, tileY, width, height, layer);
    ```
    or
    ```javascript
    layer.shuffle(tileX, tileY, width, height);
    ```

### Tile

#### Get tile

```javascript
var tile = map.getTileAt(tileX, tileY);
```

or

```javascript
var tile = map.getTileAt(tileX, tileY, true, layer);  // Return a Tile object with an index of -1 for empty tile
```

- `layer` : The tile layer to use. Default is current layer (`map.setLayer(layer)`)
- `tile` : A tile, or `null` if `layer` is invalid.

#### Get tiles within a rectangle area

```javascript
var tiles = map.getTilesWithin(tileX, tileY, width, height);
```

or

```javascript
var tiles = map.getTilesWithin(tileX, tileY, width, height, {
    // isNotEmpty: false,
    // isColliding: false,
    // hasInterestingFace: false
}, layer);
```

- `tileX` , `tileY` : The left/top most tile index (in tile coordinates) to use as the origin of the area.
- `width` , `height` : How many tiles wide/tall from the `tileX`/`tileY` index the area will be.
- `filteringOptions` : Optional filters to apply when getting the tiles.
    - `isNotEmpty` :  If `true`, only return tiles that don't have `-1` for an index.
    - `isColliding` : If `true`, only return tiles that collide on at least one side.
    - `hasInterestingFace` : If `true`, only return tiles that have at least one interesting face.
- `layer` : The tile layer to use. Default is current layer (`map.setLayer(layer)`)
- `tiles` : An array of Tiles, or `null` if `layer` is invalid.

#### Get tiles within world XY

```javascript
var tiles = map.getTilesWithinWorldXY(worldX, worldY, width, height);
```

or

```javascript
var tiles = map.getTilesWithinWorldXY(worldX, worldY, width, height,  {
    // isNotEmpty: false,
    // isColliding: false,
    // hasInterestingFace: false
}, camera, layer);
```

- `worldX` , `worldY` : The world x/y coordinate for the top-left of the area.
- `width` , `height` : The width/height of the area.
- `filteringOptions` : Optional filters to apply when getting the tiles.
    - `isNotEmpty` :  If `true`, only return tiles that don't have `-1` for an index.
    - `isColliding` : If `true`, only return tiles that collide on at least one side.
    - `hasInterestingFace` : If `true`, only return tiles that have at least one interesting face.
- `camera` : The Camera to use when factoring in which tiles to return. Default is main camera.
- `layer` : The tile layer to use. Default is current layer (`map.setLayer(layer)`)
- `tiles` : An array of Tiles, or `null` if `layer` is invalid.

#### Get tiles within shape

```javascript
vat tiles = map.getTilesWithinShape(shape);
```

or

```javascript
vat tiles = map.getTilesWithinShape(shape, {
    // isNotEmpty: false,
    // isColliding: false,
    // hasInterestingFace: false
}, camera, layer);
```

Shape:

- `new Phaser.Geom.Rectangle(x0, y0, width, height)`
- `new Phaser.Geom.Line(x0, y0, x1, y1)`
- `new Phaser.Geom.Circle(x, y, radius)`
- `new Phaser.Geom.Triangle(x0, y0, x1, y1, x2, y2)`

#### For each tile in layer

```javascript
map.forEachTile(function(tile, index, tileArray) { /* ... */ }, context);
```

or

```javascript
map.forEachTile(callback, context,
    tileX, tileY, width, height, {
        // isNotEmpty: false,
        // isColliding: false,
        // hasInterestingFace: false
    }, layer);
```

- `tileX` , `tileY` : The left/top most tile index (in tile coordinates) to use as the origin of the area to search.
- `width` , `height` : How many tiles wide/tall from the `tileX`/`tileY` index the area will be.
- `filteringOptions` : Optional filters to apply when getting the tiles.
    - `isNotEmpty` :  If `true`, only return tiles that don't have `-1` for an index.
    - `isColliding` : If `true`, only return tiles that collide on at least one side.
    - `hasInterestingFace` : If `true`, only return tiles that have at least one interesting face.
- `layer` : The tile layer to use. Default is current layer (`map.setLayer(layer)`)

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

```javascript
var hasTile = map.hasTileAtWorldXY(worldX, worldY);
```

or

```javascript
var hasTile = map.hasTileAtWorldXY(worldX, worldY, camera, layer);
```

### Collision

#### Enable collision

```javascript
map.setCollision(index);
// map.setCollision(index, true, recalculateFaces, updateLayer);
```

- `index` : Tile index, or an array of tile indexes.

```javascript
map.setCollisionBetween(start, stop);
```

- `start` , `stop` :  The first/last index of the tile.

```javascript
map.setCollisionByExclusion(indexes);
// map.setCollisionByExclusion(indexes, true, recalculateFaces, layer);
```

- `index` : An array of tile indexes.

```javascript
map.setCollisionByProperty({key:value});  // Enable collision if value of tile property 'key' is equal to 'value'
```

```javascript
map.setCollisionFromCollisionGroup();  // Set by collision group data in tileset collision editor
```

[Collision editor](http://docs.mapeditor.org/en/stable/manual/editing-tilesets/#tile-collision-editor)

#### Disable collision

```javascript
map.setCollision(index, false);
```

- `index` : Tile index, or an array of tile indexes.


```javascript
map.setCollisionBetween(start, stop, false);
```

- `start` , `stop` :  The first/last index of the tile.

```javascript
map.setCollisionByProperty({key:value}, false);
```

```javascript
map.setCollisionFromCollisionGroup(false);
```

### Tileset

#### Get tileset

```javascript
var tileset = map.getTileset(name);
```

#### Get collision group

```javascript
var collisionGroup = tileset.getTileCollisionGroup(tile.index); // array of collision shapes, or null
```

Types of collision shape (`collisionGroup.objects`)

- `object.rectangle` :
    ```javascript
    {
        x, y, width, height
    }
    ```
- `object.ellipse` :
    ```javascript
    {
        x, y, width, height
    }
    ```
- `object.polygon` :
    ```javascript
    {
        x, y,
        points: [{x,y}, {x,y}, ...]
    }
    ```
- `object.polyline` :
    ```javascript
    {
        x, y,
        points: [{x,y}, {x,y}, ...]
    }
    ```

#### Change texture of tileset

```javascript
var texture = scene.sys.textures.get(key);
tileset.setImage(texture);
```
