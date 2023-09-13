import phaser from 'phaser/src/phaser.js';
import JigsawPiece from './JigsawPiece.js';

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
        var piece = new JigsawPiece(this, {
            width: 115, height: 115,
        })
        this.add.existing(piece);

        piece.setOrigin(0);

        piece.drawPiece({
            key: 'classroom',
            scrollX: -15,
            scrollY: -15,
            edgeModes: '2200'
        })

        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(piece.getBounds())
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