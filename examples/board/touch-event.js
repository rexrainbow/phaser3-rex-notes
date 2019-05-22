import BoardPlugin from '../../plugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 20
        })
            .forEachTileXY(function (tileXY, board) {
                var chess = this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, Random(0, 0xffffff), 0.7);
                this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                    .setOrigin(0.5)
                    .setTint(0x0);
            }, this);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileup', function (pointer, tileXY) {
                console.log('up ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilemove', function (pointer, tileXY) {
                console.log('move ' + tileXY.x + ',' + tileXY.y);
            })
            .on('gameobjectdown', function (pointer, gameObject) {
                gameObject.setFillStyle(Random(0, 0xffffff), 0.7);
            })
            .on('tile1tap', function (tap, tileXY) {
                console.log('1 tap ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tile2tap', function (tap, tileXY) {
                console.log('2 tap ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilepressstart', function (press, tileXY) {
                console.log('press start ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilepressend', function (press, tileXY) {
                console.log('press end ' + tileXY.x + ',' + tileXY.y);
            })

        this.board = board;
        this.print = this.add.text(0, 0, '').setScrollFactor(0);


        var cursors = this.input.keyboard.createCursorKeys();
        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            camera: this.cameras.main,

            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3
        });
    }

    update(time, delta) {
        this.cameraController.update(delta);

        var pointer = this.input.activePointer;
        var out = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
        this.print.setText(out.x + ',' + out.y);
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        size: 50,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

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