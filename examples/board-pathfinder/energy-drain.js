import BoardPlugin from '../../plugins/board-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const ENERGY_SOURCE = 30;
const ENERGY_DRAIN = -10;
const ENERGY_PIPE = -1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('source', 'assets/images/flash-on.png');
        this.load.image('drain', 'assets/images/bolt.png');
    }

    create() {
        var config = {
            grid: this.rexBoard.add.quadGrid({
                x: 26,
                y: 26,
                cellWidth: 40,
                cellHeight: 40
            }),
            width: 14,
            height: 14,
        }
        var board = new Board(this, config);
        for (var i = 0; i < 3; i++) {
            board.addSource();
        }
        for (var i = 0; i < 10; i++) {
            board.addDrain();
        }
        board.energyDiffuse();

        CreateLabels(this);
        CreateHints(this);
    }
}

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        super(scene, config);

        this
            // Fill tiles
            .forEachTileXY(function (tileXY, board) {
                new Tile(board, tileXY);
            })
            // Enable touch events
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                this
                    .tooglePipe(tileXY)
                    .energyDiffuse();
            }, this);
    }

    addSource(tileXY) {
        if (tileXY === undefined) {
            tileXY = this.getRandomEmptyTileXY(1);
        }
        new Source(this, tileXY);
        return this;
    }

    addDrain(tileXY) {
        if (tileXY === undefined) {
            tileXY = this.getRandomEmptyTileXY(1);
        }
        new Drain(this, tileXY);
        return this;
    }

    tooglePipe(tileXY) {
        var chess = this.tileXYZToChess(tileXY.x, tileXY.y, 1);
        if (!chess) {
            new Pipe(this, tileXY);
        } else if (chess instanceof Pipe) {
            this.removeChess(chess, null, null, null, true);
        }
        return this;
    }

    energyDiffuse() {
        // Initialize
        this.setTilesEnergy(this.tileZToChessArray(0), false);
        var energyChessArray = this.tileZToChessArray(1), energyChess;
        for (var i = 0, cnt = energyChessArray.length; i < cnt; i++) {
            energyChess = energyChessArray[i];
            energyChess.setData('remainder', energyChess.getData('energy'));
        }

        // Flood-fill all energy sources
        var tileXYArray;
        for (var i = 0, cnt = energyChessArray.length; i < cnt; i++) {
            energyChess = energyChessArray[i];
            if (energyChess.pathFinder) {
                tileXYArray = energyChess.pathFinder.findArea(undefined, [this.chessToTileXYZ(energyChess)]);
                this.setTilesEnergy(this.tileXYArrayToChessArray(tileXYArray, 0), true);
            }
        }
    }

    setTilesEnergy(tiles, enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        for (var i = 0, cnt = tiles.length; i < cnt; i++) {
            tiles[i].setEnergy(enabled);
        }
        return this;
    }
}

class Tile extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0);
        scene.add.existing(this);
        this.setStrokeStyle(1, COLOR_BOARDER, 0.5);
    }

    setEnergy(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        var fillColor = (enabled) ? COLOR_ENERGY : COLOR_NOENERGY;
        var alpha = (enabled) ? 0.5 : 0.3;
        this.setFillStyle(fillColor, alpha);
        return this;
    }
}

class Source extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        super(scene, 0, 0, 'source');
        scene.add.existing(this);
        this.setTint(COLOR_SOURCE);

        board.addChess(this, tileXY.x, tileXY.y, 1);
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            shuffleNeighbors: true,
            costCallback: this.onGetCost,
            costCallbackScope: this,
        });
        this.setData('energy', ENERGY_SOURCE);
    }

    onGetCost(curTile, preTile, pathFinder) {
        var board = pathFinder.board;
        var chess = board.tileXYZToChess(curTile.x, curTile.y, 1);
        if (!chess) {
            return pathFinder.BLOCKER;
        } else {
            if (chess.getData('energy') > 0) { // Energy source, pass through it
                return 0;
            }
            var remainder = this.getData('remainder') + chess.getData('remainder');
            if (remainder >= 0) {
                this.setData('remainder', remainder);
                chess.setData('remainder', 0);
                return 0;
            } else {
                this.setData('remainder', 0);
                chess.setData('remainder', remainder);
                return pathFinder.BLOCKER;
            }
        }
    }
}

class Drain extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        super(scene, 0, 0, 'drain');
        scene.add.existing(this);
        this.setTint(COLOR_DRAIN);

        board.addChess(this, tileXY.x, tileXY.y, 1);
        this.setData('energy', ENERGY_DRAIN);
    }
}

class Pipe extends Phaser.GameObjects.Arc {
    constructor(board, tileXY) {
        var scene = board.scene;
        super(scene, 0, 0, 5, 0, 360, false, COLOR_DRAIN, 1);
        scene.add.existing(this);

        board.addChess(this, tileXY.x, tileXY.y, 1);
        this.setData('energy', ENERGY_PIPE);
    }
}

const COLOR_BOARDER = 0xffffff;
const COLOR_SOURCE = 0x6ec6ff;
const COLOR_DRAIN = 0x0069c0;
const COLOR_ENERGY = 0x2196f3;
const COLOR_NOENERGY = 0xb0003a;

var CreateLabels = function (scene) {
    var labels = scene.rexUI.add.gridSizer({
        x: 800 - 10,
        y: 10,
        height: 120,
        column: 3,
        row: 3,
        rowProportions: 1,
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY))

        .add(scene.add.image(0, 0, 'source').setTint(COLOR_SOURCE), 0, 0, 'center', { left: 10, right: 10 }, false)
        .add(scene.add.text(0, 0, 'Source'), 1, 0, 'left', 0, false)
        .add(scene.add.text(0, 0, ENERGY_SOURCE), 2, 0, 'left', { left: 10, right: 10 }, false)

        .add(scene.add.image(0, 0, 'drain').setTint(COLOR_DRAIN), 0, 1, 'center', { left: 10, right: 10 }, false)
        .add(scene.add.text(0, 0, 'Drain'), 1, 1, 'left', 0, false)
        .add(scene.add.text(0, 0, ENERGY_DRAIN), 2, 1, 'left', { left: 10, right: 10 }, false)

        .add(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, COLOR_DRAIN), 0, 2, 'center', { left: 10, right: 10 }, false)
        .add(scene.add.text(0, 0, 'Pipe'), 1, 2, 'left', 0, false)
        .add(scene.add.text(0, 0, ENERGY_PIPE), 2, 2, 'left', { left: 10, right: 10 }, false)

        .setOrigin(1, 0)
        .layout();
    return labels;
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateHints = function (scene) {
    scene.add.text(0, 580, 'Click an empty cell to create a pipe, or click a pipe to remove it.');
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
        scene: [
            {
                key: 'rexBoard',
                plugin: BoardPlugin,
                mapping: 'rexBoard'
            },
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);