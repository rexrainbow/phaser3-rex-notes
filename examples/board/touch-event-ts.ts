import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';
import { Tap, Press, Swipe } from '../../plugins/gestures';
import { TileXYType } from '../../plugins/board/types/Position';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    declare rexBoard: BoardPlugin;
    declare board: BoardPlugin.Board;
    declare print: Phaser.GameObjects.Text;
    declare cameraController: Phaser.Cameras.Controls.SmoothedKeyControl;

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var board = this.rexBoard.add.board({
            // grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            grid: {
                gridType: 'hexagonGrid',
                x: 50,
                y: 50,
                size: 50,
                staggeraxis: 'x',
                staggerindex: 'odd'
            },

            width: 20,
            height: 20
        })
            .forEachTileXY(function (tileXY, board) {
                var scene = board.scene as Demo;
                var chess = scene.rexBoard.add.shape(
                    board,
                    tileXY.x, tileXY.y, 0,
                    Random(0, 0xffffff), 0.7
                );
                scene.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                    .setOrigin(0.5)
                    .setTint(0x0);
            });

        board
            .setInteractive()
            .on('tiledown', function (pointer: Phaser.Input.Pointer, tileXY: TileXYType) {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileup', function (pointer: Phaser.Input.Pointer, tileXY: TileXYType) {
                console.log('up ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilemove', function (pointer: Phaser.Input.Pointer, tileXY: TileXYType) {
                console.log('move ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileover', function (pointer: Phaser.Input.Pointer, tileXY: TileXYType) {
                console.log('over ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileout', function (pointer: Phaser.Input.Pointer, tileXY: TileXYType) {
                console.log('out ' + tileXY.x + ',' + tileXY.y);
            })
            .on('gameobjectdown', function (pointer: Phaser.Input.Pointer, gameObject: BoardPlugin.Shape) {
                gameObject.setFillStyle(Random(0, 0xffffff), 0.7);
            })
            .on('tile1tap', function (tap: Tap, tileXY: TileXYType) {
                console.log('1 tap ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tile2tap', function (tap: Tap, tileXY: TileXYType) {
                console.log('2 tap ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilepressstart', function (press: Press, tileXY: TileXYType) {
                console.log('press start ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tilepressend', function (press: Press, tileXY: TileXYType) {
                console.log('press end ' + tileXY.x + ',' + tileXY.y);
            })
            .on('tileswipe', function (swipe: Swipe, tileXY: TileXYType) {
                console.log(`swipe-${GetSwipeDirection(swipe)} ` + tileXY.x + ',' + tileXY.y);
            })

        this.board = board;
        this.print = this.add.text(0, 0, '').setScrollFactor(0);


        var keyboard = this.input.keyboard;
        if (!keyboard) {
            return;
        }

        var cursors = keyboard.createCursorKeys();
        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            camera: this.cameras.main,

            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            zoomOut: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3
        });
    }

    update(time: number, delta: number) {
        this.cameraController.update(delta);

        var pointer = this.input.activePointer;
        var out = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
        this.print.setText(out.x + ',' + out.y);
    }
}

var getQuadGrid = function (scene: Demo) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene: Demo) {
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        size: 50,
        staggeraxis: 'x',
        staggerindex: 'odd'
    })
    return grid;
};

var GetSwipeDirection = function (swipe: Swipe) {
    var directions: string[] = [];
    if (swipe.left) {
        directions.push('left');
    }
    if (swipe.right) {
        directions.push('right');
    }
    if (swipe.up) {
        directions.push('up');
    }
    if (swipe.down) {
        directions.push('down');
    }
    return directions.join('-');
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
