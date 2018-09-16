import RhombusPlugin from 'rexPlugins/rhombus-plugin.js';
import BoardPlugin from 'rexPlugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var key = 'shape';
        var texture = createRhombusTexture(this, key);
        var image = texture.getSourceImage();

        var board = this.rexBoard.add.board({
            grid: this.rexBoard.add.quadGrid({
                x: 400,
                y: 100,
                cellWidth: image.width,
                cellHeight: image.height,
                type: 1, // isometric
                dir: 8
            }),
            width: 8,
            height: 8
        });

        var chess = this.add.image(0, 0, key)
            .setTint(0xff00ff);
        board.addChess(chess, 0, 0, 0, true);
        chess.moveTo = this.rexBoard.add.moveTo(chess)
            .on('complete', function () {
                console.log('complete');
            })
        chess.moveTo.moveTo(0, 1);
    }
}

var createRhombusTexture = function (scene, key) {
    var rhombus = new Phaser.Geom.rexRhombus(0, 0, 100, 50);

    var points = rhombus.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(rhombus.width), Math.floor(rhombus.height))
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
            key: 'rexRhombus',
            plugin: RhombusPlugin,
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