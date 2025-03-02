import phaser from '../../../phaser/src/phaser.js';
import CutJigsawImagePlugin from '../../plugins/cutjigsawimage-plugin.js';

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
        var pieces = CreatePieces(this, 'classroom', 500, 400);

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];

            piece
                .enableFilters()
                .filters.internal.addGlow(0xff0000, 2, 0)
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
    if (x === undefined) {
        x = 0;
    }
    if (y === undefined) {
        y = 0;
    }

    var sourceImage = scene.add.image(x, y, key);
    var pieces = scene.plugins.get('rexCutJigsawImage').gridCut(sourceImage, {
        piecesKey: 'pieces',
        columns: 8, rows: 6,
        edgeWidth: 15, edgeHeight: 15,
        useDynamicTexture: false,
        edges: {
            getRightEdge(c, r) { return 1; },
            getBottomEdge(c, r) { return 1; }
        }
    });

    sourceImage.destroy()

    return pieces;
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