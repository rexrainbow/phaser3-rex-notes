import BoardPlugin from 'rexPlugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.shapeTextureKey = 'shape';
        var board = new Board(this);
        var chessA = new ChessA(board, 0, 0);

        this.input.on('pointerdown', function (pointer) {
            chessA.moveForward(4);
        });
    }
}

const TILESMAP =
    `1,1,1,.,1,1,1
1,.,1,.,1,.,1
1,1,0,1,0,1,1
.,.,1,.,1,.,.
1,1,0,1,0,1,1 
1,.,1,.,1,.,1
1,1,1,.,1,1,1`;
const COLORMAP = [0x005500, 0x00AA00, 0x00FF00];
class Board extends RexPlugins.Board.Board {
    constructor(scene) {
        var tiles = createTileMap(TILESMAP);

        // create board
        var config = {
            // grid: getHexagonGrid(scene),
            grid: getQuadGrid(scene),
            width: tiles[0].length,
            height: tiles.length,
            // wrap: true
        }
        super(scene, config);
        // draw grid
        // var graphics = scene.add.graphics({
        //     lineStyle: {
        //         width: 1,
        //         color: 0xffffff,
        //         alpha: 1
        //     }
        // });
        // this.forEachTileXY(function (tileXY, board) {
        //     var poly = board.getGridPolygon(tileXY.x, tileXY.y);
        //     graphics.strokePoints(poly.points, true);
        // })
        // create grid texture
        createGridPolygonTexture(this, scene.shapeTextureKey);

        this.createPath(tiles);
    }

    createPath(tiles) {
        // tiles : 2d array
        var scene = this.scene;
        var line, symbol, tile, cost, color;
        for (var tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
            line = tiles[tileY];
            for (var tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
                symbol = line[tileX];
                if (isNaN(symbol)) {
                    continue;
                }

                cost = parseFloat(symbol);
                color = COLORMAP[cost];
                tile = scene.add.image(0, 0, scene.shapeTextureKey)
                    .setTint(color)
                    .setScale(0.95)
                    .setData('cost', cost);
                this.addChess(tile, tileX, tileY, 0, true);
            }
        }
        return this;
    }

    getTileCost(tileXY) {
        return this.tileXYZToChess(tileXY.x, tileXY.y, 0).getData('cost');
    }
}

class ChessA extends Phaser.GameObjects.Image {
    constructor(board, tileX, tileY) {
        var scene = board.scene;
        super(scene, 0, 0, scene.shapeTextureKey);
        scene.add.existing(this);
        this.setTint(0x000055)
            .setScale(0.9);
        board.addChess(this, tileX, tileY, 1, true);
        // add behaviors        
        this.monopoly = scene.rexBoard.add.monopoly(this, {
            face: 0,
            pathTileZ: 0,
            costCallback: board.getTileCost,
            costCallbackScope: board
        });
        this.moveTo = scene.rexBoard.add.moveTo(this);
    }

    moveForward(movingPoints) {
        if (this.moveTo.isRunning) {
            return this;
        }

        var path = this.monopoly.getPath(movingPoints);
        this.moveAlongPath(path);
        return this;
    }
    moveAlongPath(path) {
        if (path.length === 0) {
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        var tileData = path.shift();
        this.moveTo.moveTo(tileData);
        this.monopoly.setFaceDirection(this.moveTo.destinationDirection);
        return this;
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 100,
        y: 100,
        cellWidth: 50,
        cellHeight: 50,
        type: 0
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var createGridPolygonTexture = function (board, shapeTextureKey) {
    var poly = board.getGridPolygon();
    poly.left = 0;
    poly.top = 0;
    var scene = board.scene;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(poly.points, true)
        .generateTexture(shapeTextureKey, poly.width, poly.height)
        .destroy();
    return scene.textures.get(shapeTextureKey);
}

var createTileMap = function (tilesMap, out) {
    if (out === undefined) {
        out = [];
    }
    var lines = tilesMap.split('\n');
    for (var i = 0, cnt = lines.length; i < cnt; i++) {
        out.push(lines[i].split(','));
    }
    return out;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);