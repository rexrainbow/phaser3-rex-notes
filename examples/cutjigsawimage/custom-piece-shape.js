import phaser from 'phaser/src/phaser.js';
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
        var sourceImage = this.add.image(500, 400, 'classroom').setVisible(false)
        var pieces = this.plugins.get('rexCutJigsawImage').gridCut(sourceImage, {
            piecesKey: 'pieces',
            columns: 8, rows: 6,
            edgeWidth: 20, edgeHeight: 20,
            drawShapeCallback: DrawShapeCallback
        });

        for (var i = 0, cnt = pieces.length; i < cnt; i++) {
            let piece = pieces[i];
            piece.preFX.setPadding(2);
            piece.preFX.addGlow(0xff0000, 2, 0);
        }
    }

    update() { }
}

var DrawShapeCallback = function (graphics, width, height, edgeWidth, edgeHeight, edgeMode) {
    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(edgeWidth, edgeHeight);

    switch (edgeMode.top) {
        case 1:
            graphics.lineTo(centerX - edgeHeight, edgeHeight);
            graphics.lineTo(centerX, 0);
            graphics.lineTo(centerX + edgeHeight, edgeHeight);
            break;
        case 2:
            graphics.lineTo(centerX - edgeHeight, edgeHeight);
            graphics.lineTo(centerX, edgeHeight + edgeHeight);
            graphics.lineTo(centerX + edgeHeight, edgeHeight);
            break;
    }
    graphics.lineTo(width - edgeWidth, edgeHeight);

    switch (edgeMode.right) {
        case 1:
            graphics.lineTo(width - edgeWidth, centerY - edgeWidth);
            graphics.lineTo(width, centerY);
            graphics.lineTo(width - edgeWidth, centerY + edgeWidth);
            break;
        case 2:
            graphics.lineTo(width - edgeWidth, centerY - edgeWidth);
            graphics.lineTo(width - edgeWidth - edgeWidth, centerY);
            graphics.lineTo(width - edgeWidth, centerY + edgeWidth);
            break;
    }
    graphics.lineTo(width - edgeWidth, height - edgeHeight);

    switch (edgeMode.bottom) {
        case 1:
            graphics.lineTo(centerX + edgeHeight, height - edgeHeight);
            graphics.lineTo(centerX, height);
            graphics.lineTo(centerX - edgeHeight, height - edgeHeight);
            break;
        case 2:
            graphics.lineTo(centerX + edgeHeight, height - edgeHeight);
            graphics.lineTo(centerX, height - edgeHeight - edgeHeight);
            graphics.lineTo(centerX - edgeHeight, height - edgeHeight);
            break;
    }
    graphics.lineTo(edgeWidth, height - edgeHeight);

    switch (edgeMode.left) {
        case 1:
            graphics.lineTo(edgeWidth, centerY + edgeWidth);
            graphics.lineTo(0, centerY);
            graphics.lineTo(edgeWidth, centerY - edgeWidth);
            break;
        case 2:
            graphics.lineTo(edgeWidth, centerY + edgeWidth);
            graphics.lineTo(edgeWidth + edgeWidth, centerY);
            graphics.lineTo(edgeWidth, centerY - edgeWidth);
            break;
    }
    graphics.lineTo(edgeWidth, edgeHeight);

    graphics.closePath();
    graphics.fillPath();
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