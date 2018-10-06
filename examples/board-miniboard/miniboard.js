import BoardPlugin from 'rexPlugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var miniBoard = this.rexBoard.add.miniBoard(100, 100,
            getQuadGrid(this)
            //getHexagonGrid(this)
        );

        for (var tileY = -1; tileY <= 1; tileY++) {
            for (var tileX = -1; tileX <= 1; tileX++) {
                this.rexBoard.add.shape(miniBoard, tileX, tileY, 0, Random(0, 0xffffff));
            }
        }

        miniBoard.setPosition(400, 300);
    }

    update() {}
}


var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        cellWidth: 80,
        cellHeight: 80,
        type: 0
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        size: 30,
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