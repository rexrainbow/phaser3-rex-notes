import phaser from 'phaser/src/phaser.js';
import LineProgressPlugin from '../../plugins/lineprogress-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bar = this.add.rexLineProgress(400, 300, 300, 80, {
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            trackStrokeColor: COLOR_LIGHT,
            trackStrokeThickness: 20,

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
            key: 'rexLineProgress',
            plugin: LineProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);