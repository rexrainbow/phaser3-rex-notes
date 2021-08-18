import 'phaser';
import GridCut from '../../plugins/utils/texture/GridCut.js';

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
        var colWidth = 50, rowHeight = 50;
        var columns = 800 / colWidth, rows = 600 / rowHeight;
        GridCut(this, 'classroom', undefined, columns, rows);

        var offsetX = colWidth / 2, offsetY = rowHeight / 2;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                this.add.image(
                    offsetX + (colWidth * x),
                    offsetY + (rowHeight * y),
                    'classroom', `${x},${y}`
                )
                    .setInteractive()
                    .on('pointerover', function () {
                        this.setAlpha(0.7)
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