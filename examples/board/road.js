import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('road', 'assets/images/road/road.png', 'assets/images/road/road.json');
    }

    create() {
        var board = new Board(this, {
            grid: this.rexBoard.add.quadGrid({
                x: 400,
                y: 100,
                cellWidth: 100,
                cellHeight: 50,
                type: 1
            }),
            width: 8,
            height: 8
        })
            .fillRoadTile()
            .drawGrid(
                this.add.graphics({
                    lineStyle: {
                        width: 1,
                        color: 0xffffff,
                        alpha: 1
                    }
                })
            )
            .setInteractive()
            .on('gameobjectdown', function (pointer, gameObject) {
                gameObject.toggleData('road');
            })

    }

    update() { }
}

class Board extends RexPlugins.Board.Board {
    drawGrid(graphics) {
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        });
        return this;
    }

    fillRoadTile() {
        this
            .forEachTileXY(function (tileXY, board) {
                board.addChess(
                    new RoadTile(board, (Math.random() > 0.5)),
                    tileXY.x, tileXY.y, 0, true
                );
            })
            .forEachTileXY(function (tileXY, board) {
                var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                chess.updateFrame();
            })
        return this;
    }
}

const Pad = Phaser.Utils.String.Pad;
class RoadTile extends Phaser.GameObjects.Image {
    constructor(board, isRoad) {
        var scene = board.scene;
        super(scene, 0, 0, 'road');
        scene.add.existing(this);

        this.board = board;

        this.setData('road', !!isRoad);
        this.on('changedata-road', function (gameObject, value, previousValue) {
            gameObject.updateFrame();
            // Also update neighbors' frame
            var neighbors = board.getNeighborChess(gameObject, null);
            for (var i = 0, cnt = neighbors.length; i < cnt; i++) {
                neighbors[i].updateFrame();
            }
        })
    }

    updateFrame() {
        if (this.getData('road')) {
            var neighborRoads = [0, 0, 0, 0];
            var hasNeighobrRoad = false;
            for (var i = 0; i < 4; i++) {
                var neighbor = this.board.getNeighborChess(this, i);
                if (neighbor) {
                    if (neighbor.getData('road')) {
                        neighborRoads[i] = 1;
                        hasNeighobrRoad = true;
                    }
                }
            }

            if (hasNeighobrRoad) {
                var right = neighborRoads[0],
                    bottom = neighborRoads[1],
                    left = neighborRoads[2],
                    top = neighborRoads[3];
                this.setFrame(`${top}${left}${bottom}${right}`);
            } else {  // At least it shows default road
                this.setFrame('0001');
            }
        } else {
            this.setFrame('0000');
        }
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