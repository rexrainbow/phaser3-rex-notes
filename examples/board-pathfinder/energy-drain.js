import BoardPlugin from '../../plugins/board-plugin.js';

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
                x: 20,
                y: 20,
                cellWidth: 40,
                cellHeight: 40
            }),
            width: 20,
            height: 15,
        }
        var board = new Board(this, config);
        for (var i = 0; i < 3; i++) {
            board.addSource();
        }
        for (var i = 0; i < 10; i++) {
            board.addDrain();
        }
        board.energyDispatch();
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
                    .energyDispatch();
            }, this);

        this.sources = [];
    }

    addSource(tileXY) {
        if (tileXY === undefined) {
            tileXY = this.getRandomEmptyTileXY(1);
        }
        this.sources.push(new Source(this, tileXY));
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

    energyDispatch() {
        this.setTilesEnergy(this.tileZToChessArray(0), false);

        // Clear visited
        for (var i = 0, cnt = this.sources.length; i < cnt; i++) {
            this.sources[i].setData('visited', false);
        }

        var source;
        for (var i = 0, cnt = this.sources.length; i < cnt; i++) {
            source = this.sources[i];
            if (source.getData('visited')) {
                continue;
            }

            source.setData('remainder', source.getData('energy'));
            var tileXYArray = [this.chessToTileXYZ(source)];
            tileXYArray = source.pathFinder.findArea(undefined, tileXYArray);
            this.setTilesEnergy(this.tileXYArrayToChessArray(tileXYArray, 0), true);
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
            costCallback: function (curTile, preTile, pathFinder) {
                var board = pathFinder.board;
                var chess = board.tileXYZToChess(curTile.x, curTile.y, 1);
                if (!chess) {
                    return pathFinder.BLOCKER;
                } else {
                    if (chess instanceof Source) {
                        chess.setData('visited', true);
                    }
                    var remainder = this.getData('remainder') + chess.getData('energy');
                    this.setData('remainder', remainder);
                    return (remainder >= 0) ? 0 : pathFinder.BLOCKER;
                }
            },
            costCallbackScope: this,
        });
        this.setData('energy', 20);
    }
}

class Drain extends Phaser.GameObjects.Image {
    constructor(board, tileXY) {
        var scene = board.scene;
        super(scene, 0, 0, 'drain');
        scene.add.existing(this);
        this.setTint(COLOR_DRAIN);

        board.addChess(this, tileXY.x, tileXY.y, 1);
        this.setData('energy', -10);
    }
}

class Pipe extends Phaser.GameObjects.Arc {
    constructor(board, tileXY) {
        var scene = board.scene;
        super(scene, 0, 0, 10, 0, 360, false, COLOR_DRAIN, 1);
        scene.add.existing(this);

        board.addChess(this, tileXY.x, tileXY.y, 1);
        this.setData('energy', -1);
    }
}

const COLOR_BOARDER = 0xffffff;
const COLOR_SOURCE = 0x6ec6ff;
const COLOR_DRAIN = 0x0069c0;
const COLOR_ENERGY = 0x2196f3;
const COLOR_NOENERGY = 0xb0003a;

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