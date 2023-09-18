import phaser from 'phaser/src/phaser.js';
import CutJigsawImagePlugin from '../../plugins/cutjigsawimage-plugin.js';
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
        var pieces = this.plugins.get('rexCutJigsawImage').gridCut(sourceImage, {
            piecesKey: 'pieces',
            columns: 8, rows: 6,
            edgeWidth: 15, edgeHeight: 15
        });

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];
            piece.preFX.setPadding(2);
            piece.preFX.addGlow(0xff0000, 2, 0);
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
    plugins: {
        global: [{
            key: 'rexCutJigsawImage',
            plugin: CutJigsawImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);