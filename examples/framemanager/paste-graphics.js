import phaser from 'phaser/src/phaser.js';
import CanvasFrameManagerPlugin from '../../plugins/canvasframemanager-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // TODO : remove this line
        this.load.image('classroom', 'assets/images/phaser-dude.png');
    }

    create() {
        var indent = 15,
            cellSize = indent + 100;
        var frameManager = this.plugins.get('rexCanvasFrameManager').add(this,
            {
                key: 'test',
                width: cellSize * 9, height: cellSize * 9,
                cellWidth: cellSize, cellHeight: cellSize,
                fillColor: 0x666666,
                useDynamicTexture: true,
            });

        // Show texture
        this.add.image(0, 0, 'test').setOrigin(0).setScale(0.5);

        var graphics = this.add.graphics({ add: false })
            .setDefaultStyles({
                fillStyle: {
                    color: 0x880000,
                    alpha: 1
                }
            });
        var rt = this.add.renderTexture(0, 0, cellSize, cellSize);
        // Can't paste graphics to FrameManager directly, because that graphics does not have size

        var topEdgeMode, leftEdgeMode, bottomEdgeMode, rightEdgeMode;
        for (topEdgeMode = 0; topEdgeMode < 3; topEdgeMode++) {
            for (leftEdgeMode = 0; leftEdgeMode < 3; leftEdgeMode++) {
                for (bottomEdgeMode = 0; bottomEdgeMode < 3; bottomEdgeMode++) {
                    for (rightEdgeMode = 0; rightEdgeMode < 3; rightEdgeMode++) {
                        var frameName = `${rightEdgeMode}${bottomEdgeMode}${leftEdgeMode}${topEdgeMode}`;

                        DrawPieceMask(graphics, cellSize, cellSize, indent, frameName);
                        rt.clear().draw(graphics);

                        frameManager.paste(frameName, rt);
                    }
                }
            }
        }

        graphics.destroy();
        rt.destroy();

    }

    update() {

    }
}

const DegToRad = Phaser.Math.DegToRad;
var DrawPieceMask = function (graphics, width, height, indent, edgeMode) {
    var rightEdgeMode, bottomEdgeMode, leftEdgeMode, topEdgeMode;
    [rightEdgeMode, bottomEdgeMode, leftEdgeMode, topEdgeMode] =
        edgeMode.split('').map(function (x) { return parseInt(x) });

    var centerX = width / 2, centerY = height / 2;

    graphics.clear();
    graphics.beginPath();

    graphics.moveTo(indent, indent);

    switch (topEdgeMode) {
        case 1:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, DegToRad(180), DegToRad(360), false);
            break;
        case 2:
            graphics.lineTo(centerX - indent, indent);
            graphics.arc(centerX, indent, indent, DegToRad(180), DegToRad(360), true);
            break;
    }
    graphics.lineTo(width - indent, indent);

    switch (rightEdgeMode) {
        case 1:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), false);
            break;
        case 2:
            graphics.arc(width - indent, centerY, indent, DegToRad(270), DegToRad(90), true);
            break;
    }
    graphics.lineTo(width - indent, height - indent);

    switch (bottomEdgeMode) {
        case 1:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), false);
            break;
        case 2:
            graphics.arc(centerX, height - indent, indent, DegToRad(0), DegToRad(180), true);
            break;
    }
    graphics.lineTo(indent, height - indent);

    switch (leftEdgeMode) {
        case 1:
            graphics.arc(indent, centerY, indent, DegToRad(90), DegToRad(270), false);
            break;
        case 2:
            graphics.arc(indent, centerY, indent, DegToRad(90), DegToRad(270), true);
            break;
    }
    graphics.lineTo(indent, indent);

    graphics.closePath();
    graphics.fillPath();
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvasFrameManager',
            plugin: CanvasFrameManagerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);