import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var boardWidth = 200,
            boardHeight = 200;

        var t0 = window.performance.now();

        var board = new Board(this, {
            grid: this.rexBoard.add.hexagonGrid({
                x: 20,
                y: 20,
                size: 10,
                staggeraxis: 'x',
                staggerindex: 'odd'
            }),

            width: boardWidth,
            height: boardHeight,
            // wrap: true
        })

        // create chess       
        for (var i = 0; i < 1000; i++) {
            new ChessA(board);
        }

        // click end tileXY
        var chess, pathTileXYArray = [];
        var state = 'IDLE';
        board
            .setInteractive()
            .on('gameobjectdown', function (pointer, gameObject) {
                if (state === 'IDLE') {
                    chess = gameObject;
                    chess.setFillStyle(COLOR_LIGHT);
                    pathTileXYArray.length = 1;
                    pathTileXYArray[0] = board.chessToTileXYZ(chess);
                    state = 'PICK_CHESS';
                }
            })
            .on('tilemove', function (pointer, tileXY) {
                if (state === 'PICK_CHESS') {
                    pathTileXYArray.length = 1;
                    board.drawPath(board.getPath(chess, tileXY, pathTileXYArray));
                }
            })

        this.input
            .on('pointerup', function (pointer, tileXY) {
                if (state === 'PICK_CHESS') {
                    chess
                        .once('move.complete', function () {
                            this
                                .setDepth(0)
                                .setFillStyle(COLOR_DARK);
                            board.clearPath();
                            state = 'IDLE';
                        })
                        .setDepth(1)
                        .moveAlongPath(pathTileXYArray);
                    state = 'MOVE_CHESS';
                }
            })

        var t1 = window.performance.now();
        console.log(`Initial time = ${t1 - t0} ms`);

        var camera = this.cameras.main;
        camera.setZoom(0.75).setScroll(300, 300);

        var lastScrollX, lastScrollY, lastZoom;
        this.events.on('postupdate', function () {
            if ((camera.scrollX !== lastScrollX) || (camera.scrollY !== lastScrollY) || (camera.zoom !== lastZoom)) {
                board.drawGrids();
                lastScrollX = camera.scrollX;
                lastScrollY = camera.scrollY;
                lastZoom = camera.zoom;
            }
        });
    }
}

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);

        // Graphics and rendertexture for grids
        this.gridsGraphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        })
        this.gridsTexture = scene.add.renderTexture(0, 0, 1, 1)
            .setDepth(-1);

        // Graphics and rendertexture for path
        this.pathGraphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_LIGHT,
                alpha: 1
            }
        })

        this.pathFinder = scene.rexBoard.add.pathFinder({
            occupiedTest: true,
            pathMode: 'A*',
        });
    }

    drawGrids() {
        this.gridsGraphics.clear();
        var totalVisibleGrids = 0;
        this.forEachCullTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            this.gridsGraphics.strokePoints(points, true);
            totalVisibleGrids++;
        }, this);
        console.log(totalVisibleGrids);

        //var camera = this.scene.cameras.main;
        //this.gridsTexture
        //    .setSize(camera.width / camera.zoomX, camera.height / camera.zoomY)
        //    .setPosition(camera.scrollX, camera.scrollY)
        //this.gridsTexture.camera.setScroll(camera.scrollX, camera.scrollY);
        ////this.gridsTexture.camera.setZoom(camera.zoomX, camera.zoomY);
        //this.gridsTexture
        //    .clear()
        //    .draw(this.gridsGraphics);
        //this.gridsGraphics.clear();

        return this;
    }

    clearPath() {
        this.pathGraphics.clear()
        return this;
    }

    drawPath(tileXYArray) {
        this.pathGraphics
            .clear()
            .strokePoints(this.tileXYArrayToWorldXYArray(tileXYArray));

        return this;
    }

    getPath(chess, endTileXY, out) {
        return this.pathFinder
            .setChess(chess)
            .findPath(endTileXY, undefined, false, out);
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
        scene.add.existing(this);

        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this);
    }

    moveAlongPath(path) {
        if (path.length === 0) {
            this.emit('move.complete');
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        this.moveTo.moveTo(path.shift());
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