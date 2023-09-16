import phaser from 'phaser/src/phaser.js';
import Jigsaw from '../../templates/jigsaw/index';
import DrawBounds from '../../plugins/utils/bounds/DrawBounds.js';

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
        var sourceImage = this.add.image(500, 400, 'classroom').setVisible(false)
        var pieces = Jigsaw.CreatePieces(sourceImage, {
            piecesKey: 'pieces',
            columns: 8, rows: 6,
            edgeWidth: 15, edgeHeight: 15
        });

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];
            piece
                .setAlpha(0.5)
                .setInteractive()
                .on('pointerover', function () {
                    piece.setAlpha(1)
                })
                .on('pointerout', function () {
                    piece.setAlpha(0.5);
                })
        }

        // DrawBounds(pieces, this.add.graphics(), 0xff0000)

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);