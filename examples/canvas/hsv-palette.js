import phaser from 'phaser/src/phaser.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js';
import DrawSVPalette from '../../plugins/utils/canvas/DrawSVPalette.js';
import DrawHPalette from '../../plugins/utils/canvas/DrawHPalette.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var svPalette = this.add.rexCanvas(400, 300, 128, 128)
            .updateTexture(function (canvas, context) {
                DrawSVPalette(canvas, context, 1);
            })

        var hPaletteH = this.add.rexCanvas(400, 400, 128, 20)
            .updateTexture(function (canvas, context) {
                DrawHPalette(canvas, context, false);
            })

        var hPaletteV = this.add.rexCanvas(500, 300, 20, 128)
            .updateTexture(function (canvas, context) {
                DrawHPalette(canvas, context, true);
            })
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
    plugins: {
        global: [{
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);