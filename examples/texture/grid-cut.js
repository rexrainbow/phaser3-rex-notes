import 'phaser';
import GridCut from '../../plugins/utils/texture/gridcut/GridCut.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var cellWidth = 50, cellHeight = 50;
        var columns = 800 / cellWidth, rows = 600 / cellHeight;
        var result = GridCut(this, 'classroom', undefined, columns, rows);

        var getFrameNameCallback = result.getFrameNameCallback;
        var offsetX = cellWidth / 2, offsetY = cellHeight / 2;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                this.add.image(
                    offsetX + (cellWidth * x),
                    offsetY + (cellHeight * y),
                    'classroom', getFrameNameCallback(x, y)
                )
                    .setInteractive()
                    .on('pointerover', function () {
                        this.setAlpha(0.5)
                    })
                    .on('pointerout', function () {
                        this.setAlpha(1)
                    })
            }
        }

    }

    update() { }
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
};

var game = new Phaser.Game(config);