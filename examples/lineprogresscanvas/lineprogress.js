import phaser from 'phaser/src/phaser.js';
import LineProgressCanvasPlugin from '../../plugins/lineprogresscanvas-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bar = this.add.rexLineProgressCanvas(400, 300, 200, 60, {
            barColor: 0xb2fab4,
            barColor2: 0x003300,  // Gradient from barColor2 to barColor
            // trackColor: COLOR_DARK,
            trackStrokeColor: 0x333333,

            skewX: 30,
            // rtl: true,
            value: 0.75
        });

        var graphics = this.add.graphics({
            lineStyle: {
                width: 1, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(bar.getBounds())

        var gui = new Dat.GUI();
        gui.add(bar, 'value', 0, 1);
        gui.add(bar, 'skewX', -50, 50);
        gui.add(bar, 'rtl');
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
            key: 'rexLineProgressCanvas',
            plugin: LineProgressCanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);