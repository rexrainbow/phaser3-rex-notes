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
        this.load.image('source', 'assets/images/jigsaw/square.png');
    }

    create() {
        var pieces = CreatePieces(this, 'source', 500, 350);

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];
            piece.preFX.setPadding(2);
            piece.preFX.addGlow(0xff0000, 2, 0);

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

    //I added this to the example, but it wont work anyway
    let screenWidth = scene.sys.game.canvas.width;
    let screenHeight = scene.sys.game.canvas.height;
    let scaleX = (screenWidth - 200) / sourceImage.width;
    let scaleY = (screenHeight - 300) / sourceImage.height;
    if (scaleX < scaleY) {
        sourceImage.setScale(scaleX, scaleX);
    }
    else {
        sourceImage.setScale(scaleY, scaleY);
    }

    var pieces = scene.plugins.get('rexCutJigsawImage').gridCut(sourceImage, {
        piecesKey: 'pieces',
        columns: 6, rows: 5,
        edgeWidth: 15, edgeHeight: 15,
        useDynamicTexture: false
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