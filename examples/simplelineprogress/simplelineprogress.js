import phaser from 'phaser/src/phaser.js';
import SimpleLineProgressPlugin from '../../plugins/simplelineprogress-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const COLOR_PRIMARY = 0x4e342e;
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
        var bar = this.add.rexSimpleLineProgress(400, 300, 200, 60, {
            barColor: 0xAA0000,
            trackColor: 0x330000,
            trackStrokeColor: 0xffffff,

            // rtl: true,
            value: 0.75
        });

        var gui = new Dat.GUI();
        gui.add(bar, 'value', 0, 1);
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
            key: 'rexSimpleLineProgress',
            plugin: SimpleLineProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);