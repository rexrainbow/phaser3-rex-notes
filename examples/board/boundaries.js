import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        })
            .setDepth(1)

        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 20
        })

        var lineManager = new Lines();
        board
            .forEachTileXY(function (tileXY, board) {
                if (Math.random() < 0.5) {
                    var chess = this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, 0x333333);
                    var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                    for (var i = 0, cnt = points.length; i < cnt; i++) {
                        lineManager.add(points[i], points[(i + 1) % cnt]);
                    }
                }
            }, this);

        lineManager.draw(graphics, 2, 0xff0000, 1);
    }

    update() { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 40,
        cellHeight: 20,
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
        // size: 30,
        cellWidth: 36,
        cellHeight: 36,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

class Lines {
    constructor() {
        this.lines = {};
        this.duplicated = {};
    }

    add(p0, p1) {
        let line;
        if (p0.x < p1.x) {
            line = { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y };
        } else if ((p0.x === p1.x) && (p0.y < p1.y)) {
            line = { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y };
        } else {
            line = { x1: p1.x, y1: p1.y, x2: p0.x, y2: p0.y };
        }

        var key = JSON.stringify(line);
        if (key in this.duplicated) {
            // Do nothing
        } else if (key in this.lines) {
            delete this.lines[key];
            this.duplicated[key] = line;
        } else {
            this.lines[key] = line;
        }

        return this;
    }

    draw(graphics, lineWidth, color, alpha) {
        for (var key in this.lines) {
            graphics
                .lineStyle(lineWidth, color, alpha)
                .strokeLineShape(this.lines[key])
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