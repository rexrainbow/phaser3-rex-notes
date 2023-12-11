import phaser from 'phaser/src/phaser.js';
import JigsawPieceCanvas from '../../plugins/actions/CutJigsawImage/generateframes/jigsawpiece/JigsawPieceCanvas';

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
        var piece = new JigsawPieceCanvas(this, {
            width: 130, height: 130,
            edgeWidth: 15, edgeHeight: 15,
            key: 'classroom',
        })

        this.add.existing(piece);

        piece
            .drawPiece({
                scrollX: -15, scrollY: -15,
                edgeMode: '1100'
            })
            //.drawPiece({
            //    scrollX: 85, scrollY: -15,
            //    edgeMode: '1122'
            //})
            .setPosition(400, 300)

        piece.preFX.setPadding(2);
        piece.preFX.addGlow(0xff0000, 2, 0);

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
    scene: Demo
};

var game = new Phaser.Game(config);