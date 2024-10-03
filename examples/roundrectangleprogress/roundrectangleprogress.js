import phaser from 'phaser/src/phaser.js';
import RoundrRctangleProgressPlugin from '../../plugins/roundrectangleprogress-plugin.js';
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
        //var radius = 30;
        var radius = { tl: 0, tr: 0, bl: 30, br: 30 };

        var bar0 = this.add.rexRoundRectangleProgress({
            x: 200, y: 150,
            width: 200, height: 90,
            radius: radius,
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            trackStrokeColor: COLOR_LIGHT,
            value: 0.5
        })

        var bar1 = this.add.rexRoundRectangleProgress({
            x: 500, y: 150,
            width: 200, height: 90,
            radius: radius,
            rtl: true,
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            trackStrokeColor: COLOR_LIGHT,
            value: 0.5
        })

        var bar2 = this.add.rexRoundRectangleProgress({
            x: 200, y: 400,
            width: 90, height: 200,
            radius: radius,
            orientation: 1,
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            trackStrokeColor: COLOR_LIGHT,
            value: 0.5
        })

        var bar3 = this.add.rexRoundRectangleProgress({
            x: 500, y: 400,
            width: 90, height: 200,
            radius: radius,
            rtl: true, orientation: 1,
            barColor: COLOR_MAIN,
            trackColor: COLOR_DARK,
            trackStrokeColor: COLOR_LIGHT,
            value: 0.5
        })

        var gui = new Dat.GUI();
        gui.add(bar0, 'value', 0, 1);
        gui.add(bar1, 'value', 0, 1);
        gui.add(bar2, 'value', 0, 1);
        gui.add(bar3, 'value', 0, 1);
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
            key: 'rexRoundrRctangleProgress',
            plugin: RoundrRctangleProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);