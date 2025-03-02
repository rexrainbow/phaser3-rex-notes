import phaser from '../../../phaser/src/phaser.js';
import CutJigsawImagePlugin from '../../plugins/cutjigsawimage-plugin.js';
import DrawBounds from '../../plugins/utils/bounds/DrawBounds.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('source', 'assets/images/jigsaw/hot-wheels.jpg');
    }

    create() {
        var centerX = this.cameras.main.width / 2;
        var centerY = this.cameras.main.height / 2;
        var pieces = CreatePieces(this, 'source', centerX, centerY);

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];
            piece.setAlpha(0.75)

            piece
                .enableFilters()
                .filters.internal.addGlow(0x000000, 1, 0)
                .setPaddingOverride(null)

            piece
                .setInteractive({
                    draggable: true,
                    pixelPerfect: true
                })
                .on('drag', function (pointer, dragX, dragY) {
                    piece.setPosition(dragX, dragY);
                    piece.scene.children.bringToTop(piece);
                })
        }

    }

    update() { }
}


var CreatePieces = function (scene, key, x, y) {
    if (x === undefined) { x = 0; }
    if (y === undefined) { y = 0; }

    var sourceImage = scene.add.image(x, y, key);

    var pieces = scene.plugins.get('rexCutJigsawImage').gridCut(sourceImage, {
        piecesKey: 'pieces',
        columns: 5, rows: 7,
        edgeWidth: 15, edgeHeight: 15,
        useDynamicTexture: false
    });

    sourceImage.destroy()

    return pieces;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 720,
    height: 1280,
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