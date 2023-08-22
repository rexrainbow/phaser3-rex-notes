import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('tiles', "https://raw.githubusercontent.com/pedroddomingues/morram-vermes/master/public/terrain_atlas.png");
        this.load.tilemapTiledJSON('map', "https://raw.githubusercontent.com/pedroddomingues/morram-vermes/master/public/map.json");
    }

    create() {
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('atlas_terrain', 'tiles');
        var baseLayer = map.createLayer("base", tiles);
        var islandLayer = map.createLayer("island", tiles);

        var board = this.rexBoard.createBoardFromTilemap(map, "island");
        board.forEachTileXY(function (tileXY, board) {
            var scene = board.scene;
            var tile = islandLayer?.getTileAt(tileXY.x, tileXY.y);
            if (tile.index === 113) {
                var cost = ((tileXY.x === 2) && (tileXY.y === 5)) ? -1 : 1;
                scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 2, 0xffffff, 0.4).setOrigin(0).setData('cost', cost);
            } else {
                scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 2, 0xffffff, 0.1).setOrigin(0).setData('cost', undefined);
            }
        });

        var chessA = new ChessA(board, {
            x: 1,
            y: 8
        });

        this.input.on('pointerdown', function (pointer) {
            chessA.moveForward(4);
        });

        // console.log(board.getAllChess())

    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 2, 0x3f51b5);
        scene.add.existing(this.setOrigin(0));

        // add behaviors
        this.monopoly = scene.rexBoard.add.monopoly(this, {
            pathTileZ: 2,
            costCallback: function (curTileXY, preTileXY, monopoly) {
                var board = monopoly.board;
                const tile = board.tileXYZToChess(curTileXY.x, curTileXY.y, 2);
                console.log(tile.rexChess.tileXYZ)
                return tile.getData('cost')
            },
        });
        this.moveTo = scene.rexBoard.add.moveTo(this);

        // private members
        this.movingPathTiles = [];
    }

    showMovingPath(tileXYArray) {
        this.hideMovingPath();
        var tileXY, worldXY;
        var scene = this.scene,
            board = this.rexChess.board;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
            this.movingPathTiles.push(scene.add.circle(worldXY.x, worldXY.y, 8, 0xb0003a).setOrigin(-0.5));
        }
    }

    hideMovingPath() {
        for (var i = 0, cnt = this.movingPathTiles.length; i < cnt; i++) {
            this.movingPathTiles[i].destroy();
        }
        this.movingPathTiles.length = 0;
        return this;
    }

    moveForward(movingPoints) {
        if (this.moveTo.isRunning) {
            return this;
        }

        var path = this.monopoly.getPath(movingPoints);
        this.showMovingPath(path);
        this.moveAlongPath(path);
        return this;
    }

    moveAlongPath(path) {
        //console.log({path})
        //console.log(this.monopoly.getPath(path.length))
        if (path.length === 0) {
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        var tileData = path.shift();
        this.moveTo.moveTo(tileData);
        this.monopoly.setFace(this.moveTo.destinationDirection);
        return this;
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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