import HexagonPlugin from 'rexPlugins/hexagon-plugin.js';
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
        var staggeraxis = 'x';
        var staggerindex = 'odd';
        var key = 'shape';
        var texture = createHexagonTexture(this, key, staggeraxis, staggerindex);
        var image = texture.getSourceImage();

        var board = this.rexBoard.add.board({
            grid: this.rexBoard.add.hexagonGrid({
                x: 100,
                y: 100,
                cellWidth: image.width,
                cellHeight: image.height,
                staggeraxis: staggeraxis,
                staggerindex: staggerindex
            }),
            width: 8,
            height: 8
        });

        var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
        board.forEachTileXY(function (tileXY, board) {
            var index = Random(0, 5);
            var chess = this.add.image(0, 0, key)
                .setData('symbol', index)
                .setTint(colorArray[index * 60].color);
            board.addChess(chess, tileXY.x, tileXY.y, 0, true);
            this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        var match = this.rexBoard.add.match({
                board: board
            })
            .refreshSymbols(function(tileXY, board){
                var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                return chess.getData('symbol');
            })
            .match(3, false, function(matched){
                var chess, tileXY;
                for(var i =0, cnt=matched.length; i<cnt; i++) {
                    tileXY = matched[i];
                    chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                    chess.setScale(0.75);
                }
            });
    }

    update() {}
}

var createHexagonTexture = function (scene, key, staggeraxis) {
    var hexagon = new Phaser.Geom.rexHexagon(0, 0, 30, staggeraxis);
    hexagon.left = 0;
    hexagon.top = 0;

    var points = hexagon.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(hexagon.width), Math.floor(hexagon.height))
        .destroy();
    return scene.textures.get(key);
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexHexagon',
            plugin: HexagonPlugin,
            start: true
        }],
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);